import { ArrowLeft, Bot, CheckCircle2, ClipboardCheck, Eye, Lightbulb, Loader2, RotateCcw, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CodeBlock, CodeEditor } from '../components/Code';
import { Badge, Button, Callout, Card, CardBody, confirmDialog, cx, Input, PageHeader, Progress } from '../components/ui';
import { getWeek } from '../data/weeks';
import { buildExam, DIFF_LABEL, gradeQuestion, TYPE_LABEL, type GradeResult } from '../lib/exam';
import { attemptsOf, PASS } from '../lib/progress';
import { uid, useStore } from '../store/useStore';
import type { Question } from '../types';

function QuestionInput({ q, value, onChange, disabled }: { q: Question; value: unknown; onChange: (v: unknown) => void; disabled: boolean }) {
  if (q.type === 'mcq')
    return (
      <div className="space-y-2">
        {q.options.map((o, i) => (
          <label key={i} className={cx('flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-sm transition', value === i ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50')}>
            <input type="radio" className="mt-0.5 accent-indigo-600" checked={value === i} disabled={disabled} onChange={() => onChange(i)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    );
  if (q.type === 'tf')
    return (
      <div className="flex gap-2">
        {[true, false].map((b) => (
          <Button key={String(b)} variant={value === b ? 'primary' : 'secondary'} disabled={disabled} onClick={() => onChange(b)}>
            {b ? 'Verdadero' : 'Falso'}
          </Button>
        ))}
      </div>
    );
  if (q.type === 'short') return <Input value={String(value ?? '')} disabled={disabled} onChange={(e) => onChange(e.target.value)} placeholder="Tu respuesta" />;
  if (q.type === 'python') return <CodeEditor value={String(value ?? q.starter)} onChange={(v) => !disabled && onChange(v)} rows={Math.max(6, (String(value ?? q.starter).split('\n').length || 4) + 2)} />;
  return (
    <div className="space-y-2">
      <details className="text-xs text-zinc-500">
        <summary className="cursor-pointer">Ver esquema de la base</summary>
        <CodeBlock sample={{ lang: 'sql', code: q.schema.trim() }} />
      </details>
      <CodeEditor value={String(value ?? '')} onChange={(v) => !disabled && onChange(v)} rows={5} placeholder="SELECT ..." />
    </div>
  );
}

function ReviewItem({ q, r, i }: { q: Question; r: GradeResult; i: number }) {
  const [hint, setHint] = useState(0);
  const [reveal, setReveal] = useState(false);
  return (
    <Card className={cx('border-l-4', r.correct ? 'border-l-emerald-500' : 'border-l-amber-500')}>
      <CardBody className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {r.correct ? <CheckCircle2 size={17} className="text-emerald-600" /> : <XCircle size={17} className="text-amber-600" />}
          <span className="text-sm font-medium">Pregunta {i + 1}</span>
          <Badge>{TYPE_LABEL[q.type]}</Badge>
          <Badge color="violet">Concepto: {q.concept}</Badge>
        </div>
        <p className="text-sm">{q.prompt}</p>
        {r.correct ? (
          <p className="text-sm text-emerald-700 dark:text-emerald-300">{q.explanation}</p>
        ) : (
          <>
            <Callout tone="warn">
              <div className="font-medium">{r.feedback.startsWith('Respuesta') || r.feedback.startsWith('Es ') ? 'Tu respuesta no es correcta.' : r.feedback}</div>
              {r.detail && <pre className="mt-1 font-mono text-xs whitespace-pre-wrap">{r.detail}</pre>}
              <div className="mt-1 text-xs">
                Concepto a repasar: <b>{q.concept}</b>
              </div>
            </Callout>
            <div className="flex flex-wrap gap-2">
              {q.hints.length > 0 && (
                <Button size="sm" variant="ghost" disabled={hint >= q.hints.length} onClick={() => setHint(hint + 1)}>
                  <Lightbulb size={14} /> Pista progresiva {hint < q.hints.length ? `${hint + 1}/${q.hints.length}` : ''}
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setReveal((v) => !v)}>
                <Eye size={14} /> {reveal ? 'Ocultar explicación' : 'Ver explicación y respuesta'}
              </Button>
            </div>
            {q.hints.slice(0, hint).map((h, k) => (
              <div key={k} className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
                💡 {h}
              </div>
            ))}
            {reveal && (
              <div className="space-y-2 rounded-lg bg-zinc-50 p-3 text-sm dark:bg-zinc-800/50">
                <p>{q.explanation}</p>
                {(q.type === 'mcq' || q.type === 'tf' || q.type === 'short') && <p className="text-xs text-zinc-500">{r.feedback}</p>}
                {q.type === 'python' && <CodeBlock sample={{ lang: 'python', code: q.solution, caption: 'Solución de referencia' }} />}
                {q.type === 'sql' && <CodeBlock sample={{ lang: 'sql', code: q.solution, caption: 'Solución de referencia' }} />}
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default function ExamPage() {
  const { n: nStr } = useParams();
  const n = Number(nStr);
  const w = getWeek(n);
  const s = useStore();
  const set = useStore((x) => x.set);
  const [seed, setSeed] = useState(0);
  const exam = useMemo(() => (w ? buildExam(w.questions, attemptsOf(s, n)) : []), [seed, n]); // eslint-disable-line react-hooks/exhaustive-deps
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [hints, setHints] = useState<Record<string, number>>({});
  const [grading, setGrading] = useState(false);
  const [results, setResults] = useState<Record<string, GradeResult> | null>(null);
  const [score, setScore] = useState(0);

  if (!w) return <Navigate to="/roadmap" replace />;
  const answered = exam.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length;

  const submit = async () => {
    if (answered < exam.length) {
      const ok = await confirmDialog({ title: 'Hay preguntas sin responder', text: `Respondiste ${answered} de ${exam.length}. Las preguntas sin respuesta cuentan como incorrectas. ¿Entregar igual?`, confirmLabel: 'Entregar' });
      if (!ok) return;
    }
    setGrading(true);
    const res: Record<string, GradeResult> = {};
    for (const q of exam) res[q.id] = await gradeQuestion(q, answers[q.id] ?? (q.type === 'python' ? q.starter : undefined));
    const correct = exam.filter((q) => res[q.id].correct).length;
    const sc = Math.round((correct / exam.length) * 100);
    setResults(res);
    setScore(sc);
    setGrading(false);
    set((x) => {
      x.attempts.push({
        id: uid(),
        week: n,
        date: new Date().toISOString(),
        score: sc,
        questionIds: exam.map((q) => q.id),
        wrong: exam.filter((q) => !res[q.id].correct).map((q) => ({ qid: q.id, concept: q.concept })),
        answers: Object.fromEntries(exam.map((q) => [q.id, answers[q.id] ?? null])),
      });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retry = () => {
    setAnswers({});
    setHints({});
    setResults(null);
    setSeed((x) => x + 1);
    window.scrollTo({ top: 0 });
  };

  const failedConcepts = results ? [...new Set(exam.filter((q) => !results[q.id].correct).map((q) => q.concept))] : [];

  return (
    <div className="animate-fade-up mx-auto max-w-3xl space-y-5">
      <Link to={`/semana/${n}`} className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
        <ArrowLeft size={15} /> Semana {n}
      </Link>
      <PageHeader eyebrow={`Evaluación · Semana ${n}`} title={w.title} subtitle={`${exam.length} preguntas · aprobación ${PASS}/100 · podés pedir pistas progresivas sin penalización`} />

      {results ? (
        <>
          <Card>
            <CardBody className="flex flex-col items-center gap-2 py-8 text-center">
              <div className={cx('text-5xl font-semibold tabular-nums', score >= PASS ? 'text-emerald-600' : 'text-amber-600')}>{score}</div>
              <div className="text-sm text-zinc-500">de 100</div>
              <Badge color={score >= PASS ? 'emerald' : 'amber'}>{score >= PASS ? 'Evaluación aprobada' : 'Todavía no aprobada'}</Badge>
              {score >= PASS ? (
                <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-300">Muy bien. Para aprobar la semana completá también el desafío y el entregable.</p>
              ) : (
                <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-300">No pasa nada: equivocarse es parte de aprender. Revisá los conceptos marcados, usá las pistas y repetí: vas a recibir preguntas diferentes.</p>
              )}
            </CardBody>
          </Card>

          {failedConcepts.length > 0 && (
            <Card>
              <CardBody className="space-y-3">
                <div className="text-sm font-semibold">Plan de refuerzo</div>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {failedConcepts.map((c) => (
                    <li key={c}>
                      Repasá <b>{c}</b> en las clases de la semana.
                    </li>
                  ))}
                  <li>
                    Resolvé los ejercicios adicionales de la pestaña <Link to={`/semana/${n}`} className="text-indigo-600 underline dark:text-indigo-400">Práctica</Link> que aún no hiciste.
                  </li>
                  <li>
                    Pedile al <Link to={`/tutor?week=${n}&mode=ejercicios&topic=${encodeURIComponent(failedConcepts.join(', '))}`} className="text-indigo-600 underline dark:text-indigo-400">AI Tutor</Link> ejercicios extra sobre estos conceptos (el prompt incluye tus errores).
                  </li>
                </ul>
              </CardBody>
            </Card>
          )}

          <div className="space-y-3">
            {exam.map((q, i) => (
              <ReviewItem key={q.id} q={q} r={results[q.id]} i={i} />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={retry}>
              <RotateCcw size={15} /> Repetir con preguntas diferentes
            </Button>
            <Link to={`/tutor?week=${n}&mode=examen`}>
              <Button>
                <Bot size={15} /> Examen extra con el AI Tutor
              </Button>
            </Link>
            <Link to={`/semana/${n}`}>
              <Button variant="ghost">Volver a la semana</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="sticky top-14 z-10 -mx-1 rounded-xl bg-zinc-50/90 px-1 py-2 backdrop-blur dark:bg-zinc-950/90">
            <div className="mb-1 flex justify-between text-xs text-zinc-500">
              <span>
                Respondidas {answered}/{exam.length}
              </span>
            </div>
            <Progress value={(answered / exam.length) * 100} />
          </div>
          {exam.map((q, i) => {
            const h = hints[q.id] ?? 0;
            return (
              <Card key={q.id}>
                <CardBody className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">Pregunta {i + 1}</span>
                    <Badge>{TYPE_LABEL[q.type]}</Badge>
                    <Badge color={q.difficulty === 'basica' ? 'emerald' : q.difficulty === 'intermedia' ? 'sky' : 'violet'}>{DIFF_LABEL[q.difficulty]}</Badge>
                  </div>
                  <p className="text-sm">{q.prompt}</p>
                  {q.code && <CodeBlock sample={{ lang: 'python', code: q.code }} />}
                  <QuestionInput q={q} value={answers[q.id]} disabled={grading} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} />
                  {q.hints.length > 0 && (
                    <div className="space-y-1.5">
                      <Button size="sm" variant="ghost" disabled={h >= q.hints.length} onClick={() => setHints((x) => ({ ...x, [q.id]: h + 1 }))}>
                        <Lightbulb size={14} /> {h >= q.hints.length ? 'No hay más pistas' : `Pista ${h + 1}/${q.hints.length}`}
                      </Button>
                      {q.hints.slice(0, h).map((t, k) => (
                        <div key={k} className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
                          💡 {t}
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={submit} disabled={grading}>
              {grading ? <Loader2 size={15} className="animate-spin" /> : <ClipboardCheck size={15} />}
              {grading ? 'Corrigiendo (ejecutando tu código)…' : 'Entregar evaluación'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
