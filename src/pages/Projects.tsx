import { FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, Card, PageHeader, Progress } from '../components/ui';
import { PROJECTS } from '../data/projects';
import { STAGES } from '../data/stages';
import { emptyProject, useStore } from '../store/useStore';

export default function Projects() {
  const s = useStore();
  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Aprender construyendo" title="Proyectos prácticos" subtitle="Seis proyectos progresivos que se convierten en tu portfolio. Un proyecto solo puede marcarse como terminado cuando todos sus entregables obligatorios están completos." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => {
          const pr = s.projects[p.id] ?? emptyProject();
          const req = p.deliverables.filter((d) => d.required);
          const done = req.filter((d) => pr.deliverables.includes(d.id)).length;
          const st = STAGES.find((x) => x.id === p.stage)!;
          return (
            <Link key={p.id} to={`/proyectos/${p.id}`}>
              <Card className="flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <FolderKanban size={15} className="text-indigo-500" /> Proyecto {p.n} · Etapa {p.stage}
                  </div>
                  <Badge color={pr.status === 'terminado' ? 'emerald' : pr.status === 'no iniciado' ? 'zinc' : 'indigo'}>{pr.status}</Badge>
                </div>
                <div className="mt-2 font-semibold">{p.title}</div>
                <p className="mt-1 line-clamp-3 flex-1 text-sm text-zinc-500">{p.problem}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tech.slice(0, 4).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-zinc-500">
                    <span>Entregables obligatorios</span>
                    <span>
                      {done}/{req.length}
                    </span>
                  </div>
                  <Progress value={(done / req.length) * 100} color={st.color} />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
