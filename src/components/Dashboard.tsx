import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { getPrimaryDeadlineInfo, getSubjectProgress, getLevelInfo, getMedalDefinitions } from '../utils';
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
  BookOpen,
  TrendingUp,
  Trophy,
  Pencil,
  Dumbbell,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Award,
  ClipboardCheck,
} from 'lucide-react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, setBadDayMode } = useApp();

  const deadline = getPrimaryDeadlineInfo();
  const smartAction = chooseSmartStudyAction(profile);
  const dailyChecklist = buildDailyChecklist(profile);
  const levelInfo = getLevelInfo(profile);
  const medals = getMedalDefinitions();

  const completedCount = profile.completedMissions.length;
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const totalQuestions = questions.length;
  const totalMissions = subjects.reduce((sum, sub) => sum + sub.missions.length, 0);

  const subjectStats = subjects.map(sub => {
    const prefix =
      sub.id === 'portugues' ? 'pt' :
      sub.id === 'matematica' ? 'mt' :
      sub.id === 'gerais' ? 'cg' :
      sub.id === 'informatica' ? 'inf' :
      'ap';

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
      (sub.id === 'portugues' ? 20 :
        sub.id === 'matematica' ? 16 :
        sub.id === 'gerais' ? 16 :
        sub.id === 'administracao' ? 12 :
        6);

    const reason =
      total < 5 ? 'poucos dados de treino' :
      pct < 60 ? 'acerto baixo para top 100' :
      missionProgress < sub.missions.length ? 'teoria pendente' :
      'manter revisão';

    return { ...sub, total, correct, pct, missionProgress, questionCount, priorityScore, reason };
  });

  const topPriority = [...subjectStats].sort((a, b) => b.priorityScore - a.priorityScore)[0];

  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = profile.lastStudyDate === today;
  const missionProgress = Math.round((completedCount / Math.max(1, totalMissions)) * 100);
  const questionProgress = Math.round((totalAnswered / Math.max(1, totalQuestions)) * 100);

  const navigateToAction = (useBadDayMode = false) => {
    const action = useBadDayMode
      ? chooseSmartStudyAction({ ...profile, studyDayMode: 'bad_day' })
      : smartAction;

    if (useBadDayMode) setBadDayMode(true);

    if (action.kind === 'mission' && action.missionId && action.subjectId) {
      onNavigate('mission', { missionId: action.missionId, subjectId: action.subjectId });
      return;
    }

    if (action.kind === 'questions') {
      if (action.subjectId && action.topic) {
        sessionStorage.setItem('pm-sp-topic-filter', JSON.stringify({
          subjectId: action.subjectId,
          topic: action.topic,
        }));
      }

      onNavigate('questions', { subjectId: action.subjectId, topic: action.topic });
      return;
    }

    if (action.kind === 'review') {
      onNavigate('review');
      return;
    }

    onNavigate('simulados');
  };

  return (
    <div className="dashboard-readable study-wide">
      <section className="study-card mb-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-pm-300">
                Próxima ação
              </span>

              <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                studiedToday
                  ? 'border border-success/20 bg-success/10 text-success'
                  : 'border border-gold-500/20 bg-gold-500/10 text-gold-400'
              }`}>
                {studiedToday ? 'dia iniciado' : 'aguardando início'}
              </span>
            </div>

            <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black leading-tight text-white md:text-5xl">
              {smartAction.title}
            </h1>

            <p className="study-subtitle mt-3">
              {smartAction.summary}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>{smartAction.subjectIcon} {smartAction.subjectLabel ?? 'Plano automático'}</span>
              <span>•</span>
              <span>{smartAction.minutes} min</span>
              <span>•</span>
              <span className="text-gold-400">+{smartAction.xpReward} XP</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px] lg:grid-cols-1">
            <button
              onClick={() => navigateToAction(false)}
              className="btn-gold flex w-full items-center justify-center gap-2 py-4 text-base"
            >
              <Play size={18} />
              Executar agora
            </button>

            <button
              onClick={() => navigateToAction(true)}
              className="btn-ghost flex w-full items-center justify-center gap-2 py-4 text-base"
            >
              <AlertTriangle size={18} />
              Dia ruim — 10 min
            </button>
          </div>
        </div>
      </section>

      {topPriority && (
        <section className="study-card mb-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="study-kicker red">
                <Target size={16} />
                Prioridade para top 100
              </p>

              <h2 className="text-2xl font-black text-white">
                {topPriority.icon} {topPriority.name}
              </h2>

              <p className="mt-2 text-base leading-relaxed text-slate-400">
                Motivo: {topPriority.reason}. Foque nisso antes de espalhar energia em outras telas.
              </p>
            </div>

            <button
              onClick={() => onNavigate('subject', { subjectId: topPriority.id })}
              className="btn-primary shrink-0 py-4 text-base"
            >
              Atacar prioridade
            </button>
          </div>
        </section>
      )}

      <section className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="metric-card">
          <Calendar size={22} className="mx-auto mb-3 text-pm-300" />
          <p className="metric-value">{deadline.daysLeft}</p>
          <p className="metric-label">dias restantes</p>
        </div>

        <div className="metric-card">
          <ClipboardCheck size={22} className="mx-auto mb-3 text-gold-400" />
          <p className="metric-value text-gold-400">{dailyChecklist.completedCount}/{dailyChecklist.totalCount}</p>
          <p className="metric-label">checklist diário</p>
        </div>

        <div className="metric-card">
          <Flame size={22} className="mx-auto mb-3 text-orange-300" />
          <p className="metric-value text-orange-300">{profile.streak}</p>
          <p className="metric-label">dias de sequência</p>
        </div>
      </section>

      <section className="mb-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="study-card">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="study-kicker">
                <TrendingUp size={16} />
                Progresso geral
              </p>
              <h2 className="text-2xl font-black text-white">Resumo do treino</h2>
            </div>

            <button onClick={() => onNavigate('profile')} className="btn-ghost text-sm">
              Ver diagnóstico
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="list-card">
              <p className="text-sm text-slate-500">Questões</p>
              <p className="mt-1 text-2xl font-black text-white">{totalAnswered}/{totalQuestions}</p>
              <div className="xp-bar-wrap mt-3">
                <div className="xp-bar-fill" style={{ width: `${questionProgress}%` }} />
              </div>
            </div>

            <div className="list-card">
              <p className="text-sm text-slate-500">Acerto</p>
              <p className={`mt-1 text-2xl font-black ${
                accuracy >= 70 ? 'text-success' :
                accuracy >= 50 ? 'text-gold-400' :
                'text-danger'
              }`}>
                {accuracy}%
              </p>
              <p className="mt-3 text-sm text-slate-500">{correctCount} acertos registrados</p>
            </div>

            <div className="list-card">
              <p className="text-sm text-slate-500">Missões</p>
              <p className="mt-1 text-2xl font-black text-white">{completedCount}/{totalMissions}</p>
              <div className="xp-bar-wrap mt-3">
                <div className="xp-bar-fill" style={{ width: `${missionProgress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="study-card">
          <p className="study-kicker gold">
            <ShieldCheck size={16} />
            Patente
          </p>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gold-500/20 bg-gold-500/10 text-3xl">
              {levelInfo.icon}
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl font-black text-white">{levelInfo.title}</h2>
              <p className="text-sm text-slate-500">Nível {levelInfo.level} • {profile.xp} XP total</p>
            </div>
          </div>

          <div className="xp-bar-wrap mt-4">
            <div className="xp-bar-fill" style={{ width: `${levelInfo.progress}%` }} />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {levelInfo.xpInLevel}/{levelInfo.xpForNext} XP para o próximo nível
          </p>
        </div>
      </section>

      <section className="mb-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="study-card">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="study-kicker">
                <BookOpen size={16} />
                Matérias
              </p>
              <h2 className="text-2xl font-black text-white">Mapa de desempenho</h2>
            </div>

            <button onClick={() => onNavigate('subjects')} className="btn-ghost text-sm">
              Ver aulas
            </button>
          </div>

          <div className="grid gap-4">
            {subjectStats.map(s => {
              const questionPct = s.questionCount > 0 ? Math.round((s.total / s.questionCount) * 100) : 0;
              const theoryPct = Math.round((s.missionProgress / s.missions.length) * 100);

              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate('subject', { subjectId: s.id })}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-black text-white">{s.icon} {s.name}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-500">{s.total}/{s.questionCount} questões</span>
                      <span style={{ color: s.color }} className="font-black">
                        {s.total > 0 ? `${s.pct}%` : 'sem dados'}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <div className="mb-1 text-xs text-slate-500">Teoria {theoryPct}%</div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${theoryPct}%`, background: s.color }} />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 text-xs text-slate-500">Questões {questionPct}%</div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${questionPct}%`, background: s.color }} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="study-card">
            <p className="study-kicker gold">
              <Award size={16} />
              Medalhas reais
            </p>

            <div className="grid grid-cols-4 gap-2">
              {medals.slice(0, 8).map(medal => {
                const earned = profile.medals.some(m => m.id === medal.id);

                return (
                  <div
                    key={medal.id}
                    className={`tooltip flex flex-col items-center gap-1 rounded-xl border p-2 text-center ${
                      earned
                        ? 'border-gold-500/25 bg-gold-500/10'
                        : 'border-white/10 bg-white/[0.02] opacity-55 grayscale'
                    }`}
                  >
                    <span className="text-2xl">{earned ? medal.icon : <Lock size={20} />}</span>
                    <div className="tooltip-box">
                      {earned ? medal.name : `Bloqueada: ${medal.name}`}
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => onNavigate('profile')} className="btn-ghost mt-4 w-full text-sm">
              Ver todas no perfil
            </button>
          </div>

          <div className="study-card">
            <p className="study-kicker">Atalhos</p>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button className="btn-primary justify-center text-sm" onClick={() => onNavigate('studyplan')}>
                <CheckCircle2 size={15} /> Checklist
              </button>
              <button className="btn-primary justify-center text-sm" onClick={() => onNavigate('review')}>
                <RotateCcw size={15} /> Revisão
              </button>
              <button className="btn-gold justify-center text-sm" onClick={() => onNavigate('simulados')}>
                <Trophy size={15} /> Simulado
              </button>
              <button className="btn-ghost justify-center text-sm" onClick={() => onNavigate('essay')}>
                <Pencil size={15} /> Redação
              </button>
              <button className="btn-ghost justify-center text-sm" onClick={() => onNavigate('taf')}>
                <Dumbbell size={15} /> TAF
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
