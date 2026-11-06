import { Download, Eye, FileText, Github, Globe, Info, UserSquare2 } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock, CopyButton } from '../components/Code';
import { Badge, Button, Callout, Card, CardBody, CardHeader, Checkbox, ExtLink, Field, Input, Modal, PageHeader, Textarea } from '../components/ui';
import { PROJECTS } from '../data/projects';
import { downloadText } from '../lib/download';
import { emptyProject, useStore, type DataState } from '../store/useStore';
import type { PortfolioProject, ProjectDef } from '../types';

const emptyPP = (id: string): PortfolioProject => ({ projectId: id, summary: '', problem: '', solution: '', results: '', screenshots: '', readme: '', visible: true });

function readme(p: ProjectDef, pp: PortfolioProject, s: DataState) {
  const pr = s.projects[p.id] ?? emptyProject();
  return `# ${p.title}

${pp.summary || p.objective}

## Problem
${pp.problem || p.problem}

## Solution
${pp.solution || '_Describe what you built and how it works._'}

## Tech stack
${p.tech.map((t) => `- ${t}`).join('\n')}

## Architecture
_Add a diagram (image) and a short description of each component._

## Demo
${pr.demoUrl ? `- Live demo: ${pr.demoUrl}` : '- _Add a demo link or GIF._'}
${pp.screenshots ? pp.screenshots.split('\n').filter(Boolean).map((u) => `![screenshot](${u.trim()})`).join('\n') : ''}

## Getting started
\`\`\`bash
git clone ${pr.repoUrl || 'https://github.com/USER/REPO'}
cd REPO
python -m venv .venv
# Windows: .venv\\Scripts\\activate | macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your own keys
\`\`\`

## Results
${pp.results || '_Report only what you measured (e.g., accuracy on an evaluation set). This project uses fictional data._'}

## Limitations and next steps
- _What would you improve?_

## License
MIT
`;
}

