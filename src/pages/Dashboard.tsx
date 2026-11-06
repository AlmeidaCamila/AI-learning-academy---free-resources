import { ArrowRight, Award, BookOpen, CalendarClock, CheckCircle2, ClipboardCheck, Clock, Flame, FolderKanban, GraduationCap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge, Button, Callout, Card, CardBody, CardHeader, Empty, PageHeader, Progress, Stat } from '../components/ui';
import { COURSES } from '../data/courses';
import { PROJECTS } from '../data/projects';
import { stageOfWeek, STAGES } from '../data/stages';
import { getWeek, WEEKS } from '../data/weeks';
import { addDays, DAYS, fmtDate, fmtHours, mondayOf, toISO } from '../lib/date';
import {
  approvedWeeks,
  bestScore,
  guidance,
  minutesInRange,
  nextMilestone,
  overallProgress,
  PASS,
  projectedWeekStart,
  stageProgress,
  streak,
  studiedDaysThisWeek,
  targetMinutes,
  thisWeekRange,
  weekStatus,
} from '../lib/progress';
import { useStore } from '../store/useStore';

export default function Dashboard() {
  const s = useStore();
  const n = s.settings.currentWeek;
  const w = getWeek(n)!;
  const st = stageOfWeek(n);
  const { from, to, key } = thisWeekRange();
  const weekMin = minutesInRange(s, from, to);
  const target = targetMinutes(s);
  const totalMin = s.hourLogs.reduce((a, l) => a + l.minutes, 0);
  const g = guidance(s);
  const milestone = nextMilestone(s);
  const status = weekStatus(s, n);

  const chart = Array.from({ length: 7 }, (_, i) => {
    const d = toISO(addDays(mondayOf(new Date()), i));
    return { day: DAYS[i], horas: Math.round((minutesInRange(s, d, d) / 60) * 10) / 10 };
  });

  const upcoming = s.activities.filter((a) => a.weekKey === key && !a.done).sort((a, b) => a.day - b.day).slice(0, 5);
  const goals = s.goals.filter((x) => x.weekKey === key);
  const coursesInProgress = COURSES.concat(s.customCourses).filter((c) => s.courses[c.id]?.status === 'en curso');
  const pendingExams = WEEKS.filter((x) => x.n <= n && (bestScore(s, x.n) ?? 0) < PASS).slice(-4);
  const activeProjects = PROJECTS.filter((p) => ['en progreso', 'en revisión'].includes(s.projects[p.id]?.status ?? ''));
  const lastGrades = [...s.attempts].reverse().slice(0, 5);

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow={`Etapa ${st.id} · ${st.title}`}
        title={s.settings.name ? `Hola, ${s.settings.name}` : 'Tu academia'}
        subtitle={`Semana ${n} de 36 — ${w.title}`}
        actions={
          <Link to={`/semana/${n}`}>
            <Button variant="primary">
              Continuar semana {n} <ArrowRight size={15} />
            </Button>
          </Link>
        }
      />

      <Callout tone={g.tone} icon={<TrendingUp size={16} />}>
        {g.text}
      </Callout>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Progreso general" value={`${overallProgress(s)}%`} sub={`${approvedWeeks(s)}/36 semanas aprobadas`} icon={<Target size={16} />}>
          <Progress value={overallProgress(s)} className="mt-2" />
        </Stat>
        <Stat label="Horas esta semana" value={fmtHours(weekMin)} sub={weekMin >= target ? '¡Objetivo semanal cumplido!' : `Faltan ${fmtHours(target - weekMin)} para ${target / 60} h`} icon={<Clock size={16} />}>
          <Progress value={(weekMin / target) * 100} color="emerald" className="mt-2" />
        </Stat>
        <Stat label="Horas acumuladas" value={fmtHours(totalMin)} sub={`Objetivo del programa: ${(target / 60) * 36} h`} icon={<CalendarClock size={16} />} />
        <Stat label="Racha de estudio" value={`${streak(s)} días`} sub={`${studiedDaysThisWeek(s)} día(s) estudiados esta semana · se permite 1 día de descanso`} icon={<Flame size={16} />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title={`Semana ${n}: ${w.title}`} subtitle={w.objective} icon={<BookOpen size={18} />} action={<Badge color={status === 'aprobada' ? 'emerald' : status === 'en curso' ? 'indigo' : 'zinc'}>{status}</Badge>} />
          <CardBody>
            <div className="flex flex-wrap gap-1.5">
              {w.topics.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {w.lessons.map((l) => (
                <Link key={l.id} to={`/semana/${n}/clase/${l.id}`} className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-indigo-500/50">
                  {s.weeks[n]?.lessonsDone.includes(l.id) ? <CheckCircle2 size={16} className="text-emerald-600" /> : <BookOpen size={16} className="text-zinc-400" />}
                  <span className="truncate">{l.title}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-xs text-zinc-500">Inicio proyectado: {fmtDate(toISO(projectedWeekStart(s, n)))}</div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Próximo hito profesional" icon={<Award size={18} />} />
          <CardBody>
            <div className="font-medium">{milestone.title}</div>
            <p className="mt-1 text-sm text-zinc-500">{milestone.detail}</p>
            {milestone.projectId && (
              <Link to={`/proyectos/${milestone.projectId}`} className="mt-3 inline-block">
                <Button size="sm">Ver proyecto</Button>
              </Link>
            )}
            <div className="mt-5 space-y-2.5">
              {STAGES.map((x) => (
                <div key={x.id}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className={x.id === st.id ? 'font-medium' : 'text-zinc-500'}>
                      {x.id}. {x.short}
                    </span>
                    <span className="tabular-nums text-zinc-500">{stageProgress(s, x.id)}%</span>
                  </div>
                  <Progress value={stageProgress(s, x.id)} color={x.color} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Horas por día (esta semana)" icon={<Clock size={18} />} action={<Link to="/calendario"><Button size="sm" variant="ghost">Registrar horas</Button></Link>} />
          <CardBody>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-zinc-500" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} className="text-zinc-500" axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'rgba(99,102,241,0.08)' }} contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v} h`, 'Estudio']} />
                  <Bar dataKey="horas" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Objetivos semanales" icon={<Target size={18} />} action={<Link to="/calendario"><Button size="sm" variant="ghost">Editar</Button></Link>} />
          <CardBody>
            {goals.length ? (
              <ul className="space-y-2">
                {goals.map((x) => (
                  <li key={x.id} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className={x.done ? 'mt-0.5 shrink-0 text-emerald-600' : 'mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-600'} />
                    <span className={x.done ? 'text-zinc-400 line-through' : ''}>{x.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty title="Sin objetivos esta semana" text="Definí 2–4 objetivos concretos en el Calendario." />
            )}
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader title="Próximas actividades" icon={<CalendarClock size={18} />} />
          <CardBody>
            {upcoming.length ? (
              <ul className="space-y-2 text-sm">
                {upcoming.map((a) => (
                  <li key={a.id} className="flex justify-between gap-2">
                    <span className="truncate">{a.title}</span>
                    <span className="shrink-0 text-xs text-zinc-500">{DAYS[a.day]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">Planificá tu semana en el Calendario.</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Evaluaciones pendientes" icon={<ClipboardCheck size={18} />} />
          <CardBody>
            {pendingExams.length ? (
              <ul className="space-y-2 text-sm">
                {pendingExams.map((x) => (
                  <li key={x.n}>
                    <Link to={`/semana/${x.n}/evaluacion`} className="flex justify-between gap-2 hover:text-indigo-600">
                      <span className="truncate">Semana {x.n}</span>
                      <span className="text-xs text-zinc-500">{bestScore(s, x.n) ?? 'sin intentos'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">No hay evaluaciones pendientes hasta la semana actual.</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Cursos en progreso" icon={<GraduationCap size={18} />} />
          <CardBody>
            {coursesInProgress.length ? (
              <ul className="space-y-2.5 text-sm">
                {coursesInProgress.slice(0, 4).map((c) => (
                  <li key={c.id}>
                    <div className="truncate">{c.name}</div>
                    <Progress value={s.courses[c.id]?.progress ?? 0} color="sky" className="mt-1" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">Marcá cursos "en curso" en Mi beca.</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Proyectos activos" icon={<FolderKanban size={18} />} />
          <CardBody>
            {activeProjects.length ? (
              <ul className="space-y-2 text-sm">
                {activeProjects.map((p) => (
                  <li key={p.id}>
                    <Link to={`/proyectos/${p.id}`} className="hover:text-indigo-600">
                      P{p.n}. {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">Ningún proyecto en progreso.</p>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Últimas calificaciones" icon={<ClipboardCheck size={18} />} action={<Link to="/evaluaciones"><Button size="sm" variant="ghost">Historial</Button></Link>} />
        <CardBody>
          {lastGrades.length ? (
            <div className="grid gap-2 sm:grid-cols-5">
              {lastGrades.map((a) => (
                <div key={a.id} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500">Semana {a.week} · {fmtDate(a.date.slice(0, 10))}</div>
                  <div className={`mt-1 text-xl font-semibold tabular-nums ${a.score >= PASS ? 'text-emerald-600' : 'text-amber-600'}`}>{a.score}</div>
                </div>
              ))}
            </div>
          ) : (
            <Empty title="Todavía no hiciste evaluaciones" text="Cada semana tiene una evaluación con preguntas teóricas, de opción múltiple y ejercicios de código." />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
