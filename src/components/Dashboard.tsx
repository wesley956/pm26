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
  Radio,
  Map,
  RotateCcw,
  Pencil,
  Dumbbell,
  HelpCircle,
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
      total < 5 ? 'Poucos dados de questões. Prioridade automática por peso estratégico.' :
      pct < 60 ? 'Acerto baixo para top 100. Reforce teoria e questões.' :
      missionProgress < sub.missions.length ? 'Teoria premium ainda precisa ser concluída.' :
      'Manter revisão curta para não perder desempenho.';

    const action =
      missionProgress < sub.missions.length ? 'Abrir teoria' :
      pct < 70 ? 'Treinar questões' :
      'Revisar';

    return { ...sub, total, correct, pct, missionProgress, questionCount, priorityScore, reason, action };
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

  return (
    <div className="mx-auto max-w-[1180px] space-y-3">
      <section className="cyber-card p-5">
        <div className="absolute right-4 top-4 hidden text-[10px] text-pm-400/50 counter md:block">SYS-ARENA-01</div>

        <div className="mb-2 flex items-center gap-1.5 kicker text-pm-400">
          <Radio size={13} />
          Central Top 100
        </div>

        <h1 className="max-w-2xl text-[28px] font-black leading-tight text-white md:text-[34px]">
          {studiedToday ? 'Missão em andamento.' : 'Comece pelo que importa.'}
        </h1>

        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#7a99b8] md:text-sm">
          Execute a missão principal, ataque a prioridade e feche o mínimo diário. Você não precisa decidir tudo agora.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-primary" onClick={() => navigateToAction(false)}>
            <Play size={16} />
            Começar missão
          </button>
          <button className="btn-ghost" onClick={() => onNavigate('profile')}>
            <Crosshair size={16} />
            Diagnóstico
          </button>
          {!studiedToday && (
            <button className="btn-ghost hover:!border-danger hover:!text-danger" onClick={() => navigateToAction(true)}>
              <AlertTriangle size={16} />
              Dia ruim
            </button>
          )}
        </div>
      </section>

      <section className="grid gap-2 md:grid-cols-4">
        <div className="cyber-card p-3">
          <Calendar size={18} className="mb-2 text-pm-400" />
          <p className="counter text-2xl font-black text-white">{deadline.daysLeft}</p>
          <p className="text-[11px] text-[#7a99b8]">Dias até a prova</p>
        </div>
        <div className="cyber-card p-3">
          <TrendingUp size={18} className="mb-2 text-gold-500" />
          <p className="counter text-2xl font-black text-white">{accuracy}%</p>
          <p className="text-[11px] text-[#7a99b8]">Taxa de acerto</p>
        </div>
        <div className="cyber-card p-3">
          <CheckCircle2 size={18} className="mb-2 text-success" />
          <p className="counter text-2xl font-black text-white">{completedCount}</p>
          <p className="text-[11px] text-[#7a99b8]">Missões completas</p>
        </div>
        <div className="cyber-card p-3">
          <Flame size={18} className="mb-2 text-danger" />
          <p className="counter text-2xl font-black text-white">{profile.streak}</p>
          <p className="text-[11px] text-[#7a99b8]">Dias de sequência</p>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <div className="panel">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 kicker text-[#7a99b8]">
              <Zap size={14} />
              Missão de agora
            </div>
            <span className="rounded-full bg-[#2a1f05] px-2 py-1 text-[10px] font-black text-gold-500 counter">
              +{smartAction.xpReward} XP
            </span>
          </div>

          <div className="mb-3 rounded-lg border border-[#0c1e32] bg-[#060e1a] p-3">
            <p className="mb-1 text-xs font-bold text-pm-400">{smartAction.subjectIcon} {smartAction.subjectLabel}</p>
            <p className="text-sm font-black text-white">{smartAction.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#7a99b8]">{smartAction.summary}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded bg-[#0f2540] px-2 py-1 text-[10px] text-[#7a99b8] counter">
                <Timer size={10} className="mr-1 inline" /> {smartAction.minutes} min
              </span>
              <span className="rounded bg-[#0f2540] px-2 py-1 text-[10px] text-[#7a99b8] counter">
                Prioridade auto
              </span>
            </div>
          </div>

          {topPriority && (
            <>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#2a0510] px-2 py-1 text-[10px] font-black text-danger counter">
                <AlertTriangle size={11} />
                Prioridade #1 — {topPriority.name}
              </div>
              <p className="mb-3 text-[11px] leading-relaxed text-[#7a99b8]">{topPriority.reason}</p>
            </>
          )}

          <button className="btn-primary w-full" onClick={() => navigateToAction(false)}>
            <Zap size={16} />
            Executar missão
          </button>
        </div>

        <div className="panel">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 kicker text-[#7a99b8]">
              <CheckCircle2 size={14} />
              Mínimo diário
            </div>
            <span className="rounded-full bg-[#0d2d45] px-2 py-1 text-[10px] font-black text-pm-400 counter">
              {dailyChecklist.completedCount}/{dailyChecklist.totalCount}
            </span>
          </div>

          <div>
            {dailyChecklist.items.map(item => (
              <div key={item.id} className="flex items-start gap-2 border-b border-[#0a1828] py-2 last:border-b-0">
                <div className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border ${
                  item.done ? 'border-success bg-success' : 'border-[#1a3050]'
                }`}>
                  {item.done && <CheckCircle2 size={12} className="text-[#04080f]" />}
                </div>

                <div>
                  <p className={`text-xs font-bold ${item.done ? 'text-[#4a6080] line-through' : 'text-[#c8dff0]'}`}>
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#4a6080] counter">{item.hint}</p>
                </div>
              </div>
            ))}
          </div>

          {!dailyChecklist.isComplete && (
            <button className="btn-ghost mt-3 w-full" onClick={markDailyMinimumDone}>
              Marcar feito fora do app
            </button>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 kicker text-[#7a99b8]">
            <Map size={14} />
            Mapa de matérias
          </div>
          <button className="flex items-center gap-1 text-[11px] font-bold text-pm-400 counter" onClick={() => onNavigate('subjects')}>
            ver todas
            <ChevronRight size={13} />
          </button>
        </div>

        <div>
          {subjects.map(sub => {
            const prog = getSubjectProgress(sub.id, profile.completedMissions);
            const pct = Math.round((prog / sub.missions.length) * 100);
            const stat = subjectStats.find(s => s.id === sub.id);

            return (
              <button
                key={sub.id}
                onClick={() => onNavigate('subject', { subjectId: sub.id })}
                className="flex w-full items-center gap-3 border-b border-[#0a1828] py-2.5 text-left transition hover:pl-1 last:border-b-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#0f2540] bg-[#0a1828] text-sm">
                  {sub.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-[#c8dff0]">{sub.name}</p>
                  <div className="progress-bar mt-1">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: sub.color }} />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-[#4a6080] counter">
                    <span>{prog}/{sub.missions.length} missões</span>
                    <span>{stat?.total ? `${stat.pct}% acerto` : 'sem dados'}</span>
                  </div>
                </div>

                <ChevronRight size={14} className="text-[#4a6080]" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-2 md:grid-cols-4">
        <button className="cyber-card p-3 text-left hover:!border-[#1a3a60]" onClick={() => onNavigate('simulados')}>
          <Target size={21} className="mb-2 text-pm-400" />
          <p className="text-xs font-black text-[#c8dff0]">Simulados</p>
          <p className="text-[10px] text-[#4a6080]">Treino de prova</p>
        </button>

        <button className="cyber-card p-3 text-left hover:!border-[#1a3a60]" onClick={() => onNavigate('review')}>
          <RotateCcw size={21} className="mb-2 text-danger" />
          <p className="text-xs font-black text-[#c8dff0]">Revisão</p>
          <p className="text-[10px] text-[#4a6080]">{profile.wrongQuestions.length} erros pendentes</p>
        </button>

        <button className="cyber-card p-3 text-left hover:!border-[#1a3a60]" onClick={() => onNavigate('essay')}>
          <Pencil size={21} className="mb-2 text-gold-500" />
          <p className="text-xs font-black text-[#c8dff0]">Redação</p>
          <p className="text-[10px] text-[#4a6080]">Estrutura e temas</p>
        </button>

        <button className="cyber-card p-3 text-left hover:!border-[#1a3a60]" onClick={() => onNavigate('taf')}>
          <Dumbbell size={21} className="mb-2 text-success" />
          <p className="text-xs font-black text-[#c8dff0]">TAF</p>
          <p className="text-[10px] text-[#4a6080]">Condicionamento</p>
        </button>
      </section>
    </div>
  );
}
