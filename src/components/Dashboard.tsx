import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { getPrimaryDeadlineInfo, getSubjectProgress } from '../utils';
import { chooseSmartStudyAction } from '../utils/smartStudy';
import { Play, Flame, Calendar, Target, Zap, ChevronRight, Timer, AlertTriangle } from 'lucide-react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, updateStreak, setBadDayMode } = useApp();
  const deadline = getPrimaryDeadlineInfo();
  const smartAction = chooseSmartStudyAction(profile);

  // Stats
  const completedCount = profile.completedMissions.length;
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Check if studied today
  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = profile.lastStudyDate === today;

  const navigateToAction = (useBadDayMode = false) => {
    const action = useBadDayMode
      ? chooseSmartStudyAction({ ...profile, studyDayMode: 'bad_day' })
      : smartAction;

    updateStreak();

    if (useBadDayMode) {
      setBadDayMode(true);
    }

    if (action.kind === 'mission' && action.missionId && action.subjectId) {
      onNavigate('mission', { missionId: action.missionId, subjectId: action.subjectId });
      return;
    }

    if (action.kind === 'review') {
      onNavigate('review');
      return;
    }

    onNavigate('simulados');
  };

  const handleStartMission = () => {
    navigateToAction(false);
  };

  const handleBadDay = () => {
    navigateToAction(true);
  };

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold font-[Rajdhani,sans-serif] text-white">
          {studiedToday ? '🎉 Bom te ver de volta!' : '⚔️ Preparado para a batalha?'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {studiedToday ? 'Você já estudou hoje. Continue assim!' : 'Comece sua missão diária agora.'}
        </p>
      </div>

      {/* Days until exam */}
      <div className="card flex items-center gap-3 border-l-4 border-gold-500">
        <Calendar size={28} className="text-gold-500 shrink-0" />
        <div>
          <p className="text-2xl font-bold text-gold-400 font-[Rajdhani,sans-serif]">{deadline.daysLeft} dias</p>
          <p className="text-xs text-gray-400">{deadline.title}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{deadline.subtitle}</p>
          <p className="text-[10px] text-gray-600 mt-0.5">{deadline.helper}</p>
        </div>
      </div>

      {/* Smart Mission Card */}
      <div className="card animate-pulse-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gold-500 text-pm-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
          MISSÃO INTELIGENTE
        </div>
        <div className="mt-2">
          <p className="text-xs text-pm-300 mb-1">
            {smartAction.subjectIcon ? `${smartAction.subjectIcon} ` : '🧭 '}
            {smartAction.subjectLabel ?? 'Plano automático'}
          </p>
          <h2 className="text-lg font-bold text-white">{smartAction.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{smartAction.summary}</p>

          <div className="mt-3 rounded-xl bg-pm-900/60 border border-pm-700 p-3">
            <p className="text-[11px] uppercase tracking-wide text-gold-400 font-bold mb-1">
              Por que essa missão?
            </p>
            <p className="text-xs text-gray-400">{smartAction.reason}</p>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Timer size={12} /> {smartAction.minutes} min</span>
            <span className="flex items-center gap-1"><Zap size={12} /> +{smartAction.xpReward} XP</span>
          </div>

          <button onClick={handleStartMission} className="btn-gold w-full mt-4 flex items-center justify-center gap-2 text-base">
            <Play size={20} />
            {smartAction.buttonLabel}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate('simulados')} className="card flex items-center gap-2 hover:border-pm-400 transition-colors text-left">
          <Target size={20} className="text-pm-400" />
          <div>
            <p className="text-sm font-semibold">Simulado Rápido</p>
            <p className="text-[10px] text-gray-500">5 questões</p>
          </div>
        </button>
        <button onClick={() => onNavigate('review')} className="card flex items-center gap-2 hover:border-pm-400 transition-colors text-left">
          <Flame size={20} className="text-orange-400" />
          <div>
            <p className="text-sm font-semibold">Revisão</p>
            <p className="text-[10px] text-gray-500">{profile.wrongQuestions.length} para rever</p>
          </div>
        </button>
      </div>

      {/* Bad Day Mode */}
      {!studiedToday && (
        <button onClick={handleBadDay} className="w-full text-center py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-1">
          <AlertTriangle size={12} />
          Não sei por onde começar / dia ruim: me dá só 10 minutos
        </button>
      )}

      {/* Progress Overview */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
          <Zap size={14} /> Progresso por Matéria
        </h3>
        <div className="space-y-3">
          {subjects.map(sub => {
            const prog = getSubjectProgress(sub.id, profile.completedMissions);
            const pct = Math.round((prog / sub.missions.length) * 100);
            return (
              <button key={sub.id} onClick={() => onNavigate('subject', { subjectId: sub.id })} className="w-full text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium flex items-center gap-2">
                    {sub.icon} {sub.name}
                  </span>
                  <span className="text-xs text-gray-500">{prog}/{sub.missions.length}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: sub.color }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center">
          <p className="text-xl font-bold text-white">{completedCount}</p>
          <p className="text-[10px] text-gray-500">Missões</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-white">{totalAnswered}</p>
          <p className="text-[10px] text-gray-500">Questões</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-gold-400">{accuracy}%</p>
          <p className="text-[10px] text-gray-500">Acertos</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-2">
        <button onClick={() => onNavigate('studyplan')} className="card w-full flex items-center justify-between hover:border-pm-400 transition-colors">
          <span className="text-sm">📋 Plano de Estudos</span>
          <ChevronRight size={16} className="text-gray-500" />
        </button>
        <button onClick={() => onNavigate('essay')} className="card w-full flex items-center justify-between hover:border-pm-400 transition-colors">
          <span className="text-sm">✍️ Redação</span>
          <ChevronRight size={16} className="text-gray-500" />
        </button>
        <button onClick={() => onNavigate('taf')} className="card w-full flex items-center justify-between hover:border-pm-400 transition-colors">
          <span className="text-sm">🏃 TAF — Treino Físico</span>
          <ChevronRight size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
