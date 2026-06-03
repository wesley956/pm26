import { useState } from 'react';
import { tafExercises, tafPlanMale, tafPlanFemale, tafSafetyWarnings } from '../data/taf';
import { useApp } from '../store';
import { ChevronLeft, Save, AlertTriangle } from 'lucide-react';

export default function TAF({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { profile, addTAFRecord, addXP } = useApp();
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [showPlan, setShowPlan] = useState(false);
  const [showSafety, setShowSafety] = useState(false);

  const plan = gender === 'M' ? tafPlanMale : tafPlanFemale;

  const handleSave = () => {
    if (!selectedExercise || !value) return;
    addTAFRecord({
      date: new Date().toISOString().slice(0, 10),
      exerciseId: selectedExercise,
      value: parseFloat(value),
      unit: tafExercises.find(e => e.id === selectedExercise)?.unit || '',
    });
    addXP(20);
    setValue('');
    setSelectedExercise(null);
  };

  return (
    <div className="space-y-4">
      <button onClick={() => onNavigate('dashboard')} className="text-sm text-pm-300 flex items-center gap-1">
        <ChevronLeft size={16} /> Voltar
      </button>
      <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">🏃 TAF — Teste de Aptidão Física</h1>

      {/* Gender toggle */}
      <div className="flex gap-2">
        <button onClick={() => setGender('M')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'M' ? 'bg-pm-500 text-white' : 'bg-pm-800 text-gray-400'}`}>
          Masculino
        </button>
        <button onClick={() => setGender('F')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'F' ? 'bg-pm-500 text-white' : 'bg-pm-800 text-gray-400'}`}>
          Feminino
        </button>
      </div>

      {/* Standards */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-300">Padrões do TAF:</h3>
        {tafExercises.map(ex => (
          <div key={ex.id} className="card">
            <h4 className="text-sm font-bold text-white">{ex.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{ex.description}</p>
            <div className="flex gap-4 mt-2">
              <span className="text-xs text-pm-300">♂ {ex.maleStandard}</span>
              <span className="text-xs text-pink-300">♀ {ex.femaleStandard}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Record */}
      <div className="card border-l-4 border-gold-500">
        <h3 className="text-sm font-bold text-gold-400 mb-2">Registrar Desempenho</h3>
        <select value={selectedExercise || ''} onChange={e => setSelectedExercise(e.target.value)} className="w-full mb-2 text-sm">
          <option value="">Selecione o exercício</option>
          {tafExercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
        </select>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Seu resultado" className="w-full text-sm mb-2" />
        <button onClick={handleSave} disabled={!selectedExercise || !value} className={`w-full py-2 rounded-lg text-sm font-bold ${
          selectedExercise && value ? 'btn-gold' : 'bg-pm-700 text-gray-600 cursor-not-allowed'
        }`}>
          <Save size={14} className="inline mr-1" /> Salvar +20 XP
        </button>
      </div>

      {/* History */}
      {profile.tafRecords.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-300 mb-2">Histórico ({profile.tafRecords.length} registros)</h3>
          <div className="space-y-1">
            {profile.tafRecords.slice(-10).reverse().map((rec, i) => (
              <div key={i} className="flex justify-between items-center text-xs bg-pm-800/50 px-3 py-2 rounded">
                <span className="text-gray-400">{new Date(rec.date).toLocaleDateString('pt-BR')}</span>
                <span className="text-white">{tafExercises.find(e => e.id === rec.exerciseId)?.name}</span>
                <span className="text-gold-400 font-bold">{rec.value} {rec.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Training Plan */}
      <button onClick={() => setShowPlan(!showPlan)} className="btn-primary w-full text-sm">
        {showPlan ? 'Esconder' : 'Ver'} Plano de Treino ({gender === 'M' ? 'Masculino' : 'Feminino'})
      </button>
      {showPlan && (
        <div className="space-y-3 animate-fade-in">
          {plan.map(week => (
            <div key={week.week} className="card">
              <h4 className="text-sm font-bold text-gold-400">{week.label}</h4>
              <ul className="mt-2 space-y-1">
                {week.activities.map((act, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                    <span className="text-pm-400">▸</span> {act}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Safety */}
      <button onClick={() => setShowSafety(!showSafety)} className="w-full text-xs text-orange-400 flex items-center justify-center gap-1 py-2">
        <AlertTriangle size={12} /> {showSafety ? 'Esconder' : 'Ver'} Avisos de Segurança
      </button>
      {showSafety && (
        <div className="space-y-1 animate-fade-in">
          {tafSafetyWarnings.map((w, i) => (
            <p key={i} className="text-xs text-orange-300/80">{w}</p>
          ))}
        </div>
      )}
    </div>
  );
}
