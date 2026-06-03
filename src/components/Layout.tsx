import { ReactNode } from 'react';
import { Home, BookOpen, Target, RotateCcw, User, Flame, Star } from 'lucide-react';
import { useApp } from '../store';
import { getLevelInfo } from '../utils'; // this is correct

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
    <div className="min-h-[100dvh] flex flex-col max-w-lg mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{info.icon}</span>
            <div>
              <p className="text-xs text-[#6ab884] font-semibold leading-tight">{info.title} — Nível {info.level}</p>
              <p className="text-[10px] text-gray-400">{profile.xp} XP total</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-orange-400">
              <Flame size={16} />
              <span className="text-sm font-bold">{profile.streak}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={16} />
              <span className="text-sm font-bold">{profile.medals.length}</span>
            </div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill bg-gradient-to-r from-pm-500 to-gold-500" style={{ width: `${info.progress}%` }} />
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5">{info.xpInLevel}/{info.xpForNext} XP para próximo nível</p>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-24 animate-fade-in">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-pm-700/50 max-w-lg mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${
                activeTab === item.id ? 'text-gold-400 scale-105' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
