import { ReactNode } from 'react';
import { Home, BookOpen, Target, RotateCcw, User, Flame, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../store';
import { getLevelInfo } from '../utils';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Início' },
  { id: 'subjects', icon: BookOpen, label: 'Matérias' },
  { id: 'simulados', icon: Target, label: 'Simulados' },
  { id: 'review', icon: RotateCcw, label: 'Revisão' },
  { id: 'profile', icon: User, label: 'Perfil' },
];

export default function Layout({ children, activeTab, onNavigate }: LayoutProps) {
  const { profile } = useApp();
  const info = getLevelInfo(profile);

  return (
    <div className="min-h-[100dvh]">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1440px] md:px-4 lg:px-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:sticky md:top-0 md:flex md:h-[100dvh] md:w-72 lg:w-80 md:shrink-0 md:flex-col md:gap-4 md:py-5 md:pr-4">
          <div className="glass rounded-[1.75rem] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/15 text-2xl shadow-lg">
                🛡️
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">PM-SP 2026</p>
                <h1 className="font-[Rajdhani,sans-serif] text-xl font-bold leading-tight text-white">
                  Arena do Recruta
                </h1>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-pm-400/15 bg-black/20 p-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{info.title}</p>
                  <p className="text-[11px] text-gray-500">Nível {info.level} • {profile.xp} XP</p>
                </div>
              </div>
              <div className="progress-bar mt-3">
                <div className="progress-bar-fill bg-gradient-to-r from-pm-500 via-pm-400 to-gold-500" style={{ width: `${info.progress}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-gray-500">{info.xpInLevel}/{info.xpForNext} XP para próximo nível</p>
            </div>
          </div>

          <nav className="glass flex-1 rounded-[1.75rem] p-3">
            <div className="space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                    activeTab === item.id
                      ? 'border border-gold-500/30 bg-gold-500/15 text-gold-300 shadow-lg shadow-gold-500/5'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 2.6 : 1.8} />
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="glass rounded-[1.75rem] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-orange-400">
                <Flame size={16} /> Sequência
              </span>
              <strong className="text-white">{profile.streak}</strong>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gold-400">
                <Star size={16} /> Medalhas
              </span>
              <strong className="text-white">{profile.medals.length}</strong>
            </div>
          </div>
        </aside>

        <div className="flex min-h-[100dvh] min-w-0 flex-1 flex-col">
          {/* Mobile/Header */}
          <header className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3 md:mt-5 md:rounded-[1.75rem] md:border md:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-pm-400/25 bg-pm-400/10 text-lg md:hidden">
                  <ShieldCheck size={20} className="text-pm-300" />
                </div>
                <div className="min-w-0">
                  <p className="hidden text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400 md:block">
                    Central de Comando Top 100
                  </p>
                  <p className="truncate text-xs font-semibold leading-tight text-pm-300 md:text-sm">
                    {info.title} — Nível {info.level}
                  </p>
                  <p className="text-[10px] text-gray-500">{profile.xp} XP total</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-1 text-orange-400">
                  <Flame size={16} />
                  <span className="text-sm font-bold">{profile.streak}</span>
                </div>
                <div className="flex items-center gap-1 text-gold-400">
                  <Star size={16} />
                  <span className="text-sm font-bold">{profile.medals.length}</span>
                </div>
              </div>
            </div>

            <div className="progress-bar mt-3">
              <div className="progress-bar-fill bg-gradient-to-r from-pm-500 via-pm-400 to-gold-500" style={{ width: `${info.progress}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-gray-500">{info.xpInLevel}/{info.xpForNext} XP para próximo nível</p>
          </header>

          {/* Content */}
          <main className="flex-1 px-4 py-4 pb-24 animate-fade-in sm:px-5 md:px-6 md:pb-8 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 md:hidden">
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-all ${
                activeTab === item.id
                  ? 'bg-gold-500/12 text-gold-300 shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
