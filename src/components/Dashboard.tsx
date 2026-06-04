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
  Timer,
  AlertTriangle,
  CheckCircle2,
  Circle,
  TrendingUp,
  Crosshair,
  Radio,
  Radar,
  RotateCcw,
  Pencil,
  Dumbbell,
  Brain,
  ChevronRight,
  ShieldCheck,
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

    const priorityScore =
      (total < 5 ? 30 : 0) +
      (total > 0 ? Math.max(0, 75 - pct) : 25) +
      Math.max(0, sub.missions.length - missionProgress) * 3 +
      (sub.id === 'portugues' ? 20 : sub.id === 'matematica' ? 16 : sub.id === 'gerais' ? 16 : sub.id === 'administracao' ? 12 : 6);

    const reason =
      total < 5 ? 'Poucos dados. Gere treino para calibrar o sistema.' :
      pct < 60 ? 'Acerto baixo. Reforce teoria e questões.' :
      missionProgress < sub.missions.length ? 'Teoria premium pendente.' :
      'Manter revisão.';

    return { ...sub, total, correct, pct, missionProgress, questionCount, priorityScore, reason };
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
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="os-panel min-h-[430px] p-5 md:p-7">
          <div className="relative z-10 grid h-full gap-6 lg:grid-cols-[1fr_280px]">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-pm-400/20 bg-pm-400/10 px-3 py-1 os-kicker text-pm-300">
                    <Radio size={13} /> RECRUIT OS
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 os-kicker ${studiedToday ? 'border-success/25 bg-success/10 text-success' : 'border-gold-500/25 bg-gold-500/10 text-gold-400'}`}>
                    <ShieldCheck size={13} /> {studiedToday ? 'DIA INICIADO' : 'AGUARDANDO EXECUÇÃO'}
                  </span>
                </div>

                <h1 className="max-w-3xl font-[Rajdhani,sans-serif] text-5xl font-black leading-[.88] tracking-tight text-white md:text-7xl">
                  {studiedToday ? 'Continue a operação.' : 'Ative a próxima missão.'}
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#86a3bd] md:text-base">
                  O sistema já escolheu o próximo movimento. Você só precisa executar, registrar e repetir.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="os-tile p-4">
                  <Calendar size={18} className="mb-2 text-pm-400" />
                  <p className="os-mono text-3xl font-black text-white">{deadline.daysLeft}</p>
                  <p className="text-[11px] text-[#66809a]">dias restantes</p>
                </div>
                <div className="os-tile p-4">
                  <TrendingUp size={18} className="mb-2 text-gold-500" />
                  <p className="os-mono text-3xl font-black text-white">{accuracy}%</p>
                  <p className="text-[11px] text-[#66809a]">acerto geral</p>
                </div>
                <div className="os-tile p-4">
                  <Flame size={18} className="mb-2 text-danger" />
                  <p className="os-mono text-3xl font-black text-white">{profile.streak}</p>
                  <p className="text-[11px] text-[#66809a]">sequência</p>
                </div>
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              <div className="absolute h-64 w-64 rounded-full border border-pm-400/15" />
              <div className="absolute h-48 w-48 rounded-full border border-gold-500/15" />
              <div className="absolute h-32 w-32 rounded-full border border-pm-400/20" />
              <div className="hex flex h-28 w-28 items-center justify-center bg-pm-400 text-pm-900 shadow-[0_0_44px_rgba(24,227,255,.22)]">
                <Radar size={44} />
              </div>
            </div>
          </div>
        </div>

        <div className="os-panel p-5">
          <p className="os-kicker text-gold-400">MISSÃO PRINCIPAL</p>
          <h2 className="mt-4 font-[Rajdhani,sans-serif] text-4xl font-black leading-[.95] text-white">
            {smartAction.title}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#86a3bd]">{smartAction.summary}</p>

          <div className="os-tile mt-5 p-4">
            <p className="text-xs font-black text-pm-300">{smartAction.subjectIcon} {smartAction.subjectLabel}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#66809a]">{smartAction.reason}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1 text-xs text-[#86a3bd] os-mono">
              <Timer size={12} className="mr-1 inline" /> {smartAction.minutes}MIN
            </span>
            <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-xs text-gold-400 os-mono">
              +{smartAction.xpReward}XP
            </span>
          </div>

          <button onClick={() => navigateToAction(false)} className="btn-gold mt-6 w-full">
            <Play size={18} /> Iniciar agora
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[.85fr_.85fr_1.3fr]">
        {topPriority && (
          <div className="os-panel p-5">
            <p className="os-kicker text-danger">ALVO CRÍTICO</p>
            <h3 className="mt-3 font-[Rajdhani,sans-serif] text-4xl font-black text-white">
              {topPriority.icon} {topPriority.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#86a3bd]">{topPriority.reason}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="os-tile p-3">
                <p className="os-kicker text-[#66809a]">QUESTÕES</p>
                <p className="mt-1 os-mono text-2xl font-black text-white">{topPriority.total}/{topPriority.questionCount}</p>
              </div>
              <div className="os-tile p-3">
                <p className="os-kicker text-[#66809a]">TEORIA</p>
                <p className="mt-1 os-mono text-2xl font-black text-white">{topPriority.missionProgress}/{topPriority.missions.length}</p>
              </div>
            </div>

            <button onClick={() => onNavigate('subject', { subjectId: topPriority.id })} className="btn-primary mt-5 w-full">
              <Crosshair size={17} /> Atacar alvo
            </button>
          </div>
        )}

        <div className="os-panel p-5">
          <p className="os-kicker text-pm-300">PROTOCOLO DIÁRIO</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="font-[Rajdhani,sans-serif] text-5xl font-black text-white">{dailyChecklist.completedCount}/{dailyChecklist.totalCount}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${dailyChecklist.isComplete ? 'bg-success/10 text-success' : 'bg-white/[.04] text-[#86a3bd]'}`}>
              {dailyChecklist.isComplete ? 'OK' : 'PENDENTE'}
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {dailyChecklist.items.map(item => (
              <div key={item.id} className="flex items-start gap-3">
                {item.done ? <CheckCircle2 size={18} className="mt-0.5 text-success" /> : <Circle size={18} className="mt-0.5 text-[#506986]" />}
                <div>
                  <p className={`text-sm font-bold ${item.done ? 'text-[#506986] line-through' : 'text-[#d7ecff]'}`}>{item.label}</p>
                  <p className="text-[11px] text-[#506986]">{item.hint}</p>
                </div>
              </div>
            ))}
          </div>

          {!dailyChecklist.isComplete && (
            <button onClick={markDailyMinimumDone} className="btn-ghost mt-5 w-full">
              Marcar mínimo feito
            </button>
          )}
        </div>

        <div className="os-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="os-kicker text-pm-300">MAPA DE MATÉRIAS</p>
            <button onClick={() => onNavigate('subjects')} className="flex items-center gap-1 text-xs font-black text-pm-400">
              ver tudo <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {subjects.map(sub => {
              const prog = getSubjectProgress(sub.id, profile.completedMissions);
              const pct = Math.round((prog / sub.missions.length) * 100);
              const stat = subjectStats.find(s => s.id === sub.id);

              return (
                <button key={sub.id} onClick={() => onNavigate('subject', { subjectId: sub.id })} className="group flex w-full items-center gap-3 rounded-2xl bg-white/[.025] p-3 text-left hover:bg-white/[.045]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-sm">{sub.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <p className="truncate text-sm font-black text-white">{sub.name}</p>
                      <span className="text-[10px] text-[#66809a] os-mono">{prog}/{sub.missions.length}</span>
                    </div>
                    <div className="progress-bar mt-2">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: sub.color }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-[#506986] os-mono">
                      <span>{pct}% teoria</span>
                      <span>{stat?.total ? `${stat.pct}% acerto` : 'sem dados'}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <button onClick={() => onNavigate('simulados')} className="os-tile p-4 text-left">
          <Target size={22} className="mb-3 text-pm-400" />
          <p className="font-black text-white">Simulados</p>
          <p className="text-xs text-[#66809a]">Treino de prova</p>
        </button>
        <button onClick={() => onNavigate('review')} className="os-tile p-4 text-left">
          <RotateCcw size={22} className="mb-3 text-danger" />
          <p className="font-black text-white">Revisão</p>
          <p className="text-xs text-[#66809a]">{profile.wrongQuestions.length} erros pendentes</p>
        </button>
        <button onClick={() => onNavigate('essay')} className="os-tile p-4 text-left">
          <Pencil size={22} className="mb-3 text-gold-500" />
          <p className="font-black text-white">Redação</p>
          <p className="text-xs text-[#66809a]">Estrutura e temas</p>
        </button>
        <button onClick={() => onNavigate('taf')} className="os-tile p-4 text-left">
          <Dumbbell size={22} className="mb-3 text-success" />
          <p className="font-black text-white">TAF</p>
          <p className="text-xs text-[#66809a]">Condicionamento</p>
        </button>
      </section>

      {!studiedToday && (
        <button onClick={() => navigateToAction(true)} className="btn-ghost w-full">
          <AlertTriangle size={14} /> Dia ruim: 10 minutos
        </button>
      )}
    </div>
  );
}
