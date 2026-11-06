import { ArrowLeft, ArrowRight, CalendarDays, Clock, Pause, Play, Plus, RotateCcw, Target, Timer, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge, Button, Callout, Card, CardBody, CardHeader, Checkbox, confirmDialog, cx, Empty, Field, Input, PageHeader, Progress, Select, toast } from '../components/ui';
import { getWeek } from '../data/weeks';
import { addDays, DAYS, fmtDate, fmtHours, mondayOf, parseISO, todayISO, toISO } from '../lib/date';
import { minutesByCategory, targetMinutes } from '../lib/progress';
import { uid, useStore } from '../store/useStore';
import type { WeekHours } from '../types';

const CAT_LABEL: Record<keyof WeekHours, string> = { theory: 'Cursos y teoría', resources: 'Recursos externos', practice: 'Ejercicios y proyectos', english: 'Inglés técnico' };
const CAT_COLOR: Record<keyof WeekHours, string> = { theory: '#6366f1', resources: '#0ea5e9', practice: '#10b981', english: '#f59e0b' };
const CATS = Object.keys(CAT_LABEL) as (keyof WeekHours)[];

function Pomodoro() {
  const set = useStore((x) => x.set);
  const week = useStore((x) => x.settings.currentWeek);
  const [focus, setFocus] = useState(25);
  const [brk, setBrk] = useState(5);
  const [phase, setPhase] = useState<'focus' | 'break'>('focus');
  const [left, setLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cat, setCat] = useState<keyof WeekHours>('practice');
  const endAt = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const rem = Math.max(0, Math.round(((endAt.current ?? Date.now()) - Date.now()) / 1000));
      setLeft(rem);
      if (rem === 0) {
        setRunning(false);
        if (phase === 'focus') {
          set((x) => void x.hourLogs.push({ id: uid(), date: todayISO(), minutes: focus, category: cat, week, note: 'Pomodoro' }));
          toast(`¡Pomodoro completado! Se registraron ${focus} min. Tomate ${brk} min de descanso.`);
          setPhase('break');
          setLeft(brk * 60);
        } else {
          toast('Descanso terminado. ¿Otro bloque?');
          setPhase('focus');
          setLeft(focus * 60);
        }
        document.title = phase === 'focus' ? '⏰ Descanso — AI Learning Academy' : '⏰ A estudiar — AI Learning Academy';
        setTimeout(() => (document.title = 'AI Learning Academy'), 8000);
      }
    }, 500);
    return () => clearInterval(t);
  }, [running, phase, focus, brk, cat, week, set]);

  const start = () => {
    endAt.current = Date.now() + left * 1000;
    setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setPhase('focus');
    setLeft(focus * 60);
  };
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const total = (phase === 'focus' ? focus : brk) * 60;

  return (
    <Card>
      <CardHeader title="Temporizador Pomodoro" subtitle="Al completar un bloque de foco se registra automáticamente en tus horas." icon={<Timer size={18} />} />
      <CardBody className="space-y-4">
        <div className="text-center">
          <Badge color={phase === 'focus' ? 'indigo' : 'emerald'}>{phase === 'focus' ? 'Foco' : 'Descanso'}</Badge>
          <div className="mt-2 text-5xl font-semibold tabular-nums">
            {mm}:{ss}
          </div>
          <Progress value={((total - left) / total) * 100} color={phase === 'focus' ? 'indigo' : 'emerald'} className="mt-3" />
        </div>
        <div className="flex justify-center gap-2">
          {running ? (
            <Button onClick={() => setRunning(false)}>
              <Pause size={15} /> Pausar
            </Button>
          ) : (
            <Button variant="primary" onClick={start}>
              <Play size={15} /> {left === total ? 'Iniciar' : 'Reanudar'}
            </Button>
          )}
          <Button variant="ghost" onClick={reset}>
            <RotateCcw size={15} /> Reiniciar
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Field label="Foco (min)">
            <Input type="number" min={5} max={90} value={focus} disabled={running} onChange={(e) => { const v = Number(e.target.value) || 25; setFocus(v); if (phase === 'focus') setLeft(v * 60); }} />
          </Field>
          <Field label="Descanso">
            <Input type="number" min={1} max={30} value={brk} disabled={running} onChange={(e) => setBrk(Number(e.target.value) || 5)} />
          </Field>
          <Field label="Categoría">
            <Select value={cat} onChange={(e) => setCat(e.target.value as keyof WeekHours)}>
              {CATS.map((c) => (
                <option key={c} value={c}>
                  {CAT_LABEL[c]}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </CardBody>
    </Card>
  );
}

export default function Calendar() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const [offset, setOffset] = useState(0);
  const monday = addDays(mondayOf(new Date()), offset * 7);
  const key = toISO(monday);
  const from = key;
  const to = toISO(addDays(monday, 6));
  const target = targetMinutes(s);
  const byCat = minutesByCategory(s, from, to);
  const weekTotal = CATS.reduce((a, c) => a + byCat[c], 0);
  const acts = s.activities.filter((a) => a.weekKey === key);
  const goals = s.goals.filter((g) => g.weekKey === key);

  const [log, setLog] = useState({ date: todayISO(), minutes: 60, category: 'practice' as keyof WeekHours, note: '' });
  const [act, setAct] = useState({ title: '', day: (new Date().getDay() + 6) % 7, minutes: 60, category: 'theory' as keyof WeekHours });
  const [goal, setGoal] = useState('');

  const weeklyHistory = Array.from({ length: 8 }, (_, i) => {
    const m = addDays(mondayOf(new Date()), (i - 7) * 7);
    const f = toISO(m);
    const t = toISO(addDays(m, 6));
    const c = minutesByCategory(s, f, t);
    return { semana: fmtDate(f), ...Object.fromEntries(CATS.map((k) => [k, Math.round((c[k] / 60) * 10) / 10])) };
  });
  const totalByCat = CATS.map((c) => ({ name: CAT_LABEL[c], key: c, value: Math.round((s.hourLogs.filter((l) => l.category === c).reduce((a, l) => a + l.minutes, 0) / 60) * 10) / 10 })).filter((x) => x.value > 0);

  const suggestPlan = () => {
    const w = getWeek(s.settings.currentWeek)!;
    const t = s.settings.weeklyTarget;
    const plan = [
      { title: `Clases: ${w.lessons[0]?.title ?? w.title}`, day: 0, minutes: 90, category: 'theory' as const },
      { title: 'Recursos externos de la semana (parte 1)', day: 1, minutes: Math.round((t.resources * 60) / 2), category: 'resources' as const },
      { title: w.lessons[1] ? `Clases: ${w.lessons[1].title}` : 'Repaso + Coursera', day: 2, minutes: Math.round(t.theory * 60 - 90), category: 'theory' as const },
      { title: 'Ejercicios prácticos', day: 3, minutes: Math.round((t.practice * 60) / 2), category: 'practice' as const },
      { title: 'Recursos externos (parte 2)', day: 4, minutes: Math.round((t.resources * 60) / 2), category: 'resources' as const },
      { title: 'Desafío empresarial + evaluación', day: 5, minutes: Math.round((t.practice * 60) / 2), category: 'practice' as const },
      { title: 'Inglés técnico', day: 6, minutes: t.english * 60, category: 'english' as const },
    ].filter((x) => x.minutes > 0);
    set((x) => {
      plan.forEach((p) => x.activities.push({ id: uid(), weekKey: key, done: false, academyWeek: s.settings.currentWeek, ...p }));
    });
    toast('Plan semanal sugerido agregado. Podés moverlo o editarlo.');
  };

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow="Gestión del tiempo"
        title="Calendario y horas"
        subtitle="Planificá tu semana, registrá horas y reorganizá actividades sin perder progreso. Perder un día no penaliza: lo importante es la constancia semanal."
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setOffset(offset - 1)} aria-label="Semana anterior">
            <ArrowLeft size={15} />
          </Button>
          <div className="text-sm font-medium">
            Semana del {fmtDate(from)} al {fmtDate(to)}
          </div>
          <Button variant="ghost" onClick={() => setOffset(offset + 1)} aria-label="Semana siguiente">
            <ArrowRight size={15} />
          </Button>
          {offset !== 0 && (
            <Button size="sm" variant="ghost" onClick={() => setOffset(0)}>
              Hoy
            </Button>
          )}
        </div>
        <Button onClick={suggestPlan}>
          <CalendarDays size={15} /> Sugerir plan con la semana {s.settings.currentWeek}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title={`Horas de la semana: ${fmtHours(weekTotal)} de ${target / 60} h`} icon={<Clock size={18} />} />
          <CardBody className="space-y-3">
            <Progress value={(weekTotal / target) * 100} color="emerald" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATS.map((c) => (
                <div key={c} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <span className="h-2 w-2 rounded-full" style={{ background: CAT_COLOR[c] }} /> {CAT_LABEL[c]}
                  </div>
                  <div className="mt-1 text-sm font-semibold">
                    {fmtHours(byCat[c])} <span className="font-normal text-zinc-400">/ {s.settings.weeklyTarget[c]} h</span>
                  </div>
                  <Progress value={(byCat[c] / (s.settings.weeklyTarget[c] * 60 || 1)) * 100} className="mt-2" />
                </div>
              ))}
            </div>
            {weekTotal < target && offset <= 0 && <p className="text-xs text-zinc-500">Si esta semana no llegás al objetivo, no pasa nada: podés extender la semana académica desde su página sin romper el roadmap.</p>}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Registrar horas" icon={<Plus size={18} />} />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Fecha">
                <Input type="date" value={log.date} onChange={(e) => setLog({ ...log, date: e.target.value })} />
              </Field>
              <Field label="Minutos">
                <Input type="number" min={5} step={5} value={log.minutes} onChange={(e) => setLog({ ...log, minutes: Number(e.target.value) })} />
              </Field>
            </div>
            <Field label="Categoría">
              <Select value={log.category} onChange={(e) => setLog({ ...log, category: e.target.value as keyof WeekHours })}>
                {CATS.map((c) => (
                  <option key={c} value={c}>
                    {CAT_LABEL[c]}
                  </option>
                ))}
              </Select>
            </Field>
            <Input placeholder="Nota (opcional)" value={log.note} onChange={(e) => setLog({ ...log, note: e.target.value })} />
            <Button
              variant="primary"
              className="w-full"
              disabled={!log.minutes || log.minutes <= 0}
              onClick={() => {
                set((x) => void x.hourLogs.push({ id: uid(), date: log.date, minutes: log.minutes, category: log.category, week: s.settings.currentWeek, note: log.note }));
                setLog({ ...log, note: '' });
                toast(`Registradas ${fmtHours(log.minutes)}`);
              }}
            >
              Registrar
            </Button>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Planificador semanal" subtitle="Usá las flechas para mover actividades de día o de semana." icon={<CalendarDays size={18} />} />
        <CardBody>
          <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto_auto]">
            <Input placeholder="Nueva actividad (ej.: Clase 2 de bucles)" value={act.title} onChange={(e) => setAct({ ...act, title: e.target.value })} />
            <Select value={act.day} onChange={(e) => setAct({ ...act, day: Number(e.target.value) })}>
              {DAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </Select>
            <Input type="number" className="sm:w-24" min={10} step={10} value={act.minutes} onChange={(e) => setAct({ ...act, minutes: Number(e.target.value) })} />
            <Select value={act.category} onChange={(e) => setAct({ ...act, category: e.target.value as keyof WeekHours })}>
              {CATS.map((c) => (
                <option key={c} value={c}>
                  {CAT_LABEL[c]}
                </option>
              ))}
            </Select>
            <Button
              variant="primary"
              disabled={!act.title.trim()}
              onClick={() => {
                set((x) => void x.activities.push({ id: uid(), weekKey: key, done: false, academyWeek: s.settings.currentWeek, ...act, title: act.title.trim() }));
                setAct({ ...act, title: '' });
              }}
            >
              <Plus size={15} /> Agregar
            </Button>
          </div>
          <div className="grid gap-2 md:grid-cols-7">
            {DAYS.map((d, i) => {
              const date = toISO(addDays(monday, i));
              const items = acts.filter((a) => a.day === i);
              return (
                <div key={d} className={cx('min-h-28 rounded-xl border p-2', date === todayISO() ? 'border-indigo-300 bg-indigo-50/50 dark:border-indigo-500/40 dark:bg-indigo-500/5' : 'border-zinc-200 dark:border-zinc-800')}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-semibold">{d}</span>
                    <span className="text-zinc-400">{parseISO(date).getDate()}</span>
                  </div>
                  <div className="space-y-1.5">
                    {items.map((a) => (
                      <div key={a.id} className="rounded-lg border-l-4 bg-white p-1.5 text-xs shadow-sm dark:bg-zinc-800" style={{ borderLeftColor: CAT_COLOR[a.category] }}>
                        <label className="flex items-start gap-1.5">
                          <input
                            type="checkbox"
                            className="mt-0.5 accent-indigo-600"
                            checked={a.done}
                            onChange={(e) =>
                              set((x) => {
                                const it = x.activities.find((y) => y.id === a.id)!;
                                it.done = e.target.checked;
                                if (e.target.checked) x.hourLogs.push({ id: uid(), date, minutes: a.minutes, category: a.category, week: a.academyWeek ?? s.settings.currentWeek, note: `Actividad: ${a.title}` });
                                else x.hourLogs = x.hourLogs.filter((l) => !(l.note === `Actividad: ${a.title}` && l.date === date && l.minutes === a.minutes));
                              })
                            }
                          />
                          <span className={cx('min-w-0 break-words', a.done && 'text-zinc-400 line-through')}>{a.title}</span>
                        </label>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-400">
                          <span>{fmtHours(a.minutes)}</span>
                          <span className="flex gap-0.5">
                            <button title="Día anterior" onClick={() => set((x) => { const it = x.activities.find((y) => y.id === a.id)!; if (it.day > 0) it.day--; else { it.day = 6; it.weekKey = toISO(addDays(parseISO(it.weekKey), -7)); } })}>
                              ◀
                            </button>
                            <button title="Día siguiente" onClick={() => set((x) => { const it = x.activities.find((y) => y.id === a.id)!; if (it.day < 6) it.day++; else { it.day = 0; it.weekKey = toISO(addDays(parseISO(it.weekKey), 7)); } })}>
                              ▶
                            </button>
                            <button title="Eliminar" onClick={() => set((x) => void (x.activities = x.activities.filter((y) => y.id !== a.id)))}>
                              <Trash2 size={10} />
                            </button>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-xs text-zinc-500">
            Pendientes: {acts.filter((a) => !a.done).length} · Completadas: {acts.filter((a) => a.done).length}. Marcar una actividad como completada registra sus minutos en el día correspondiente.
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Objetivos semanales" icon={<Target size={18} />} />
          <CardBody className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Ej.: Aprobar la evaluación de la semana 3" value={goal} onChange={(e) => setGoal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && goal.trim() && (set((x) => void x.goals.push({ id: uid(), weekKey: key, text: goal.trim(), done: false })), setGoal(''))} />
              <Button variant="primary" disabled={!goal.trim()} onClick={() => { set((x) => void x.goals.push({ id: uid(), weekKey: key, text: goal.trim(), done: false })); setGoal(''); }}>
                <Plus size={15} />
              </Button>
            </div>
            {goals.length ? (
              goals.map((g) => (
                <div key={g.id} className="flex items-center justify-between gap-2">
                  <Checkbox checked={g.done} onChange={(v) => set((x) => void (x.goals.find((y) => y.id === g.id)!.done = v))} label={g.text} />
                  <button className="text-zinc-400 hover:text-rose-500" onClick={() => set((x) => void (x.goals = x.goals.filter((y) => y.id !== g.id)))} aria-label="Eliminar objetivo">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">Definí 2–4 objetivos concretos y medibles.</p>
            )}
          </CardBody>
        </Card>
        <div className="lg:col-span-2">
          <Pomodoro />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Estadísticas: últimas 8 semanas (horas)" />
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" vertical={false} />
                  <XAxis dataKey="semana" tick={{ fontSize: 11, fill: 'currentColor' }} className="text-zinc-500" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} className="text-zinc-500" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {CATS.map((c) => (
                    <Bar key={c} dataKey={c} name={CAT_LABEL[c]} stackId="a" fill={CAT_COLOR[c]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Distribución total" />
          <CardBody>
            {totalByCat.length ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={totalByCat} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                      {totalByCat.map((d) => (
                        <Cell key={d.key} fill={CAT_COLOR[d.key]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v} h`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Empty title="Sin horas registradas" />
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Historial de registros" />
        <CardBody>
          {s.hourLogs.length ? (
            <div className="thin-scroll max-h-80 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-zinc-500">
                  <tr>
                    <th className="py-1.5">Fecha</th>
                    <th>Categoría</th>
                    <th>Tiempo</th>
                    <th className="hidden sm:table-cell">Nota</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {[...s.hourLogs]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((l) => (
                      <tr key={l.id} className="border-t border-zinc-100 dark:border-zinc-800">
                        <td className="py-1.5">{fmtDate(l.date)}</td>
                        <td>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full" style={{ background: CAT_COLOR[l.category] }} />
                            {CAT_LABEL[l.category]}
                          </span>
                        </td>
                        <td>{fmtHours(l.minutes)}</td>
                        <td className="hidden truncate text-zinc-500 sm:table-cell">{l.note}</td>
                        <td className="text-right">
                          <button
                            className="text-zinc-400 hover:text-rose-500"
                            aria-label="Eliminar registro"
                            onClick={async () => (await confirmDialog({ title: 'Eliminar registro', text: `¿Eliminar ${fmtHours(l.minutes)} del ${fmtDate(l.date)}?`, danger: true, confirmLabel: 'Eliminar' })) && set((x) => void (x.hourLogs = x.hourLogs.filter((y) => y.id !== l.id)))}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Callout tone="info">Todavía no registraste horas. Usá el formulario, el Pomodoro o marcá actividades del planificador como completadas.</Callout>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
