import { ReactNode, useState } from 'react';
import {
  Home,
  BookOpen,
  RotateCcw,
  User,
  Flame,
  ShieldCheck,
  Menu,
  X,
  Pencil,
  Dumbbell,
  CalendarDays,
  Trophy,
  CheckSquare,
  Layers3,
} from 'lucide-react';
import { useApp } from '../store';
import { getLevelInfo } from '../utils';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const navGroups = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'studyplan', icon: CheckSquare, label: 'Checklist Diário' },
    ],
  },
  {
    label: 'Estudos',
    items: [
      { id: 'subjects', icon: BookOpen, label: 'Matérias' },
      { id: 'review', icon: Layers3, label: 'Flashcards' },
      { id: 'simulados', icon: Trophy, label: 'Simulado Oficial' },
      { id: 'essay', icon: Pencil, label: 'Redação' },
    ],
  },
  {
    label: 'Físico e Perfil',
    items: [
      { id: 'taf', icon: Dumbbell, label: 'TAF — Treino' },
      { id: 'profile', icon: User, label: 'Perfil' },
    ],
  },
];

export default function Layout({ children, activeTab, onNavigate }: LayoutProps) {
  const { profile, setBadDayMode } = useApp();
  const info = getLevelInfo(profile);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  const Sidebar = () => (
    <aside className={`sidebar-shell ${mobileOpen ? 'open' : ''}`}>
      <div className="border-b border-cyan-900/40 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10">
            <ShieldCheck size={21} className="text-pm-400" />
          </div>

          <div>
            <div className="sidebar-logo">PM-SP 2026</div>
            <div className="text-xs font-bold tracking-widest text-slate-500">ARENA DO RECRUTA</div>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 rounded-lg border border-cyan-400/20 p-2 text-slate-400 lg:hidden"
          aria-label="Fechar menu"
        >
          <X size={17} />
        </button>
      </div>

      <div className="mx-3 mb-2 mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-400/40 bg-gradient-to-br from-[#1e3a5f] to-[#0a1f3f] text-lg font-black text-white">
              R
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#020818] bg-success shadow-[0_0_8px_#00ff88]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-black text-white">{info.title}</div>
            <div className="text-xs font-bold text-gold-500">Nível {info.level}</div>
          </div>

          <div className="text-right">
            <div className="text-xs font-black text-success">{profile.xp} XP</div>
            <div className="text-xs text-slate-500">{profile.streak} dias</div>
          </div>
        </div>

        <div className="mt-2">
          <div className="xp-bar-wrap">
            <div className="xp-bar-fill" style={{ width: `${info.progress}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-slate-500">
            <span>{info.xpInLevel} / {info.xpForNext} XP</span>
            <span className="text-pm-400">{info.progress}%</span>
          </div>
        </div>
      </div>

      <nav className="mt-2 max-h-[calc(100vh-250px)] overflow-y-auto pb-4">
        {navGroups.map(group => (
          <div key={group.label}>
            <div className="mb-2 mt-4 px-4">
              <span className="section-label">{group.label}</span>
            </div>

            {group.items.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={`${group.label}-${item.id}-${item.label}`}
                  onClick={() => handleNavigate(item.id)}
                  className={`nav-item w-[calc(100%-24px)] ${active ? 'active' : ''}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-4 mt-auto">
        <button
          className="btn-glow w-full !border-danger/40 !bg-danger/10 !text-danger"
          onClick={() => {
            setBadDayMode(true);
            handleNavigate('dashboard');
          }}
        >
          Modo dia ruim — 10min
        </button>
      </div>
    </aside>
  );

  return (
    <div>
      <div className="pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 55 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDuration: `${2 + (i % 5)}s`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}

        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={`p-${i}`}
            className="particle"
            style={{
              left: `${(i * 43) % 100}%`,
              background: ['#00d4ff', '#00ff88', '#a855f7', '#ffd700'][i % 4],
              boxShadow: `0 0 6px ${['#00d4ff', '#00ff88', '#a855f7', '#ffd700'][i % 4]}`,
              animationDuration: `${8 + (i % 8)}s`,
              animationDelay: `${(i % 5) * 1.1}s`,
            }}
          />
        ))}
      </div>

      <Sidebar />

      {mobileOpen && (
        <button
          className="fixed inset-0 z-[90] bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-cyan-400/15 bg-[#020818]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          className="hamburger h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 text-pm-400"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={18} />
        </button>

        <div className="sidebar-logo text-sm">PM-SP 2026</div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-400/40 bg-gradient-to-br from-[#1e3a5f] to-[#0a1f3f] text-sm font-black text-white">
          R
        </div>
      </header>

      <main className="main-content relative z-10">
        {children}
      </main>
    </div>
  );
}
