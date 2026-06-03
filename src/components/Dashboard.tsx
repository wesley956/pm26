import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { getPrimaryDeadlineInfo, getSubjectProgress } from '../utils';
import { Play, Flame, Calendar, Target, Zap, ChevronRight, Timer, AlertTriangle } from 'lucide-react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, addXP, updateStreak } = useApp();
  const deadline = getPrimaryDeadlineInfo();

  // Find next mission
  const allMissions = subjects.flatMap(s => s.missions);
  const nextMission = allMissions.find(m => !profile.completedMissions.includes(m.id));
  const nextSubject = nextMission ? subjects.find(s => s.id === nextMission.subjectId) : null;

  // Stats
  const completedCount = profile.completedMissions.length;
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Check if studied today
  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = profile.lastStudyDate === today;

  const handleStartMission = () => {
    if (nextMission) {
      updateStreak();
      addXP(10); // bonus for starting
      onNavigate('mission', { missionId: nextMission.id, subjectId: nextMission.subjectId });
    }
  };

  const handleBadDay = () => {
    // Quick 10-min mode: just review one flashcard
    onNavigate('review');
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

      {/* Main Mission Card */}
      {nextMission && (
        <div className="card animate-pulse-gold relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold-500 text-pm-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
            MISSÃO DO DIA
          </div>
          <div className="mt-2">
            <p className="text-xs text-pm-300 mb-1">{nextSubject?.icon} {nextSubject?.name}</p>
            <h2 className="text-lg font-bold text-white">{nextMission.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{nextMission.summary}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Timer size={12} /> {nextMission.duration} min</span>
              <span className="flex items-center gap-1"><Zap size={12} /> +{nextMission.xpReward} XP</span>
            </div>
            <button onClick={handleStartMission} className="btn-gold w-full mt-4 flex items-center justify-center gap-2 text-base">
              <Play size={20} />
              COMEÇAR AGORA
            </button>
          </div>
        </div>
      )}

      {!nextMission && (
        <div className="card text-center py-8">
          <p className="text-4xl mb-2">🏆</p>
          <h2 className="text-xl font-bold text-gold-400">Todas as missões concluídas!</h2>
          <p className="text-sm text-gray-400 mt-2">Você está pronto para a prova. Faça simulados para manter o ritmo!</p>
          <button onClick={() => onNavigate('simulados')} className="btn-primary mt-4">
            Fazer Simulado
          </button>
        </div>
      )}

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
          Dia ruim? Estude só 10 minutos — não quebre a sequência
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
