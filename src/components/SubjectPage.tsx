import { subjects } from '../data/subjects';
import { getTheoryLesson } from '../data/theory';
import { useApp } from '../store';
import { CheckCircle2, Circle, Play, ChevronLeft, Clock, Zap, Brain, ShieldAlert, HelpCircle } from 'lucide-react';

interface Props {
  subjectId?: string;
  missionId?: string;
  onNavigate: (tab: string, data?: any) => void;
}

export function SubjectList({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">📚 Matérias</h1>
      <p className="text-sm text-gray-400">Cada matéria é um mundo. Complete as missões para avançar.</p>
      <div className="space-y-3">
        {subjects.map(sub => {
          const theoryCount = sub.missions.filter(mission => getTheoryLesson(mission.id)).length;

          return (
            <button
              key={sub.id}
              onClick={() => onNavigate('subject', { subjectId: sub.id })}
              className="card w-full text-left hover:border-pm-400 transition-all flex items-center gap-4"
            >
              <div className="text-3xl">{sub.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{sub.name}</h3>
                <p className="text-xs text-gray-500">{sub.missions.length} missões • {sub.questionCount} questões</p>
                {theoryCount > 0 && (
                  <p className="text-[11px] text-gold-400 mt-1">🧠 {theoryCount} aulas com teoria personalizada</p>
                )}
              </div>
              <ChevronLeft size={16} className="text-gray-600 rotate-180" />
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
    <div className="space-y-4">
      <button onClick={() => onNavigate('subjects')} className="text-sm text-pm-300 flex items-center gap-1">
        <ChevronLeft size={16} /> Matérias
      </button>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{subject.icon}</span>
        <div>
          <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">{subject.name}</h1>
          <p className="text-xs text-gray-400">{completedInSubject}/{subject.missions.length} missões concluídas</p>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${pct}%`, background: subject.color }} />
      </div>

      {theoryCount > 0 && (
        <div className="card border-l-4 border-gold-500">
          <p className="text-xs font-bold text-gold-400">🧠 TEORIA PERSONALIZADA</p>
          <p className="text-sm text-gray-300 mt-1">
            {theoryCount}/{subject.missions.length} missões desta matéria já têm explicação no seu estilo: modo burro, exemplo do seu mundo, pegadinhas e modo Vunesp.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {subject.missions.map((mission, idx) => {
          const done = profile.completedMissions.includes(mission.id);
          const theory = getTheoryLesson(mission.id);

          return (
            <button
              key={mission.id}
              onClick={() => onNavigate('mission', { missionId: mission.id, subjectId: subject.id })}
              className={`card w-full text-left flex items-center gap-3 transition-all ${
                done ? 'border-success/30 opacity-80' : 'hover:border-pm-400'
              }`}
            >
              <div className="shrink-0">
                {done ? <CheckCircle2 size={24} className="text-success" /> : <Circle size={24} className="text-gray-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500">Missão {idx + 1}</span>
                  {idx === 0 && !done && <span className="text-[10px] bg-gold-500/20 text-gold-400 px-1.5 py-0.5 rounded">COMEÇAR AQUI</span>}
                  {theory && <span className="text-[10px] bg-pm-500/20 text-pm-300 px-1.5 py-0.5 rounded">🧠 TEORIA PREMIUM</span>}
                </div>
                <h3 className={`text-sm font-semibold ${done ? 'text-gray-400 line-through' : 'text-white'}`}>{mission.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{mission.summary}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-[10px] text-gray-500"><Clock size={10} />{mission.duration}min</div>
                <div className="flex items-center gap-1 text-[10px] text-gold-400"><Zap size={10} />+{mission.xpReward}</div>
              </div>
            </button>
          );
        })}
      </div>
      {/* Questions link */}
      <button onClick={() => onNavigate('questions', { subjectId: subject.id })} className="btn-primary w-full flex items-center justify-center gap-2">
        <Play size={16} /> Praticar Questões — {subject.name}
      </button>
    </div>
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
    <div className="space-y-4 animate-slide-up">
      <button onClick={() => onNavigate('subject', { subjectId: subject.id })} className="text-sm text-pm-300 flex items-center gap-1">
        <ChevronLeft size={16} /> {subject.name}
      </button>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{subject.icon} {subject.name}</span>
        <span>•</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {mission.duration} min</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-gold-400"><Zap size={12} /> +{mission.xpReward} XP</span>
      </div>

      <h1 className="text-2xl font-bold font-[Rajdhani,sans-serif] text-white">{mission.title}</h1>

      {/* Summary */}
      <div className="card border-l-4 border-gold-500">
        <h3 className="text-xs font-bold text-gold-400 mb-1">RESUMO</h3>
        <p className="text-sm text-gray-300">{mission.summary}</p>
      </div>

      {theory ? (
        <div className="space-y-3">
          <div className="card border-l-4 border-pm-500">
            <h3 className="text-xs font-bold text-pm-300 mb-2 flex items-center gap-1">
              <Brain size={14} /> MISSÃO DA AULA
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">{theory.missionBrief}</p>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold text-gold-400 mb-2">🧠 MODO BURRO</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{theory.dumbMode}</p>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold text-pm-300 mb-2">🕵️ EXEMPLO DO SEU MUNDO</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{theory.analogy}</p>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold text-danger mb-2 flex items-center gap-1">
              <ShieldAlert size={14} /> MODO PROVA / VUNESP
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">{theory.vunespMode}</p>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold text-orange-300 mb-2">🪤 PEGADINHAS</h3>
            <ul className="space-y-2">
              {theory.traps.map((trap, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-orange-300 mt-0.5">▸</span>
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card border-l-4 border-gold-500">
            <h3 className="text-xs font-bold text-gold-400 mb-1">🧩 MACETE</h3>
            <p className="text-sm text-white font-semibold">{theory.memoryHook}</p>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold text-pm-300 mb-1">✅ MINI MISSÃO</h3>
            <p className="text-sm text-gray-300">{theory.miniMission}</p>
          </div>

          <div className="card bg-pm-900/60">
            <h3 className="text-xs font-bold text-success mb-1">📌 SE CAIR NA PROVA</h3>
            <p className="text-sm text-gray-200">{theory.finalReminder}</p>
          </div>

          <details className="card">
            <summary className="cursor-pointer text-xs font-bold text-pm-300 flex items-center gap-1">
              <HelpCircle size={14} /> NÃO ENTENDI — EXPLICA MAIS SIMPLES
            </summary>
            <p className="text-sm text-gray-300 leading-relaxed mt-3">{theory.notUnderstood}</p>
          </details>
        </div>
      ) : (
        <>
          {/* Content */}
          <div className="card">
            <h3 className="text-xs font-bold text-pm-300 mb-2">CONTEÚDO</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{mission.content}</p>
          </div>

          {/* Examples */}
          {mission.examples.length > 0 && (
            <div className="card">
              <h3 className="text-xs font-bold text-pm-300 mb-2">EXEMPLOS</h3>
              <ul className="space-y-2">
                {mission.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-pm-400 mt-0.5">▸</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Complete button */}
      {done ? (
        <div className="card text-center border-success/30 py-4">
          <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
          <p className="text-sm text-success font-bold">Missão concluída!</p>
          <p className="text-xs text-gray-500">+{mission.xpReward} XP ganhos</p>
        </div>
      ) : (
        <button onClick={handleComplete} className="btn-gold w-full text-base py-4">
          ✓ MARCAR COMO CONCLUÍDO — +{mission.xpReward} XP
        </button>
      )}

      {/* Go to questions */}
      <button onClick={() => onNavigate('questions', { subjectId: subject.id })} className="btn-primary w-full">
        Praticar Questões desta Matéria
      </button>
    </div>
  );
}
