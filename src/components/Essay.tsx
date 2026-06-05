import { useState } from 'react';
import { essayThemes, essayStructure, essayChecklist } from '../data/essays';
import { useApp } from '../store';
import { ChevronLeft, ChevronRight, CheckCircle2, Pencil } from 'lucide-react';

export default function Essay({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { profile, addEssay, addXP } = useApp();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [showStructure, setShowStructure] = useState(false);
  const [showChecklist, setShowChecklist] = useState(true);
  const [essayText, setEssayText] = useState('');
  const [selfGrade, setSelfGrade] = useState(0);

  const theme = essayThemes.find(t => t.id === selectedTheme);
  const today = new Date().toISOString().slice(0, 10);
  const trimmedEssay = essayText.trim();
  const estimatedLines = Math.max(0, Math.floor(trimmedEssay.length / 50));
  const hasEssayToday = profile.essays.some(essay => essay.date.slice(0, 10) === today);
  const minimumLengthReached = trimmedEssay.length >= 600;

  const handleSubmit = () => {
    if (!selectedTheme || !trimmedEssay || !minimumLengthReached) return;

    addEssay({
      id: `essay-${Date.now()}`,
      themeId: selectedTheme,
      content: trimmedEssay,
      date: new Date().toISOString(),
      selfGrade,
    });

    if (!hasEssayToday) addXP(50);

    setEssayText('');
    setSelfGrade(0);
    setSelectedTheme(null);
  };

  if (!selectedTheme) {
    return (
      <div className="form-shell">
        <button onClick={() => onNavigate('dashboard')} className="study-back">
          <ChevronLeft size={16} /> Voltar
        </button>

        <div className="mb-6">
          <p className="section-label mb-2">Treino discursivo</p>
          <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Redação</h1>
          <p className="study-subtitle mt-2">
            Escolha um tema e escreva com calma. Aqui o foco é clareza, estrutura e prática real.
          </p>
        </div>

        <div className="grid gap-3">
          {essayThemes.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTheme(t.id)}
              className="study-card text-left transition hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Pencil size={22} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{t.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="study-card mt-5">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="study-kicker !mb-0">Estrutura da redação</span>
            <ChevronRight size={18} className={`transition ${showStructure ? 'rotate-90' : ''}`} />
          </button>

          {showStructure && (
            <div className="mt-4 grid gap-3 animate-fade-in">
              {Object.entries(essayStructure).map(([key, value]) => (
                <div key={key} className="list-card">
                  <p className="mb-2 text-sm font-black capitalize text-white">{key}</p>
                  <pre className="whitespace-pre-wrap font-[Inter,sans-serif] text-sm leading-relaxed text-slate-300">{value}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {profile.essays.length > 0 && (
          <div className="study-card mt-5">
            <p className="text-sm text-slate-400">Redações escritas: <strong className="text-white">{profile.essays.length}</strong></p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="form-shell animate-fade-in">
      <button onClick={() => setSelectedTheme(null)} className="study-back">
        <ChevronLeft size={16} /> Temas
      </button>

      <div className="mb-6">
        <p className="section-label mb-2">Editor de redação</p>
        <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">{theme?.title}</h1>
        <p className="study-subtitle mt-2">{theme?.description}</p>
      </div>

      <div className="form-grid">
        <div className="editor-card">
          {theme?.tips && (
            <div className="reading-callout mb-5">
              <p className="mb-2 font-black text-white">Dicas para este tema</p>
              <ul className="study-list">
                {theme.tips.map((tip, i) => (
                  <li key={i}>
                    <span className="study-bullet">{i + 1}</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <textarea
            value={essayText}
            onChange={e => setEssayText(e.target.value)}
            placeholder="Escreva sua redação aqui. Pense em introdução, desenvolvimento e conclusão..."
            className="essay-editor"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <span>{trimmedEssay.length} caracteres • ~{estimatedLines} linhas estimadas</span>
            <span className={minimumLengthReached ? 'text-success' : 'text-orange-300'}>
              mínimo para salvar: 600 caracteres
            </span>
          </div>

          {!minimumLengthReached && (
            <p className="mt-2 text-sm text-orange-300">
              Escreva um pouco mais antes de salvar. Isso evita ganhar XP com rascunho muito curto.
            </p>
          )}

          {hasEssayToday && (
            <p className="mt-2 text-sm text-slate-500">
              Você já ganhou XP de redação hoje. Novas redações serão salvas, mas sem XP extra.
            </p>
          )}
        </div>

        <aside className="grid gap-4">
          <div className="study-card">
            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="study-kicker !mb-0">Checklist de correção</span>
              <ChevronRight size={18} className={`transition ${showChecklist ? 'rotate-90' : ''}`} />
            </button>

            {showChecklist && (
              <div className="mt-4 grid gap-2 animate-fade-in">
                {essayChecklist.map((item, i) => (
                  <label key={i} className="check-item cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="study-card">
            <p className="study-kicker">Autoavaliação</p>
            <p className="mb-3 text-sm text-slate-400">Dê uma nota de 0 a 10 para sua redação.</p>

            <div className="score-row">
              {[0, 2, 4, 5, 6, 7, 8, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setSelfGrade(n)}
                  className={`score-button ${selfGrade === n ? 'score-button-active' : ''}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!trimmedEssay || !minimumLengthReached}
            className={`w-full py-4 text-base ${
              trimmedEssay && minimumLengthReached
                ? 'btn-gold'
                : 'cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] font-bold text-slate-600'
            }`}
          >
            {hasEssayToday ? 'Salvar redação' : 'Salvar redação +50 XP'}
          </button>
        </aside>
      </div>
    </div>
  );
}
