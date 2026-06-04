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
      missionProgress < sub.missions.length ? 'teoria premium ainda incompleta' :
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
      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#10192c] via-[#0b1220] to-[#060a14] p-5 shadow-2xl md:p-7">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-pm-400/20 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-52 w-52 rounded-full bg-gold-500/10 blur-3xl" />

          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-gold-300">
              Central Top 100
            </p>

            <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black leading-[0.95] text-white md:text-6xl">
              {studiedToday ? 'Missão em andamento.' : 'Comece pelo que importa.'}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              Hoje você não precisa decidir tudo. Execute a missão principal, ataque a prioridade e feche o mínimo diário.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigateToAction(false)} className="btn-gold flex items-center justify-center gap-2">
                <Play size={19} />
                Começar missão
              </button>

              <button onClick={() => onNavigate('profile')} className="btn-primary flex items-center justify-center gap-2">
                <Crosshair size={18} />
                Diagnóstico
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="card flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500">Dias</p>
              <p className="font-[Rajdhani,sans-serif] text-4xl font-black text-gold-300">{deadline.daysLeft}</p>
            </div>
            <Calendar size={24} className="text-gold-400" />
          </div>

          <div className="card flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500">Acerto</p>
              <p className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">{accuracy}%</p>
            </div>
            <TrendingUp size={24} className="text-pm-300" />
          </div>

          <div className="card flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500">Missões</p>
              <p className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">{completedCount}</p>
            </div>
            <BookOpen size={24} className="text-pm-300" />
          </div>

          <div className="card flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500">Campanha</p>
              <p className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">{campaignPct}%</p>
            </div>
            <Zap size={24} className="text-gold-400" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr]">
        <div className="card border-gold-500/25">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gold-400">Missão de agora</p>
          <h2 className="mt-2 font-[Rajdhani,sans-serif] text-2xl font-black text-white">
            {smartAction.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{smartAction.summary}</p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs font-bold text-pm-300">{smartAction.subjectIcon} {smartAction.subjectLabel}</p>
            <p className="mt-1 text-xs text-gray-500">{smartAction.reason}</p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
              <Timer size={12} /> {smartAction.minutes} min
            </span>
            <span className="flex items-center gap-1 rounded-full bg-gold-500/10 px-3 py-1 text-gold-300">
              <Zap size={12} /> +{smartAction.xpReward} XP
            </span>
          </div>

          <button onClick={() => navigateToAction(false)} className="btn-gold mt-5 w-full">
            Executar
          </button>
        </div>

        {topPriority && (
          <div className="card border-danger/35">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-danger">Prioridade Top 100</p>
            <h2 className="mt-2 font-[Rajdhani,sans-serif] text-2xl font-black text-white">
              {topPriority.icon} {topPriority.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{topPriority.reason}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase text-gray-500">Questões</p>
                <p className="text-lg font-black text-white">{topPriority.total}/{topPriority.questionCount}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase text-gray-500">Acerto</p>
                <p className="text-lg font-black text-white">{topPriority.total > 0 ? `${topPriority.pct}%` : 'sem dados'}</p>
              </div>
            </div>

            <p className="mt-4 text-sm font-bold text-pm-300">Próxima ação: {topPriority.action}</p>

            <button onClick={() => onNavigate('subject', { subjectId: topPriority.id })} className="btn-primary mt-5 w-full">
              Atacar prioridade
            </button>
          </div>
        )}

        <div className="card">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-pm-300">Mínimo diário</p>
              <h2 className="mt-1 font-[Rajdhani,sans-serif] text-xl font-black text-white">{dailyChecklist.title}</h2>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-black ${dailyChecklist.isComplete ? 'bg-success/15 text-success' : 'bg-white/5 text-gray-300'}`}>
              {dailyChecklist.completedCount}/{dailyChecklist.totalCount}
            </span>
          </div>

          <div className="space-y-2">
            {dailyChecklist.items.map(item => (
              <div key={item.id} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                {item.done ? <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success" /> : <Circle size={17} className="mt-0.5 shrink-0 text-gray-600" />}
                <div>
                  <p className={`text-sm font-bold ${item.done ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{item.label}</p>
                  <p className="text-[11px] text-gray-500">{item.hint}</p>
                </div>
              </div>
            ))}
          </div>

          {!dailyChecklist.isComplete && (
            <button onClick={markDailyMinimumDone} className="mt-4 w-full text-xs font-bold text-gray-400 hover:text-gold-400">
              Marcar mínimo feito fora do app
            </button>
          )}
        </div>
      </section>

      <section className="card">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-pm-300">Progresso</p>
            <h3 className="font-[Rajdhani,sans-serif] text-2xl font-black text-white">Mapa das matérias</h3>
          </div>
          <button onClick={() => onNavigate('subjects')} className="text-xs font-black text-gold-400 hover:text-gold-300">
            Ver todas
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
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:border-pm-400/40"
              >
                <p className="text-sm font-black text-white">{sub.icon} {sub.name}</p>
                <div className="progress-bar mt-3">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: sub.color }} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                  <span>{prog}/{sub.missions.length}</span>
                  <span>{stat?.total ? `${stat.pct}%` : 'sem dados'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

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
          <BookOpen size={22} className="mb-3 text-gold-400" />
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

      <button onClick={() => onNavigate('studyplan')} className="card flex w-full items-center justify-between">
        <span className="text-sm font-black text-white">📋 Plano de Estudos completo</span>
        <ChevronRight size={16} className="text-gray-500" />
      </button>
    </div>
  );
}
