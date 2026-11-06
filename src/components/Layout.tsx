import {
  BookOpen,
  Bot,
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  FolderKanban,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Library,
  Map,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sparkles,
  Sun,
  UserSquare2,
  X,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { stageOfWeek } from '../data/stages';
import { overallProgress } from '../lib/progress';
import { useStore } from '../store/useStore';
import { cx, Progress } from './ui';

const NAV: { to: string; label: string; icon: ReactNode; group?: string }[] = [
  { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={17} />, group: 'Aprender' },
  { to: '/roadmap', label: 'Roadmap 36 semanas', icon: <Map size={17} /> },
  { to: `/semana`, label: 'Semana actual', icon: <BookOpen size={17} /> },
  { to: '/evaluaciones', label: 'Evaluaciones', icon: <ClipboardCheck size={17} /> },
  { to: '/tutor', label: 'AI Tutor', icon: <Bot size={17} /> },
  { to: '/proyectos', label: 'Proyectos', icon: <FolderKanban size={17} /> },
  { to: '/beca', label: 'Mi beca Open Academy', icon: <GraduationCap size={17} />, group: 'Recursos' },
  { to: '/recursos', label: 'Recursos gratuitos', icon: <Library size={17} /> },
  { to: '/ingles', label: 'Inglés técnico', icon: <Languages size={17} /> },
  { to: '/calendario', label: 'Calendario y horas', icon: <CalendarDays size={17} />, group: 'Organización' },
  { to: '/portfolio', label: 'Portfolio', icon: <UserSquare2 size={17} />, group: 'Carrera' },
  { to: '/carrera', label: 'Career Center', icon: <Briefcase size={17} /> },
  { to: '/ajustes', label: 'Ajustes y datos', icon: <Settings size={17} />, group: 'Sistema' },
];

export function useApplyTheme() {
  const theme = useStore((s) => s.settings.theme);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches);
      document.documentElement.classList.toggle('dark', dark);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);
}

function ThemeToggle() {
  const theme = useStore((s) => s.settings.theme);
  const set = useStore((s) => s.set);
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const label = { light: 'Claro', dark: 'Oscuro', system: 'Sistema' }[theme];
  return (
    <button
      onClick={() => set((s) => void (s.settings.theme = next))}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      title={`Tema: ${label}. Clic para cambiar.`}
    >
      <Icon size={15} /> <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const current = useStore((s) => s.settings.currentWeek);
  const state = useStore();
  const pct = overallProgress(state);
  return (
    <nav className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
          <Sparkles size={18} />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">AI Learning Academy</div>
          <div className="text-[11px] text-zinc-500">AI Automation Specialist</div>
        </div>
      </div>
      <div className="thin-scroll flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => (
          <div key={item.to}>
            {item.group && <div className="px-2 pt-4 pb-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">{item.group}</div>}
            <NavLink
              to={item.to === '/semana' ? `/semana/${current}` : item.to}
              end={item.to === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition',
                  isActive ? 'bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/70',
                )
              }
            >
              {item.icon}
              {item.label}
              {item.to === '/semana' && <span className="ml-auto rounded bg-zinc-100 px-1.5 text-[11px] text-zinc-500 dark:bg-zinc-800">{current}</span>}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-zinc-500">Progreso general</span>
          <span className="font-medium tabular-nums">{pct}%</span>
        </div>
        <Progress value={pct} />
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  useApplyTheme();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const week = useStore((s) => s.settings.currentWeek);
  const st = stageOfWeek(week);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-zinc-200 bg-white lg:block dark:border-zinc-800 dark:bg-zinc-900">
        <Sidebar />
      </aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-zinc-950/50" onClick={() => setOpen(false)} />
          <aside className="animate-fade-up absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-xl dark:bg-zinc-900">
            <button className="absolute top-4 right-3 rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setOpen(false)} aria-label="Cerrar menú">
              <X size={18} />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur sm:px-6 dark:border-zinc-800 dark:bg-zinc-950/80">
          <button className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-300 dark:hover:bg-zinc-800" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu size={20} />
          </button>
          <div className="min-w-0 flex-1 truncate text-sm text-zinc-500">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Semana {week}</span>
            <span className="mx-1.5">·</span>
            <span className="hidden sm:inline">Etapa {st.id}: </span>
            {st.short}
          </div>
          <ThemeToggle />
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
