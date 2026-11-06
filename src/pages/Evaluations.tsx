import { AlertTriangle, ClipboardCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge, Button, Card, CardBody, CardHeader, Empty, PageHeader, Stat } from '../components/ui';
import { STAGES } from '../data/stages';
import { WEEKS } from '../data/weeks';
import { bestScore, PASS, weakConcepts } from '../lib/progress';
import { useStore } from '../store/useStore';

export default function Evaluations() {
  const s = useStore();
  const attempts = s.attempts;
  const passedWeeks = WEEKS.filter((w) => (bestScore(s, w.n) ?? 0) >= PASS).length;
  const avg = attempts.length ? Math.round(attempts.reduce((a, x) => a + x.score, 0) / attempts.length) : 0;
  const chart = attempts.map((a, i) => ({ i: i + 1, nota: a.score, semana: a.week }));
  const weak = weakConcepts(s, 10);

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader eyebrow="Seguimiento" title="Evaluaciones" subtitle="Historial de intentos, evolución de calificaciones y conceptos a reforzar." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Intentos realizados" value={attempts.length} icon={<ClipboardCheck size={16} />} />
        <Stat label="Evaluaciones aprobadas" value={`${passedWeeks}/36`} />
        <Stat label="Promedio de notas" value={attempts.length ? avg : '—'} />
        <Stat label="Conceptos a reforzar" value={weak.filter((x) => !x.resolved).length} icon={<AlertTriangle size={16} />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Evolución de calificaciones" icon={<TrendingUp size={18} />} />
          <CardBody>
            {chart.length ? (
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chart} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" vertical={false} />
                    <XAxis dataKey="i" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-zinc-500" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-zinc-500" axisLine={false} tickLine={false} />
                    <ReferenceLine y={PASS} stroke="#10b981" strokeDasharray="4 4" label={{ value: '80', fontSize: 11, fill: '#10b981', position: 'right' }} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [v, 'Nota']} labelFormatter={(l, p) => `Intento ${l} · semana ${p?.[0]?.payload?.semana ?? ''}`} />
                    <Line type="monotone" dataKey="nota" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Empty title="Sin intentos todavía" text="Tus calificaciones aparecerán acá." />
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Conceptos con errores" subtitle="Prioridad de repaso" icon={<AlertTriangle size={18} />} />
          <CardBody>
            {weak.length ? (
              <ul className="space-y-2">
                {weak.map((c) => (
                  <li key={c.week + c.concept} className="flex items-center justify-between gap-2 text-sm">
                    <Link to={`/semana/${c.week}`} className="truncate hover:text-indigo-600">
                      {c.concept} <span className="text-xs text-zinc-400">· S{c.week}</span>
                    </Link>
                    <Badge color={c.resolved ? 'emerald' : 'amber'}>{c.resolved ? 'superado' : `${c.misses} error(es)`}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">Sin errores registrados.</p>
            )}
            <Link to="/tutor" className="mt-4 inline-block">
              <Button size="sm">Practicar con el AI Tutor</Button>
            </Link>
          </CardBody>
        </Card>
      </div>

      {STAGES.map((st) => (
        <Card key={st.id}>
          <CardHeader title={`Etapa ${st.id}: ${st.title}`} />
          <CardBody className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {WEEKS.filter((w) => w.stage === st.id).map((w) => {
              const b = bestScore(s, w.n);
              const tries = s.attempts.filter((a) => a.week === w.n).length;
              return (
                <Link key={w.n} to={`/semana/${w.n}/evaluacion`} className="rounded-xl border border-zinc-200 p-3 transition hover:border-indigo-300 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Semana {w.n}</span>
                    {b !== null ? <Badge color={b >= PASS ? 'emerald' : 'amber'}>{b}</Badge> : <Badge>pendiente</Badge>}
                  </div>
                  <div className="mt-1 line-clamp-2 text-sm">{w.title}</div>
                  <div className="mt-1 text-xs text-zinc-400">{tries} intento(s)</div>
                </Link>
              );
            })}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