export default function Portfolio() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const [preview, setPreview] = useState(false);
  const [readmeFor, setReadmeFor] = useState<ProjectDef | null>(null);
  const prof = s.profile;
  const up = (patch: Partial<typeof prof>) => set((x) => void Object.assign(x.profile, patch));
  const upPP = (id: string, patch: Partial<PortfolioProject>) => set((x) => void (x.portfolio[id] = { ...(x.portfolio[id] ?? emptyPP(id)), ...patch }));

  const markdown = () => {
    const lines = [`# ${s.cv.fullName || s.settings.name || 'Mi nombre'}`, '', `**${prof.headline || 'AI Automation Specialist'}**`, prof.location && `📍 ${prof.location}`, '', prof.about, '', '## Skills', prof.skills, '', '## Projects'];
    PROJECTS.forEach((p) => {
      const pp = s.portfolio[p.id] ?? emptyPP(p.id);
      const pr = s.projects[p.id] ?? emptyProject();
      if (!pp.visible) return;
      lines.push('', `### ${p.title}`, pp.summary || p.objective, '', `**Problem:** ${pp.problem || p.problem}`, pp.solution && `**Solution:** ${pp.solution}`, `**Stack:** ${p.tech.join(', ')}`, pp.results && `**Results:** ${pp.results}`, [pr.repoUrl && `[Code](${pr.repoUrl})`, pr.demoUrl && `[Demo](${pr.demoUrl})`].filter(Boolean).join(' · '));
    });
    lines.push('', '## Links', [prof.github && `GitHub: ${prof.github}`, prof.linkedin && `LinkedIn: ${prof.linkedin}`, prof.website && `Web: ${prof.website}`].filter(Boolean).join('  \n'));
    return lines.filter((l) => typeof l === 'string').join('\n');
  };

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow="Presentación profesional"
        title="Portfolio"
        subtitle="Presentá cada proyecto como un caso de negocio: problema, solución, tecnologías y resultados medidos. Comprensible para reclutadores, verificable por equipos técnicos."
        actions={
          <>
            <Button onClick={() => setPreview(true)}>
              <Eye size={15} /> Vista previa
            </Button>
            <Button variant="primary" onClick={() => downloadText('portfolio.md', markdown(), 'text/markdown')}>
              <Download size={15} /> Exportar Markdown
            </Button>
          </>
        }
      />
      <Callout tone="warn" icon={<Info size={16} />}>
        No inventes experiencia laboral ni resultados. Si un proyecto usa datos ficticios, decilo. Reportá solo métricas que mediste (por ejemplo, "88% de acierto en un set de 25 preguntas").
      </Callout>

      <Card>
        <CardHeader title="Perfil profesional" icon={<UserSquare2 size={18} />} />
        <CardBody className="grid gap-3 sm:grid-cols-2">
          <Field label="Titular (headline)" className="sm:col-span-2">
            <Input value={prof.headline} onChange={(e) => up({ headline: e.target.value })} placeholder="AI Automation Specialist | Python · SQL · n8n · LLMs · RAG" />
          </Field>
          <Field label="Sobre mí" className="sm:col-span-2" hint="3–5 líneas: de dónde venís, qué construís, qué buscás.">
            <Textarea value={prof.about} onChange={(e) => up({ about: e.target.value })} />
          </Field>
          <Field label="Habilidades (separadas por coma)" className="sm:col-span-2">
            <Input value={prof.skills} onChange={(e) => up({ skills: e.target.value })} placeholder="Python, SQL, REST APIs, n8n, Prompt engineering, RAG, Git" />
          </Field>
          <Field label="Ubicación / zona horaria">
            <Input value={prof.location} onChange={(e) => up({ location: e.target.value })} placeholder="Buenos Aires, Argentina (GMT-3)" />
          </Field>
          <Field label="GitHub">
            <Input value={prof.github} onChange={(e) => up({ github: e.target.value })} placeholder="https://github.com/usuario" />
          </Field>
          <Field label="LinkedIn">
            <Input value={prof.linkedin} onChange={(e) => up({ linkedin: e.target.value })} />
          </Field>
          <Field label="Sitio web / portfolio">
            <Input value={prof.website} onChange={(e) => up({ website: e.target.value })} />
          </Field>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {PROJECTS.map((p) => {
          const pp = s.portfolio[p.id] ?? emptyPP(p.id);
          const pr = s.projects[p.id] ?? emptyProject();
          return (
            <Card key={p.id}>
              <CardHeader
                title={`P${p.n}. ${p.title}`}
                subtitle={p.tech.join(' · ')}
                icon={<FileText size={18} />}
                action={<Badge color={pr.status === 'terminado' ? 'emerald' : 'zinc'}>{pr.status}</Badge>}
              />
              <CardBody className="space-y-3">
                <Field label="Resumen en una línea (en inglés recomendado)">
                  <Input value={pp.summary} onChange={(e) => upPP(p.id, { summary: e.target.value })} placeholder={p.objective} />
                </Field>
                <Field label="Problema que resuelve">
                  <Textarea className="min-h-16" value={pp.problem} onChange={(e) => upPP(p.id, { problem: e.target.value })} placeholder={p.problem} />
                </Field>
                <Field label="Solución (qué construiste y cómo)">
                  <Textarea className="min-h-16" value={pp.solution} onChange={(e) => upPP(p.id, { solution: e.target.value })} />
                </Field>
                <Field label="Resultados medidos" hint="Solo métricas reales de tus pruebas.">
                  <Textarea className="min-h-16" value={pp.results} onChange={(e) => upPP(p.id, { results: e.target.value })} />
                </Field>
                <Field label="Capturas / GIF (una URL por línea)">
                  <Textarea className="min-h-12" value={pp.screenshots} onChange={(e) => upPP(p.id, { screenshots: e.target.value })} />
                </Field>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {pr.repoUrl ? <ExtLink href={pr.repoUrl}><Github size={14} /> Repositorio</ExtLink> : <span className="text-xs text-zinc-400">Sin repo (cargalo en el proyecto)</span>}
                  {pr.demoUrl && <ExtLink href={pr.demoUrl}><Globe size={14} /> Demo</ExtLink>}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <Checkbox checked={pp.visible} onChange={(v) => upPP(p.id, { visible: v })} label="Incluir en el portfolio" />
                  <Button size="sm" onClick={() => setReadmeFor(p)}>
                    <FileText size={14} /> Generar README
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Modal open={preview} onClose={() => setPreview(false)} title="Vista previa (Markdown)" wide footer={<CopyButton text={markdown()} />}>
        <pre className="code-area text-xs whitespace-pre-wrap">{markdown()}</pre>
      </Modal>
      <Modal
        open={!!readmeFor}
        onClose={() => setReadmeFor(null)}
        title={`README — ${readmeFor?.title ?? ''}`}
        wide
        footer={readmeFor && <Button variant="primary" onClick={() => downloadText('README.md', readme(readmeFor, s.portfolio[readmeFor.id] ?? emptyPP(readmeFor.id), s), 'text/markdown')}><Download size={14} /> Descargar README.md</Button>}
      >
        {readmeFor && <CodeBlock sample={{ lang: 'text', caption: 'README.md (plantilla en inglés)', code: readme(readmeFor, s.portfolio[readmeFor.id] ?? emptyPP(readmeFor.id), s) }} />}
      </Modal>
    </div>
  );
}
