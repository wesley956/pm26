import { subjects } from '../data/subjects';
import { getTheoryLesson } from '../data/theory';
import { useApp } from '../store';
import {
  CheckCircle2,
  Circle,
  Play,
  ChevronLeft,
  Clock,
  Zap,
  Brain,
  ShieldAlert,
  HelpCircle,
  BookOpen,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckSquare,
} from 'lucide-react';

interface Props {
  subjectId?: string;
  missionId?: string;
  onNavigate: (tab: string, data?: any) => void;
}

export function SubjectList({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  return (
    <div className="study-wide">
      <div className="mb-6">
        <p className="section-label mb-2">Biblioteca de estudo</p>
        <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Matérias</h1>
        <p className="study-subtitle mt-2">
          Escolha uma matéria para estudar teoria, revisar missões e praticar questões no seu ritmo.
        </p>
      </div>

      <div className="page-grid subject-grid">
        {subjects.map(sub => {
          const theoryCount = sub.missions.filter(mission => getTheoryLesson(mission.id)).length;

          return (
            <button
              key={sub.id}
              onClick={() => onNavigate('subject', { subjectId: sub.id })}
              className="study-card text-left transition hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl">
                  {sub.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-black text-white">{sub.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {sub.missions.length} missões • {sub.questionCount} questões
                  </p>

                  {theoryCount > 0 && (
                    <p className="mt-3 inline-flex rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-xs font-bold text-gold-400">
                      {theoryCount} aulas com teoria personalizada
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SubjectDetail({ subjectId, onNavigate }: Props) {
  const subject = subjects.find(s => s.id === subjectId);
  const { profile } = useApp();

  if (!subject) return <p>Matéria não encontrada.</p>;

  const completedInSubject = subject.missions.filter(m => profile.completedMissions.includes(m.id)).length;
  const pct = Math.round((completedInSubject / subject.missions.length) * 100);
  const theoryCount = subject.missions.filter(mission => getTheoryLesson(mission.id)).length;

  return (
    <div className="study-wide">
      <button onClick={() => onNavigate('subjects')} className="study-back">
        <ChevronLeft size={16} /> Matérias
      </button>

      <div className="study-card mb-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-4xl">
              {subject.icon}
            </div>

            <div>
              <p className="section-label mb-1">Plano da matéria</p>
              <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">{subject.name}</h1>
              <p className="mt-1 text-sm text-slate-400">
                {completedInSubject}/{subject.missions.length} missões concluídas
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('questions', { subjectId: subject.id })}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Play size={16} /> Praticar questões
          </button>
        </div>

        <div className="xp-bar-wrap mt-5">
          <div className="xp-bar-fill" style={{ width: `${pct}%`, background: subject.color }} />
        </div>
      </div>

      {theoryCount > 0 && (
        <div className="reading-callout mb-5">
          <p className="font-bold text-white">Teoria personalizada disponível</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {theoryCount}/{subject.missions.length} missões desta matéria têm explicação no seu estilo: simples, com exemplo do seu mundo, pegadinhas e foco Vunesp.
          </p>
        </div>
      )}

      <div className="grid gap-3">
        {subject.missions.map((mission, idx) => {
          const done = profile.completedMissions.includes(mission.id);
          const theory = getTheoryLesson(mission.id);

          return (
            <button
              key={mission.id}
              onClick={() => onNavigate('mission', { missionId: mission.id, subjectId: subject.id })}
              className={`study-card text-left transition hover:-translate-y-0.5 ${done ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 shrink-0">
                  {done ? <CheckCircle2 size={26} className="text-success" /> : <Circle size={26} className="text-slate-600" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-slate-400">
                      Missão {idx + 1}
                    </span>
                    {idx === 0 && !done && (
                      <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-2.5 py-1 text-xs font-bold text-gold-400">
                        começar aqui
                      </span>
                    )}
                    {theory && (
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-pm-300">
                        teoria personalizada
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg font-black ${done ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {mission.title}
                  </h3>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">{mission.summary}</p>
                </div>

                <div className="hidden shrink-0 text-right md:block">
                  <div className="flex items-center justify-end gap-1 text-xs text-slate-500">
                    <Clock size={12} /> {mission.duration} min
                  </div>
                  <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gold-400">
                    <Zap size={12} /> +{mission.xpReward} XP
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StudySection({
  tone = 'blue',
  icon,
  title,
  children,
}: {
  tone?: 'blue' | 'gold' | 'red' | 'green' | 'orange';
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === 'gold' ? 'study-block-gold' :
    tone === 'red' ? 'study-block-alert' :
    tone === 'green' ? 'study-block-success' :
    '';

  return (
    <section className={`study-block ${toneClass}`}>
      <h3 className={`study-kicker ${tone}`}>
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

export function MissionView({ missionId, subjectId, onNavigate }: Props) {
  const subject = subjects.find(s => s.id === subjectId);
  const mission = subject?.missions.find(m => m.id === missionId);
  const { profile, completeMission, addXP, updateStreak } = useApp();

  if (!mission || !subject) return <p>Missão não encontrada.</p>;

  const done = profile.completedMissions.includes(mission.id);
  const theory = getTheoryLesson(mission.id);

  const handleComplete = () => {
    if (!done) {
      completeMission(mission.id);
      addXP(mission.xpReward);
      updateStreak();
    }
    onNavigate('subject', { subjectId: subject.id });
  };

  return (
    <div className="study-shell animate-fade-in">
      <button onClick={() => onNavigate('subject', { subjectId: subject.id })} className="study-back">
        <ChevronLeft size={16} /> {subject.name}
      </button>

      <div className="study-meta">
        <span>{subject.icon} {subject.name}</span>
        <span>•</span>
        <span className="flex items-center gap-1"><Clock size={14} /> {mission.duration} min</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-gold-400"><Zap size={14} /> +{mission.xpReward} XP</span>
      </div>

      <h1 className="study-title">{mission.title}</h1>

      <div className="study-card study-block-main">
        <h3 className="study-kicker gold">
          <BookOpen size={16} />
          Resumo
        </h3>
        <p className="study-body">{mission.summary}</p>
      </div>

      {theory ? (
        <article className="study-article">
          <StudySection title="Missão da aula" icon={<Target size={16} />}>
            <p className="study-body">{theory.missionBrief}</p>
          </StudySection>

          <StudySection tone="gold" title="Explicação simples" icon={<Brain size={16} />}>
            <p className="study-body">{theory.dumbMode}</p>
          </StudySection>

          <StudySection title="Exemplo do seu mundo" icon={<Lightbulb size={16} />}>
            <p className="study-body">{theory.analogy}</p>
          </StudySection>

          <StudySection tone="red" title="Modo prova / Vunesp" icon={<ShieldAlert size={16} />}>
            <p className="study-body">{theory.vunespMode}</p>
          </StudySection>

          <StudySection tone="orange" title="Pegadinhas" icon={<AlertTriangle size={16} />}>
            <ul className="study-list">
              {theory.traps.map((trap, i) => (
                <li key={i}>
                  <span className="study-bullet">{i + 1}</span>
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </StudySection>

          <StudySection tone="gold" title="Macete" icon={<Zap size={16} />}>
            <p className="study-body study-strong">{theory.memoryHook}</p>
          </StudySection>

          <StudySection title="Mini missão" icon={<CheckSquare size={16} />}>
            <p className="study-body">{theory.miniMission}</p>
          </StudySection>

          <StudySection tone="green" title="Se cair na prova" icon={<CheckCircle2 size={16} />}>
            <p className="study-body">{theory.finalReminder}</p>
          </StudySection>

          <details className="study-block">
            <summary className="study-kicker cursor-pointer">
              <HelpCircle size={16} />
              Não entendi — explica mais simples
            </summary>
            <p className="study-body mt-3">{theory.notUnderstood}</p>
          </details>
        </article>
      ) : (
        <article className="study-article">
          <StudySection title="Conteúdo" icon={<BookOpen size={16} />}>
            <p className="study-body">{mission.content}</p>
          </StudySection>

          {mission.examples.length > 0 && (
            <StudySection title="Exemplos" icon={<Lightbulb size={16} />}>
              <ul className="study-list">
                {mission.examples.map((ex, i) => (
                  <li key={i}>
                    <span className="study-bullet">{i + 1}</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </StudySection>
          )}
        </article>
      )}

      <div className="study-actions">
        {done ? (
          <div className="study-complete rounded-xl p-4">
            <CheckCircle2 size={28} className="mx-auto mb-2 text-success" />
            <p className="font-bold text-success">Missão concluída</p>
            <p className="text-xs text-slate-500">+{mission.xpReward} XP ganhos</p>
          </div>
        ) : (
          <button onClick={handleComplete} className="btn-gold w-full py-4 text-base">
            Marcar como concluído — +{mission.xpReward} XP
          </button>
        )}

        <button onClick={() => onNavigate('questions', { subjectId: subject.id })} className="btn-primary w-full py-4 text-base">
          Praticar questões desta matéria
        </button>
      </div>
    </div>
  );
}
