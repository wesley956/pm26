import { useState } from 'react';
import { essayThemes, essayStructure, essayChecklist } from '../data/essays';
import { useApp } from '../store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Essay({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { profile, addEssay, addXP } = useApp();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [showStructure, setShowStructure] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [essayText, setEssayText] = useState('');
  const [selfGrade, setSelfGrade] = useState(0);

  const theme = essayThemes.find(t => t.id === selectedTheme);

  const handleSubmit = () => {
    if (!selectedTheme || !essayText.trim()) return;
    addEssay({
      id: `essay-${Date.now()}`,
      themeId: selectedTheme,
      content: essayText,
      date: new Date().toISOString(),
      selfGrade,
    });
    addXP(50);
    setEssayText('');
    setSelfGrade(0);
    setSelectedTheme(null);
  };

  // Theme selection
  if (!selectedTheme) {
    return (
      <div className="space-y-4">
        <button onClick={() => onNavigate('dashboard')} className="text-sm text-pm-300 flex items-center gap-1">
          <ChevronLeft size={16} /> Voltar
        </button>
        <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">✍️ Redação</h1>
        <p className="text-sm text-gray-400">Escolha um tema e treine sua dissertação.</p>

        <div className="space-y-2">
          {essayThemes.map(t => (
            <button key={t.id} onClick={() => setSelectedTheme(t.id)} className="card w-full text-left hover:border-pm-400">
              <h3 className="text-sm font-bold text-white">{t.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{t.description}</p>
            </button>
          ))}
        </div>

        <button onClick={() => setShowStructure(!showStructure)} className="btn-primary w-full text-sm">
          {showStructure ? 'Esconder' : 'Ver'} Estrutura da Redação
        </button>
        {showStructure && (
          <div className="space-y-3 animate-fade-in">
            {Object.entries(essayStructure).map(([key, value]) => (
              <div key={key} className="card">
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-[Inter,sans-serif]">{value}</pre>
              </div>
            ))}
          </div>
        )}

        {profile.essays.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-300 mb-2">Redações escritas: {profile.essays.length}</h3>
          </div>
        )}
      </div>
    );
  }

  // Writing area
  return (
    <div className="space-y-4 animate-fade-in">
      <button onClick={() => setSelectedTheme(null)} className="text-sm text-pm-300 flex items-center gap-1">
        <ChevronLeft size={16} /> Temas
      </button>

      <div className="card border-l-4 border-gold-500">
        <h2 className="font-bold text-white">{theme?.title}</h2>
        <p className="text-xs text-gray-400 mt-1">{theme?.description}</p>
        {theme?.tips && (
          <div className="mt-2">
            <p className="text-[10px] font-bold text-pm-300">DICAS:</p>
            <ul className="text-xs text-gray-500 space-y-0.5">
              {theme.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
            </ul>
          </div>
        )}
      </div>

      <textarea
        value={essayText}
        onChange={e => setEssayText(e.target.value)}
        placeholder="Escreva sua redação aqui... (mínimo 20 linhas para uma boa nota)"
        className="w-full h-64 text-sm resize-none"
      />
      <p className="text-xs text-gray-500">{essayText.length} caracteres • ~{Math.max(0, Math.floor(essayText.length / 50))} linhas estimadas</p>

      {/* Checklist */}
      <button onClick={() => setShowChecklist(!showChecklist)} className="text-sm text-pm-300 flex items-center gap-1">
        {showChecklist ? '▼' : <ChevronRight size={14} />} Checklist de Correção
      </button>
      {showChecklist && (
        <div className="space-y-1 animate-fade-in">
          {essayChecklist.map((item, i) => (
            <label key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <input type="checkbox" className="mt-0.5" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}

      {/* Self grading */}
      <div>
        <p className="text-sm font-bold text-gray-300 mb-2">Autoavaliação (0-10):</p>
        <div className="flex gap-2">
          {[0, 2, 4, 5, 6, 7, 8, 10].map(n => (
            <button key={n} onClick={() => setSelfGrade(n)} className={`w-9 h-9 rounded-lg text-sm font-bold ${
              selfGrade === n ? 'bg-gold-500 text-pm-900' : 'bg-pm-700 text-gray-400'
            }`}>{n}</button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!essayText.trim()} className={`w-full py-3 rounded-xl font-bold ${
        essayText.trim() ? 'btn-gold' : 'bg-pm-800 text-gray-600 cursor-not-allowed'
      }`}>
        Salvar Redação +50 XP
      </button>
    </div>
  );
}
