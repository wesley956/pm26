import { useState, useEffect, useCallback } from 'react';
import { AppProvider, useApp } from './store';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { SubjectList, SubjectDetail, MissionView } from './components/SubjectPage';
import Questions from './components/Questions';
import Essay from './components/Essay';
import TAF from './components/TAF';
import Review from './components/Review';
import Simulado from './components/Simulado';
import Profile from './components/Profile';
import StudyPlan from './components/StudyPlan';
import { Timer, X, Play, Pause, RotateCcw } from 'lucide-react';

function AppContent() {
  const { addXP, updateStreak } = useApp();
  const [page, setPage] = useState('dashboard');
  const [pageData, setPageData] = useState<any>({});
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 min in seconds
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroSessions, setPomodoroSessions] = useState(0);

  // Pomodoro timer effect
  useEffect(() => {
    if (!pomodoroRunning || pomodoroTime <= 0) return;
    const interval = setInterval(() => {
      setPomodoroTime(prev => {
        if (prev <= 1) {
          setPomodoroRunning(false);
          setPomodoroSessions(s => s + 1);
          addXP(25); // XP for completing a pomodoro
          updateStreak();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pomodoroRunning, pomodoroTime, addXP, updateStreak]);

  const navigate = useCallback((tab: string, data?: any) => {
    setPage(tab);
    setPageData(data || {});
    window.scrollTo(0, 0);
  }, []);

  // Determine active tab for bottom nav
  const getActiveTab = () => {
    if (['dashboard', 'studyplan', 'essay', 'taf', 'mission'].includes(page)) return 'dashboard';
    if (['subjects', 'subject', 'questions'].includes(page)) return 'subjects';
    if (page === 'simulados') return 'simulados';
    if (page === 'review') return 'review';
    if (page === 'profile') return 'profile';
    return 'dashboard';
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'subjects':
        return <SubjectList onNavigate={navigate} />;
      case 'subject':
        return <SubjectDetail subjectId={pageData.subjectId} onNavigate={navigate} />;
      case 'mission':
        return <MissionView missionId={pageData.missionId} subjectId={pageData.subjectId} onNavigate={navigate} />;
      case 'questions':
        return <Questions subjectId={pageData.subjectId} topic={pageData.topic} onNavigate={navigate} />;
      case 'essay':
        return <Essay onNavigate={navigate} />;
      case 'taf':
        return <TAF onNavigate={navigate} />;
      case 'review':
        return <Review initialSubjectId={pageData.subjectId} onNavigate={navigate} />;
      case 'simulados':
        return <Simulado onNavigate={navigate} />;
      case 'profile':
        return <Profile onNavigate={navigate} />;
      case 'studyplan':
        return <StudyPlan onNavigate={navigate} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <Layout activeTab={getActiveTab()} onNavigate={navigate}>
      {renderPage()}

      {/* Focus Pomodoro */}
      <button
        onClick={() => setShowPomodoro(!showPomodoro)}
        className="focus-fab"
        title="Modo foco"
        aria-label="Abrir Pomodoro"
      >
        <Timer size={22} />
      </button>

      {showPomodoro && (
        <div className="focus-modal-backdrop animate-fade-in" onClick={() => setShowPomodoro(false)}>
          <div className="focus-modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="study-kicker gold !mb-1">Modo foco</p>
                <h3 className="text-2xl font-black text-white">Pomodoro de estudo</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  Use para fazer uma aula, uma rodada de questões ou uma revisão sem se perder.
                </p>
              </div>

              <button
                onClick={() => setShowPomodoro(false)}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-slate-400 hover:text-white"
                aria-label="Fechar Pomodoro"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 text-center">
              <p className={`focus-clock ${pomodoroTime === 0 ? 'focus-clock-done animate-count-up' : ''}`}>
                {pomodoroTime === 0 ? '✓' : formatTime(pomodoroTime)}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {pomodoroTime === 0
                  ? 'Foco concluído. Você ganhou +25 XP.'
                  : pomodoroRunning
                    ? 'Foco ativo. Só continue até o relógio zerar.'
                    : 'Escolha o tempo e aperte play quando estiver pronto.'}
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setPomodoroRunning(!pomodoroRunning)}
                className="focus-control focus-control-main"
                aria-label={pomodoroRunning ? 'Pausar' : 'Iniciar'}
              >
                {pomodoroRunning ? <Pause size={25} /> : <Play size={25} />}
              </button>

              <button
                onClick={() => { setPomodoroTime(25 * 60); setPomodoroRunning(false); }}
                className="focus-control"
                aria-label="Resetar Pomodoro"
              >
                <RotateCcw size={23} />
              </button>
            </div>

            <div className="mt-5 text-center text-sm text-slate-500">
              Sessões concluídas nesta abertura: <span className="font-black text-gold-400">{pomodoroSessions}</span>
            </div>

            <div className="focus-preset-grid mt-5">
              <button
                onClick={() => { setPomodoroTime(5 * 60); setPomodoroRunning(false); }}
                className={`focus-preset ${pomodoroTime === 5 * 60 ? 'focus-preset-active' : ''}`}
              >
                5 min<br />pausa
              </button>

              <button
                onClick={() => { setPomodoroTime(10 * 60); setPomodoroRunning(false); }}
                className={`focus-preset ${pomodoroTime === 10 * 60 ? 'focus-preset-active' : ''}`}
              >
                10 min<br />foco rápido
              </button>

              <button
                onClick={() => { setPomodoroTime(15 * 60); setPomodoroRunning(false); }}
                className={`focus-preset ${pomodoroTime === 15 * 60 ? 'focus-preset-active' : ''}`}
              >
                15 min<br />pausa longa
              </button>

              <button
                onClick={() => { setPomodoroTime(25 * 60); setPomodoroRunning(false); }}
                className={`focus-preset ${pomodoroTime === 25 * 60 ? 'focus-preset-active' : ''}`}
              >
                25 min<br />foco
              </button>

              <button
                onClick={() => { setPomodoroTime(40 * 60); setPomodoroRunning(false); }}
                className={`focus-preset ${pomodoroTime === 40 * 60 ? 'focus-preset-active' : ''}`}
              >
                40 min<br />bloco forte
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
