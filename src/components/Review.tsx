import { useState, useMemo } from 'react';
import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import { useApp } from '../store';
import { ChevronLeft, RotateCcw, CheckCircle2, XCircle, ArrowRight, Layers } from 'lucide-react';

export default function Review({ onNavigate: _nav }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile } = useApp();
  const [mode, setMode] = useState<'menu' | 'wrong' | 'flashcards' | 'quick'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  // Wrong questions
  const wrongQs = useMemo(() => {
    return questions.filter(q => profile.wrongQuestions.includes(q.id));
  }, [profile.wrongQuestions]);

  // Flashcard-style review: key facts from missions
  const flashcards = useMemo(() => {
    return subjects.flatMap(s => s.missions.map(m => ({
      id: m.id,
      subjectId: m.subjectId,
      front: m.title,
      back: m.content,
      subjectName: s.name,
      subjectIcon: s.icon,
    })));
  }, []);

  const currentCard = flashcards[currentIndex];
  const currentWrongQ = wrongQs[currentIndex];

  if (mode === 'menu') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">🔄 Revisão</h1>
        <p className="text-sm text-gray-400">Revise o que você já aprendeu e corrija erros.</p>

        <div className="grid grid-cols-1 gap-3">
          <button onClick={() => { setMode('wrong'); setCurrentIndex(0); }} className="card text-left hover:border-pm-400 flex items-center gap-3">
            <XCircle size={24} className="text-danger shrink-0" />
            <div>
              <h3 className="text-sm font-bold">Questões Erradas</h3>
              <p className="text-xs text-gray-500">{wrongQs.length} questões para revisar</p>
            </div>
          </button>

          <button onClick={() => { setMode('flashcards'); setCurrentIndex(0); }} className="card text-left hover:border-pm-400 flex items-center gap-3">
            <Layers size={24} className="text-pm-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold">Flashcards</h3>
              <p className="text-xs text-gray-500">{flashcards.length} cards para revisar</p>
            </div>
          </button>

          <button onClick={() => { setMode('quick'); setCurrentIndex(0); }} className="card text-left hover:border-pm-400 flex items-center gap-3">
            <RotateCcw size={24} className="text-gold-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold">Revisão Rápida (10 min)</h3>
              <p className="text-xs text-gray-500">5 questões aleatórias para não enferrujar</p>
            </div>
          </button>
        </div>

        {/* Study reminders */}
        <div className="card border-l-4 border-pm-500">
          <h3 className="text-xs font-bold text-pm-300 mb-2">📅 PROGRAMAÇÃO DE REVISÃO</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <p>• <strong className="text-white">24h:</strong> Revise o que estudou ontem</p>
            <p>• <strong className="text-white">7 dias:</strong> Revise o que estudou na semana passada</p>
            <p>• <strong className="text-white">30 dias:</strong> Revise o que estudou no mês passado</p>
          </div>
        </div>
      </div>
    );
  }

  // Wrong questions mode
  if (mode === 'wrong') {
    if (wrongQs.length === 0) {
      return (
        <div className="space-y-4 text-center">
          <CheckCircle2 size={48} className="text-success mx-auto" />
          <h2 className="text-xl font-bold">Nenhuma questão errada!</h2>
          <p className="text-sm text-gray-400">Parabéns! Continue assim.</p>
          <button onClick={() => setMode('menu')} className="btn-primary">Voltar</button>
        </div>
      );
    }
    if (currentIndex >= wrongQs.length) {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
      return (
        <div className="space-y-4 text-center animate-slide-up">
          <div className="text-4xl">{pct >= 70 ? '🎉' : '💪'}</div>
          <h2 className="text-xl font-bold">Revisão concluída!</h2>
          <p className="text-sm text-gold-400">{sessionCorrect}/{sessionTotal} acertos ({pct}%)</p>
          <button onClick={() => setMode('menu')} className="btn-primary">Voltar ao Menu</button>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={() => setMode('menu')} className="text-sm text-pm-300 flex items-center gap-1">
          <ChevronLeft size={16} /> Menu de Revisão
        </button>
        <div className="text-xs text-gray-500">{currentIndex + 1}/{wrongQs.length} — Questões Erradas</div>
        <div className="card">
          <p className="text-sm text-gray-200 leading-relaxed">{currentWrongQ.text}</p>
        </div>
        <div className="space-y-2">
          {currentWrongQ.options.map((opt, idx) => {
            const letter = 'ABCDE'[idx];
            const isCorrect = idx === currentWrongQ.correct;
            const isSelected = selected === idx;
            return (
              <button key={idx} onClick={() => { if (!showAnswer) setSelected(idx); }} className={`w-full text-left card flex items-center gap-3 transition-all ${
                showAnswer && isCorrect ? 'border-success bg-success/10' :
                showAnswer && isSelected && !isCorrect ? 'border-danger bg-danger/10' :
                isSelected && !showAnswer ? 'border-gold-500' : ''
              }`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  showAnswer && isCorrect ? 'bg-success text-white' :
                  showAnswer && isSelected ? 'bg-danger text-white' :
                  isSelected ? 'bg-gold-500 text-pm-900' : 'bg-pm-700 text-gray-400'
                }`}>{letter}</span>
                <span className="text-sm text-gray-300">{opt}</span>
              </button>
            );
          })}
        </div>
        {showAnswer && (
          <div className="card border-l-4 border-pm-500 animate-fade-in">
            <p className="text-xs font-bold text-pm-300 mb-1">EXPLICAÇÃO:</p>
            <p className="text-sm text-gray-400">{currentWrongQ.explanation}</p>
          </div>
        )}
        {!showAnswer ? (
          <button onClick={() => { if (selected !== null) { setShowAnswer(true); const correct = selected === currentWrongQ.correct; if (correct) setSessionCorrect(s => s + 1); setSessionTotal(s => s + 1); } }} disabled={selected === null} className={`w-full py-3 rounded-xl font-bold ${selected !== null ? 'btn-gold' : 'bg-pm-800 text-gray-600 cursor-not-allowed'}`}>
            Confirmar
          </button>
        ) : (
          <button onClick={() => { setCurrentIndex(i => i + 1); setSelected(null); setShowAnswer(false); }} className="btn-primary w-full flex items-center justify-center gap-2">
            Próxima <ArrowRight size={16} />
          </button>
        )}
      </div>
    );
  }

  // Flashcards mode
  if (mode === 'flashcards') {
    if (currentIndex >= flashcards.length) {
      return (
        <div className="space-y-4 text-center">
          <div className="text-4xl">🎉</div>
          <h2 className="text-xl font-bold">Todos os cards revisados!</h2>
          <button onClick={() => setMode('menu')} className="btn-primary">Voltar</button>
        </div>
      );
    }
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={() => setMode('menu')} className="text-sm text-pm-300 flex items-center gap-1">
          <ChevronLeft size={16} /> Menu
        </button>
        <div className="text-xs text-gray-500">{currentIndex + 1}/{flashcards.length}</div>
        <div className="progress-bar">
          <div className="progress-bar-fill bg-gradient-to-r from-pm-500 to-gold-500" style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }} />
        </div>
        <div className="text-xs text-gray-500">{currentCard.subjectIcon} {currentCard.subjectName}</div>
        <div className={`card min-h-[200px] flex flex-col items-center justify-center text-center cursor-pointer transition-all ${showAnswer ? 'border-gold-500/50' : ''}`} onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? (
            <>
              <p className="text-[10px] text-gold-400 mb-2">RESPOSTA (toque para ver a pergunta)</p>
              <p className="text-sm text-gray-300 leading-relaxed">{currentCard.back}</p>
            </>
          ) : (
            <>
              <p className="text-[10px] text-pm-300 mb-2">PERGUNTA (toque para ver a resposta)</p>
              <p className="text-lg font-bold text-white">{currentCard.front}</p>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setCurrentIndex(i => i + 1); setShowAnswer(false); }} className="card text-center py-3 text-sm text-danger hover:border-danger">
            Preciso rever
          </button>
          <button onClick={() => { setCurrentIndex(i => i + 1); setShowAnswer(false); }} className="card text-center py-3 text-sm text-success hover:border-success">
            Já sei! ✓
          </button>
        </div>
      </div>
    );
  }

  // Quick review mode (5 random questions)
  if (mode === 'quick') {
    const quickQs = useMemo(() => [...questions].sort(() => Math.random() - 0.5).slice(0, 5), []);
    const q = quickQs[currentIndex];
    if (!q || currentIndex >= quickQs.length) {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
      return (
        <div className="space-y-4 text-center animate-slide-up">
          <div className="text-4xl">{pct >= 60 ? '🎉' : '📚'}</div>
          <h2 className="text-xl font-bold">Revisão rápida concluída!</h2>
          <p className="text-sm text-gold-400">{sessionCorrect}/{sessionTotal} acertos ({pct}%)</p>
          <button onClick={() => setMode('menu')} className="btn-primary">Voltar</button>
        </div>
      );
    }
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={() => setMode('menu')} className="text-sm text-pm-300 flex items-center gap-1">
          <ChevronLeft size={16} /> Menu
        </button>
        <div className="text-xs text-gray-500">Revisão Rápida — {currentIndex + 1}/{quickQs.length}</div>
        <div className="card"><p className="text-sm text-gray-200">{q.text}</p></div>
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            const letter = 'ABCDE'[idx];
            const isCorrect = idx === q.correct;
            const isSelected = selected === idx;
            return (
              <button key={idx} onClick={() => { if (!showAnswer) setSelected(idx); }} className={`w-full text-left card flex items-center gap-3 ${
                showAnswer && isCorrect ? 'border-success bg-success/10' :
                showAnswer && isSelected && !isCorrect ? 'border-danger bg-danger/10' :
                isSelected && !showAnswer ? 'border-gold-500' : ''
              }`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  showAnswer && isCorrect ? 'bg-success text-white' :
                  showAnswer && isSelected ? 'bg-danger text-white' :
                  isSelected ? 'bg-gold-500 text-pm-900' : 'bg-pm-700 text-gray-400'
                }`}>{letter}</span>
                <span className="text-sm text-gray-300">{opt}</span>
              </button>
            );
          })}
        </div>
        {showAnswer && (
          <div className="card border-l-4 border-pm-500">
            <p className="text-sm text-gray-400">{q.explanation}</p>
          </div>
        )}
        {!showAnswer ? (
          <button onClick={() => { if (selected !== null) { setShowAnswer(true); if (selected === q.correct) setSessionCorrect(s => s + 1); setSessionTotal(s => s + 1); } }} disabled={selected === null} className={`w-full py-3 rounded-xl font-bold ${selected !== null ? 'btn-gold' : 'bg-pm-800 text-gray-600 cursor-not-allowed'}`}>
            Confirmar
          </button>
        ) : (
          <button onClick={() => { setCurrentIndex(i => i + 1); setSelected(null); setShowAnswer(false); }} className="btn-primary w-full">Próxima</button>
        )}
      </div>
    );
  }

  return null;
}
