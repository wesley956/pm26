import { useState, useMemo } from 'react';
import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import { useApp } from '../store';
import { ChevronLeft, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Props {
  subjectId?: string;
  topic?: string;
  onNavigate: (tab: string, data?: any) => void;
}

function shuffleQuestions<T>(list: T[]): T[] {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function Questions({ subjectId, topic, onNavigate }: Props) {
  const { profile, answerQuestion, addXP } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(subjectId || '');
  const [selectedTopic, setSelectedTopic] = useState(() => {
    if (topic) return topic;

    try {
      const stored = sessionStorage.getItem('pm-sp-topic-filter');
      if (!stored) return '';

      const parsed = JSON.parse(stored) as { subjectId?: string; topic?: string };
      if (subjectId && parsed.subjectId !== subjectId) return '';

      return parsed.topic ?? '';
    } catch {
      return '';
    }
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);

  const filteredQuestions = useMemo(() => {
    let list = selectedSubject
      ? questions.filter(q => q.subjectId === selectedSubject)
      : questions;

    if (selectedTopic && selectedTopic !== '__all__') {
      list = list.filter(q => q.topic === selectedTopic);
    }

    return list;
  }, [selectedSubject, selectedTopic]);

  const topicOptions = useMemo(() => {
    if (!selectedSubject) return [];

    return Array.from(
      new Set(
        questions
          .filter(q => q.subjectId === selectedSubject)
          .map(q => q.topic)
      )
    ).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [selectedSubject]);

  const shuffledQuestions = useMemo(() => {
    return shuffleQuestions(filteredQuestions).slice(0, 10);
  }, [filteredQuestions, selectedSubject, selectedTopic]);

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

    if (correct) setSessionCorrect(prev => prev + 1);

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
    setSelectedSubject('');
    setSelectedTopic('');
    sessionStorage.removeItem('pm-sp-topic-filter');
    setTimeout(() => setSelectedSubject(subjectId || ''), 0);
  };

  if (!selectedSubject && !subjectId) {
    return (
      <div className="study-wide">
        <div className="mb-6">
          <p className="section-label mb-2">Treino de questões</p>
          <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Escolha uma matéria</h1>
          <p className="study-subtitle mt-2">
            Treine com calma. Uma questão por vez, com alternativas maiores e explicação clara.
          </p>
        </div>

        <div className="page-grid subject-grid">
          {subjects.map(sub => {
            const qCount = questions.filter(q => q.subjectId === sub.id).length;
            const prefix = sub.id === 'portugues' ? 'pt' : sub.id === 'matematica' ? 'mt' : sub.id === 'gerais' ? 'cg' : sub.id === 'informatica' ? 'inf' : 'ap';
            const answered = Object.keys(profile.completedQuestions).filter(id => id.startsWith(prefix)).length;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className="study-card text-left transition hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl">
                    {sub.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-white">{sub.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{qCount} questões • {answered} respondidas</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (selectedSubject && !subjectId && !selectedTopic) {
    const selectedSubjectMeta = subjects.find(s => s.id === selectedSubject);
    const totalSubjectQuestions = questions.filter(q => q.subjectId === selectedSubject).length;

    return (
      <div className="study-wide">
        <button
          onClick={() => {
            setSelectedSubject('');
            setSelectedTopic('');
            sessionStorage.removeItem('pm-sp-topic-filter');
          }}
          className="study-back"
        >
          <ChevronLeft size={16} /> Escolher matéria
        </button>

        <div className="mb-6">
          <p className="section-label mb-2">Treino por tópico</p>
          <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">
            {selectedSubjectMeta?.icon} {selectedSubjectMeta?.name}
          </h1>
          <p className="study-subtitle mt-2">
            Escolha um ponto específico para atacar ou misture todos os tópicos dessa matéria.
          </p>
        </div>

        <div className="mb-4">
          <button
            onClick={() => {
              setSelectedTopic('__all__');
              setCurrentIndex(0);
              setSelected(null);
              setShowResult(false);
              setSessionCorrect(0);
              setSessionTotal(0);
              setSessionXp(0);
            }}
            className="study-card w-full text-left transition hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Misturar todos os tópicos</h3>
                <p className="mt-1 text-sm text-slate-400">{totalSubjectQuestions} questões disponíveis nessa matéria</p>
              </div>
              <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-xs font-bold text-gold-400">
                recomendado
              </span>
            </div>
          </button>
        </div>

        <div className="page-grid subject-grid">
          {topicOptions.map(topicName => {
            const topicQuestions = questions.filter(q => q.subjectId === selectedSubject && q.topic === topicName);
            const answered = topicQuestions.filter(q => profile.completedQuestions[q.id]).length;

            return (
              <button
                key={topicName}
                onClick={() => {
                  setSelectedTopic(topicName);
                  setCurrentIndex(0);
                  setSelected(null);
                  setShowResult(false);
                  setSessionCorrect(0);
                  setSessionTotal(0);
                  setSessionXp(0);
                }}
                className="study-card text-left transition hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-black text-white">{topicName}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {topicQuestions.length} questões • {answered} respondidas
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (isFinished || !currentQ) {
    const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

    return (
      <div className="quiz-shell text-center animate-slide-up">
        <div className="study-card">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl">
            {pct >= 70 ? '🏆' : pct >= 50 ? '📈' : '📚'}
          </div>

          <h2 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">
            {pct >= 70 ? 'Excelente!' : pct >= 50 ? 'Bom trabalho!' : 'Continue treinando'}
          </h2>

          <p className="mt-3 text-lg text-slate-300">
            Você acertou <strong className="text-gold-400">{sessionCorrect}/{sessionTotal}</strong> questões.
          </p>

          <p className="mt-1 text-sm text-pm-300">+{sessionXp} XP ganhos nesta sessão</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button onClick={handleRestart} className="btn-gold w-full">
              <RotateCcw size={16} /> Tentar novamente
            </button>
            <button onClick={() => {
              setSelectedSubject('');
              setSelectedTopic('');
              sessionStorage.removeItem('pm-sp-topic-filter');
              setCurrentIndex(0);
            }} className="btn-primary w-full">
              Outra matéria
            </button>
            <button onClick={() => onNavigate('dashboard')} className="btn-ghost w-full">
              Voltar ao início
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subject = subjects.find(s => s.id === currentQ.subjectId);
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="quiz-shell animate-fade-in">
      <div className="quiz-topline">
        <button
          onClick={() => {
            setSelectedSubject('');
            setSelectedTopic('');
            sessionStorage.removeItem('pm-sp-topic-filter');
            setCurrentIndex(0);
            setSessionCorrect(0);
            setSessionTotal(0);
            setSessionXp(0);
          }}
          className="study-back !mb-0"
        >
          <ChevronLeft size={16} /> Voltar
        </button>

        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-bold text-slate-400">
          {currentIndex + 1}/{shuffledQuestions.length}
        </div>
      </div>

      <div className="xp-bar-wrap mb-5">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-pm-300">
        {subject?.icon} {subject?.name} — {currentQ.topic}
      </div>

      {selectedTopic && selectedTopic !== '__all__' && (
        <div className="topic-training-banner">
          <p className="text-sm">
            Treino focado em <strong className="text-gold-400">{selectedTopic}</strong>. Responda com calma e leia a explicação.
          </p>
        </div>
      )}

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
              onClick={() => handleSelect(idx)}
              className={`option-card ${stateClass} ${showResult ? 'pointer-events-none' : ''}`}
            >
              <span className="option-letter">
                {showResult && isCorrect ? '✓' : isWrongSelection ? '✕' : letter}
              </span>
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
              <XCircle size={20} className="text-danger" />
            )}

            <span className={`font-black ${selected === currentQ.correct ? 'text-success' : 'text-danger'}`}>
              {selected === currentQ.correct
                ? (profile.completedQuestions[currentQ.id]?.correct ? 'Correto — já pontuada antes' : 'Correto — +15 XP')
                : 'Incorreto'}
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
            {currentIndex < shuffledQuestions.length - 1 ? 'Próxima questão' : 'Ver resultado'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
