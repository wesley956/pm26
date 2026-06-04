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
  BookOpen,
  TrendingUp,
  Crosshair,
  ShieldCheck,
  Activity,
  Brain,
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
      total < 5 ? 'faltam dados de treino' :
      pct < 60 ? 'acerto baixo para top 100' :
      missionProgress < sub.missions.length ? 'teoria premium pendente' :
      'manter revisão';

    const action =
      missionProgress < sub.missions.length ? 'Abrir teoria' :
      pct < 70 ? 'Treinar questões' :
      'Revisar';

    return { ...sub, total, correct, pct, missionProgress, questionCount, priorityScore, reason, action };
  });

  const topPriority = [...subjectStats].sort((a, b) => b.priorityScore - a.priorityScore)[0];

  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = profile.lastStudyDate === today;
  const totalMissions = subjects.reduce((sum, sub) => sum + sub.missions.length, 0);
  const campaignPct = Math.round((completedCount / totalMissions) * 100);

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

  return (
    <div className="space-y-5">
      {/* Command Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(8,13,25,0.96)_45%,rgba(3,7,18,0.98))] p-4 shadow-2xl md:p-6 lg:p-7">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-pm-400/20 blur-3xl" />
        <div className="absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pm-300/40 to-transparent" />

        <div className="relative grid gap-5 lg:grid-cols-[1fr_360px] lg:items-stretch">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-gold-300">
                  <ShieldCheck size={13} />
                  Operação Top 100
                </span>

                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                  studiedToday ? 'border-success/30 bg-success/10 text-success' : 'border-pm-400/25 bg-pm-400/10 text-pm-300'
                }`}>
                  <Activity size={13} />
                  {studiedToday ? 'mínimo iniciado' : 'aguardando missão'}
                </span>
              </div>

              <h1 className="max-w-3xl font-[Rajdhani,sans-serif] text-4xl font-black leading-[0.93] tracking-tight text-white md:text-6xl">
                {studiedToday ? 'Mantenha o avanço.' : 'Faça a próxima missão certa.'}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
                Uma ação principal por vez. Estude teoria, revise pegadinhas e treine questões sem se perder no excesso.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                  <Calendar size={13} /> Dias
                </p>
                <p className="mt-1 font-[Rajdhani,sans-serif] text-3xl font-black text-gold-300">{deadline.daysLeft}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                  <TrendingUp size={13} /> Acerto
                </p>
                <p className="mt-1 font-[Rajdhani,sans-serif] text-3xl font-black text-white">{accuracy}%</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                  <Zap size={13} /> Campanha
                </p>
                <p className="mt-1 font-[Rajdhani,sans-serif] text-3xl font-black text-white">{campaignPct}%</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-gold-500/25 bg-gold-500/[0.06] p-4 shadow-xl shadow-black/20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-300">
              Missão principal
            </p>

            <h2 className="mt-3 font-[Rajdhani,sans-serif] text-2xl font-black leading-tight text-white">
              {smartAction.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">{smartAction.summary}</p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-[11px] font-bold text-pm-300">
                {smartAction.subjectIcon ? `${smartAction.subjectIcon} ` : '🧭 '}
                {smartAction.subjectLabel ?? 'Plano automático'}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{smartAction.reason}</p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-3 py-1">
                <Timer size={12} /> {smartAction.minutes} min
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/10 px-3 py-1 text-gold-300">
                <Zap size={12} /> +{smartAction.xpReward} XP
              </span>
            </div>

            <button onClick={() => navigateToAction(false)} className="btn-gold mt-5 w-full">
              <span className="inline-flex items-center justify-center gap-2">
                <Play size={18} />
                Iniciar agora
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Priority + Checklist */}
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        {topPriority && (
          <div className="card border-danger/35">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-danger">
                  Prioridade crítica
                </p>
                <h2 className="mt-2 font-[Rajdhani,sans-serif] text-3xl font-black text-white">
                  {topPriority.icon} {topPriority.name}
                </h2>
              </div>

              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                topPriority.total === 0 ? 'bg-gray-700 text-gray-300' :
                topPriority.pct >= 75 ? 'bg-success/15 text-success' :
                topPriority.pct >= 60 ? 'bg-gold-500/15 text-gold-400' :
                'bg-danger/15 text-danger'
              }`}>
                {topPriority.total > 0 ? `${topPriority.pct}%` : 'sem dados'}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {topPriority.reason}. Essa matéria deve receber atenção antes de você gastar energia com o resto.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">Questões</p>
                <p className="mt-1 text-xl font-black text-white">{topPriority.total}/{topPriority.questionCount}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">Teoria</p>
                <p className="mt-1 text-xl font-black text-white">{topPriority.missionProgress}/{topPriority.missions.length}</p>
              </div>
            </div>

            <button onClick={() => onNavigate('subject', { subjectId: topPriority.id })} className="btn-primary mt-5 w-full">
              <span className="inline-flex items-center justify-center gap-2">
                <Crosshair size={17} />
                {topPriority.action}
              </span>
            </button>
          </div>
        )}

        <div className="card border-pm-400/25">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-pm-300">
                Checklist diário
              </p>
              <h2 className="mt-2 font-[Rajdhani,sans-serif] text-3xl font-black text-white">
                {dailyChecklist.title}
              </h2>
            </div>

            <span className={`rounded-full px-3 py-1 text-xs font-black ${
              dailyChecklist.isComplete ? 'bg-success/15 text-success' : 'bg-white/5 text-gray-300'
            }`}>
              {dailyChecklist.completedCount}/{dailyChecklist.totalCount}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">{dailyChecklist.subtitle}</p>

          <div className="mt-4 space-y-2">
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
            <button onClick={markDailyMinimumDone} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-xs font-bold text-gray-400 hover:text-gold-400">
              Marcar mínimo feito fora do app
            </button>
          ) : (
            <p className="mt-4 text-xs font-bold text-success">Mínimo concluído. Agora é bônus.</p>
          )}
        </div>
      </section>

      {/* Subjects */}
      <section className="card">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-pm-300">Mapa de progresso</p>
            <h2 className="mt-1 font-[Rajdhani,sans-serif] text-3xl font-black text-white">Matérias</h2>
          </div>

          <button onClick={() => onNavigate('subjects')} className="inline-flex items-center gap-1 text-sm font-black text-gold-400 hover:text-gold-300">
            Ver aulas
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {subjects.map(sub => {
            const prog = getSubjectProgress(sub.id, profile.completedMissions);
            const pct = Math.round((prog / sub.missions.length) * 100);
            const stat = subjectStats.find(s => s.id === sub.id);

            return (
              <button
                key={sub.id}
                onClick={() => onNavigate('subject', { subjectId: sub.id })}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-pm-400/40 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-black text-white">{sub.icon} {sub.name}</p>
                  <span className="text-[10px] font-bold text-gray-500">{prog}/{sub.missions.length}</span>
                </div>

                <div className="progress-bar mt-3">
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

      {/* Shortcuts */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button onClick={() => onNavigate('simulados')} className="card text-left">
          <Target size={22} className="mb-3 text-pm-300" />
          <p className="font-black text-white">Simulados</p>
          <p className="mt-1 text-xs text-gray-500">Treino de prova</p>
        </button>

        <button onClick={() => onNavigate('review')} className="card text-left">
          <Flame size={22} className="mb-3 text-orange-400" />
          <p className="font-black text-white">Revisão</p>
          <p className="mt-1 text-xs text-gray-500">{profile.wrongQuestions.length} erros para rever</p>
        </button>

        <button onClick={() => onNavigate('essay')} className="card text-left">
          <Brain size={22} className="mb-3 text-gold-400" />
          <p className="font-black text-white">Redação</p>
          <p className="mt-1 text-xs text-gray-500">Estrutura e treino</p>
        </button>

        <button onClick={() => onNavigate('taf')} className="card text-left">
          <TrendingUp size={22} className="mb-3 text-success" />
          <p className="font-black text-white">TAF</p>
          <p className="mt-1 text-xs text-gray-500">Condicionamento</p>
        </button>
      </section>

      {!studiedToday && (
        <button onClick={() => navigateToAction(true)} className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 text-center text-xs font-bold text-gray-400 hover:text-gold-400">
          <span className="inline-flex items-center justify-center gap-2">
            <AlertTriangle size={13} />
            Dia ruim: me dá só 10 minutos
          </span>
        </button>
      )}
    </div>
  );
}
