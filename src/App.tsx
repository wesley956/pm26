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
        return <Review onNavigate={navigate} />;
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

      {/* Pomodoro FAB */}
      <button
        onClick={() => setShowPomodoro(!showPomodoro)}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-pm-700 border border-pm-500 flex items-center justify-center text-gold-400 shadow-lg hover:scale-110 transition-transform"
        title="Pomodoro Timer"
      >
        <Timer size={20} />
      </button>

      {/* Pomodoro Modal */}
      {showPomodoro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" onClick={() => setShowPomodoro(false)}>
          <div className="bg-pm-800 border border-pm-600 rounded-2xl p-6 mx-4 max-w-sm w-full animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-[Rajdhani,sans-serif] text-gold-400">🍅 Pomodoro</h3>
              <button onClick={() => setShowPomodoro(false)}><X size={20} className="text-gray-400" /></button>
            </div>

            <div className="text-center">
              <p className={`text-6xl font-bold font-mono ${pomodoroTime === 0 ? 'text-gold-400 animate-count-up' : 'text-white'}`}>
                {pomodoroTime === 0 ? '🎉' : formatTime(pomodoroTime)}
              </p>
              {pomodoroTime === 0 && <p className="text-sm text-gray-400 mt-2">Pomodoro completo! +25 XP</p>}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setPomodoroRunning(!pomodoroRunning)}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-pm-600 text-white hover:bg-pm-500 transition-colors"
              >
                {pomodoroRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={() => { setPomodoroTime(25 * 60); setPomodoroRunning(false); }}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-pm-700 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw size={24} />
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">
              Sessões hoje: {pomodoroSessions}
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={() => { setPomodoroTime(5 * 60); setPomodoroRunning(false); }} className="flex-1 text-xs bg-pm-700 text-gray-400 py-2 rounded-lg hover:text-white">
                5 min (pausa)
              </button>
              <button onClick={() => { setPomodoroTime(15 * 60); setPomodoroRunning(false); }} className="flex-1 text-xs bg-pm-700 text-gray-400 py-2 rounded-lg hover:text-white">
                15 min (pausa longa)
              </button>
              <button onClick={() => { setPomodoroTime(25 * 60); setPomodoroRunning(false); }} className="flex-1 text-xs bg-gold-500/20 text-gold-400 py-2 rounded-lg hover:bg-gold-500/30">
                25 min (foco)
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
