import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Dumbbell,
  FileCheck2,
  GraduationCap,
  Library,
  NotebookPen,
  Plus,
  Target,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { PythonRunner, SqlRunner } from '../components/Code';
import { ResourceItem, SourceBadge } from '../components/ResourceItem';
import { Badge, Button, Callout, Card, CardBody, CardHeader, Checkbox, confirmDialog, ExtLink, PageHeader, Tabs, Textarea, toast } from '../components/ui';
import { COURSE_MAP } from '../data/courses';
import { PROJECT_MAP } from '../data/projects';
import { stageOfWeek } from '../data/stages';
import { getWeek } from '../data/weeks';
import { fmtDate, toISO } from '../lib/date';
import { DIFF_LABEL } from '../lib/exam';
import { attemptsOf, bestScore, canApprove, PASS, projectedWeekStart, requirements, weekStatus, wp } from '../lib/progress';
import { useStore } from '../store/useStore';

type Tab = 'resumen' | 'clases' | 'recursos' | 'practica' | 'desafio' | 'evaluacion' | 'notas';

export default function WeekPage() {
  const { n: nStr } = useParams();
  const n = Number(nStr);
  const w = getWeek(n);
  const s = useStore();
  const updateWeek = useStore((x) => x.updateWeek);
  const set = useStore((x) => x.set);
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>('resumen');
  if (!w) return <Navigate to="/roadmap" replace />;
  const p = wp(s, n);
  const st = stageOfWeek(n);
  const status = weekStatus(s, n);
  const reqs = requirements(s, n);
  const best = bestScore(s, n);
  const prevNotApproved = n > 1 && !s.weeks[n - 1]?.approved;
  const totalH = w.hours.theory + w.hours.resources + w.hours.practice + w.hours.english;

  const approve = async () => {
    if (!canApprove(s, n)) return;
    const ok = await confirmDialog({ title: `Aprobar semana ${n}`, text: 'Confirmás que completaste los entregables y podés explicar lo aprendido con tus palabras. Podés desmarcarla después si lo necesitás.', confirmLabel: 'Aprobar semana' });
    if (!ok) return;
    updateWeek(n, { approved: true, approvedAt: new Date().toISOString() });
    if (s.settings.currentWeek === n && n < 36) {
      const go = await confirmDialog({ title: '¡Semana aprobada!', text: `¿Querés pasar a la semana ${n + 1} como semana actual?`, confirmLabel: `Ir a semana ${n + 1}` });
      if (go) {
        set((x) => void (x.settings.currentWeek = n + 1));
        nav(`/semana/${n + 1}`);
      }
    }
  };

  const toggleEx = (id: string, done: boolean) =>
    updateWeek(n, (cur) => ({ exercisesDone: done ? [...new Set([...cur.exercisesDone, id])] : cur.exercisesDone.filter((x) => x !== id) }));

  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow={`Etapa ${st.id} · ${st.title}`}
        title={`Semana ${n}: ${w.title}`}
        subtitle={w.objective}
        actions={
          <>
            {s.settings.currentWeek !== n && (
              <Button onClick={() => { set((x) => void (x.settings.currentWeek = n)); toast(`Semana ${n} marcada como actual`); }}>
                <Target size={15} /> Marcar como actual
              </Button>
            )}
            <Link to={`/semana/${Math.max(1, n - 1)}`}>
              <Button variant="ghost" disabled={n === 1} aria-label="Semana anterior">
                <ArrowLeft size={15} />
              </Button>
            </Link>
            <Link to={`/semana/${Math.min(36, n + 1)}`}>
              <Button variant="ghost" disabled={n === 36} aria-label="Semana siguiente">
                <ArrowRight size={15} />
              </Button>
            </Link>
          </>
        }
      />

      {prevNotApproved && (
        <div className="mb-4">
          <Callout tone="warn" icon={<AlertTriangle size={16} />}>
            La semana {n - 1} todavía no está aprobada. Podés explorar este contenido, pero te recomendamos consolidar los fundamentos anteriores antes de avanzar: <Link className="underline" to={`/semana/${n - 1}`}>ir a la semana {n - 1}</Link>.
          </Callout>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge color={status === 'aprobada' ? 'emerald' : status === 'lista para aprobar' ? 'violet' : status === 'en curso' ? 'indigo' : 'zinc'}>{status}</Badge>
        <Badge>
          <Clock size={12} /> {totalH} h estimadas{p.extraWeeks ? ` + ${p.extraWeeks} semana(s) extra` : ''}
        </Badge>
        <Badge>Inicio proyectado: {fmtDate(toISO(projectedWeekStart(s, n)))}</Badge>
        {best !== null && <Badge color={best >= PASS ? 'emerald' : 'amber'}>Mejor nota: {best}/100</Badge>}
      </div>

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'resumen', label: 'Resumen', icon: <Target size={15} /> },
          { id: 'clases', label: 'Clases', icon: <BookOpen size={15} />, badge: <span className="text-xs text-zinc-400">{p.lessonsDone.length}/{w.lessons.length}</span> },
          { id: 'recursos', label: 'Recursos', icon: <Library size={15} /> },
          { id: 'practica', label: 'Práctica', icon: <Dumbbell size={15} />, badge: <span className="text-xs text-zinc-400">{p.exercisesDone.length}/{w.exercises.length}</span> },
          { id: 'desafio', label: 'Desafío y entregable', icon: <Briefcase size={15} /> },
          { id: 'evaluacion', label: 'Evaluación', icon: <ClipboardCheck size={15} /> },
          { id: 'notas', label: 'Notas', icon: <NotebookPen size={15} /> },
        ]}
      />

      <div className="mt-5">
        {tab === 'resumen' && (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <Card>
                <CardHeader title="Objetivo de aprendizaje" icon={<Target size={18} />} />
                <CardBody>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{w.objective}</p>
                  <div className="mt-4 text-xs font-semibold text-zinc-500 uppercase">Temas teóricos</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {w.topics.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  {w.review && (
                    <div className="mt-4">
                      <Callout tone="info">{w.review}</Callout>
                    </div>
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Tiempo estimado (distribución recomendada)" icon={<Clock size={18} />} />
                <CardBody className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ['Cursos y teoría', w.hours.theory],
                    ['Recursos externos', w.hours.resources],
                    ['Ejercicios y proyecto', w.hours.practice],
                    ['Inglés técnico', w.hours.english],
                  ].map(([l, h]) => (
                    <div key={l as string} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                      <div className="text-xs text-zinc-500">{l}</div>
                      <div className="text-lg font-semibold">{h} h</div>
                    </div>
                  ))}
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Criterios para aprobar" icon={<FileCheck2 size={18} />} />
                <CardBody>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                    {w.passCriteria.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader title="Requisitos de aprobación" subtitle="Se aprueba demostrando aplicación, no solo leyendo." icon={<CheckCircle2 size={18} />} />
                <CardBody className="space-y-2.5">
                  {reqs.map((r) => (
                    <div key={r.label} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className={r.done ? 'mt-0.5 shrink-0 text-emerald-600' : 'mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-600'} />
                      <span className={r.done ? '' : 'text-zinc-500'}>{r.label}</span>
                    </div>
                  ))}
                  <div className="pt-2">
                    {p.approved ? (
                      <div className="space-y-2">
                        <Callout tone="ok">Semana aprobada el {fmtDate(p.approvedAt!.slice(0, 10))}.</Callout>
                        <Button size="sm" variant="ghost" onClick={async () => (await confirmDialog({ title: 'Desmarcar aprobación', text: 'La semana volverá a estado "en curso". No se borra ningún dato.' })) && updateWeek(n, { approved: false, approvedAt: undefined })}>
                          Desmarcar aprobación
                        </Button>
                      </div>
                    ) : (
                      <Button variant="success" className="w-full" disabled={!canApprove(s, n)} onClick={approve}>
                        <CheckCircle2 size={15} /> Marcar semana como aprobada
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="¿Necesitás más tiempo?" icon={<Plus size={18} />} />
                <CardBody>
                  <p className="text-sm text-zinc-500">Extender la semana desplaza las fechas proyectadas de las siguientes sin borrar progreso.</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => updateWeek(n, { extraWeeks: p.extraWeeks + 1 })}>
                      +1 semana
                    </Button>
                    {p.extraWeeks > 0 && (
                      <Button size="sm" variant="ghost" onClick={() => updateWeek(n, { extraWeeks: p.extraWeeks - 1 })}>
                        Quitar extensión
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Proyecto de la etapa" icon={<Briefcase size={18} />} />
                <CardBody>
                  <Link to={`/proyectos/${st.projectId}`} className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                    P{PROJECT_MAP[st.projectId].n}. {PROJECT_MAP[st.projectId].title}
                  </Link>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {tab === 'clases' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {w.lessons.map((l, i) => {
              const done = p.lessonsDone.includes(l.id);
              return (
                <Link key={l.id} to={`/semana/${n}/clase/${l.id}`}>
                  <Card className="h-full p-5 transition hover:border-indigo-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <Badge color="indigo">Clase {i + 1}</Badge>
                      {done ? <Badge color="emerald">estudiada</Badge> : <Badge>{l.minutes} min</Badge>}
                    </div>
                    <div className="mt-2 font-medium">{l.title}</div>
                    <ul className="mt-2 space-y-0.5 text-xs text-zinc-500">
                      {l.sections.map((sec) => (
                        <li key={sec.heading}>{sec.heading}</li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {tab === 'recursos' && (
          <div className="space-y-5">
            {w.coursera && w.coursera.length > 0 && (
              <Card>
                <CardHeader title="Coursera Open Academy" subtitle="Complementa la semana; no reemplaza la práctica." icon={<GraduationCap size={18} />} />
                <CardBody className="space-y-3">
                  {w.coursera.map((c) => {
                    const course = { ...COURSE_MAP[c.courseId], ...s.courseOverrides[c.courseId] };
                    return (
                      <div key={c.courseId} className="rounded-xl border border-zinc-200 p-3.5 dark:border-zinc-800">
                        <div className="flex flex-wrap items-center gap-2">
                          <ExtLink href={course.url} className="text-sm font-medium">
                            {course.name}
                          </ExtLink>
                          <SourceBadge source="coursera" />
                          <Badge>{course.institution}</Badge>
                          {!course.urlVerified && <Badge color="amber">enlace de búsqueda</Badge>}
                        </div>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{c.note}</p>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            )}
            <Card>
              <CardHeader title="Recursos gratuitos externos" subtitle="Marcalos a medida que los uses." icon={<Library size={18} />} />
              <CardBody className="space-y-2.5">
                {w.resources.map((r) => (
                  <ResourceItem
                    key={r.ref}
                    id={r.ref}
                    why={r.why}
                    minutes={r.minutes}
                    done={p.resourcesDone.includes(r.ref)}
                    onToggle={() => updateWeek(n, (cur) => ({ resourcesDone: cur.resourcesDone.includes(r.ref) ? cur.resourcesDone.filter((x) => x !== r.ref) : [...cur.resourcesDone, r.ref] }))}
                  />
                ))}
              </CardBody>
            </Card>
            {w.docs.length > 0 && (
              <Card>
                <CardHeader title="Documentación oficial" icon={<FileCheck2 size={18} />} />
                <CardBody className="space-y-2.5">
                  {w.docs.map((r) => (
                    <ResourceItem key={r.ref + r.why} id={r.ref} why={r.why} />
                  ))}
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {tab === 'practica' && (
          <div className="space-y-4">
            <Callout tone="info">Intentá cada ejercicio antes de pedir pistas. La solución se habilita después de tu primer intento ejecutado.</Callout>
            {w.exercises.map((ex) => {
              const done = p.exercisesDone.includes(ex.id);
              return (
                <Card key={ex.id}>
                  <CardHeader
                    title={ex.title}
                    subtitle={`Ejercicio propio · ${DIFF_LABEL[ex.level]} · ${ex.kind === 'python' ? 'Python ejecutable' : ex.kind === 'sql' ? 'SQL ejecutable' : 'Práctica en tu entorno'}`}
                    icon={<Dumbbell size={18} />}
                    action={done ? <Badge color="emerald">resuelto</Badge> : undefined}
                  />
                  <CardBody className="space-y-3">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{ex.statement}</p>
                    {ex.kind === 'python' && (
                      <PythonRunner starter={ex.starter ?? ''} tests={ex.tests} solution={ex.solution} hints={ex.hints} onPassed={() => { if (!done) { toggleEx(ex.id, true); toast('¡Tests superados! Ejercicio marcado como resuelto.'); } }} />
                    )}
                    {ex.kind === 'sql' && <SqlRunner schema={ex.schema ?? ''} solution={ex.solution} hints={ex.hints} />}
                    {ex.kind === 'libre' && (
                      <>
                        {ex.hints.length > 0 && (
                          <details className="text-sm">
                            <summary className="cursor-pointer text-indigo-600 dark:text-indigo-400">Ver pistas</summary>
                            <ul className="mt-2 list-disc pl-5 text-zinc-600 dark:text-zinc-300">
                              {ex.hints.map((h) => (
                                <li key={h}>{h}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                        <Textarea
                          placeholder="Evidencia: enlace a tu repositorio/notebook, resultado obtenido o lo que aprendiste."
                          value={p.exerciseNotes[ex.id] ?? ''}
                          onChange={(e) => updateWeek(n, (cur) => ({ exerciseNotes: { ...cur.exerciseNotes, [ex.id]: e.target.value } }))}
                        />
                      </>
                    )}
                    <Checkbox
                      checked={done}
                      disabled={ex.kind === 'libre' && !(p.exerciseNotes[ex.id] ?? '').trim()}
                      onChange={(v) => toggleEx(ex.id, v)}
                      label={ex.kind === 'libre' ? 'Lo resolví (requiere evidencia escrita arriba)' : ex.kind === 'python' ? 'Lo resolví (se marca solo al pasar los tests)' : 'Lo resolví y verifiqué el resultado'}
                    />
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {tab === 'desafio' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader title={`Desafío empresarial: ${w.challenge.title}`} icon={<Briefcase size={18} />} />
              <CardBody className="space-y-3 text-sm">
                <p className="text-zinc-700 dark:text-zinc-300">{w.challenge.context}</p>
                <ol className="list-decimal space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
                  {w.challenge.task.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
                <p>
                  <b>Entrega:</b> {w.challenge.deliverable}
                </p>
                <Textarea placeholder="Notas, decisiones, enlace a tu solución…" value={p.challengeNotes} onChange={(e) => updateWeek(n, { challengeNotes: e.target.value })} />
                <Checkbox checked={p.challengeDone} disabled={!p.challengeNotes.trim()} onChange={(v) => updateWeek(n, { challengeDone: v })} label="Completé el desafío (requiere notas o enlace)" />
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Entregable de la semana" icon={<FileCheck2 size={18} />} />
              <CardBody className="space-y-3 text-sm">
                <p className="text-zinc-700 dark:text-zinc-300">{w.deliverable}</p>
                <Textarea placeholder="Evidencia: enlace a GitHub, Colab, Drive o descripción de lo entregado." value={p.deliverableEvidence} onChange={(e) => updateWeek(n, { deliverableEvidence: e.target.value })} />
                <Checkbox checked={p.deliverableDone} disabled={!p.deliverableEvidence.trim()} onChange={(v) => updateWeek(n, { deliverableDone: v })} label="Entregable completo (requiere evidencia)" />
              </CardBody>
            </Card>
          </div>
        )}

        {tab === 'evaluacion' && (
          <div className="space-y-4">
            <Card>
              <CardHeader title="Evaluación de la unidad" subtitle={`Banco de ${w.questions.length} preguntas · examen de 6 · aprobación ${PASS}/100 · al repetir recibís preguntas diferentes`} icon={<ClipboardCheck size={18} />} />
              <CardBody>
                <div className="flex flex-wrap gap-1.5">
                  {(['basica', 'intermedia', 'avanzada'] as const).map((d) => (
                    <Badge key={d}>
                      {DIFF_LABEL[d]}: {w.questions.filter((q) => q.difficulty === d).length}
                    </Badge>
                  ))}
                  <Badge>Código/SQL: {w.questions.filter((q) => q.type === 'python' || q.type === 'sql').length}</Badge>
                </div>
                {p.lessonsDone.length < w.lessons.length && (
                  <div className="mt-3">
                    <Callout tone="warn">Te recomendamos estudiar todas las clases antes de rendir. Podés rendir igual para diagnosticar tu nivel.</Callout>
                  </div>
                )}
                <Link to={`/semana/${n}/evaluacion`} className="mt-4 inline-block">
                  <Button variant="primary">
                    <ClipboardCheck size={15} /> {attemptsOf(s, n).length ? 'Repetir evaluación' : 'Comenzar evaluación'}
                  </Button>
                </Link>
              </CardBody>
            </Card>
            {attemptsOf(s, n).length > 0 && (
              <Card>
                <CardHeader title="Intentos" />
                <CardBody className="space-y-2">
                  {attemptsOf(s, n)
                    .slice()
                    .reverse()
                    .map((a) => (
                      <div key={a.id} className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800">
                        <span>{new Date(a.date).toLocaleString('es-AR')}</span>
                        <span className="text-xs text-zinc-500">{a.wrong.length ? `Repasar: ${[...new Set(a.wrong.map((x) => x.concept))].join(', ')}` : 'Sin errores'}</span>
                        <Badge color={a.score >= PASS ? 'emerald' : 'amber'}>{a.score}/100</Badge>
                      </div>
                    ))}
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {tab === 'notas' && (
          <Card>
            <CardHeader title="Mis notas de la semana" subtitle="Se guardan automáticamente." icon={<NotebookPen size={18} />} />
            <CardBody>
              <Textarea className="min-h-72" value={p.notes} onChange={(e) => updateWeek(n, { notes: e.target.value })} placeholder="Ideas, dudas para el tutor, conceptos para repasar…" />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
