import { CheckCircle2, Circle, ChevronLeft, Timer, Flame, Target, AlertTriangle } from 'lucide-react';
import { useApp } from '../store';
import { buildDailyChecklist } from '../utils/dailyChecklist';

export default function StudyPlan({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, markDailyMinimumDone, setBadDayMode } = useApp();
  const checklist = buildDailyChecklist(profile);

  const progress = Math.round((checklist.completedCount / checklist.totalCount) * 100);

  return (
    <div className="daily-shell animate-fade-in">
      <button onClick={() => onNavigate('dashboard')} className="study-back">
        <ChevronLeft size={16} /> Início
      </button>

      <section className="daily-hero mb-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-pm-300">
            Rotina diária
          </span>

          <span className={`rounded-full px-3 py-1 text-xs font-bold ${
            checklist.isComplete
              ? 'border border-success/20 bg-success/10 text-success'
              : 'border border-gold-500/20 bg-gold-500/10 text-gold-400'
          }`}>
            {checklist.isComplete ? 'concluído' : 'em andamento'}
          </span>
        </div>

        <h1 className="study-title !mb-3">Checklist diário</h1>

        <p className="study-subtitle">
          Uma rotina simples para não se perder. Faça o mínimo, marque o progresso e siga para o próximo passo sem precisar decidir tudo de novo.
        </p>

        <div className="daily-progress-card mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-white">{checklist.title}</p>
              <p className="text-sm text-slate-500">
                {checklist.completedCount}/{checklist.totalCount} tarefas concluídas
              </p>
            </div>

            <span className="font-[Rajdhani,sans-serif] text-3xl font-black text-gold-400">
              {progress}%
            </span>
          </div>

          <div className="xp-bar-wrap">
            <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        {checklist.items.map((item, index) => (
          <div key={item.id} className={`daily-task ${item.done ? 'daily-task-done' : ''}`}>
            <div className="daily-task-icon">
              {item.done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
            </div>

            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-slate-500">
                  Passo {index + 1}
                </span>

                {item.done && (
                  <span className="rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                    feito
                  </span>
                )}
              </div>

              <h3 className={`text-lg font-black ${item.done ? 'text-slate-500 line-through' : 'text-white'}`}>
                {item.label}
              </h3>

              <p className="mt-1 text-base leading-relaxed text-slate-400">
                {item.hint}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="study-card mt-5">
        <h3 className="study-kicker gold">
          <Timer size={16} />
          Modo simples
        </h3>

        <div className="study-body">
          <p>
            Se o dia estiver pesado, não tente fazer tudo. Faça apenas o mínimo para manter a corrente viva.
          </p>
          <p>
            O objetivo é evitar o ciclo de “depois eu compenso”. Hoje você só precisa manter o contato com a missão.
          </p>
        </div>
      </section>

      <div className="daily-action-bar">
        <button onClick={markDailyMinimumDone} className="btn-gold w-full py-4 text-base">
          <CheckCircle2 size={18} />
          Marcar mínimo feito
        </button>

        <button
          onClick={() => {
            setBadDayMode(true);
            onNavigate('dashboard');
          }}
          className="btn-ghost w-full py-4 text-base"
        >
          <AlertTriangle size={18} />
          Ativar modo dia ruim
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <button onClick={() => onNavigate('subjects')} className="study-card text-left">
          <Target size={22} className="mb-3 text-pm-300" />
          <p className="font-black text-white">Estudar teoria</p>
          <p className="mt-1 text-sm text-slate-500">Abrir matérias e missões.</p>
        </button>

        <button onClick={() => onNavigate('review')} className="study-card text-left">
          <Flame size={22} className="mb-3 text-gold-400" />
          <p className="font-black text-white">Revisar</p>
          <p className="mt-1 text-sm text-slate-500">Flashcards e questões erradas.</p>
        </button>

        <button onClick={() => onNavigate('simulados')} className="study-card text-left">
          <Timer size={22} className="mb-3 text-success" />
          <p className="font-black text-white">Treinar prova</p>
          <p className="mt-1 text-sm text-slate-500">Simulados e questões.</p>
        </button>
      </div>
    </div>
  );
}
