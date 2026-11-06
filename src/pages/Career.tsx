import { Bot, Briefcase, CheckCircle2, Download, FileText, Github, Linkedin, Mic, Plus, Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../components/Code';
import { Badge, Button, Callout, Card, CardBody, CardHeader, Checkbox, confirmDialog, ExtLink, Field, Input, Modal, PageHeader, Select, Stat, Tabs, Textarea } from '../components/ui';
import { GITHUB_CHECKLIST, INTERVIEW_QUESTIONS, JOB_SEARCH_TERMS, LINKEDIN_CHECKLIST, TARGET_ROLES } from '../data/career';
import { PROJECTS } from '../data/projects';
import { STAGES } from '../data/stages';
import { downloadText } from '../lib/download';
import { projectDone, stageApproved } from '../lib/progress';
import { emptyProject, uid, useStore, type CVData } from '../store/useStore';
import type { Application } from '../types';

type Tab = 'cv' | 'linkedin' | 'github' | 'pitch' | 'entrevistas' | 'busqueda' | 'postulaciones';

const STATUSES: Application['status'][] = ['interesada', 'postulada', 'entrevista', 'prueba técnica', 'oferta', 'rechazada', 'descartada'];
const ST_COLOR: Record<Application['status'], string> = { interesada: 'zinc', postulada: 'sky', entrevista: 'indigo', 'prueba técnica': 'violet', oferta: 'emerald', rechazada: 'rose', descartada: 'zinc' };

const emptyApp = (): Application => ({ id: uid(), company: '', role: '', country: '', modality: 'Remoto', url: '', date: new Date().toISOString().slice(0, 10), status: 'interesada', salary: '', notes: '' });

export default function Career() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const [tab, setTab] = useState<Tab>('cv');
  const [editApp, setEditApp] = useState<Application | null>(null);
  const cv = s.cv;
  const upCV = (p: Partial<CVData>) => set((x) => void Object.assign(x.cv, p));

  const cvText = () => {
    const projects = PROJECTS.filter((p) => projectDone(s, p.id) || (s.projects[p.id]?.status ?? 'no iniciado') !== 'no iniciado')
      .slice(0, 4)
      .map((p) => {
        const pp = s.portfolio[p.id];
        const pr = s.projects[p.id] ?? emptyProject();
        return `**${p.title}** — ${p.tech.slice(0, 5).join(', ')}${pr.repoUrl ? ` · ${pr.repoUrl}` : ''}\n- ${pp?.summary || p.objective}${pp?.results ? `\n- ${pp.results}` : ''}`;
      })
      .join('\n\n');
    return `# ${cv.fullName || 'Full Name'}
${[cv.location, cv.email, cv.linkedin, cv.github, cv.portfolio].filter(Boolean).join(' · ')}

## Summary
${cv.summary}

## Skills
${cv.skills}

## Projects
${projects || '_Your projects will appear here as you start them._'}

## Experience
${cv.experience}

## Education & Certifications
${cv.education}
${cv.certifications}

## Languages
${cv.languages}
`;
  };

  const approvedStages = new Set(STAGES.filter((x) => stageApproved(s, x.id)).map((x) => x.id));
  const apps = s.applications;
  const advanced = apps.filter((a) => ['entrevista', 'prueba técnica', 'oferta'].includes(a.status)).length;
  const applied = apps.filter((a) => a.status !== 'interesada' && a.status !== 'descartada').length;

  const saveApp = (a: Application) => {
    set((x) => {
      const i = x.applications.findIndex((y) => y.id === a.id);
      if (i >= 0) x.applications[i] = a;
      else x.applications.unshift(a);
    });
    setEditApp(null);
  };

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader eyebrow="Empleabilidad internacional" title="Career Center" subtitle="CV en inglés, LinkedIn, GitHub, presentación, entrevistas y seguimiento de postulaciones, orientados a puestos iniciales en automatización e IA." />
      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'cv', label: 'CV en inglés', icon: <FileText size={15} /> },
          { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={15} /> },
          { id: 'github', label: 'GitHub', icon: <Github size={15} /> },
          { id: 'pitch', label: 'Presentación', icon: <Mic size={15} /> },
          { id: 'entrevistas', label: 'Entrevistas', icon: <Users size={15} /> },
          { id: 'busqueda', label: 'Búsqueda y nivel', icon: <Search size={15} /> },
          { id: 'postulaciones', label: 'Postulaciones', icon: <Briefcase size={15} />, badge: <span className="text-xs text-zinc-400">{apps.length}</span> },
        ]}
      />

      {tab === 'cv' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Datos del CV" subtitle="Formato internacional de 1 página. Sin foto, edad ni estado civil." />
            <CardBody className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name"><Input value={cv.fullName} onChange={(e) => upCV({ fullName: e.target.value })} /></Field>
              <Field label="Location / time zone"><Input value={cv.location} onChange={(e) => upCV({ location: e.target.value })} placeholder="Argentina (GMT-3) · Open to remote" /></Field>
              <Field label="Email"><Input value={cv.email} onChange={(e) => upCV({ email: e.target.value })} /></Field>
              <Field label="LinkedIn"><Input value={cv.linkedin} onChange={(e) => upCV({ linkedin: e.target.value })} /></Field>
              <Field label="GitHub"><Input value={cv.github} onChange={(e) => upCV({ github: e.target.value })} /></Field>
              <Field label="Portfolio"><Input value={cv.portfolio} onChange={(e) => upCV({ portfolio: e.target.value })} /></Field>
              <Field label="Summary (2–3 lines)" className="sm:col-span-2"><Textarea value={cv.summary} onChange={(e) => upCV({ summary: e.target.value })} placeholder="Automation-focused developer transitioning from … I build Python and n8n workflows that combine APIs, SQL and LLMs…" /></Field>
              <Field label="Skills (grouped)" className="sm:col-span-2"><Textarea value={cv.skills} onChange={(e) => upCV({ skills: e.target.value })} placeholder={'Programming: Python, SQL\nAutomation: n8n, REST APIs, webhooks\nAI: prompt engineering, RAG, tool use\nTools: Git, GitHub, Postman'} /></Field>
              <Field label="Experience (real, with transferable achievements)" className="sm:col-span-2" hint="Verbo de acción + qué + cómo + resultado. No inventes experiencia."><Textarea className="min-h-32" value={cv.experience} onChange={(e) => upCV({ experience: e.target.value })} /></Field>
              <Field label="Education" className="sm:col-span-2"><Textarea className="min-h-16" value={cv.education} onChange={(e) => upCV({ education: e.target.value })} /></Field>
              <Field label="Certifications (completed only)" className="sm:col-span-2"><Textarea className="min-h-16" value={cv.certifications} onChange={(e) => upCV({ certifications: e.target.value })} /></Field>
              <Field label="Languages" className="sm:col-span-2"><Input value={cv.languages} onChange={(e) => upCV({ languages: e.target.value })} placeholder="Spanish (native), English (B2 — professional working proficiency)" /></Field>
            </CardBody>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardHeader title="CV generado (Markdown)" action={<div className="flex gap-1"><CopyButton text={cvText()} /><Button size="sm" variant="primary" onClick={() => downloadText('cv.md', cvText(), 'text/markdown')}><Download size={13} /> Descargar</Button></div>} />
              <CardBody>
                <pre className="code-area thin-scroll max-h-[560px] overflow-auto rounded-lg bg-zinc-50 p-3 text-xs whitespace-pre-wrap dark:bg-zinc-800/50">{cvText()}</pre>
                <p className="mt-2 text-xs text-zinc-500">Los proyectos se toman de la sección Proyectos/Portfolio. Pegá el texto en un documento con formato simple (sin tablas ni columnas) para que lo lean bien los ATS.</p>
              </CardBody>
            </Card>
            <Callout tone="info" icon={<Bot size={16} />}>
              Pedí una revisión en el <Link className="underline" to={`/tutor?mode=revisar&topic=${encodeURIComponent('Revisá mi CV como recruiter internacional para un puesto junior de automatización/IA. Señalá mejoras sin inventar experiencia:\n\n' + cvText())}`}>AI Tutor</Link> con el CV ya incluido en el prompt.
            </Callout>
          </div>
        </div>
      )}

      {tab === 'linkedin' && (
        <Card>
          <CardHeader title="Optimización de LinkedIn" subtitle={`${s.linkedinDone.length}/${LINKEDIN_CHECKLIST.length} completado`} icon={<Linkedin size={18} />} />
          <CardBody className="space-y-2.5">
            {LINKEDIN_CHECKLIST.map((c) => (
              <Checkbox key={c} checked={s.linkedinDone.includes(c)} onChange={(v) => set((x) => void (x.linkedinDone = v ? [...x.linkedinDone, c] : x.linkedinDone.filter((y) => y !== c)))} label={c} />
            ))}
            <div className="pt-3">
              <Callout tone="info">Plantilla de headline: <b>[Rol objetivo] | [3–5 tecnologías] | [qué problema resolvés]</b>. Ejemplo: "Junior AI Automation Specialist | Python · n8n · LLMs · RAG | Automating customer operations".</Callout>
            </div>
          </CardBody>
        </Card>
      )}

      {tab === 'github' && (
        <Card>
          <CardHeader title="GitHub profesional" subtitle={`${s.githubDone.length}/${GITHUB_CHECKLIST.length} completado`} icon={<Github size={18} />} />
          <CardBody className="space-y-2.5">
            {GITHUB_CHECKLIST.map((c) => (
              <Checkbox key={c} checked={s.githubDone.includes(c)} onChange={(v) => set((x) => void (x.githubDone = v ? [...x.githubDone, c] : x.githubDone.filter((y) => y !== c)))} label={c} />
            ))}
          </CardBody>
        </Card>
      )}

      {tab === 'pitch' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Elevator pitch (60 s, en inglés)" icon={<Mic size={18} />} />
            <CardBody className="space-y-3">
              <Textarea className="min-h-48" value={s.pitch} onChange={(e) => set((x) => void (x.pitch = e.target.value))} placeholder="I started my career in… Over the past nine months I… I built… I'm looking for…" />
              <div className="text-xs text-zinc-500">{s.pitch.trim() ? s.pitch.trim().split(/\s+/).length : 0} palabras · ~{Math.round((s.pitch.trim() ? s.pitch.trim().split(/\s+/).length : 0) / 2.3)} s hablando (objetivo: 120–150 palabras)</div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Estructura recomendada" />
            <CardBody className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <p><b>1. Pasado:</b> tu experiencia previa y qué problema viste ("I saw how much time teams spent on…").</p>
              <p><b>2. Presente:</b> qué aprendiste y construiste (1 proyecto concreto con resultado medido).</p>
              <p><b>3. Futuro:</b> qué rol buscás y qué aportás.</p>
              <p className="text-xs text-zinc-500">Grabate 3 veces y mejorá entre versiones. Practicalo con el AI Tutor en modo entrevista.</p>
            </CardBody>
          </Card>
        </div>
      )}

      {tab === 'entrevistas' && (
        <div className="space-y-4">
          <Callout tone="info" icon={<Bot size={16} />}>
            Para simulaciones completas usá el <Link to="/tutor?mode=entrevista" className="underline">AI Tutor en modo "Simular entrevista técnica"</Link>. Acá preparás tus respuestas por escrito.
          </Callout>
          {[...new Set(INTERVIEW_QUESTIONS.map((q) => q.cat))].map((cat) => (
            <Card key={cat}>
              <CardHeader title={cat} />
              <CardBody className="space-y-3">
                {INTERVIEW_QUESTIONS.filter((q) => q.cat === cat).map((q) => (
                  <details key={q.q} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 text-sm font-medium">
                      {q.q}
                      {(s.interviewNotes[q.q] ?? '').trim() && <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />}
                    </summary>
                    <p className="mt-2 text-xs text-zinc-500">💡 {q.tip}</p>
                    <Textarea className="mt-2 min-h-24" value={s.interviewNotes[q.q] ?? ''} onChange={(e) => set((x) => void (x.interviewNotes[q.q] = e.target.value))} placeholder="Tu respuesta (en inglés para practicar)" />
                  </details>
                ))}
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {tab === 'busqueda' && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="Evaluación de tu nivel real" subtitle="Basada en las etapas aprobadas y los proyectos terminados. No asume que estarás lista para todos los puestos." />
            <CardBody className="space-y-2.5">
              {TARGET_ROLES.map((r) => {
                const missingStages = r.requires.filter((x) => !approvedStages.has(x));
                const missingProj = r.projects.filter((p) => !projectDone(s, p));
                const ready = !missingStages.length && !missingProj.length;
                return (
                  <div key={r.role} className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{r.role}</div>
                      <div className="text-xs text-zinc-500">{r.note}</div>
                      {!ready && (
                        <div className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                          Falta: {missingStages.length ? `etapas ${missingStages.join(', ')}` : ''}
                          {missingStages.length && missingProj.length ? ' · ' : ''}
                          {missingProj.length ? `proyectos ${missingProj.map((p) => 'P' + PROJECTS.find((x) => x.id === p)!.n).join(', ')}` : ''}
                        </div>
                      )}
                    </div>
                    <Badge color={ready ? 'emerald' : missingStages.length <= 1 && missingProj.length <= 1 ? 'amber' : 'zinc'}>{ready ? 'recomendado' : missingStages.length <= 1 && missingProj.length <= 1 ? 'cerca' : 'todavía no'}</Badge>
                  </div>
                );
              })}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Dónde buscar" />
            <CardBody className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-3">
                <ExtLink href="https://www.linkedin.com/jobs/">LinkedIn Jobs</ExtLink>
                <ExtLink href="https://wellfound.com/jobs">Wellfound</ExtLink>
              </div>
              <div>
                <div className="mb-1.5 text-xs font-medium text-zinc-500">Términos de búsqueda sugeridos (combiná con el filtro "Remote")</div>
                <div className="flex flex-wrap gap-1.5">
                  {JOB_SEARCH_TERMS.map((t) => (
                    <a key={t} href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(t)}`} target="_blank" rel="noopener noreferrer">
                      <Badge color="indigo">{t}</Badge>
                    </a>
                  ))}
                </div>
              </div>
              <Callout tone="warn">Desconfiá de ofertas que piden pagos, datos bancarios al inicio o "entrenamientos" pagos. Verificá la empresa antes de compartir documentos.</Callout>
            </CardBody>
          </Card>
        </div>
      )}

      {tab === 'postulaciones' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Registradas" value={apps.length} />
            <Stat label="Postuladas" value={applied} />
            <Stat label="Llegaron a entrevista" value={advanced} sub={applied ? `${Math.round((advanced / applied) * 100)}% de las postuladas` : undefined} />
            <Stat label="Ofertas" value={apps.filter((a) => a.status === 'oferta').length} />
          </div>
          <Card>
            <CardHeader title="Seguimiento de postulaciones" action={<Button size="sm" variant="primary" onClick={() => setEditApp(emptyApp())}><Plus size={14} /> Agregar</Button>} />
            <CardBody>
              {apps.length ? (
                <div className="thin-scroll overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="text-xs text-zinc-500">
                      <tr>
                        <th className="py-2">Empresa</th>
                        <th>Puesto</th>
                        <th>País</th>
                        <th>Modalidad</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Salario</th>
                        <th>Obs.</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map((a) => (
                        <tr key={a.id} className="cursor-pointer border-t border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40" onClick={() => setEditApp(a)}>
                          <td className="py-2 font-medium">{a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400" onClick={(e) => e.stopPropagation()}>{a.company}</a> : a.company}</td>
                          <td>{a.role}</td>
                          <td>{a.country}</td>
                          <td>{a.modality}</td>
                          <td>{a.date}</td>
                          <td><Badge color={ST_COLOR[a.status]}>{a.status}</Badge></td>
                          <td>{a.salary || '—'}</td>
                          <td className="max-w-40 truncate text-zinc-500">{a.notes}</td>
                          <td>
                            <button
                              aria-label="Eliminar"
                              className="text-zinc-400 hover:text-rose-500"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (await confirmDialog({ title: 'Eliminar postulación', text: `¿Eliminar ${a.company} — ${a.role}?`, danger: true, confirmLabel: 'Eliminar' })) set((x) => void (x.applications = x.applications.filter((y) => y.id !== a.id)));
                              }}
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
                <p className="text-sm text-zinc-500">Registrá cada oferta interesante, aunque todavía no postules.</p>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {editApp && <AppForm initial={editApp} onSave={saveApp} onClose={() => setEditApp(null)} />}
    </div>
  );
}

function AppForm({ initial, onSave, onClose }: { initial: Application; onSave: (a: Application) => void; onClose: () => void }) {
  const [a, setA] = useState(initial);
  const up = (p: Partial<Application>) => setA({ ...a, ...p });
  return (
    <Modal open onClose={onClose} title={initial.company ? 'Editar postulación' : 'Nueva postulación'} footer={<><Button onClick={onClose}>Cancelar</Button><Button variant="primary" disabled={!a.company.trim() || !a.role.trim()} onClick={() => onSave(a)}>Guardar</Button></>}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Empresa"><Input value={a.company} onChange={(e) => up({ company: e.target.value })} /></Field>
        <Field label="Puesto"><Input value={a.role} onChange={(e) => up({ role: e.target.value })} /></Field>
        <Field label="País"><Input value={a.country} onChange={(e) => up({ country: e.target.value })} /></Field>
        <Field label="Modalidad">
          <Select value={a.modality} onChange={(e) => up({ modality: e.target.value })}>
            <option>Remoto</option>
            <option>Remoto (zona horaria)</option>
            <option>Híbrido</option>
            <option>Presencial</option>
          </Select>
        </Field>
        <Field label="Enlace" className="sm:col-span-2"><Input value={a.url} onChange={(e) => up({ url: e.target.value })} /></Field>
        <Field label="Fecha"><Input type="date" value={a.date} onChange={(e) => up({ date: e.target.value })} /></Field>
        <Field label="Estado">
          <Select value={a.status} onChange={(e) => up({ status: e.target.value as Application['status'] })}>
            {STATUSES.map((x) => <option key={x}>{x}</option>)}
          </Select>
        </Field>
        <Field label="Salario publicado (si está)" className="sm:col-span-2"><Input value={a.salary} onChange={(e) => up({ salary: e.target.value })} placeholder="Ej.: USD 1.500–2.000/mes" /></Field>
        <Field label="Observaciones" className="sm:col-span-2"><Textarea value={a.notes} onChange={(e) => up({ notes: e.target.value })} /></Field>
      </div>
    </Modal>
  );
}
