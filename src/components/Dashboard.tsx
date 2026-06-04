import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { getPrimaryDeadlineInfo, getSubjectProgress } from '../utils';
import { questions } from '../data/questions';
import { chooseSmartStudyAction } from '../utils/smartStudy';
import { buildDailyChecklist } from '../utils/dailyChecklist';
import {
  Play,
  Flame,
  Calendar,
  Target,
  Zap,
  ChevronRight,
  Timer,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  Crosshair,
} from 'lucide-react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, setBadDayMode, markDailyMinimumDone } = useApp();
  const deadline = getPrimaryDeadlineInfo();
  const smartAction = chooseSmartStudyAction(profile);
  const dailyChecklist = buildDailyChecklist(profile);

  const completedCount = profile.completedMissions.length;
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const subjectStats = subjects.map(sub => {
    const prefix = sub.id === 'portugues' ? 'pt' : sub.id === 'matematica' ? 'mt' : sub.id === 'gerais' ? 'cg' : sub.id === 'informatica' ? 'inf' : 'ap';
    const answered = Object.values(profile.completedQuestions).filter(q => q.questionId.startsWith(prefix));
    const total = answered.length;
    const correct = answered.filter(q => q.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const missionProgress = getSubjectProgress(sub.id, profile.completedMissions);
    const questionCount = questions.filter(q => q.subjectId === sub.id).length;

    const lowPracticePenalty = total < 5 ? 30 : 0;
    const lowAccuracyPenalty = total > 0 ? Math.max(0, 75 - pct) : 25;
    const missionPenalty = Math.max(0, sub.missions.length - missionProgress) * 3;
    const strategicWeight =
      sub.id === 'portugues' ? 20 :
      sub.id === 'matematica' ? 16 :
      sub.id === 'gerais' ? 16 :
      sub.id === 'administracao' ? 12 :
      6;

    const priorityScore = lowPracticePenalty + lowAccuracyPenalty + missionPenalty + strategicWeight;

    const reason =
      total < 5 ? 'precisamos gerar dados respondendo questões' :
      pct < 60 ? 'acerto baixo para meta top 100' :
      missionProgress < sub.missions.length ? 'ainda há teoria premium para concluir' :
      'manter revisão e volume';

    const action =
      missionProgress < sub.missions.length ? 'Abrir teoria premium' :
      pct < 70 ? 'Treinar questões e revisar erros' :
      'Fazer revisão rápida';

    return { ...sub, total, correct, pct, missionProgress, questionCount, priorityScore, reason, action };
  });

  const topPriority = [...subjectStats].sort((a, b) => b.priorityScore - a.priorityScore)[0];

  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = profile.lastStudyDate === today;
  const overallMissionPct = Math.round((completedCount / subjects.reduce((sum, sub) => sum + sub.missions.length, 0)) * 100);

  const navigateToAction = (useBadDayMode = false) => {
    const action = useBadDayMode
      ? chooseSmartStudyAction({ ...profile, studyDayMode: 'bad_day' })
      : smartAction;

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

  const handleStartMission = () => navigateToAction(false);
  const handleBadDay = () => navigateToAction(true);

  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-pm-800 to-slate-950 p-5 shadow-2xl md:p-7">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pm-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative grid gap-5 lg:grid-cols-[1.45fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-gold-300">
              <ShieldCheck size={14} />
              Central de Comando Top 100
            </div>

            <h1 className="font-[Rajdhani,sans-serif] text-3xl font-black leading-none text-white md:text-5xl">
              {studiedToday ? 'Operação de hoje em andamento.' : 'Hora de avançar no ranking.'}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              Nada de estudar no escuro. O sistema escolhe a missão, mostra sua prioridade e transforma teoria em treino de prova.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button onClick={handleStartMission} className="btn-gold flex items-center justify-center gap-2 text-base">
                <Play size={20} />
                {smartAction.buttonLabel}
              </button>

              <button onClick={() => onNavigate('profile')} className="btn-primary flex items-center justify-center gap-2 text-base">
                <Crosshair size={19} />
                Ver diagnóstico
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Calendar size={20} className="mb-2 text-gold-400" />
              <p className="font-[Rajdhani,sans-serif] text-3xl font-black text-gold-300">{deadline.daysLeft}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">dias restantes</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <TrendingUp size={20} className="mb-2 text-pm-300" />
              <p className="font-[Rajdhani,sans-serif] text-3xl font-black text-white">{accuracy}%</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">acerto geral</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <BookOpen size={20} className="mb-2 text-pm-300" />
              <p className="font-[Rajdhani,sans-serif] text-3xl font-black text-white">{completedCount}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">missões</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Zap size={20} className="mb-2 text-gold-400" />
              <p className="font-[Rajdhani,sans-serif] text-3xl font-black text-white">{overallMissionPct}%</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">campanha</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.85fr]">
        <div className="space-y-5">
          {/* Smart Mission */}
          <section className="card overflow-hidden border-gold-500/25">
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-gold-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
              missão inteligente
            </div>

            <div className="pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-pm-300">
                {smartAction.subjectIcon ? `${smartAction.subjectIcon} ` : '🧭 '}
                {smartAction.subjectLabel ?? 'Plano automático'}
              </p>

              <h2 className="mt-2 font-[Rajdhani,sans-serif] text-2xl font-black text-white">
                {smartAction.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-400">{smartAction.summary}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-pm-400/15 bg-black/25 p-4">
              <p className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-gold-400">
                Por que essa missão?
              </p>
              <p className="text-sm leading-relaxed text-gray-400">{smartAction.reason}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <Timer size={12} /> {smartAction.minutes} min
              </span>
              <span className="flex items-center gap-1 rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-gold-300">
                <Zap size={12} /> +{smartAction.xpReward} XP
              </span>
            </div>

            <button onClick={handleStartMission} className="btn-gold mt-5 w-full text-base">
              Iniciar missão agora
            </button>
          </section>

          {/* Subject Progress */}
          <section className="card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-pm-300">Mapa de campanha</p>
                <h3 className="mt-1 text-lg font-black text-white">Progresso por matéria</h3>
              </div>
              <button onClick={() => onNavigate('subjects')} className="text-xs font-bold text-gold-400 hover:text-gold-300">
                Ver todas
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {subjects.map(sub => {
                const prog = getSubjectProgress(sub.id, profile.completedMissions);
                const pct = Math.round((prog / sub.missions.length) * 100);
                const stat = subjectStats.find(s => s.id === sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => onNavigate('subject', { subjectId: sub.id })}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition-all hover:border-pm-400/40 hover:bg-white/[0.03]"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-white">{sub.icon} {sub.name}</span>
                      <span className="text-[11px] font-bold text-gray-500">{prog}/{sub.missions.length}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: sub.color }} />
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                      <span>{pct}% teoria</span>
                      <span>{stat?.total ? `${stat.pct}% questões` : 'sem dados'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          {/* Top Priority */}
          {topPriority && (
            <section className="card border-danger/40">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-danger">Prioridade Top 100</p>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-[Rajdhani,sans-serif] text-2xl font-black text-white">
                    {topPriority.icon} {topPriority.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{topPriority.reason}</p>
                </div>

                <span className={`rounded-full px-2 py-1 text-[11px] font-black ${
                  topPriority.total === 0 ? 'bg-gray-700 text-gray-300' :
                  topPriority.pct >= 75 ? 'bg-success/15 text-success' :
                  topPriority.pct >= 60 ? 'bg-gold-500/15 text-gold-400' :
                  'bg-danger/15 text-danger'
                }`}>
                  {topPriority.total > 0 ? `${topPriority.pct}%` : 'sem dados'}
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[11px] text-gray-500">
                  {topPriority.missionProgress}/{topPriority.missions.length} missões • {topPriority.total}/{topPriority.questionCount} questões respondidas
                </p>
                <p className="mt-1 text-sm font-bold text-pm-300">Próxima ação: {topPriority.action}</p>
              </div>

              <button onClick={() => onNavigate('subject', { subjectId: topPriority.id })} className="btn-primary mt-4 w-full text-sm">
                Atacar prioridade
              </button>
            </section>
          )}

          {/* Daily Checklist */}
          <section className="card border-pm-400/25">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-pm-300">Ritual diário</p>
                <h3 className="mt-1 text-base font-black text-white">{dailyChecklist.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{dailyChecklist.subtitle}</p>
              </div>

              <div className={`rounded-full px-2 py-1 text-xs font-black ${
                dailyChecklist.isComplete ? 'bg-success/15 text-success' : 'bg-white/5 text-gray-300'
              }`}>
                {dailyChecklist.completedCount}/{dailyChecklist.totalCount}
              </div>
            </div>

            <div className="space-y-3">
              {dailyChecklist.items.map(item => (
                <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  {item.done ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                  ) : (
                    <Circle size={18} className="mt-0.5 shrink-0 text-gray-600" />
                  )}
                  <div>
                    <p className={`text-sm font-bold ${item.done ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-gray-500">{item.hint}</p>
                  </div>
                </div>
              ))}
            </div>

            {!dailyChecklist.isComplete ? (
              <button onClick={markDailyMinimumDone} className="mt-4 w-full text-xs font-bold text-gray-400 transition-colors hover:text-gold-400">
                Estudei fora do app — marcar mínimo de hoje
              </button>
            ) : (
              <p className="mt-4 text-xs font-bold text-success">Mínimo de hoje concluído. O resto é bônus.</p>
            )}
          </section>
        </aside>
      </div>

      {/* Actions */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button onClick={() => onNavigate('simulados')} className="card text-left hover:border-pm-400/40">
          <Target size={22} className="mb-3 text-pm-300" />
          <p className="font-bold text-white">Simulados</p>
          <p className="mt-1 text-xs text-gray-500">Treino de prova</p>
        </button>

        <button onClick={() => onNavigate('review')} className="card text-left hover:border-gold-500/40">
          <Flame size={22} className="mb-3 text-orange-400" />
          <p className="font-bold text-white">Revisão</p>
          <p className="mt-1 text-xs text-gray-500">{profile.wrongQuestions.length} erros para rever</p>
        </button>

        <button onClick={() => onNavigate('essay')} className="card text-left hover:border-gold-500/40">
          <BookOpen size={22} className="mb-3 text-gold-400" />
          <p className="font-bold text-white">Redação</p>
          <p className="mt-1 text-xs text-gray-500">Estrutura e treino</p>
        </button>

        <button onClick={() => onNavigate('taf')} className="card text-left hover:border-success/40">
          <TrendingUp size={22} className="mb-3 text-success" />
          <p className="font-bold text-white">TAF</p>
          <p className="mt-1 text-xs text-gray-500">Condicionamento</p>
        </button>
      </section>

      {!studiedToday && (
        <button onClick={handleBadDay} className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 text-center text-xs font-bold text-gray-400 transition-colors hover:text-gold-400">
          <span className="inline-flex items-center justify-center gap-2">
            <AlertTriangle size={13} />
            Dia ruim: me dá só 10 minutos
          </span>
        </button>
      )}

      <button onClick={() => onNavigate('studyplan')} className="card flex w-full items-center justify-between hover:border-pm-400/40">
        <span className="text-sm font-bold text-white">📋 Plano de Estudos completo</span>
        <ChevronRight size={16} className="text-gray-500" />
      </button>
    </div>
  );
}
