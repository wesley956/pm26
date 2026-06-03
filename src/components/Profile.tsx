import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { getLevelInfo, getMedalDefinitions, getSubjectProgress } from '../utils';
import { Trophy, Target, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Profile({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, setBadDayMode } = useApp();
  const info = getLevelInfo(profile);
  const allMedals = getMedalDefinitions();

  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Strengths & weaknesses
  const subjectStats = subjects.map(sub => {
    const subQs = Object.values(profile.completedQuestions).filter(q => {
      const prefix = sub.id === 'portugues' ? 'pt' : sub.id === 'matematica' ? 'mt' : sub.id === 'gerais' ? 'cg' : sub.id === 'informatica' ? 'inf' : 'ap';
      return q.questionId.startsWith(prefix);
    });
    const total = subQs.length;
    const correct = subQs.filter(q => q.correct).length;
    return { ...sub, total, correct, pct: total > 0 ? Math.round((correct / total) * 100) : 0, missionProgress: getSubjectProgress(sub.id, profile.completedMissions) };
  });

  const strengths = subjectStats.filter(s => s.total > 0).sort((a, b) => b.pct - a.pct).slice(0, 3);
  const weaknesses = subjectStats.filter(s => s.total > 0).sort((a, b) => a.pct - b.pct).slice(0, 3);
  const behind = subjectStats.filter(s => s.missionProgress < 5);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">👤 Perfil do Aluno</h1>

      {/* Rank Card */}
      <div className="card text-center py-6">
        <div className="text-5xl mb-2">{info.icon}</div>
        <h2 className="text-2xl font-bold font-[Rajdhani,sans-serif] text-gold-400">{info.title}</h2>
        <p className="text-sm text-gray-400">Nível {info.level}</p>
        <div className="mt-3 mx-16">
          <div className="progress-bar">
            <div className="progress-bar-fill bg-gradient-to-r from-pm-500 to-gold-500" style={{ width: `${info.progress}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">{info.xpInLevel}/{info.xpForNext} XP para próximo nível</p>
        </div>
        <p className="text-lg font-bold text-white mt-2">{profile.xp.toLocaleString()} XP total</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card text-center">
          <p className="text-2xl font-bold text-orange-400">{profile.streak}</p>
          <p className="text-[10px] text-gray-500">Dias seguidos</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-white">{profile.completedMissions.length}</p>
          <p className="text-[10px] text-gray-500">Missões completas</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-white">{totalAnswered}</p>
          <p className="text-[10px] text-gray-500">Questões respondidas</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-gold-400">{accuracy}%</p>
          <p className="text-[10px] text-gray-500">Taxa de acerto</p>
        </div>
      </div>

      {/* Subject Progress */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2"><Target size={14} /> Progresso por Matéria</h3>
        <div className="space-y-3">
          {subjectStats.map(s => (
            <div key={s.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{s.icon} {s.name}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500">{s.missionProgress}/{s.missions.length} missões</span>
                  {s.total > 0 && <span className={s.pct >= 70 ? 'text-success' : s.pct >= 50 ? 'text-gold-400' : 'text-danger'}>{s.pct}% acerto</span>}
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${Math.round((s.missionProgress / s.missions.length) * 100)}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      {strengths.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2"><TrendingUp size={14} /> Pontos Fortes</h3>
          {strengths.map(s => (
            <div key={s.id} className="flex justify-between items-center text-sm py-1">
              <span>{s.icon} {s.name}</span>
              <span className="text-success font-bold">{s.pct}%</span>
            </div>
          ))}
        </div>
      )}
      {weaknesses.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2"><AlertTriangle size={14} /> Pontos Fracos</h3>
          {weaknesses.map(s => (
            <button key={s.id} onClick={() => onNavigate('subject', { subjectId: s.id })} className="flex justify-between items-center text-sm py-1 w-full text-left">
              <span>{s.icon} {s.name}</span>
              <span className="text-danger font-bold">{s.pct}%</span>
            </button>
          ))}
        </div>
      )}

      {/* Behind schedule */}
      {behind.length > 0 && (
        <div className="card border-l-4 border-orange-400">
          <h3 className="text-xs font-bold text-orange-400 mb-1">⚠️ MATÉRIAS ATRASADAS</h3>
          <div className="space-y-1">
            {behind.map(s => (
              <button key={s.id} onClick={() => onNavigate('subject', { subjectId: s.id })} className="text-sm text-gray-400 hover:text-white w-full text-left">
                {s.icon} {s.name} — {s.missionProgress}/{s.missions.length} missões
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Medals */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2"><Trophy size={14} /> Medalhas ({profile.medals.length}/{allMedals.length})</h3>
        <div className="grid grid-cols-2 gap-2">
          {allMedals.map(medal => {
            const earned = profile.medals.find(m => m.id === medal.id);
            return (
              <div key={medal.id} className={`card text-center py-3 ${earned ? 'border-gold-500/30' : 'opacity-40'}`}>
                <div className="text-2xl">{medal.icon}</div>
                <p className="text-xs font-bold text-white mt-1">{medal.name}</p>
                <p className="text-[10px] text-gray-500">{medal.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bad Day Mode */}
      <button onClick={() => setBadDayMode(true)} className="w-full text-center py-2 text-xs text-gray-500 hover:text-gray-300">
        😰 Ativar modo "Dia Ruim" (só 10 min de estudo)
      </button>

      {/* Reset */}
      <div className="text-center">
        <button onClick={() => { if (confirm('Tem certeza? Todo o progresso será perdido!')) { localStorage.clear(); window.location.reload(); }}} className="text-xs text-danger/50 hover:text-danger">
          Resetar todo o progresso
        </button>
      </div>
    </div>
  );
}
