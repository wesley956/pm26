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
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060a14]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <button onClick={() => onNavigate('dashboard')} className="flex min-w-0 items-center gap-3 text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/15">
              <ShieldCheck size={21} className="text-gold-300" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gold-400">
                PM-SP 2026
              </p>
              <h1 className="truncate font-[Rajdhani,sans-serif] text-lg font-black leading-tight text-white md:text-xl">
                Arena do Recruta
              </h1>
            </div>
          </button>

          <nav className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1 md:flex">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-all lg:px-4 ${
                  activeTab === item.id
                    ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/15'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={16} strokeWidth={activeTab === item.id ? 2.6 : 1.8} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden min-w-[150px] md:block">
              <div className="mb-1 flex items-center justify-between text-[10px] text-gray-500">
                <span>{info.title}</span>
                <span>Nv. {info.level}</span>
              </div>
              <div className="progress-bar h-[6px]">
                <div className="progress-bar-fill bg-gradient-to-r from-pm-500 via-pm-400 to-gold-500" style={{ width: `${info.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-1 text-orange-400">
              <Flame size={16} />
              <span className="text-sm font-black">{profile.streak}</span>
            </div>

            <div className="flex items-center gap-1 text-gold-400">
              <Star size={16} />
              <span className="text-sm font-black">{profile.medals.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-5 pb-24 md:px-6 md:pb-8">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#060a14]/90 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-all ${
                activeTab === item.id
                  ? 'bg-gold-500 text-slate-950 shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
