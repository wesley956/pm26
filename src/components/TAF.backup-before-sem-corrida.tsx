import { useState } from 'react';
import { tafExercises, tafPlanMale, tafPlanFemale, tafSafetyWarnings } from '../data/taf';
import { useApp } from '../store';
import { ChevronLeft, Save, AlertTriangle, Dumbbell } from 'lucide-react';

export default function TAF({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { profile, addTAFRecord, addXP } = useApp();
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [showPlan, setShowPlan] = useState(true);
  const [showSafety, setShowSafety] = useState(false);

  const plan = gender === 'M' ? tafPlanMale : tafPlanFemale;
  const today = new Date().toISOString().slice(0, 10);
  const selectedExerciseAlreadyLoggedToday = Boolean(
    selectedExercise &&
    profile.tafRecords.some(record =>
      record.exerciseId === selectedExercise &&
      record.date.slice(0, 10) === today
    )
  );

  const handleSave = () => {
    if (!selectedExercise || !value) return;

    const shouldAwardXp = !selectedExerciseAlreadyLoggedToday;

    addTAFRecord({
      date: today,
      exerciseId: selectedExercise,
      value: parseFloat(value),
      unit: tafExercises.find(e => e.id === selectedExercise)?.unit || '',
    });

    if (shouldAwardXp) addXP(20);

    setValue('');
    setSelectedExercise(null);
  };

  return (
    <div className="form-shell">
      <button onClick={() => onNavigate('dashboard')} className="study-back">
        <ChevronLeft size={16} /> Voltar
      </button>

      <div className="mb-6">
        <p className="section-label mb-2">Preparação física</p>
        <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">TAF — Teste de Aptidão Física</h1>
        <p className="study-subtitle mt-2">
          Registre seus treinos, acompanhe os padrões e evolua sem exagerar. Constância vale mais que loucura.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => setGender('M')}
          className={`rounded-xl py-3 text-sm font-black ${gender === 'M' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Masculino
        </button>
        <button
          onClick={() => setGender('F')}
          className={`rounded-xl py-3 text-sm font-black ${gender === 'F' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Feminino
        </button>
      </div>

      <div className="form-grid">
        <div className="grid gap-5">
          <section className="study-card">
            <p className="study-kicker">Padrões do TAF</p>
            <div className="taf-exercise-grid">
              {tafExercises.map(ex => (
                <div key={ex.id} className="list-card">
                  <div className="mb-2 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Dumbbell size={18} className="text-pm-300" />
                    </div>
                    <div>
                      <h4 className="font-black text-white">{ex.name}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{ex.description}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <span className="rounded-xl bg-white/[0.03] px-3 py-2 text-pm-300">♂ {ex.maleStandard}</span>
                    <span className="rounded-xl bg-white/[0.03] px-3 py-2 text-pink-300">♀ {ex.femaleStandard}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="study-card">
            <button
              onClick={() => setShowPlan(!showPlan)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="study-kicker !mb-0">Plano de treino — {gender === 'M' ? 'Masculino' : 'Feminino'}</span>
              <span className="text-sm text-slate-400">{showPlan ? 'Esconder' : 'Ver'}</span>
            </button>

            {showPlan && (
              <div className="mt-4 grid gap-3 animate-fade-in">
                {plan.map(week => (
                  <div key={week.week} className="list-card">
                    <h4 className="font-black text-gold-400">{week.label}</h4>
                    <ul className="study-list mt-3">
                      {week.activities.map((act, i) => (
                        <li key={i}>
                          <span className="study-bullet">{i + 1}</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="grid gap-5">
          <section className="study-card">
            <p className="study-kicker gold">Registrar desempenho</p>

            <select
              value={selectedExercise || ''}
              onChange={e => setSelectedExercise(e.target.value)}
              className="mb-3 w-full text-base"
            >
              <option value="">Selecione o exercício</option>
              {tafExercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>

            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Seu resultado"
              className="mb-3 w-full text-base"
            />

            {selectedExerciseAlreadyLoggedToday && (
              <p className="mb-3 text-sm leading-relaxed text-slate-500">
                Você já ganhou XP neste exercício hoje. O novo resultado será salvo, mas sem XP extra.
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={!selectedExercise || !value}
              className={`w-full py-4 text-base ${
                selectedExercise && value
                  ? 'btn-gold'
                  : 'cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] font-bold text-slate-600'
              }`}
            >
              <Save size={16} /> {selectedExerciseAlreadyLoggedToday ? 'Salvar registro' : 'Salvar +20 XP'}
            </button>
          </section>

          {profile.tafRecords.length > 0 && (
            <section className="study-card">
              <p className="study-kicker">Histórico</p>
              <div className="grid gap-2">
                {profile.tafRecords.slice(-10).reverse().map((rec, i) => (
                  <div key={i} className="list-card flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-slate-400">{new Date(rec.date).toLocaleDateString('pt-BR')}</span>
                    <span className="text-white">{tafExercises.find(e => e.id === rec.exerciseId)?.name}</span>
                    <span className="font-black text-gold-400">{rec.value} {rec.unit}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="study-card">
            <button
              onClick={() => setShowSafety(!showSafety)}
              className="flex w-full items-center justify-center gap-2 text-sm font-bold text-orange-300"
            >
              <AlertTriangle size={16} />
              {showSafety ? 'Esconder' : 'Ver'} avisos de segurança
            </button>

            {showSafety && (
              <div className="mt-4 grid gap-2 animate-fade-in">
                {tafSafetyWarnings.map((w, i) => (
                  <p key={i} className="rounded-xl bg-orange-400/10 px-3 py-2 text-sm leading-relaxed text-orange-200/90">
                    {w}
                  </p>
                ))}
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
