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

  const top100Priorities = subjectStats
    .map(s => {
      const lowPracticePenalty = s.total < 5 ? 30 : 0;
      const lowAccuracyPenalty = s.total > 0 ? Math.max(0, 75 - s.pct) : 25;
      const missionPenalty = Math.max(0, s.missions.length - s.missionProgress) * 3;
      const strategicWeight =
        s.id === 'portugues' ? 20 :
        s.id === 'matematica' ? 16 :
        s.id === 'gerais' ? 16 :
        s.id === 'administracao' ? 12 :
        6;

      const priorityScore = lowPracticePenalty + lowAccuracyPenalty + missionPenalty + strategicWeight;

      const reason =
        s.total < 5 ? 'poucos dados de questões' :
        s.pct < 60 ? 'acerto baixo para brigar por classificação alta' :
        s.missionProgress < s.missions.length ? 'teoria ainda incompleta' :
        'manter revisão para não perder desempenho';

      const action =
        s.missionProgress < s.missions.length ? 'Abrir teoria premium' :
        s.pct < 70 ? 'Treinar questões e revisar erros' :
        'Fazer revisão rápida';

      return { ...s, priorityScore, reason, action };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);

  const diagnosticTitle =
    totalAnswered < 20 ? 'Ainda temos poucos dados' :
    accuracy >= 80 ? 'Ritmo competitivo' :
    accuracy >= 65 ? 'Base em construção' :
    'Zona de recuperação';

  const diagnosticMessage =
    totalAnswered < 20
      ? 'Responda mais questões para o diagnóstico ficar preciso. Por enquanto, siga a prioridade automática por peso e dificuldade.'
      : accuracy >= 80
        ? 'Você está em ritmo bom. Agora o foco é manter constância, revisar erros e aumentar volume.'
        : accuracy >= 65
          ? 'Você está construindo base. Para top 100, precisa subir acerto e reduzir os buracos nas matérias prioritárias.'
          : 'Para top 100, o foco agora é recuperar base: teoria curta, revisão guiada e questões comentadas todos os dias.';

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

      {/* Top 100 Diagnostic */}
      <div className="card border-l-4 border-danger">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target size={14} className="text-danger" /> Diagnóstico Top 100
            </h3>
            <p className="text-xs text-gray-400 mt-1">{diagnosticTitle}</p>
          </div>
          <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
            accuracy >= 80 ? 'bg-success/15 text-success' :
            accuracy >= 65 ? 'bg-gold-500/15 text-gold-400' :
            'bg-danger/15 text-danger'
          }`}>
            {accuracy}% geral
          </span>
        </div>

        <p className="text-sm text-gray-300 mt-3 leading-relaxed">{diagnosticMessage}</p>

        <div className="mt-4 space-y-2">
          {top100Priorities.map((s, index) => (
            <button
              key={s.id}
              onClick={() => onNavigate('subject', { subjectId: s.id })}
              className="w-full text-left rounded-xl border border-pm-700/70 bg-pm-900/50 p-3 hover:border-gold-500/60 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-white">
                  {index + 1}. {s.icon} {s.name}
                </p>
                <span className={`text-[11px] font-bold ${
                  s.total === 0 ? 'text-gray-500' :
                  s.pct >= 75 ? 'text-success' :
                  s.pct >= 60 ? 'text-gold-400' :
                  'text-danger'
                }`}>
                  {s.total > 0 ? `${s.pct}%` : 'sem dados'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                {s.reason} • {s.missionProgress}/{s.missions.length} missões • {s.total} questões
              </p>
              <p className="text-[11px] text-pm-300 mt-1 font-semibold">
                Próxima ação: {s.action}
              </p>
            </button>
          ))}
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
