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
  PanelLeftClose,
  PanelLeftOpen,
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
      className={`app-sidebar-item flex w-full items-center px-3 py-3 ${
        activeTab === item.id ? 'app-sidebar-item-active' : 'text-gray-400'
      } ${collapsed && !mobile ? 'justify-center' : 'gap-3'}`}
    >
      <item.icon size={20} strokeWidth={activeTab === item.id ? 2.6 : 1.8} />
      {(!collapsed || mobile) && <span className="text-sm font-extrabold">{item.label}</span>}
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
        {/* Sidebar desktop */}
        <aside
          className={`hidden md:flex md:sticky md:top-0 md:h-[100dvh] md:shrink-0 md:flex-col md:border-r md:border-white/10 md:bg-[#070b14]/76 md:backdrop-blur-2xl transition-all duration-300 ${
            collapsed ? 'md:w-[88px]' : 'md:w-[272px]'
          }`}
        >
          <div className="flex h-full flex-col p-3">
            <div className="app-card p-3">
              <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3`}>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`flex min-w-0 items-center gap-3 text-left ${collapsed ? 'justify-center' : ''}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/15">
                    <ShieldCheck size={22} className="text-gold-300" />
                  </div>

                  {!collapsed && (
                    <div className="min-w-0">
                      <p className="app-kicker text-gold-400">PM-SP 2026</p>
                      <h1 className="truncate font-[Rajdhani,sans-serif] text-xl font-black leading-tight text-white">
                        Arena do Recruta
                      </h1>
                    </div>
                  )}
                </button>

                {!collapsed && (
                  <button
                    onClick={() => setCollapsed(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                    aria-label="Recolher menu"
                  >
                    <PanelLeftClose size={18} />
                  </button>
                )}
              </div>

              {collapsed && (
                <button
                  onClick={() => setCollapsed(false)}
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] py-2 text-gray-400 hover:text-white"
                  aria-label="Expandir menu"
                >
                  <PanelLeftOpen size={18} />
                </button>
              )}
            </div>

            <nav className="mt-4 flex-1 space-y-2">
              {navItems.map(item => navButton(item))}
            </nav>

            <div className="app-card p-3">
              <div className={`${collapsed ? 'text-center' : ''}`}>
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                  <span className="text-2xl">{info.icon}</span>
                  {!collapsed && (
                    <div>
                      <p className="text-sm font-black text-white">{info.title}</p>
                      <p className="text-[11px] text-gray-500">Nv. {info.level} • {profile.xp} XP</p>
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

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="app-card-soft p-2 text-center">
                        <Flame size={14} className="mx-auto text-orange-400" />
                        <p className="mt-1 text-xs font-black text-white">{profile.streak}</p>
                      </div>
                      <div className="app-card-soft p-2 text-center">
                        <Star size={14} className="mx-auto text-gold-400" />
                        <p className="mt-1 text-xs font-black text-white">{profile.medals.length}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Drawer mobile */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[88vw] border-r border-white/10 bg-[#070b14]/96 p-4 backdrop-blur-2xl transition-transform duration-300 md:hidden ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/15">
                  <ShieldCheck size={22} className="text-gold-300" />
                </div>
                <div className="min-w-0">
                  <p className="app-kicker text-gold-400">PM-SP 2026</p>
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

            <div className="app-card mt-4 p-3">
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

            <nav className="mt-4 flex-1 space-y-2">
              {navItems.map(item => navButton(item, true))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#060a14]/78 backdrop-blur-2xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu size={18} />
                </button>

                <div className="min-w-0">
                  <p className="app-kicker text-pm-300">Central de Comando</p>
                  <h2 className="truncate font-[Rajdhani,sans-serif] text-xl font-black text-white md:text-2xl">
                    {activeItem?.label ?? 'Dashboard'}
                  </h2>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-gray-300 lg:flex">
                <Sparkles size={14} className="text-gold-400" />
                Missão certa. Revisão curta. Constância diária.
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 pb-24 md:px-6 md:pb-8 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
