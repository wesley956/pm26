import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { getPrimaryDeadlineInfo, getSubjectProgress, getLevelInfo } from '../utils';
import { questions } from '../data/questions';
import { chooseSmartStudyAction } from '../utils/smartStudy';
import { buildDailyChecklist } from '../utils/dailyChecklist';
import {
  Play,
  Flame,
  Calendar,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Circle,
  BookOpen,
  TrendingUp,
  Trophy,
  Pencil,
  Dumbbell,
  RotateCcw,
  ChevronRight,
  Bell,
} from 'lucide-react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, setBadDayMode, markDailyMinimumDone } = useApp();
  const deadline = getPrimaryDeadlineInfo();
  const smartAction = chooseSmartStudyAction(profile);
  const dailyChecklist = buildDailyChecklist(profile);
  const levelInfo = getLevelInfo(profile);

  const completedCount = profile.completedMissions.length;
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const totalQuestions = questions.length;
  const totalMissions = subjects.reduce((sum, sub) => sum + sub.missions.length, 0);

  const subjectStats = subjects.map(sub => {
    const prefix = sub.id === 'portugues' ? 'pt' : sub.id === 'matematica' ? 'mt' : sub.id === 'gerais' ? 'cg' : sub.id === 'informatica' ? 'inf' : 'ap';
    const answered = Object.values(profile.completedQuestions).filter(q => q.questionId.startsWith(prefix));
    const total = answered.length;
    const correct = answered.filter(q => q.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const missionProgress = getSubjectProgress(sub.id, profile.completedMissions);
    const questionCount = questions.filter(q => q.subjectId === sub.id).length;

    const priorityScore =
      (total < 5 ? 30 : 0) +
      (total > 0 ? Math.max(0, 75 - pct) : 25) +
      Math.max(0, sub.missions.length - missionProgress) * 3 +
      (sub.id === 'portugues' ? 20 : sub.id === 'matematica' ? 16 : sub.id === 'gerais' ? 16 : sub.id === 'administracao' ? 12 : 6);

    return { ...sub, total, correct, pct, missionProgress, questionCount, priorityScore };
  });

  const topPriority = [...subjectStats].sort((a, b) => b.priorityScore - a.priorityScore)[0];
  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = profile.lastStudyDate === today;

  const navigateToAction = (useBadDayMode = false) => {
    const action = useBadDayMode
      ? chooseSmartStudyAction({ ...profile, studyDayMode: 'bad_day' })
      : smartAction;

    if (useBadDayMode) setBadDayMode(true);

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

  const rankProgress = Math.max(0, Math.min(100, levelInfo.progress));
  const circleOffset = 314 - (314 * rankProgress) / 100;

  return (
    <div>
      <div className="mb-8 hidden items-center justify-between lg:flex">
        <div>
          <h1 className="font-orbitron text-2xl font-black text-white">
            Dashboard <span className="neon-blue">Central</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Bom trabalho, Recruta. Sua missão começa agora. 🚀
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="card px-4 py-3">
            <div className="section-label mb-2">⏳ Concurso em</div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-center">
                <div className="font-orbitron text-lg font-black neon-blue">{deadline.daysLeft}</div>
                <div className="text-xs text-slate-500">dias</div>
              </div>
              <span className="text-xl font-black neon-blue">:</span>
              <div className="rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-center">
                <div className="font-orbitron text-lg font-black neon-blue">--</div>
                <div className="text-xs text-slate-500">hrs</div>
              </div>
            </div>
          </div>

          <div className="card px-4 py-3 text-center">
            <div className="section-label mb-1">🔥 Sequência</div>
            <div className="font-orbitron text-2xl font-black neon-gold">{profile.streak}</div>
            <div className="text-xs text-slate-500">dias seguidos</div>
          </div>

          <button className="card relative flex h-11 w-11 items-center justify-center">
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger shadow-[0_0_8px_#ff4757]" />
          </button>
        </div>
      </div>

      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card stat-card-blue p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-xl">
              ⚡
            </div>
            <span className="badge border border-cyan-400/25 bg-cyan-400/10 text-pm-400">XP</span>
          </div>
          <div className="font-orbitron text-3xl font-black neon-blue">{profile.xp}</div>
          <div className="mt-1 text-sm text-slate-400">XP Total</div>
          <div className="xp-bar-wrap mt-3">
            <div className="xp-bar-fill" style={{ width: `${levelInfo.progress}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-500">Nível {levelInfo.level}</div>
        </div>

        <div className="card stat-card-green p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-success/25 bg-success/10 text-xl">
              📝
            </div>
            <span className="badge border border-success/25 bg-success/10 text-success">{accuracy}%</span>
          </div>
          <div className="font-orbitron text-3xl font-black neon-green">{totalAnswered}</div>
          <div className="mt-1 text-sm text-slate-400">Questões Feitas</div>
          <div className="xp-bar-wrap mt-3">
            <div className="xp-bar-fill !bg-gradient-to-r !from-success !to-pm-400" style={{ width: `${Math.min(100, (totalAnswered / Math.max(1, totalQuestions)) * 100)}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-500">de {totalQuestions} no banco</div>
        </div>

        <div className="card stat-card-gold p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-xl">
              🔥
            </div>
            <span className="badge border border-gold-500/25 bg-gold-500/10 text-gold-500">Streak</span>
          </div>
          <div className="font-orbitron text-3xl font-black neon-gold">{profile.streak}</div>
          <div className="mt-1 text-sm text-slate-400">Dias de Sequência</div>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
                  i < Math.min(7, profile.streak)
                    ? 'bg-gradient-to-br from-gold-500 to-orange-500 text-black shadow-[0_0_8px_rgba(255,215,0,0.45)]'
                    : 'bg-white/5 text-slate-600'
                }`}
              >
                {i < Math.min(7, profile.streak) ? '🔥' : i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="card stat-card-purple p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-400/10 text-xl">
              🏆
            </div>
            <span className="badge border border-purple-400/25 bg-purple-400/10 text-purple-400">Missões</span>
          </div>
          <div className="font-orbitron text-3xl font-black neon-purple">{completedCount}</div>
          <div className="mt-1 text-sm text-slate-400">Missões Completas</div>
          <div className="xp-bar-wrap mt-3">
            <div className="xp-bar-fill !bg-gradient-to-r !from-purple-500 !to-pink-500" style={{ width: `${Math.min(100, (completedCount / Math.max(1, totalMissions)) * 100)}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-500">de {totalMissions} missões</div>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mission-priority bg-gradient-to-r from-danger to-orange-500 text-white">
            🎯 Missão
          </div>

          <div className="mb-5 mt-2 flex items-center gap-3">
            <div className="pulse-glow flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-2xl">
              ⚔️
            </div>

            <div>
              <div className="font-orbitron text-lg font-black text-white">Missão do Dia</div>
              <div className="text-sm text-slate-400">{studiedToday ? 'Você já iniciou o dia.' : 'Comece agora com o próximo passo.'}</div>
            </div>

            <div className="ml-auto text-right">
              <div className="text-xs text-slate-500">Recompensa</div>
              <div className="text-lg font-black neon-gold">+{smartAction.xpReward} XP</div>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => navigateToAction(false)} className="check-item w-full text-left">
              <div className="check-box">
                <Play size={12} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-black text-white">{smartAction.subjectIcon} {smartAction.title}</span>
                <div className="mt-0.5 text-xs text-slate-500">{smartAction.summary}</div>
              </div>
              <span className="badge border border-cyan-400/20 bg-cyan-400/10 text-pm-400">{smartAction.minutes} min</span>
            </button>

            {topPriority && (
              <button onClick={() => onNavigate('subject', { subjectId: topPriority.id })} className="check-item w-full text-left">
                <div className="check-box">
                  <AlertTriangle size={12} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-black text-white">🎯 Prioridade: {topPriority.name}</span>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {topPriority.total < 5 ? 'Poucos dados de questões. Calibre com treino.' : `${topPriority.pct}% de acerto`}
                  </div>
                </div>
                <span className="badge border border-danger/20 bg-danger/10 text-danger">Top 100</span>
              </button>
            )}

            {dailyChecklist.items.map(item => (
              <div key={item.id} className={`check-item ${item.done ? 'done' : ''}`}>
                <div className="check-box">
                  {item.done && <CheckCircle2 size={12} />}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-black text-white">{item.label}</span>
                  <div className="mt-0.5 text-xs text-slate-500">{item.hint}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-cyan-900/30 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 text-xs text-slate-500">Progresso do mínimo diário</div>
              <div className="xp-bar-wrap w-full sm:w-[220px]">
                <div className="xp-bar-fill" style={{ width: `${(dailyChecklist.completedCount / dailyChecklist.totalCount) * 100}%` }} />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-glow !border-danger/40 !bg-danger/10 !text-danger" onClick={() => navigateToAction(true)}>
                😓 Dia Ruim?
              </button>
              <button className="btn-gold" onClick={() => navigateToAction(false)}>
                Executar ⚡
              </button>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="section-label mb-4">🎖️ Patente & Progresso</div>

          <div className="mb-4 flex justify-center">
            <div className="relative h-36 w-36">
              <svg className="circle-progress h-full w-full" viewBox="0 0 120 120">
                <circle className="circle-track" cx="60" cy="60" r="50" strokeWidth="8" />
                <circle
                  className="circle-fill"
                  cx="60"
                  cy="60"
                  r="50"
                  strokeWidth="8"
                  stroke="url(#goldGrad)"
                  strokeDasharray="314"
                  strokeDashoffset={circleOffset}
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#ff8c00" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl">🪖</div>
                <div className="mt-1 text-sm font-black neon-gold">{levelInfo.title}</div>
                <div className="text-xs text-slate-500">Nível {levelInfo.level}</div>
              </div>
            </div>
          </div>

          <div className="rank-badge mb-4">
            <div className="mb-2 text-xs text-slate-400">
              Próximo nível: <span className="font-black neon-gold">{levelInfo.level + 1}</span>
            </div>
            <div className="xp-bar-wrap !h-2">
              <div className="xp-bar-fill !bg-gradient-to-r !from-gold-500 !to-orange-500" style={{ width: `${levelInfo.progress}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-slate-500">{levelInfo.xpInLevel} XP</span>
              <span className="neon-gold">{levelInfo.xpForNext} XP</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="section-label mb-2">🏅 Medalhas</div>
            <div className="grid grid-cols-4 gap-2">
              {['🏆','🔥','⚡','📚','💪','🎯','🌟','🃏'].map((m, i) => {
                const earned = i < Math.max(1, Math.min(8, profile.medals.length || 2));
                return (
                  <div
                    key={i}
                    className={`tooltip flex flex-col items-center gap-1 rounded-xl p-2 transition-all ${
                      earned ? 'border border-gold-500/20 hover:bg-gold-500/10' : 'opacity-30 grayscale'
                    }`}
                  >
                    <span className="text-2xl">{m}</span>
                    <div className="tooltip-box">{earned ? 'Conquistada' : 'Bloqueada'}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div className="section-label">📊 Desempenho por Matéria</div>
            <button className="tab-btn active text-xs" onClick={() => onNavigate('subjects')}>Ver aulas</button>
          </div>

          <div className="space-y-4">
            {subjectStats.map(s => {
              const questionPct = s.questionCount > 0 ? Math.round((s.total / s.questionCount) * 100) : 0;
              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate('subject', { subjectId: s.id })}
                  className="w-full text-left"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{s.icon}</span>
                      <span className="text-sm font-black text-white">{s.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">{s.total}/{s.questionCount} questões</span>
                      <span className="font-black" style={{ color: s.color }}>{s.total > 0 ? `${s.pct}%` : 'sem dados'}</span>
                    </div>
                  </div>

                  <div className="xp-bar-wrap !h-2">
                    <div
                      className="subject-bar xp-bar-fill"
                      style={{
                        width: `${Math.max(questionPct, s.missionProgress * 10)}%`,
                        background: `linear-gradient(90deg, ${s.color}99, ${s.color})`,
                        boxShadow: `0 0 10px ${s.color}60`,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="section-label mb-3">✅ Checklist TDAH — Hoje</div>
            <div className="space-y-1">
              {dailyChecklist.items.map(item => (
                <div key={item.id} className={`check-item ${item.done ? 'done' : ''}`}>
                  <div className="check-box">
                    {item.done && <CheckCircle2 size={12} />}
                  </div>
                  <span className={`text-xs font-bold ${item.done ? 'text-slate-600 line-through' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {!dailyChecklist.isComplete && (
              <button className="btn-glow mt-3 w-full text-sm" onClick={markDailyMinimumDone}>
                Marcar mínimo
              </button>
            )}
          </div>

          <div className="card p-5">
            <div className="section-label mb-3">⚡ Atalhos</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-glow text-sm" onClick={() => onNavigate('simulados')}>
                <Trophy size={15} /> Simulado
              </button>
              <button className="btn-glow text-sm" onClick={() => onNavigate('review')}>
                <RotateCcw size={15} /> Revisão
              </button>
              <button className="btn-gold text-sm" onClick={() => onNavigate('essay')}>
                <Pencil size={15} /> Redação
              </button>
              <button className="btn-glow text-sm" onClick={() => onNavigate('taf')}>
                <Dumbbell size={15} /> TAF
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
