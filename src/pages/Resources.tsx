import { useState } from 'react';
import { ResourceItem, SourceBadge } from '../components/ResourceItem';
import { Badge, Card, CardBody, CardHeader, Input, PageHeader, Select } from '../components/ui';
import { RESOURCES } from '../data/resources';
import { WEEKS } from '../data/weeks';
import type { Resource } from '../types';

const CATS: Record<Resource['category'], string> = {
  python: 'Python',
  sql: 'SQL y bases de datos',
  apis: 'APIs y desarrollo',
  automatizacion: 'Automatización',
  ia: 'Inteligencia artificial',
  agentes: 'Agentes y RAG',
  carrera: 'Portfolio y empleabilidad',
  herramientas: 'Herramientas',
};

export default function Resources() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [src, setSrc] = useState('');
  const usedIn = (id: string) => WEEKS.filter((w) => w.resources.some((r) => r.ref === id) || w.docs.some((r) => r.ref === id)).map((w) => w.n);
  const list = RESOURCES.filter(
    (r) => (!cat || r.category === cat) && (!src || r.source === src) && (!q || (r.title + r.description).toLowerCase().includes(q.toLowerCase())),
  );
  const groups = Object.keys(CATS).filter((c) => list.some((r) => r.category === c)) as Resource['category'][];

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow="Biblioteca"
        title="Recursos gratuitos"
        subtitle="Todos los recursos externos integrados en el roadmap, con su procedencia, idioma, semanas donde se usan y restricciones de planes gratuitos."
      />
      <div className="flex flex-wrap items-center gap-2">
        <Input className="w-full sm:w-64" placeholder="Buscar recurso" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select className="w-auto" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">Todas las categorías</option>
          {Object.entries(CATS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </Select>
        <Select className="w-auto" value={src} onChange={(e) => setSrc(e.target.value)}>
          <option value="">Toda procedencia</option>
          <option value="externo">Recurso gratuito externo</option>
          <option value="docs">Documentación oficial</option>
        </Select>
        <div className="flex flex-wrap gap-1">
          <SourceBadge source="coursera" />
          <SourceBadge source="externo" />
          <SourceBadge source="docs" />
          <SourceBadge source="propio" />
          <SourceBadge source="proyecto" />
        </div>
      </div>
      {groups.map((g) => (
        <Card key={g}>
          <CardHeader title={CATS[g]} />
          <CardBody className="space-y-2.5">
            {list
              .filter((r) => r.category === g)
              .map((r) => {
                const weeks = usedIn(r.id);
                return (
                  <div key={r.id}>
                    <ResourceItem id={r.id} />
                    {weeks.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1 pl-1">
                        <span className="text-xs text-zinc-500">Se usa en:</span>
                        {weeks.map((n) => (
                          <a key={n} href={`#/semana/${n}`}>
                            <Badge>S{n}</Badge>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
