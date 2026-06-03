import { useState, useMemo } from 'react';
import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import { useApp } from '../store';
import { ChevronLeft, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  subjectId?: string;
  onNavigate: (tab: string, data?: any) => void;
}

export default function Questions({ subjectId, onNavigate }: Props) {
  const { profile, answerQuestion, addXP } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(subjectId || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);

  const filteredQuestions = useMemo(() => {
    if (selectedSubject) return questions.filter(q => q.subjectId === selectedSubject);
    return questions;
  }, [selectedSubject]);

  const shuffledQuestions = useMemo(() => {
    return [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [filteredQuestions, selectedSubject]);

  const currentQ = shuffledQuestions[currentIndex];
  const isFinished = currentIndex >= shuffledQuestions.length;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null || !currentQ) return;
    const correct = selected === currentQ.correct;
    const previousAnswer = profile.completedQuestions[currentQ.id];
    const shouldAwardXp = correct && !previousAnswer?.correct;

    answerQuestion(currentQ.id, selected, correct);

    if (correct) {
      setSessionCorrect(prev => prev + 1);
    }

    if (shouldAwardXp) {
      addXP(15);
      setSessionXp(prev => prev + 15);
    }

    setSessionTotal(prev => prev + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    setSelected(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowResult(false);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSessionXp(0);
    // Force re-shuffle by changing selectedSubject briefly
    setSelectedSubject('');
    setTimeout(() => setSelectedSubject(subjectId || ''), 0);
  };

  // Subject selection screen
  if (!selectedSubject && !subjectId) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">❓ Questões</h1>
        <p className="text-sm text-gray-400">Escolha uma matéria para praticar:</p>
        <div className="space-y-2">
          {subjects.map(sub => {
            const qCount = questions.filter(q => q.subjectId === sub.id).length;
            const answered = Object.keys(profile.completedQuestions).filter(id => id.startsWith(sub.id === 'portugues' ? 'pt' : sub.id === 'matematica' ? 'mt' : sub.id === 'gerais' ? 'cg' : sub.id === 'informatica' ? 'inf' : 'ap')).length;
            return (
              <button key={sub.id} onClick={() => setSelectedSubject(sub.id)} className="card w-full text-left flex items-center gap-3 hover:border-pm-400">
                <span className="text-2xl">{sub.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{sub.name}</h3>
                  <p className="text-[10px] text-gray-500">{qCount} questões • {answered} respondidas</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Results screen
  if (isFinished || !currentQ) {
    const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    return (
      <div className="space-y-4 text-center animate-slide-up">
        <div className="text-5xl">{pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
        <h2 className="text-2xl font-bold font-[Rajdhani,sans-serif]">
          {pct >= 70 ? 'Excelente!' : pct >= 50 ? 'Bom trabalho!' : 'Continue estudando!'}
        </h2>
        <div className="card">
          <p className="text-3xl font-bold text-gold-400">{sessionCorrect}/{sessionTotal}</p>
          <p className="text-sm text-gray-400">acertos ({pct}%)</p>
          <p className="text-xs text-pm-300 mt-2">+{sessionXp} XP ganhos nesta sessão</p>
        </div>
        <div className="space-y-2">
          <button onClick={handleRestart} className="btn-gold w-full">Tentar Novamente</button>
          <button onClick={() => { setSelectedSubject(''); setCurrentIndex(0); }} className="btn-primary w-full">Outra Matéria</button>
          <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  const subject = subjects.find(s => s.id === currentQ.subjectId);
  // previously answered check

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={() => { setSelectedSubject(''); setCurrentIndex(0); setSessionCorrect(0); setSessionTotal(0); setSessionXp(0); }} className="text-sm text-pm-300 flex items-center gap-1">
          <ChevronLeft size={16} /> Voltar
        </button>
        <div className="text-xs text-gray-500">
          {currentIndex + 1}/{shuffledQuestions.length}
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div className="progress-bar-fill bg-gradient-to-r from-pm-500 to-pm-400" style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }} />
      </div>

      {/* Subject tag */}
      <span className="text-[10px] bg-pm-700 text-pm-300 px-2 py-0.5 rounded-full">
        {subject?.icon} {subject?.name} — {currentQ.topic}
      </span>

      {/* Question */}
      <div className="card">
        <p className="text-sm text-gray-200 leading-relaxed">{currentQ.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {currentQ.options.map((opt, idx) => {
          const letter = 'ABCDE'[idx];
          let borderColor = 'border-pm-700/50';
          let bgColor = '';
          if (showResult) {
            if (idx === currentQ.correct) {
              borderColor = 'border-success';
              bgColor = 'bg-success/10';
            } else if (idx === selected && idx !== currentQ.correct) {
              borderColor = 'border-danger';
              bgColor = 'bg-danger/10';
            }
          } else if (selected === idx) {
            borderColor = 'border-gold-500';
            bgColor = 'bg-gold-500/10';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left card flex items-center gap-3 transition-all ${borderColor} ${bgColor} ${showResult ? 'pointer-events-none' : 'hover:border-pm-400'}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                showResult && idx === currentQ.correct ? 'bg-success text-white' :
                showResult && idx === selected && idx !== currentQ.correct ? 'bg-danger text-white' :
                selected === idx ? 'bg-gold-500 text-pm-900' : 'bg-pm-700 text-gray-400'
              }`}>
                {showResult && idx === currentQ.correct ? '✓' : showResult && idx === selected && idx !== currentQ.correct ? '✗' : letter}
              </span>
              <span className="text-sm text-gray-300">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={`card border-l-4 ${selected === currentQ.correct ? 'border-success' : 'border-danger'} animate-fade-in`}>
          <div className="flex items-center gap-2 mb-2">
            {selected === currentQ.correct ? <CheckCircle2 size={18} className="text-success" /> : <XCircle size={18} className="text-danger" />}
            <span className={`text-sm font-bold ${selected === currentQ.correct ? 'text-success' : 'text-danger'}`}>
              {selected === currentQ.correct ? (profile.completedQuestions[currentQ.id]?.correct ? 'Correto! Já pontuada antes' : 'Correto! +15 XP') : 'Incorreto'}
            </span>
          </div>
          <p className="text-sm text-gray-400">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action */}
      {!showResult ? (
        <button onClick={handleConfirm} disabled={selected === null} className={`w-full py-3 rounded-xl font-bold text-base transition-all ${
          selected !== null ? 'btn-gold' : 'bg-pm-800 text-gray-600 cursor-not-allowed border border-pm-700'
        }`}>
          Confirmar Resposta
        </button>
      ) : (
        <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2">
          {currentIndex < shuffledQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
