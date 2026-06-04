import { ReactNode, useState } from 'react';
import {
  Home,
  BookOpen,
  Target,
  RotateCcw,
  User,
  Flame,
  Star,
  ShieldCheck,
  Menu,
  X,
  PanelLeftOpen,
  PanelLeftClose,
  Sparkles,
} from 'lucide-react';
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
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem = navItems.find(item => item.id === activeTab);

  const navButton = (item: typeof navItems[number], mobile = false) => (
    <button
      key={item.id}
      onClick={() => {
        onNavigate(item.id);
        if (mobile) setMobileOpen(false);
      }}
      title={collapsed && !mobile ? item.label : undefined}
      className={`group flex w-full items-center rounded-[1.25rem] px-3 py-3 text-left transition-all ${
        activeTab === item.id
          ? 'bg-gradient-to-r from-gold-500/22 to-pm-400/12 text-gold-300 ring-1 ring-gold-500/25'
          : 'text-gray-400 hover:bg-white/[0.045] hover:text-white'
      } ${collapsed && !mobile ? 'justify-center' : 'gap-3'}`}
    >
      <item.icon size={20} strokeWidth={activeTab === item.id ? 2.65 : 1.75} />
      {(!collapsed || mobile) && <span className="text-sm font-black">{item.label}</span>}
    </button>
  );

  return (
    <div className="min-h-[100dvh]">
      {mobileOpen && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex min-h-[100dvh]">
        {/* Floating sidebar */}
        <aside
          className={`fixed left-4 top-4 z-40 hidden h-[calc(100dvh-2rem)] flex-col rounded-[2rem] border border-white/10 bg-[#070b14]/78 p-3 shadow-2xl shadow-black/35 backdrop-blur-2xl transition-all duration-300 md:flex ${
            collapsed ? 'w-[82px]' : 'w-[268px]'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex h-13 w-13 items-center justify-center rounded-[1.35rem] border border-gold-500/30 bg-gold-500/15 text-gold-300"
              >
                <ShieldCheck size={24} />
              </button>
            </div>

            {!collapsed && (
              <div className="mt-3 px-2 text-center">
                <p className="kicker text-gold-400">PM-SP 2026</p>
                <h1 className="font-[Rajdhani,sans-serif] text-xl font-black text-white">
                  Arena do Recruta
                </h1>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="mt-4 flex w-full items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.035] py-2 text-gray-400 transition hover:text-white"
              aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>

            <nav className="mt-5 flex-1 space-y-2">
              {navItems.map(item => navButton(item))}
            </nav>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-3">
              <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <span className="text-2xl">{info.icon}</span>
                {!collapsed && (
                  <div>
                    <p className="text-sm font-black text-white">{info.title}</p>
                    <p className="text-[11px] text-gray-500">Nível {info.level}</p>
                  </div>
                )}
              </div>

              {!collapsed && (
                <>
                  <div className="progress-bar mt-3 h-[6px]">
                    <div
                      className="progress-bar-fill bg-gradient-to-r from-pm-500 via-pm-400 to-gold-500"
                      style={{ width: `${info.progress}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-orange-400">
                      <Flame size={14} /> {profile.streak}
                    </span>
                    <span className="flex items-center gap-1 text-gold-400">
                      <Star size={14} /> {profile.medals.length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[88vw] border-r border-white/10 bg-[#070b14]/96 p-4 backdrop-blur-2xl transition-transform duration-300 md:hidden ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.35rem] border border-gold-500/30 bg-gold-500/15">
                  <ShieldCheck size={22} className="text-gold-300" />
                </div>
                <div className="min-w-0">
                  <p className="kicker text-gold-400">PM-SP 2026</p>
                  <h1 className="truncate font-[Rajdhani,sans-serif] text-xl font-black text-white">
                    Arena do Recruta
                  </h1>
                </div>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                aria-label="Fechar menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-sm font-black text-white">{info.title}</p>
                  <p className="text-[11px] text-gray-500">Nível {info.level} • {profile.xp} XP</p>
                </div>
              </div>

              <div className="progress-bar mt-3 h-[6px]">
                <div
                  className="progress-bar-fill bg-gradient-to-r from-pm-500 via-pm-400 to-gold-500"
                  style={{ width: `${info.progress}%` }}
                />
              </div>
            </div>

            <nav className="mt-5 flex-1 space-y-2">
              {navItems.map(item => navButton(item, true))}
            </nav>
          </div>
        </aside>

        <div className={`recruit-shell-main flex min-w-0 flex-1 flex-col ${collapsed ? "" : "recruit-shell-main--open"}`}>
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/72 backdrop-blur-2xl">
            <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-gray-300 hover:text-white md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu size={18} />
                </button>

                <div className="min-w-0">
                  <p className="kicker text-pm-300">Central de comando</p>
                  <h2 className="truncate font-[Rajdhani,sans-serif] text-xl font-black text-white md:text-2xl">
                    {activeItem?.label ?? 'Dashboard'}
                  </h2>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-gray-300 lg:flex">
                <Sparkles size={14} className="text-gold-400" />
                Missão certa. Revisão curta. Constância diária.
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 pb-24 md:px-6 md:pb-8 lg:px-8">
            <div className="mx-auto w-full max-w-[1500px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
