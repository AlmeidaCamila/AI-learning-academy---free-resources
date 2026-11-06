import { Award, GraduationCap, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button, Callout, Card, Checkbox, confirmDialog, ExtLink, Field, Input, Modal, PageHeader, Progress, Select, Stat, Textarea } from '../components/ui';
import { COURSES } from '../data/courses';
import { STAGES } from '../data/stages';
import { emptyCourse, uid, useStore } from '../store/useStore';
import type { Course, CourseStatus } from '../types';

const PRIO_COLOR = { fundamental: 'indigo', complementario: 'sky', opcional: 'zinc' } as const;

function CourseForm({ initial, onSave, onClose }: { initial: Course; onSave: (c: Course) => void; onClose: () => void }) {
  const [c, setC] = useState(initial);
  const up = (p: Partial<Course>) => setC({ ...c, ...p });
  return (
    <Modal
      open
      onClose={onClose}
      title={initial.name ? 'Editar curso' : 'Nuevo curso'}
      footer={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="primary" disabled={!c.name.trim()} onClick={() => onSave(c)}>
            Guardar
          </Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nombre" className="sm:col-span-2">
          <Input value={c.name} onChange={(e) => up({ name: e.target.value })} />
        </Field>
        <Field label="Institución">
          <Input value={c.institution} onChange={(e) => up({ institution: e.target.value })} />
        </Field>
        <Field label="Horas estimadas">
          <Input type="number" min={0} value={c.hours} onChange={(e) => up({ hours: Number(e.target.value) })} />
        </Field>
        <Field label="Etapa del roadmap">
          <Select value={c.stage ?? ''} onChange={(e) => up({ stage: e.target.value ? Number(e.target.value) : null })}>
            <option value="">Sin etapa</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id}. {s.short}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Prioridad">
          <Select value={c.priority} onChange={(e) => up({ priority: e.target.value as Course['priority'] })}>
            <option value="fundamental">Fundamental</option>
            <option value="complementario">Complementario</option>
            <option value="opcional">Opcional</option>
          </Select>
        </Field>
        <Field label="Enlace" className="sm:col-span-2" hint="Al inscribirte, pegá la URL exacta del curso.">
          <Input value={c.url} onChange={(e) => up({ url: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Checkbox checked={c.urlVerified} onChange={(v) => up({ urlVerified: v })} label="El enlace es la página exacta del curso (verificado)" />
        </div>
        <Field label="Descripción" className="sm:col-span-2">
          <Textarea value={c.description} onChange={(e) => up({ description: e.target.value })} />
        </Field>
      </div>
    </Modal>
  );
}

export default function Scholarship() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const updateCourse = useStore((x) => x.updateCourse);
  const [prio, setPrio] = useState('');
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');
  const [editing, setEditing] = useState<Course | null>(null);

  const all: Course[] = [...COURSES.map((c) => ({ ...c, ...s.courseOverrides[c.id] })), ...s.customCourses];
  const list = all.filter((c) => (!prio || c.priority === prio) && (!stage || String(c.stage) === stage) && (!status || (s.courses[c.id]?.status ?? 'pendiente') === status));
  const completed = all.filter((c) => s.courses[c.id]?.status === 'completado').length;
  const inProgress = all.filter((c) => s.courses[c.id]?.status === 'en curso').length;
  const certs = all.filter((c) => s.courses[c.id]?.certificate).length;

  const saveCourse = (c: Course) => {
    set((x) => {
      if (c.custom) {
        const i = x.customCourses.findIndex((y) => y.id === c.id);
        if (i >= 0) x.customCourses[i] = c;
        else x.customCourses.push(c);
      } else {
        x.courseOverrides[c.id] = c;
      }
    });
    setEditing(null);
  };

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow="Coursera Open Academy"
        title="Mi beca Open Academy"
        subtitle="La beca complementa el roadmap; no lo reemplaza. Priorizá los cursos fundamentales y aplicá lo que veas en ejercicios y proyectos."
        actions={
          <Button variant="primary" onClick={() => setEditing({ id: 'c-' + uid(), name: '', institution: '', description: '', stage: null, priority: 'complementario', hours: 0, url: '', urlVerified: false, custom: true })}>
            <Plus size={15} /> Agregar curso
          </Button>
        }
      />
      <Callout tone="warn">
        Los enlaces cargados son <b>búsquedas oficiales en Coursera</b> (no se inventaron URLs). Verificá en tu catálogo de Open Academy que cada curso esté disponible y, al inscribirte, reemplazá el enlace por la URL exacta con "Editar". Las horas son estimaciones aproximadas.
      </Callout>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Cursos en el plan" value={all.length} icon={<GraduationCap size={16} />} />
        <Stat label="En curso" value={inProgress} />
        <Stat label="Completados" value={completed} />
        <Stat label="Certificados" value={certs} icon={<Award size={16} />} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select className="w-auto" value={prio} onChange={(e) => setPrio(e.target.value)}>
          <option value="">Todas las prioridades</option>
          <option value="fundamental">Fundamentales</option>
          <option value="complementario">Complementarios</option>
          <option value="opcional">Opcionales</option>
        </Select>
        <Select className="w-auto" value={stage} onChange={(e) => setStage(e.target.value)}>
          <option value="">Todas las etapas</option>
          {STAGES.map((x) => (
            <option key={x.id} value={x.id}>
              Etapa {x.id}: {x.short}
            </option>
          ))}
        </Select>
        <Select className="w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en curso">En curso</option>
          <option value="completado">Completado</option>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((c) => {
          const p = s.courses[c.id] ?? emptyCourse();
          return (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge color={PRIO_COLOR[c.priority]}>{c.priority}</Badge>
                    {c.stage && <Badge>Etapa {c.stage}</Badge>}
                    <Badge>~{c.hours} h</Badge>
                    {!c.urlVerified && <Badge color="amber">enlace pendiente de verificación</Badge>}
                  </div>
                  <ExtLink href={c.url} className="mt-2 text-sm font-semibold">
                    {c.name}
                  </ExtLink>
                  <div className="text-xs text-zinc-500">{c.institution}</div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setEditing(c)} aria-label="Editar">
                    <Pencil size={14} />
                  </Button>
                  {c.custom && (
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label="Eliminar"
                      onClick={async () => (await confirmDialog({ title: 'Eliminar curso', text: `¿Eliminar "${c.name}" y su progreso?`, danger: true, confirmLabel: 'Eliminar' })) && set((x) => { x.customCourses = x.customCourses.filter((y) => y.id !== c.id); delete x.courses[c.id]; })}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{c.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Checkbox checked={p.enrolled} onChange={(v) => updateCourse(c.id, { enrolled: v })} label="Inscripta" />
                <Checkbox checked={p.certificate} onChange={(v) => updateCourse(c.id, { certificate: v })} label="Certificado obtenido" />
                <Field label="Estado">
                  <Select value={p.status} onChange={(e) => updateCourse(c.id, { status: e.target.value as CourseStatus, progress: e.target.value === 'completado' ? 100 : p.progress })}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en curso">En curso</option>
                    <option value="completado">Completado</option>
                  </Select>
                </Field>
                <Field label={`Progreso: ${p.progress}%`}>
                  <input type="range" min={0} max={100} step={5} value={p.progress} onChange={(e) => updateCourse(c.id, { progress: Number(e.target.value), status: Number(e.target.value) === 100 ? 'completado' : Number(e.target.value) > 0 && p.status === 'pendiente' ? 'en curso' : p.status })} className="w-full accent-sky-600" />
                </Field>
                <Field label="Fecha de inicio">
                  <Input type="date" value={p.start ?? ''} onChange={(e) => updateCourse(c.id, { start: e.target.value })} />
                </Field>
                <Field label="Fecha de finalización">
                  <Input type="date" value={p.end ?? ''} onChange={(e) => updateCourse(c.id, { end: e.target.value })} />
                </Field>
                {p.certificate && (
                  <Field label="Enlace al certificado" className="sm:col-span-2">
                    <Input value={p.certificateUrl ?? ''} onChange={(e) => updateCourse(c.id, { certificateUrl: e.target.value })} placeholder="https://coursera.org/verify/..." />
                  </Field>
                )}
                <Field label="Notas personales" className="sm:col-span-2">
                  <Textarea className="min-h-16" value={p.notes} onChange={(e) => updateCourse(c.id, { notes: e.target.value })} placeholder="¿Qué aplicaste de este curso en tus proyectos?" />
                </Field>
              </div>
              <Progress value={p.progress} color="sky" className="mt-3" />
            </Card>
          );
        })}
      </div>
      {editing && <CourseForm initial={editing} onSave={saveCourse} onClose={() => setEditing(null)} />}
    </div>
  );
}
