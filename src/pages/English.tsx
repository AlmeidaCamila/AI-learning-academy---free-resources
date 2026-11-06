import { BookOpenText, Check, Languages, MessageSquareText, RefreshCw, Repeat } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Checkbox, cx, PageHeader, Progress, Stat, Textarea } from '../components/ui';
import { ENGLISH, type EnglishModule } from '../data/english';
import { useStore } from '../store/useStore';

function Flashcards({ m }: { m: EnglishModule }) {
  const known = useStore((x) => x.englishKnown);
  const set = useStore((x) => x.set);
  const pending = m.vocab.filter((v) => !known.includes(`${m.id}:${v.en}`));
  const pool = pending.length ? pending : m.vocab;
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const card = pool[i % pool.length];
  const k = `${m.id}:${card.en}`;
  const next = () => {
    setFlip(false);
    setI((x) => x + 1);
  };
  return (
    <div>
      <button
        onClick={() => setFlip((f) => !f)}
        className="flex min-h-40 w-full flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 text-center transition hover:shadow-md dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
      >
        {!flip ? (
          <>
            <div className="text-2xl font-semibold">{card.en}</div>
            <div className="mt-2 text-xs text-zinc-400">Tocá para ver la traducción</div>
          </>
        ) : (
          <>
            <div className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{card.es}</div>
            <div className="mt-2 text-sm text-zinc-600 italic dark:text-zinc-300">“{card.example}”</div>
          </>
        )}
      </button>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-zinc-500">
          {pending.length ? `${pending.length} término(s) por aprender` : 'Repaso: dominás todos los términos'}
        </span>
        <div className="flex gap-2">
          <Button size="sm" onClick={next}>
            <Repeat size={14} /> Repasar luego
          </Button>
          <Button
            size="sm"
            variant="success"
            onClick={() => {
              set((x) => void (x.englishKnown = [...new Set([...x.englishKnown, k])]));
              next();
            }}
          >
            <Check size={14} /> Lo sé
          </Button>
        </div>
      </div>
    </div>
  );
}

function RevealQ({ q, a }: { q: string; a: string }) {
  const [mine, setMine] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="text-sm font-medium">{q}</div>
      <Textarea className="mt-2 min-h-12" value={mine} onChange={(e) => setMine(e.target.value)} placeholder="Your answer / tu respuesta" />
      <Button size="sm" variant="ghost" className="mt-1" disabled={mine.trim().length < 3} onClick={() => setShow(true)}>
        Comparar
      </Button>
      {show && <div className="mt-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100">{a}</div>}
    </div>
  );
}

export default function English() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const [sel, setSel] = useState(ENGLISH[0].id);
  const m = ENGLISH.find((x) => x.id === sel)!;
  const totalVocab = ENGLISH.reduce((a, x) => a + x.vocab.length, 0);
  const done = s.englishDone.includes(m.id);

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        eyebrow="1 hora por semana"
        title="Inglés técnico"
        subtitle="Vocabulario y lectura orientados a trabajar en un equipo tecnológico internacional: documentación, APIs, IA, GitHub y entrevistas."
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Stat label="Vocabulario dominado" value={`${s.englishKnown.length}/${totalVocab}`} icon={<Languages size={16} />}>
          <Progress value={(s.englishKnown.length / totalVocab) * 100} color="amber" className="mt-2" />
        </Stat>
        <Stat label="Módulos completados" value={`${s.englishDone.length}/${ENGLISH.length}`} />
        <Stat label="Recomendación" value={<span className="text-base">Módulo de tu etapa</span>} sub="Alineá cada módulo con la etapa que estás cursando." />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="space-y-1.5">
          {ENGLISH.map((x) => (
            <button
              key={x.id}
              onClick={() => setSel(x.id)}
              className={cx('flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition', sel === x.id ? 'bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800')}
            >
              <span>{x.title}</span>
              {s.englishDone.includes(x.id) ? <Check size={14} className="text-emerald-600" /> : <Badge>E{x.stage}</Badge>}
            </button>
          ))}
        </div>
        <div className="space-y-4 lg:col-span-3">
          <Card>
            <CardHeader title={m.title} subtitle={`Objetivo: ${m.goal}`} icon={<Languages size={18} />} action={<Checkbox checked={done} onChange={(v) => set((x) => void (x.englishDone = v ? [...new Set([...x.englishDone, m.id])] : x.englishDone.filter((y) => y !== m.id)))} label="Completado" />} />
            <CardBody>
              <Flashcards key={m.id} m={m} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Vocabulario" icon={<BookOpenText size={18} />} action={<Button size="sm" variant="ghost" onClick={() => set((x) => void (x.englishKnown = x.englishKnown.filter((k) => !k.startsWith(m.id + ':'))))}><RefreshCw size={13} /> Reiniciar</Button>} />
            <CardBody>
              <div className="thin-scroll overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-zinc-500">
                    <tr>
                      <th className="py-1.5">English</th>
                      <th>Español</th>
                      <th className="hidden md:table-cell">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.vocab.map((v) => (
                      <tr key={v.en} className="border-t border-zinc-100 dark:border-zinc-800">
                        <td className="py-1.5 font-medium">
                          {s.englishKnown.includes(`${m.id}:${v.en}`) && <Check size={12} className="mr-1 inline text-emerald-600" />}
                          {v.en}
                        </td>
                        <td>{v.es}</td>
                        <td className="hidden text-zinc-500 italic md:table-cell">{v.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title={`Lectura: ${m.reading.title}`} subtitle={m.reading.note} icon={<BookOpenText size={18} />} />
            <CardBody className="space-y-3">
              <div className="rounded-xl bg-zinc-50 p-4 text-sm leading-7 whitespace-pre-line dark:bg-zinc-800/50">{m.reading.text}</div>
              {m.questions.map((q) => (
                <RevealQ key={q.q} q={q.q} a={q.a} />
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Frases útiles" icon={<MessageSquareText size={18} />} />
            <CardBody className="grid gap-2 sm:grid-cols-2">
              {m.phrases.map((p) => (
                <div key={p.en} className="rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-800">
                  <div className="font-medium">{p.en}</div>
                  <div className="text-zinc-500">{p.es}</div>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Mis notas de inglés" />
            <CardBody>
              <Textarea value={s.englishNotes[m.id] ?? ''} onChange={(e) => set((x) => void (x.englishNotes[m.id] = e.target.value))} placeholder="Escribí 3 oraciones propias usando el vocabulario de este módulo." />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
