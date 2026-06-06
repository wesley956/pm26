import { useState, useMemo } from 'react';
import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import { EXAM_CONFIG, EXAM_SUBJECTS } from '../config/examConfig';
import { useApp } from '../store';
import type { Question, SubjectId } from '../types';
import { ChevronLeft, Target, Clock, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

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
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function buildSubjectDistributedQuestions(distribution: Readonly<Partial<Record<SubjectId, number>>>): Question[] {
  const selected: Question[] = [];

  for (const subject of EXAM_SUBJECTS) {
    const count = distribution[subject.id] ?? 0;
    if (count <= 0) continue;

    const subjectQuestions = questions.filter(question => question.subjectId === subject.id);
    selected.push(...shuffleQuestions(subjectQuestions).slice(0, count));
  }

  return shuffleQuestions(selected);
}

function buildMiniSimulationQuestions(): Question[] {
  return buildSubjectDistributedQuestions({
    portugues: 1,
    matematica: 1,
    gerais: 1,
    informatica: 1,
    administracao: 1,
  });
}

function buildWeeklySimulationQuestions(): Question[] {
  return buildSubjectDistributedQuestions({
    portugues: 5,
    matematica: 4,
    gerais: 4,
    informatica: 1,
    administracao: 1,
  });
}

function buildOfficialExamQuestions(): Question[] {
  return buildSubjectDistributedQuestions(EXAM_CONFIG.objectiveExam.subjects);
}

function getSimulationLabel(type: SimType): string {
  if (type === 'mini') return 'Mini';
  if (type === 'semanal') return 'Semanal';
  return 'Completo oficial';
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
    if (simType === 'completo') return buildOfficialExamQuestions();
    if (simType === 'semanal') return buildWeeklySimulationQuestions();

    return buildMiniSimulationQuestions();
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

  if (!active) {
    return (
      <div className="study-wide">
        <button onClick={() => onNavigate('dashboard')} className="study-back">
          <ChevronLeft size={16} /> Voltar
        </button>

        <div className="mb-6">
          <p className="section-label mb-2">Modo prova</p>
          <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Simulados</h1>
          <p className="study-subtitle mt-2">
            Treine no estilo Vunesp. O simulado completo segue a distribuição oficial de 60 questões.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <button onClick={() => startSim('mini')} className="sim-menu-card">
            <Target size={30} className="mb-4 text-pm-300" />
            <h3 className="text-2xl font-black text-white">Mini simulado</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">5 questões • 1 por matéria • cerca de 10 minutos</p>
          </button>

          <button onClick={() => startSim('semanal')} className="sim-menu-card">
            <Target size={30} className="mb-4 text-gold-400" />
            <h3 className="text-2xl font-black text-white">Simulado semanal</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">15 questões • proporção oficial • cerca de 30 minutos</p>
          </button>

          <button onClick={() => startSim('completo')} className="sim-menu-card">
            <Target size={30} className="mb-4 text-danger" />
            <h3 className="text-2xl font-black text-white">Completo oficial</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">60 questões • padrão PM-SP/Vunesp</p>
          </button>
        </div>

        <div className="study-card mt-5">
          <h3 className="study-kicker gold">Distribuição oficial</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {EXAM_SUBJECTS.map(subject => (
              <div key={subject.id} className="flex justify-between rounded-xl bg-white/[0.03] px-3 py-2 text-sm">
                <span className="text-slate-300">{subject.label}</span>
                <span className="font-bold text-gold-400">{subject.officialQuestions} questões</span>
              </div>
            ))}
          </div>
        </div>

        {profile.simulationResults.length > 0 && (
          <div className="study-card mt-5">
            <h3 className="study-kicker">Resultados anteriores</h3>
            <div className="grid gap-2">
              {profile.simulationResults.slice(-5).reverse().map(sim => (
                <div key={sim.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-3">
                  <div>
                    <p className="font-bold text-white">{getSimulationLabel(sim.type)}</p>
                    <p className="text-xs text-slate-500">{new Date(sim.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gold-400">{sim.correctAnswers}/{sim.totalQuestions}</p>
                    <p className="text-xs text-slate-500">{Math.round((sim.correctAnswers / sim.totalQuestions) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (finished) {
    const totalCorrect = Object.values(results).reduce((a, r) => a + r.correct, 0);
    const totalQ = simQuestions.length;
    const pct = Math.round((totalCorrect / totalQ) * 100);
    const xpEarned = calculateSimulationXp(totalCorrect, simType);

    return (
      <div className="result-shell text-center animate-slide-up">
        <div className="result-card">
          <h2 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">
            {pct >= 70 ? 'Excelente desempenho' : pct >= 50 ? 'Bom trabalho' : 'Continue estudando'}
          </h2>

          <p className="mt-3 text-2xl font-black text-gold-400">{totalCorrect}/{totalQ}</p>
          <p className="text-slate-400">acertos ({pct}%)</p>
          <p className="mt-1 text-sm text-pm-300">Tempo: {minutesSpent} min • +{xpEarned} XP</p>

          <div className="mt-6 text-left">
            <h3 className="study-kicker mb-3">Desempenho por matéria</h3>
            <div className="grid gap-2">
              {subjects.map(sub => {
                const r = results[sub.id];
                if (!r) return null;
                const subjectPct = Math.round((r.correct / r.total) * 100);

                return (
                  <div key={sub.id} className="flex justify-between rounded-xl bg-white/[0.03] px-3 py-2 text-sm">
                    <span>{sub.icon} {sub.name}</span>
                    <span className={subjectPct >= 70 ? 'text-success' : subjectPct >= 50 ? 'text-gold-400' : 'text-danger'}>
                      {r.correct}/{r.total} ({subjectPct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="study-card mt-6 text-left">
            <h3 className="study-kicker gold">Recomendações</h3>
            <div className="study-body">
              {subjects.map(sub => {
                const r = results[sub.id];
                if (!r || r.correct / r.total >= 0.7) return null;
                return <p key={sub.id}>Reforce <strong>{sub.name}</strong>: acerto abaixo de 70%.</p>;
              })}
              {Object.values(results).every(r => r.correct / r.total >= 0.7) && (
                <p>Você está indo bem. Mantenha o ritmo com revisões regulares.</p>
              )}
            </div>
          </div>

          <button onClick={() => { setActive(false); setSimType(null); }} className="btn-primary mt-6 w-full">
            Voltar aos simulados
          </button>
        </div>
      </div>
    );
  }

  const subject = subjects.find(s => s.id === currentQ.subjectId);
  const progress = ((currentIndex + 1) / simQuestions.length) * 100;

  return (
    <div className="quiz-shell animate-fade-in">
      <div className="quiz-topline">
        <span className="flex items-center gap-1 text-sm text-slate-400">
          <Clock size={14} /> {minutesSpent} min
        </span>

        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-bold text-slate-400">
          {currentIndex + 1}/{simQuestions.length}
        </span>
      </div>

      <div className="xp-bar-wrap mb-5">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-pm-300">
        {subject?.icon} {subject?.name}
      </div>

      <div className="quiz-card">
        <p className="quiz-question">{currentQ.text}</p>
      </div>

      <div className="option-list">
        {currentQ.options.map((opt, idx) => {
          const letter = 'ABCDE'[idx];
          const isCorrect = idx === currentQ.correct;
          const isWrongSelection = showResult && selected === idx && !isCorrect;

          const stateClass =
            showResult && isCorrect ? 'option-card-correct' :
            isWrongSelection ? 'option-card-wrong' :
            selected === idx ? 'option-card-selected' :
            '';

          return (
            <button
              key={idx}
              onClick={() => !showResult && setSelected(idx)}
              className={`option-card ${stateClass}`}
            >
              <span className="option-letter">{showResult && isCorrect ? '✓' : isWrongSelection ? '✕' : letter}</span>
              <span className="option-text">{opt}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`quiz-explanation animate-fade-in ${
          selected === currentQ.correct
            ? 'border border-success/30 bg-success/10'
            : 'border border-danger/30 bg-danger/10'
        }`}>
          <div className="mb-2 flex items-center gap-2">
            {selected === currentQ.correct ? (
              <CheckCircle2 size={20} className="text-success" />
            ) : (
              <span className="text-lg text-danger">✕</span>
            )}

            <span className={`font-black ${selected === currentQ.correct ? 'text-success' : 'text-danger'}`}>
              {selected === currentQ.correct ? 'Correto' : 'Incorreto'}
            </span>
          </div>
          <p className="text-base leading-relaxed text-slate-300">{currentQ.explanation}</p>
        </div>
      )}

      <div className="mt-5">
        {!showResult ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className={`w-full py-4 text-base ${selected !== null ? 'btn-gold' : 'cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] font-bold text-slate-600'}`}
          >
            Confirmar resposta
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary w-full py-4 text-base">
            {currentIndex + 1 >= simQuestions.length ? 'Ver resultado' : 'Próxima questão'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
