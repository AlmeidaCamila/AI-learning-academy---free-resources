import { Bot, ExternalLink, Info, Save, Search, Trash2, Wand2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CopyButton } from '../components/Code';
import { Badge, Button, Callout, Card, CardBody, CardHeader, confirmDialog, Empty, Field, Input, Modal, PageHeader, Select, Textarea, toast } from '../components/ui';
import { WEEKS } from '../data/weeks';
import { buildTutorPrompt, TUTOR_MODES, type TutorModeId } from '../lib/prompts';
import { uid, useStore } from '../store/useStore';
import type { TutorEntry } from '../types';

export default function Tutor() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const [params] = useSearchParams();
  const [week, setWeek] = useState(Number(params.get('week')) || s.settings.currentWeek);
  const [mode, setMode] = useState<TutorModeId>((params.get('mode') as TutorModeId) || 'explicar');
  const [extra, setExtra] = useState(params.get('topic') ?? '');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [title, setTitle] = useState('');
  const [q, setQ] = useState('');
  const [view, setView] = useState<TutorEntry | null>(null);
  const m = TUTOR_MODES.find((x) => x.id === mode)!;

  const generate = () => {
    setPrompt(buildTutorPrompt(s, week, mode, extra));
    if (!title) setTitle(`${m.label} — semana ${week}`);
  };

  const save = () => {
    if (!response.trim()) return;
    set((x) => {
      x.tutor.unshift({ id: uid(), date: new Date().toISOString(), week, mode, title: title.trim() || `${m.label} — semana ${week}`, prompt, response });
    });
    setResponse('');
    setTitle('');
    toast('Guardado en tu biblioteca del tutor');
  };

  const list = useMemo(
    () => s.tutor.filter((t) => !q || (t.title + t.response).toLowerCase().includes(q.toLowerCase())),
    [s.tutor, q],
  );

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow="Profesor particular"
        title="AI Tutor"
        subtitle="Generá un prompt con tu contexto real (semana, nivel, errores y objetivos), usalo en Claude y guardá las explicaciones y ejercicios que recibas."
      />

      <Callout tone="info" icon={<Info size={16} />}>
        <b>Modo manual (sin API configurada).</b> La plataforma no envía nada a ningún servicio: copiás el prompt, lo pegás en Claude y pegás la respuesta acá. Ver abajo cómo habilitar una integración directa por API en el futuro.
      </Callout>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader title="1. Configurá la consulta" icon={<Wand2 size={18} />} />
          <CardBody className="space-y-3">
            <Field label="Semana">
              <Select value={week} onChange={(e) => setWeek(Number(e.target.value))}>
                {WEEKS.map((w) => (
                  <option key={w.n} value={w.n}>
                    Semana {w.n}: {w.title}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="¿Qué necesitás?">
              <div className="grid grid-cols-1 gap-1.5">
                {TUTOR_MODES.map((x) => (
                  <label key={x.id} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${mode === x.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-zinc-200 dark:border-zinc-800'}`}>
                    <input type="radio" className="accent-indigo-600" checked={mode === x.id} onChange={() => setMode(x.id)} />
                    {x.label}
                  </label>
                ))}
              </div>
            </Field>
            <Field label={m.needs || 'Material adicional (opcional)'} hint="Código, mensaje de error, enunciado, concepto o puesto, según el modo.">
              <Textarea className="code-area min-h-28 text-xs" value={extra} onChange={(e) => setExtra(e.target.value)} />
            </Field>
            <Button variant="primary" className="w-full" onClick={generate}>
              <Bot size={15} /> Generar prompt contextualizado
            </Button>
          </CardBody>
        </Card>

        <div className="space-y-4 lg:col-span-3">
          <Card>
            <CardHeader
              title="2. Copiá el prompt y abrí Claude"
              icon={<Bot size={18} />}
              action={
                prompt && (
                  <div className="flex gap-1">
                    <CopyButton text={prompt} label="Copiar prompt" />
                    <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="primary">
                        Abrir Claude <ExternalLink size={13} />
                      </Button>
                    </a>
                  </div>
                )
              }
            />
            <CardBody>
              {prompt ? (
                <Textarea className="code-area min-h-64 text-xs" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              ) : (
                <Empty icon={<Bot size={28} />} title="Todavía no generaste un prompt" text="Elegí la semana y el modo, y presioná Generar. Podés editar el prompt antes de copiarlo." />
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="3. Pegá la respuesta y guardala" icon={<Save size={18} />} />
            <CardBody className="space-y-3">
              <Field label="Título">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej.: Explicación de bucles while" />
              </Field>
              <Textarea className="min-h-40" value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Pegá acá la explicación, ejercicios o feedback que te dio Claude." />
              <Button variant="primary" disabled={!response.trim()} onClick={save}>
                <Save size={15} /> Guardar en mi biblioteca
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader title={`Biblioteca del tutor (${s.tutor.length})`} subtitle="Explicaciones, ejercicios y feedback guardados." action={<div className="relative w-48"><Search size={14} className="absolute top-2.5 left-2.5 text-zinc-400" /><Input className="pl-8" placeholder="Buscar" value={q} onChange={(e) => setQ(e.target.value)} /></div>} />
        <CardBody>
          {list.length ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <button key={t.id} onClick={() => setView(t)} className="rounded-xl border border-zinc-200 p-3 text-left transition hover:border-indigo-300 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Badge>S{t.week}</Badge>
                    <Badge color="violet">{TUTOR_MODES.find((x) => x.id === t.mode)?.label ?? t.mode}</Badge>
                  </div>
                  <div className="mt-1.5 line-clamp-1 text-sm font-medium">{t.title}</div>
                  <div className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{t.response}</div>
                </button>
              ))}
            </div>
          ) : (
            <Empty title="Biblioteca vacía" text="Las respuestas que guardes aparecerán acá para repasarlas." />
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Integración directa por API (opcional, no configurada)" icon={<Info size={18} />} />
        <CardBody className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          <p>La arquitectura está preparada para un proveedor de tutor (ver <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">src/lib/prompts.ts</code>): el mismo prompt contextualizado podría enviarse a la API de Anthropic. Para hacerlo de forma segura se necesita:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Una API key de Anthropic con créditos (la API es de pago por uso y separada del plan de claude.ai).</li>
            <li>Un pequeño backend o función serverless que guarde la key como variable de entorno y reenvíe las solicitudes. Nunca se debe poner la key en el código del navegador: cualquiera podría leerla.</li>
            <li>Un límite de gasto configurado en la consola del proveedor.</li>
          </ol>
          <p>Hasta entonces, el modo manual funciona igual de bien y sin costo adicional con tu cuenta de claude.ai.</p>
        </CardBody>
      </Card>

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={view?.title ?? ''}
        wide
        footer={
          view && (
            <>
              <Button
                variant="danger"
                onClick={async () => {
                  if (await confirmDialog({ title: 'Eliminar entrada', text: 'Esta acción no se puede deshacer (salvo que tengas un respaldo).', danger: true, confirmLabel: 'Eliminar' })) {
                    set((x) => void (x.tutor = x.tutor.filter((t) => t.id !== view.id)));
                    setView(null);
                  }
                }}
              >
                <Trash2 size={14} /> Eliminar
              </Button>
              <CopyButton text={view.response} />
            </>
          )
        }
      >
        {view && (
          <div className="space-y-3">
            <div className="text-xs text-zinc-500">
              {new Date(view.date).toLocaleString('es-AR')} · Semana {view.week}
            </div>
            <div className="text-sm whitespace-pre-wrap">{view.response}</div>
            <details className="text-xs">
              <summary className="cursor-pointer text-zinc-500">Ver prompt usado</summary>
              <pre className="code-area mt-2 rounded-lg bg-zinc-100 p-3 whitespace-pre-wrap dark:bg-zinc-800">{view.prompt}</pre>
            </details>
          </div>
        )}
      </Modal>
    </div>
  );
}
