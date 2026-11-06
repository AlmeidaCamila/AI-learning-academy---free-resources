import { AlertTriangle, ArrowLeft, BookOpen, Bot, CheckCircle2, Eye, Lightbulb, ListChecks, Sparkles, Thermometer, Wand2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CodeBlock, PythonRunner, SqlRunner } from '../components/Code';
import { SUPPORT_DB } from '../data/weeks/helpers';
import { Badge, Button, Callout, Card, CardBody, CardHeader, PageHeader, Textarea, toast } from '../components/ui';
import { getWeek } from '../data/weeks';
import { wp } from '../lib/progress';
import { useStore } from '../store/useStore';
import type { ComprehensionQ } from '../types';

function Section({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} icon={icon} />
      <CardBody>{children}</CardBody>
    </Card>
  );
}

function Comprehension({ q, idx }: { q: ComprehensionQ; idx: number }) {
  const [mine, setMine] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="text-sm font-medium">
        {idx + 1}. {q.q}
      </div>
      <Textarea className="mt-2 min-h-16" placeholder="Escribí tu respuesta con tus palabras…" value={mine} onChange={(e) => setMine(e.target.value)} />
      <div className="mt-2">
        <Button size="sm" variant="ghost" disabled={mine.trim().length < 5} onClick={() => setShow(true)}>
          <Eye size={14} /> {mine.trim().length < 5 ? 'Respondé primero para ver la respuesta' : 'Comparar con la respuesta'}
        </Button>
      </div>
      {show && <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100">{q.a}</div>}
    </div>
  );
}

export default function LessonPage() {
  const { n: nStr, lessonId } = useParams();
  const n = Number(nStr);
  const w = getWeek(n);
  const s = useStore();
  const updateWeek = useStore((x) => x.updateWeek);
  const lesson = w?.lessons.find((l) => l.id === lessonId);
  if (!w || !lesson) return <Navigate to={`/semana/${n || 1}`} replace />;
  const done = wp(s, n).lessonsDone.includes(lesson.id);
  const idx = w.lessons.indexOf(lesson);
  const next = w.lessons[idx + 1];

  return (
    <div className="animate-fade-up mx-auto max-w-4xl space-y-5">
      <Link to={`/semana/${n}`} className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
        <ArrowLeft size={15} /> Semana {n}
      </Link>
      <PageHeader eyebrow={`Semana ${n} · Clase ${idx + 1} de ${w.lessons.length} · ${lesson.minutes} min`} title={lesson.title} />

      {lesson.sections.map((sec) => (
        <Card key={sec.heading}>
          <CardBody>
            <h2 className="mb-3 text-base font-semibold">{sec.heading}</h2>
            <div className="prose-academy">
              {sec.body.map((b, i) => (
                <p key={i}>{b}</p>
              ))}
            </div>
            {sec.code && (
              <div className="mt-4">
                <CodeBlock sample={sec.code} />
              </div>
            )}
          </CardBody>
        </Card>
      ))}

      <Section title="Conceptos clave" icon={<ListChecks size={18} />}>
        <dl className="grid gap-3 sm:grid-cols-2">
          {lesson.keyConcepts.map((k) => (
            <div key={k.term} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <dt className="text-sm font-semibold">{k.term}</dt>
              <dd className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-300">{k.def}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <div className="grid gap-4 md:grid-cols-3">
        <Section title="Ejemplo simple" icon={<Sparkles size={18} />}>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{lesson.simpleExample}</p>
        </Section>
        <Section title="Ejemplo real" icon={<BookOpen size={18} />}>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{lesson.realExample}</p>
        </Section>
        <Section title="Analogía" icon={<Lightbulb size={18} />}>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{lesson.analogy}</p>
        </Section>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Section title="Errores comunes" icon={<AlertTriangle size={18} />}>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {lesson.commonErrors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Section>
        <Section title="Buenas prácticas" icon={<CheckCircle2 size={18} />}>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {lesson.bestPractices.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Resumen" icon={<Thermometer size={18} />}>
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {lesson.summary.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </Section>

      <Section title="Preguntas de comprensión" icon={<Eye size={18} />}>
        <div className="space-y-3">
          {lesson.comprehension.map((q, i) => (
            <Comprehension key={q.q} q={q} idx={i} />
          ))}
        </div>
      </Section>

      <Section title="Ejercicio práctico" icon={<Wand2 size={18} />}>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{lesson.exercise.statement}</p>
        {lesson.exercise.starter !== undefined || lesson.exercise.tests ? (
          <PythonRunner starter={lesson.exercise.starter ?? ''} tests={lesson.exercise.tests} solution={lesson.exercise.solution} hints={lesson.exercise.hints} />
        ) : /^\s*(SELECT|INSERT|UPDATE|WITH)\b/i.test(lesson.exercise.solution) ? (
          <SqlRunner schema={SUPPORT_DB} solution={lesson.exercise.solution} hints={lesson.exercise.hints} />
        ) : (
          <OpenExercise hints={lesson.exercise.hints} solution={lesson.exercise.solution} />
        )}
      </Section>

      <Callout tone="info" icon={<Bot size={16} />}>
        ¿Quedó algo sin entender? Abrí el <Link className="font-medium underline" to="/tutor">AI Tutor</Link> en modo "Explicar un concepto": el prompt incluye esta semana y tus errores anteriores.
      </Callout>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
        {done ? (
          <Badge color="emerald">
            <CheckCircle2 size={13} /> Clase estudiada
          </Badge>
        ) : (
          <Button
            variant="success"
            onClick={() => {
              updateWeek(n, (cur) => ({ lessonsDone: [...new Set([...cur.lessonsDone, lesson.id])] }));
              toast('Clase marcada como estudiada. Recordá: aprobar requiere práctica y evaluación.');
            }}
          >
            <CheckCircle2 size={15} /> Marcar clase como estudiada
          </Button>
        )}
        {next ? (
          <Link to={`/semana/${n}/clase/${next.id}`}>
            <Button variant="primary">Siguiente clase</Button>
          </Link>
        ) : (
          <Link to={`/semana/${n}`}>
            <Button variant="primary">Ir a práctica y evaluación</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function OpenExercise({ hints, solution }: { hints: string[]; solution: string }) {
  const [txt, setTxt] = useState('');
  const [h, setH] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Textarea className="min-h-32" placeholder="Escribí tu resolución acá (o un resumen y el enlace a tu archivo)." value={txt} onChange={(e) => setTxt(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="ghost" disabled={h >= hints.length} onClick={() => setH(h + 1)}>
          <Lightbulb size={14} /> Pista {h < hints.length ? `${h + 1}/${hints.length}` : ''}
        </Button>
        <Button size="sm" variant="ghost" disabled={txt.trim().length < 20} onClick={() => setShow((v) => !v)}>
          <Eye size={14} /> {txt.trim().length < 20 ? 'Respuesta de referencia (escribí tu intento primero)' : 'Ver respuesta de referencia'}
        </Button>
      </div>
      {hints.slice(0, h).map((x, i) => (
        <div key={i} className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
          💡 {x}
        </div>
      ))}
      {show && <Callout tone="ok">{solution}</Callout>}
    </div>
  );
}
