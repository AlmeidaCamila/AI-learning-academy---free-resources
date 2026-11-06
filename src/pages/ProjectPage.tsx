import { ArrowLeft, CheckCircle2, ClipboardList, FileText, ListOrdered, ShieldCheck, Target, Wrench } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Badge, Button, Callout, Card, CardBody, CardHeader, Checkbox, Field, Input, PageHeader, Progress, Select, Textarea, toast } from '../components/ui';
import { PROJECT_MAP } from '../data/projects';
import { emptyProject, useStore } from '../store/useStore';
import type { ProjectProgress } from '../types';

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

const Box = ({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) => (
  <Card>
    <CardHeader title={title} icon={icon} />
    <CardBody>{children}</CardBody>
  </Card>
);

export default function ProjectPage() {
  const { id } = useParams();
  const p = id ? PROJECT_MAP[id] : undefined;
  const s = useStore();
  const update = useStore((x) => x.updateProject);
  if (!p) return <Navigate to="/proyectos" replace />;
  const pr = s.projects[p.id] ?? emptyProject();
  const req = p.deliverables.filter((d) => d.required);
  const missing = req.filter((d) => !pr.deliverables.includes(d.id));
  const pct = Math.round(((req.length - missing.length) / req.length) * 100);

  const setStatus = (status: ProjectProgress['status']) => {
    if (status === 'terminado' && missing.length) {
      toast(`Faltan ${missing.length} entregable(s) obligatorio(s) para terminar el proyecto.`);
      return;
    }
    update(p.id, { status });
  };

  const toggleDeliverable = (did: string, v: boolean) => {
    const next = v ? [...new Set([...pr.deliverables, did])] : pr.deliverables.filter((x) => x !== did);
    const patch: Partial<ProjectProgress> = { deliverables: next };
    if (pr.status === 'no iniciado' && v) patch.status = 'en progreso';
    const stillComplete = req.every((d) => next.includes(d.id));
    if (pr.status === 'terminado' && !stillComplete) patch.status = 'en revisión';
    update(p.id, patch);
  };

  return (
    <div className="animate-fade-up space-y-5">
      <Link to="/proyectos" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
        <ArrowLeft size={15} /> Proyectos
      </Link>
      <PageHeader eyebrow={`Proyecto ${p.n} · Etapa ${p.stage}`} title={p.title} subtitle={p.objective} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Box title="Problema empresarial" icon={<Target size={18} />}>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{p.problem}</p>
          </Box>
          <Box title="Requisitos" icon={<ClipboardList size={18} />}>
            <List items={p.requirements} />
          </Box>
          <Box title="Pasos de desarrollo" icon={<ListOrdered size={18} />}>
            <div className="space-y-2">
              {p.steps.map((st, i) => (
                <Checkbox key={st} checked={pr.stepsDone.includes(i)} onChange={(v) => update(p.id, { stepsDone: v ? [...new Set([...pr.stepsDone, i])] : pr.stepsDone.filter((x) => x !== i), status: pr.status === 'no iniciado' ? 'en progreso' : pr.status })} label={`${i + 1}. ${st}`} />
              ))}
            </div>
          </Box>
          <div className="grid gap-4 md:grid-cols-2">
            <Box title="Criterios de calidad" icon={<ShieldCheck size={18} />}>
              <List items={p.quality} />
            </Box>
            <Box title="Evaluación" icon={<CheckCircle2 size={18} />}>
              <List items={p.evaluation} />
            </Box>
          </div>
          <Box title="Documentación requerida" icon={<FileText size={18} />}>
            <List items={p.documentation} />
          </Box>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Estado de avance" icon={<Wrench size={18} />} />
            <CardBody className="space-y-3">
              <Select value={pr.status} onChange={(e) => setStatus(e.target.value as ProjectProgress['status'])}>
                <option value="no iniciado">No iniciado</option>
                <option value="en progreso">En progreso</option>
                <option value="en revisión">En revisión</option>
                <option value="terminado" disabled={missing.length > 0}>
                  Terminado {missing.length ? '(faltan entregables)' : ''}
                </option>
              </Select>
              <div>
                <div className="mb-1 flex justify-between text-xs text-zinc-500">
                  <span>Entregables obligatorios</span>
                  <span>{pct}%</span>
                </div>
                <Progress value={pct} />
              </div>
              {missing.length > 0 && pr.status !== 'no iniciado' && <Callout tone="warn">No se puede marcar como terminado: faltan {missing.length} entregable(s) obligatorio(s).</Callout>}
              {pr.status === 'terminado' && <Callout tone="ok">Proyecto terminado. Documentalo en tu Portfolio.</Callout>}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Entregables" />
            <CardBody className="space-y-2.5">
              {p.deliverables.map((d) => (
                <Checkbox
                  key={d.id}
                  checked={pr.deliverables.includes(d.id)}
                  onChange={(v) => toggleDeliverable(d.id, v)}
                  label={
                    <>
                      {d.text} {d.required ? <Badge color="indigo">obligatorio</Badge> : <Badge>opcional</Badge>}
                    </>
                  }
                />
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Tecnologías" />
            <CardBody className="flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Enlaces y notas" />
            <CardBody className="space-y-3">
              <Field label="Repositorio (GitHub)">
                <Input value={pr.repoUrl} onChange={(e) => update(p.id, { repoUrl: e.target.value })} placeholder="https://github.com/..." />
              </Field>
              <Field label="Demo">
                <Input value={pr.demoUrl} onChange={(e) => update(p.id, { demoUrl: e.target.value })} placeholder="https://..." />
              </Field>
              <Field label="Notas">
                <Textarea value={pr.notes} onChange={(e) => update(p.id, { notes: e.target.value })} />
              </Field>
              <Link to="/portfolio">
                <Button size="sm" className="w-full">
                  Documentar en Portfolio
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
