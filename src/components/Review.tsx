import { useState, useMemo } from 'react';
import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import { theoryLessons } from '../data/theory';
import { useApp } from '../store';
import { ChevronLeft, RotateCcw, CheckCircle2, XCircle, ArrowRight, Layers, Zap } from 'lucide-react';

function shuffleItems<T>(list: T[]): T[] {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function Review({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, answerQuestion, addXP, markDailyMinimumDone, updateSpacedReview } = useApp();
  const [mode, setMode] = useState<'menu' | 'wrong' | 'flashcards' | 'quick'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjectFilteredQuestions = useMemo(() => {
    return selectedSubject
      ? questions.filter(q => q.subjectId === selectedSubject)
      : questions;
  }, [selectedSubject]);

  const wrongQs = useMemo(() => {
    return subjectFilteredQuestions.filter(q => profile.wrongQuestions.includes(q.id));
  }, [profile.wrongQuestions, subjectFilteredQuestions]);

  const flashcards = useMemo(() => {
    return theoryLessons.map(lesson => {
      const subject = subjects.find(s => s.id === lesson.subjectId);

      return {
        id: lesson.missionId,
        subjectId: lesson.subjectId,
        front: lesson.title,
        back: [
          `Macete: ${lesson.memoryHook}`,
          `Se cair na prova: ${lesson.finalReminder}`,
          `Pegadinha: ${lesson.traps[0] ?? 'Revise as pegadinhas da aula.'}`,
        ].join('\n\n'),
        subjectName: subject?.name ?? 'Matéria',
        subjectIcon: subject?.icon ?? '🧠',
      };
    });
  }, []);

  const todayIso = new Date().toISOString().slice(0, 10);

  const dueFlashcards = useMemo(() => {
    return flashcards.filter(card => {
      if (selectedSubject && card.subjectId !== selectedSubject) return false;

      const review = profile.spacedRepetition?.[card.id];
      return !review || review.nextReview <= todayIso;
    });
  }, [flashcards, profile.spacedRepetition, selectedSubject, todayIso]);

  const totalFlashcardsInScope = useMemo(() => {
    return selectedSubject
      ? flashcards.filter(card => card.subjectId === selectedSubject).length
      : flashcards.length;
  }, [flashcards, selectedSubject]);

  const quickQs = useMemo(() => shuffleItems(subjectFilteredQuestions).slice(0, 5), [subjectFilteredQuestions]);

  const currentCard = dueFlashcards[currentIndex];
  const currentWrongQ = wrongQs[currentIndex];
  const currentQuickQ = quickQs[currentIndex];

  const resetSession = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelected(null);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSessionXp(0);
  };

  const startMode = (nextMode: 'wrong' | 'flashcards' | 'quick') => {
    resetSession();
    setMode(nextMode);
  };

  const backToMenu = () => {
    resetSession();
    setMode('menu');
  };

  const handleReviewedQuestion = (questionId: string, selectedAnswer: number, correctAnswer: number) => {
    const correct = selectedAnswer === correctAnswer;
    const previousAnswer = profile.completedQuestions[questionId];
    const wasWrongBefore = profile.wrongQuestions.includes(questionId);
    const shouldAwardXp = correct && (!previousAnswer?.correct || wasWrongBefore);

    answerQuestion(questionId, selectedAnswer, correct);

    if (correct) setSessionCorrect(s => s + 1);

    if (shouldAwardXp) {
      const xp = wasWrongBefore ? 20 : 10;
      addXP(xp);
      setSessionXp(x => x + xp);
    }

    setSessionTotal(s => s + 1);
    setShowAnswer(true);
  };

  const handleFlashcardResult = (remembered: boolean) => {
    if (currentCard) {
      updateSpacedReview(currentCard.id, 'flashcard', remembered);
      if (remembered) addXP(5);
    }

    markDailyMinimumDone();
    setCurrentIndex(i => i + 1);
    setShowAnswer(false);
  };

  const renderQuestionReview = (question: typeof questions[number], total: number, title: string) => {
    return (
      <div className="quiz-shell animate-fade-in">
        <div className="quiz-topline">
          <button onClick={backToMenu} className="study-back !mb-0">
            <ChevronLeft size={16} /> Menu de revisão
          </button>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-bold text-slate-400">
            {currentIndex + 1}/{total}
          </div>
        </div>

        <p className="section-label mb-3">{title}</p>

        <div className="quiz-card">
          <p className="quiz-question">{question.text}</p>
        </div>

        <div className="option-list">
          {question.options.map((opt, idx) => {
            const letter = 'ABCDE'[idx];
            const isCorrect = idx === question.correct;
            const isWrongSelection = showAnswer && selected === idx && !isCorrect;

            const stateClass =
              showAnswer && isCorrect ? 'option-card-correct' :
              isWrongSelection ? 'option-card-wrong' :
              selected === idx ? 'option-card-selected' :
              '';

            return (
              <button
                key={idx}
                onClick={() => { if (!showAnswer) setSelected(idx); }}
                className={`option-card ${stateClass} ${showAnswer ? 'pointer-events-none' : ''}`}
              >
                <span className="option-letter">
                  {showAnswer && isCorrect ? '✓' : isWrongSelection ? '✕' : letter}
                </span>
                <span className="option-text">{opt}</span>
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className={`quiz-explanation animate-fade-in ${
            selected === question.correct
              ? 'border border-success/30 bg-success/10'
              : 'border border-danger/30 bg-danger/10'
          }`}>
            <div className="mb-2 flex items-center gap-2">
              {selected === question.correct ? (
                <CheckCircle2 size={20} className="text-success" />
              ) : (
                <XCircle size={20} className="text-danger" />
              )}

              <span className={`font-black ${selected === question.correct ? 'text-success' : 'text-danger'}`}>
                {selected === question.correct ? 'Correto' : 'Incorreto'}
              </span>
            </div>

            <p className="text-base leading-relaxed text-slate-300">{question.explanation}</p>
          </div>
        )}

        <div className="mt-5">
          {!showAnswer ? (
            <button
              onClick={() => {
                if (selected !== null) handleReviewedQuestion(question.id, selected, question.correct);
              }}
              disabled={selected === null}
              className={`w-full py-4 text-base ${selected !== null ? 'btn-gold' : 'cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] font-bold text-slate-600'}`}
            >
              Confirmar resposta
            </button>
          ) : (
            <button
              onClick={() => { setCurrentIndex(i => i + 1); setSelected(null); setShowAnswer(false); }}
              className="btn-primary w-full py-4 text-base"
            >
              Próxima <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (mode === 'menu') {
    return (
      <div className="review-shell">
        <button onClick={() => onNavigate('dashboard')} className="study-back">
          <ChevronLeft size={16} /> Início
        </button>

        <div className="mb-6">
          <p className="section-label mb-2">Memória e correção</p>
          <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Revisão</h1>
          <p className="study-subtitle mt-2">
            Revise com calma: corrija erros, use flashcards e faça uma rodada rápida quando tiver pouco tempo.
          </p>
        </div>

        <div className="study-card mb-5">
          <p className="study-kicker">Filtro opcional</p>
          <h2 className="mt-1 text-xl font-black text-white">Matéria da revisão</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Use quando quiser atacar uma matéria específica. Deixe em todas para revisão geral.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => { resetSession(); setSelectedSubject(''); }}
              className={`rounded-full border px-3 py-2 text-sm font-bold transition ${
                !selectedSubject
                  ? 'border-gold-500/30 bg-gold-500/10 text-gold-400'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20'
              }`}
            >
              Todas
            </button>

            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => { resetSession(); setSelectedSubject(subject.id); }}
                className={`rounded-full border px-3 py-2 text-sm font-bold transition ${
                  selectedSubject === subject.id
                    ? 'border-gold-500/30 bg-gold-500/10 text-gold-400'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20'
                }`}
              >
                {subject.icon} {subject.name}
              </button>
            ))}
          </div>
        </div>

        <div className="review-menu-grid">
          <button onClick={() => startMode('wrong')} className="review-choice-card">
            <XCircle size={30} className="mb-4 text-danger" />
            <h3 className="text-xl font-black text-white">Questões erradas</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {wrongQs.length} questões para revisar com explicação{selectedSubject ? ' nessa matéria.' : '.'}
            </p>
          </button>

          <button onClick={() => startMode('flashcards')} className="review-choice-card">
            <Layers size={30} className="mb-4 text-pm-300" />
            <h3 className="text-xl font-black text-white">Flashcards</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {dueFlashcards.length} cartões para revisar hoje • {totalFlashcardsInScope} no total{selectedSubject ? ' nessa matéria.' : '.'}
            </p>
          </button>

          <button onClick={() => startMode('quick')} className="review-choice-card">
            <RotateCcw size={30} className="mb-4 text-gold-400" />
            <h3 className="text-xl font-black text-white">Revisão rápida</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">5 questões aleatórias para manter o cérebro aquecido.</p>
          </button>
        </div>

        <div className="study-card mt-5">
          <h3 className="study-kicker">Programação de revisão</h3>
          <div className="study-body">
            <p><strong>24h:</strong> revise o que estudou ontem.</p>
            <p><strong>7 dias:</strong> revise o conteúdo da semana passada.</p>
            <p><strong>30 dias:</strong> revise o que já está começando a sumir da memória.</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'wrong') {
    if (wrongQs.length === 0) {
      return (
        <div className="review-shell text-center">
          <div className="study-card">
            <CheckCircle2 size={52} className="mx-auto mb-4 text-success" />
            <h2 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Nenhuma questão errada</h2>
            <p className="study-subtitle mx-auto mt-2">Parabéns. Continue treinando para manter o desempenho.</p>
            <button onClick={backToMenu} className="btn-primary mt-6">Voltar</button>
          </div>
        </div>
      );
    }

    if (currentIndex >= wrongQs.length || !currentWrongQ) {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

      return (
        <div className="result-shell text-center animate-slide-up">
          <div className="result-card">
            <h2 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Revisão concluída</h2>
            <p className="mt-3 text-lg text-slate-300">
              {sessionCorrect}/{sessionTotal} acertos ({pct}%)
            </p>
            <p className="mt-1 text-sm text-pm-300">+{sessionXp} XP por correções reais</p>
            <button onClick={backToMenu} className="btn-primary mt-6">Voltar ao menu</button>
          </div>
        </div>
      );
    }

    return renderQuestionReview(currentWrongQ, wrongQs.length, 'Questões erradas');
  }

  if (mode === 'flashcards') {
    if (currentIndex >= dueFlashcards.length || !currentCard) {
      return (
        <div className="flashcard-shell text-center">
          <div className="study-card">
            <h2 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Nenhum flashcard pendente</h2>
            <p className="study-subtitle mx-auto mt-2">Você concluiu os flashcards vencidos hoje. Os próximos voltarão na data certa.</p>
            <button onClick={backToMenu} className="btn-primary mt-6">Voltar</button>
          </div>
        </div>
      );
    }

    return (
      <div className="flashcard-shell animate-fade-in">
        <button onClick={backToMenu} className="study-back">
          <ChevronLeft size={16} /> Menu
        </button>

        <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
          <span>{currentCard.subjectIcon} {currentCard.subjectName}</span>
          <span>{currentIndex + 1}/{dueFlashcards.length}</span>
        </div>

        <div className="xp-bar-wrap mb-5">
          <div className="xp-bar-fill" style={{ width: `${((currentIndex + 1) / Math.max(1, dueFlashcards.length)) * 100}%` }} />
        </div>

        <div className="flashcard-card" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? (
            <>
              <p className="flashcard-label text-gold-400">Resposta — toque para voltar</p>
              <p className="flashcard-back">{currentCard.back}</p>
            </>
          ) : (
            <>
              <p className="flashcard-label">Pergunta — toque para revelar</p>
              <p className="flashcard-front">{currentCard.front}</p>
            </>
          )}
        </div>

        <div className="flashcard-actions">
          <button onClick={() => handleFlashcardResult(false)} className="btn-ghost py-4 text-base text-danger">
            Não lembrei
          </button>
          <button onClick={() => handleFlashcardResult(true)} className="btn-primary py-4 text-base">
            Lembrei
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'quick') {
    if (!currentQuickQ || currentIndex >= quickQs.length) {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

      return (
        <div className="result-shell text-center animate-slide-up">
          <div className="result-card">
            <h2 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Revisão rápida concluída</h2>
            <p className="mt-3 text-lg text-slate-300">
              {sessionCorrect}/{sessionTotal} acertos ({pct}%)
            </p>
            <p className="mt-1 text-sm text-pm-300">+{sessionXp} XP ganhos nesta revisão</p>
            <button onClick={backToMenu} className="btn-primary mt-6">Voltar</button>
          </div>
        </div>
      );
    }

    return renderQuestionReview(currentQuickQ, quickQs.length, 'Revisão rápida');
  }

  return null;
}
