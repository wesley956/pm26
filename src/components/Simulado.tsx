import { useState, useMemo } from 'react';
import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import { EXAM_CONFIG } from '../config/examConfig';
import { useApp } from '../store';
import type { Question, SubjectId } from '../types';
import { ChevronLeft, Target, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

type SimType = 'mini' | 'semanal' | 'completo';

function getSimulationBonus(type: SimType | null): number {
  if (type === 'completo') return 100;
  if (type === 'semanal') return 50;
  return 20;
}

function calculateSimulationXp(correctAnswers: number, type: SimType | null): number {
  return correctAnswers * 20 + getSimulationBonus(type);
}

function shuffleQuestions(list: Question[]): Question[] {
  return [...list].sort(() => Math.random() - 0.5);
}

function buildOfficialExamQuestions(): Question[] {
  const distribution = EXAM_CONFIG.objectiveExam.subjects;
  const selected: Question[] = [];

  for (const [subjectId, count] of Object.entries(distribution) as Array<[SubjectId, number]>) {
    const subjectQuestions = questions.filter(question => question.subjectId === subjectId);
    selected.push(...shuffleQuestions(subjectQuestions).slice(0, count));
  }

  return shuffleQuestions(selected);
}

export default function Simulado({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { profile, addSimulation, addXP, answerQuestion, updateStreak } = useApp();
  const [simType, setSimType] = useState<SimType | null>(null);
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Record<string, { total: number; correct: number }>>({});
  const [startTime, setStartTime] = useState(0);
  const [finished, setFinished] = useState(false);

  const simQuestions = useMemo(() => {
    if (!simType) return [];

    if (simType === 'completo') {
      return buildOfficialExamQuestions();
    }

    const count = simType === 'mini' ? 5 : 15;
    return shuffleQuestions(questions).slice(0, count);
  }, [simType]);

  const currentQ = simQuestions[currentIndex];
  const minutesSpent = startTime ? Math.round((Date.now() - startTime) / 60000) : 0;

  const startSim = (type: SimType) => {
    setSimType(type);
    setActive(true);
    setCurrentIndex(0);
    setSelected(null);
    setShowResult(false);
    setResults({});
    setStartTime(Date.now());
    setFinished(false);
  };

  const handleConfirm = () => {
    if (selected === null || !currentQ) return;
    const correct = selected === currentQ.correct;
    answerQuestion(currentQ.id, selected, correct);
    const sid = currentQ.subjectId;
    setResults(prev => ({
      ...prev,
      [sid]: {
        total: (prev[sid]?.total || 0) + 1,
        correct: (prev[sid]?.correct || 0) + (correct ? 1 : 0),
      }
    }));
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= simQuestions.length) {
      finishSim();
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const finishSim = () => {
    const totalCorrect = Object.values(results).reduce((acc, r) => acc + r.correct, 0);
    const xpEarned = calculateSimulationXp(totalCorrect, simType);
    addSimulation({
      id: `sim-${Date.now()}`,
      date: new Date().toISOString(),
      type: simType || 'mini',
      totalQuestions: simQuestions.length,
      correctAnswers: totalCorrect,
      subjectResults: results as any,
      xpEarned,
    });
    addXP(xpEarned);
    updateStreak();
    setFinished(true);
  };

  // Menu
  if (!active) {
    return (
      <div className="space-y-4">
        <button onClick={() => onNavigate('dashboard')} className="text-sm text-pm-300 flex items-center gap-1">
          <ChevronLeft size={16} /> Voltar
        </button>
        <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">🎯 Simulados</h1>
        <p className="text-sm text-gray-400">Teste seus conhecimentos com simulados no estilo Vunesp. O completo segue a distribuição oficial de 60 questões.</p>

        <div className="space-y-3">
          <button onClick={() => startSim('mini')} className="card w-full text-left hover:border-pm-400 border-l-4 border-pm-400">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-pm-400" />
              <div>
                <h3 className="font-bold text-white">Mini Simulado</h3>
                <p className="text-xs text-gray-500">5 questões • ~10 minutos</p>
              </div>
            </div>
          </button>

          <button onClick={() => startSim('semanal')} className="card w-full text-left hover:border-pm-400 border-l-4 border-gold-500">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-gold-400" />
              <div>
                <h3 className="font-bold text-white">Simulado Semanal</h3>
                <p className="text-xs text-gray-500">15 questões • ~30 minutos</p>
              </div>
            </div>
          </button>

          <button onClick={() => startSim('completo')} className="card w-full text-left hover:border-pm-400 border-l-4 border-danger">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-danger" />
              <div>
                <h3 className="font-bold text-white">Simulado Completo Oficial</h3>
                <p className="text-xs text-gray-500">60 questões • padrão PM-SP/Vunesp</p>
              </div>
            </div>
          </button>
        </div>

        {/* Past results */}
        {profile.simulationResults.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-300 mb-2">Resultados Anteriores</h3>
            <div className="space-y-2">
              {profile.simulationResults.slice(-5).reverse().map(sim => (
                <div key={sim.id} className="card flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-white">
                                  {sim.type === 'mini' ? 'Mini' : sim.type === 'semanal' ? 'Semanal' : 'Completo oficial'}
                    </p>
                    <p className="text-[10px] text-gray-500">{new Date(sim.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gold-400">{sim.correctAnswers}/{sim.totalQuestions}</p>
                    <p className="text-[10px] text-gray-500">{Math.round((sim.correctAnswers / sim.totalQuestions) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Finished
  if (finished) {
    const totalCorrect = Object.values(results).reduce((a, r) => a + r.correct, 0);
    const totalQ = simQuestions.length;
    const pct = Math.round((totalCorrect / totalQ) * 100);
    const xpEarned = calculateSimulationXp(totalCorrect, simType);

    return (
      <div className="space-y-4 text-center animate-slide-up">
        <div className="text-5xl">{pct >= 70 ? '🏆' : pct >= 50 ? '💪' : '📚'}</div>
        <h2 className="text-2xl font-bold font-[Rajdhani,sans-serif]">
          {pct >= 70 ? 'Excelente desempenho!' : pct >= 50 ? 'Bom trabalho!' : 'Continue estudando!'}
        </h2>
        <div className="card">
          <p className="text-4xl font-bold text-gold-400">{totalCorrect}/{totalQ}</p>
          <p className="text-sm text-gray-400">acertos ({pct}%)</p>
          <p className="text-xs text-pm-300 mt-2">Tempo: {minutesSpent} min • +{xpEarned} XP</p>
        </div>

        {/* Per subject breakdown */}
        <div className="space-y-2 text-left">
          <h3 className="text-sm font-bold text-gray-300">Desempenho por Matéria:</h3>
          {subjects.map(sub => {
            const r = results[sub.id];
            if (!r) return null;
            return (
              <div key={sub.id} className="flex justify-between items-center text-sm">
                <span>{sub.icon} {sub.name}</span>
                <span className={r.correct / r.total >= 0.7 ? 'text-success' : r.correct / r.total >= 0.5 ? 'text-gold-400' : 'text-danger'}>
                  {r.correct}/{r.total} ({Math.round((r.correct / r.total) * 100)}%)
                </span>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="card text-left">
          <h3 className="text-xs font-bold text-gold-400 mb-2">📋 RECOMENDAÇÕES:</h3>
          <div className="space-y-1 text-xs text-gray-400">
            {subjects.map(sub => {
              const r = results[sub.id];
              if (!r || r.correct / r.total >= 0.7) return null;
              return <p key={sub.id}>• Reforce <strong className="text-white">{sub.name}</strong> — acerto abaixo de 70%</p>;
            })}
            {Object.values(results).every(r => r.correct / r.total >= 0.7) && (
              <p>• Você está indo muito bem! Mantenha o ritmo com revisões regulares.</p>
            )}
          </div>
        </div>

        <button onClick={() => { setActive(false); setSimType(null); }} className="btn-primary w-full">Voltar aos Simulados</button>
      </div>
    );
  }

  // Active simulation
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {minutesSpent} min</span>
        <span className="text-xs text-gray-500">{currentIndex + 1}/{simQuestions.length}</span>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill bg-gradient-to-r from-pm-500 to-gold-500" style={{ width: `${((currentIndex + 1) / simQuestions.length) * 100}%` }} />
      </div>

      <span className="text-[10px] bg-pm-700 text-pm-300 px-2 py-0.5 rounded-full">
        {subjects.find(s => s.id === currentQ.subjectId)?.icon} {subjects.find(s => s.id === currentQ.subjectId)?.name}
      </span>

      <div className="card">
        <p className="text-sm text-gray-200 leading-relaxed">{currentQ.text}</p>
      </div>

      <div className="space-y-2">
        {currentQ.options.map((opt, idx) => {
          const letter = 'ABCDE'[idx];
          const isCorrect = idx === currentQ.correct;
          const isSelected = selected === idx;
          let cls = '';
          if (showResult) {
            if (isCorrect) cls = 'border-success bg-success/10';
            else if (isSelected) cls = 'border-danger bg-danger/10';
          } else if (isSelected) cls = 'border-gold-500 bg-gold-500/10';

          return (
            <button key={idx} onClick={() => !showResult && setSelected(idx)} className={`w-full text-left card flex items-center gap-3 ${cls}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                showResult && isCorrect ? 'bg-success text-white' :
                showResult && isSelected ? 'bg-danger text-white' :
                isSelected ? 'bg-gold-500 text-pm-900' : 'bg-pm-700 text-gray-400'
              }`}>{letter}</span>
              <span className="text-sm text-gray-300">{opt}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`card border-l-4 ${selected === currentQ.correct ? 'border-success' : 'border-danger'} animate-fade-in`}>
          <div className="flex items-center gap-2 mb-1">
            {selected === currentQ.correct ? <CheckCircle2 size={16} className="text-success" /> : <span className="text-danger text-sm">✗</span>}
            <span className={`text-sm font-bold ${selected === currentQ.correct ? 'text-success' : 'text-danger'}`}>
              {selected === currentQ.correct ? 'Correto!' : 'Incorreto'}
            </span>
          </div>
          <p className="text-sm text-gray-400">{currentQ.explanation}</p>
        </div>
      )}

      {!showResult ? (
        <button onClick={handleConfirm} disabled={selected === null} className={`w-full py-3 rounded-xl font-bold ${
          selected !== null ? 'btn-gold' : 'bg-pm-800 text-gray-600 cursor-not-allowed'
        }`}>Confirmar</button>
      ) : (
        <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2">
          {currentIndex + 1 >= simQuestions.length ? 'Ver Resultado' : 'Próxima'}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
