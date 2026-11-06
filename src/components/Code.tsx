import { Check, Copy, Eye, EyeOff, Lightbulb, Loader2, Play, RotateCcw } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import { runPython, type PyResult } from '../lib/python';
import { runSql, type SqlResult } from '../lib/sql';
import type { CodeSample } from '../types';
import { Badge, Button, Callout, cx } from './ui';

export function CopyButton({ text, label = 'Copiar' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {
          /* sin permiso de portapapeles */
        }
      }}
    >
      {ok ? <Check size={14} /> : <Copy size={14} />}
      {ok ? 'Copiado' : label}
    </Button>
  );
}

export function CodeBlock({ sample }: { sample: CodeSample }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
        <span className="text-xs text-zinc-400">{sample.caption ?? sample.lang}</span>
        <div className="[&_button]:text-zinc-300 [&_button:hover]:bg-zinc-800">
          <CopyButton text={sample.code} />
        </div>
      </div>
      <pre className="thin-scroll overflow-x-auto p-4 text-[13px] leading-6 text-zinc-100">
        <code className="code-area">{sample.code}</code>
      </pre>
    </div>
  );
}

export function CodeEditor({ value, onChange, rows = 10, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const t = e.currentTarget;
      const { selectionStart: s, selectionEnd: en } = t;
      const next = value.slice(0, s) + '    ' + value.slice(en);
      onChange(next);
      requestAnimationFrame(() => {
        t.selectionStart = t.selectionEnd = s + 4;
      });
    }
  };
  return (
    <textarea
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      value={value}
      placeholder={placeholder}
      rows={rows}
      onKeyDown={onKey}
      onChange={(e) => onChange(e.target.value)}
      className="code-area thin-scroll w-full resize-y rounded-xl border border-zinc-300 bg-zinc-950 p-4 text-[13px] leading-6 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none dark:border-zinc-700"
    />
  );
}

function PyOutput({ r }: { r: PyResult }) {
  if (r.fatal) return <Callout tone="danger">No se pudo cargar el intérprete de Python: {r.fatal}. Revisá tu conexión (la primera carga descarga ~10 MB).</Callout>;
  return (
    <div className="space-y-2">
      {(r.stdout || !r.error) && (
        <pre className="code-area thin-scroll max-h-60 overflow-auto rounded-lg bg-zinc-100 p-3 text-xs whitespace-pre-wrap dark:bg-zinc-800/60">{r.stdout || '(sin salida)'}</pre>
      )}
      {r.error && (
        <Callout tone="danger">
          <div className="font-mono text-xs whitespace-pre-wrap">{r.error}</div>
          {r.errorLine && <div className="mt-1 text-xs">Línea {r.errorLine} de tu código. Leé el tipo de error (antes de los dos puntos) y revisá esa línea.</div>}
        </Callout>
      )}
      {r.tests && (
        <Callout tone={r.tests.passed ? 'ok' : 'warn'}>
          <div className="font-medium">{r.tests.passed ? '✓ Todos los tests pasaron' : '✗ Un test no pasó'}</div>
          {!r.tests.passed && (
            <div className="mt-1 font-mono text-xs whitespace-pre-wrap">
              {r.tests.message}
              {r.tests.failing && `\nTest: ${r.tests.failing}`}
            </div>
          )}
        </Callout>
      )}
    </div>
  );
}

/**
 * Editor ejecutable. La solución solo puede verse después de al menos un intento ejecutado.
 */
export function PythonRunner({
  starter = '',
  tests,
  solution,
  hints = [],
  onPassed,
  value,
  onChange,
}: {
  starter?: string;
  tests?: string;
  solution?: string;
  hints?: string[];
  onPassed?: () => void;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [local, setLocal] = useState(starter);
  const code = value ?? local;
  const setCode = onChange ?? setLocal;
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(/input\(/.test(starter));
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<PyResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hintN, setHintN] = useState(0);
  const [showSol, setShowSol] = useState(false);

  const run = async () => {
    setBusy(true);
    const r = await runPython(code, tests ?? '', stdin);
    setBusy(false);
    setRes(r);
    if (code.trim() !== starter.trim()) setAttempts((a) => a + 1);
    if (r.tests?.passed) onPassed?.();
  };

  return (
    <div className="space-y-3">
      <CodeEditor value={code} onChange={setCode} rows={Math.min(18, Math.max(6, code.split('\n').length + 2))} placeholder="# Escribí tu código acá" />
      {showStdin && (
        <div>
          <div className="mb-1 text-xs text-zinc-500">Entrada (stdin): un valor por línea, se usa en cada input()</div>
          <textarea value={stdin} onChange={(e) => setStdin(e.target.value)} rows={3} className="code-area w-full rounded-lg border border-zinc-300 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-950" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={run} disabled={busy}>
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          {tests ? 'Ejecutar y probar' : 'Ejecutar'}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setCode(starter)}>
          <RotateCcw size={14} /> Reiniciar
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowStdin((v) => !v)}>
          {showStdin ? 'Ocultar entrada' : 'Agregar entrada (input)'}
        </Button>
        {hints.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setHintN((n) => Math.min(hints.length, n + 1))} disabled={hintN >= hints.length}>
            <Lightbulb size={14} /> Pista {hintN < hints.length ? `${hintN + 1}/${hints.length}` : '(no hay más)'}
          </Button>
        )}
        {solution && (
          <Button
            variant="ghost"
            size="sm"
            disabled={attempts === 0}
            title={attempts === 0 ? 'Intentá resolverlo y ejecutalo al menos una vez' : ''}
            onClick={() => setShowSol((v) => !v)}
          >
            {showSol ? <EyeOff size={14} /> : <Eye size={14} />}
            {attempts === 0 ? 'Solución (intentá primero)' : showSol ? 'Ocultar solución' : 'Ver solución'}
          </Button>
        )}
        {busy && <span className="text-xs text-zinc-500">La primera ejecución carga Python en tu navegador (unos segundos)…</span>}
      </div>
      {hintN > 0 && (
        <ol className="space-y-1.5">
          {hints.slice(0, hintN).map((h, i) => (
            <li key={i} className="flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
              <Lightbulb size={14} className="mt-0.5 shrink-0" />
              <span>
                <b>Pista {i + 1}:</b> {h}
              </span>
            </li>
          ))}
        </ol>
      )}
      {res && <PyOutput r={res} />}
      {showSol && solution && (
        <div>
          <div className="mb-1 text-xs font-medium text-zinc-500">Solución de referencia (puede haber otras correctas)</div>
          <CodeBlock sample={{ lang: 'python', code: solution }} />
        </div>
      )}
    </div>
  );
}

export function SqlTable({ r }: { r: SqlResult }) {
  if (!r.ok) return <Callout tone="danger"><span className="font-mono text-xs">{r.error}</span></Callout>;
  if (!r.columns.length) return <div className="text-xs text-zinc-500">Consulta ejecutada ({r.statements} sentencia/s). No devolvió filas.</div>;
  return (
    <div className="thin-scroll max-h-72 overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-xs">
        <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800">
          <tr>
            {r.columns.map((c) => (
              <th key={c} className="px-3 py-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {r.rows.map((row, i) => (
            <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800">
              {row.map((v, j) => (
                <td key={j} className="px-3 py-1.5 font-mono">
                  {v === null ? <span className="text-zinc-400">NULL</span> : String(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-zinc-100 px-3 py-1 text-[11px] text-zinc-500 dark:border-zinc-800">{r.rows.length} fila(s)</div>
    </div>
  );
}

export function SqlRunner({ schema, solution, hints = [], value, onChange }: { schema: string; solution?: string; hints?: string[]; value?: string; onChange?: (v: string) => void }) {
  const [local, setLocal] = useState('');
  const q = value ?? local;
  const setQ = onChange ?? setLocal;
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<SqlResult | null>(null);
  const [tried, setTried] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [showSchema, setShowSchema] = useState(false);
  const [hintN, setHintN] = useState(0);
  const run = async () => {
    setBusy(true);
    try {
      setRes(await runSql(schema, q));
    } catch (e) {
      setRes({ ok: false, columns: [], rows: [], error: (e as Error).message, statements: 0 });
    }
    setBusy(false);
    if (q.trim()) setTried(true);
  };
  const tables = [...schema.matchAll(/CREATE TABLE (\w+)\s*\(([\s\S]*?)\);/g)].map((m) => ({ name: m[1], cols: m[2].split(',').map((c) => c.trim().split(/\s+/)[0]).filter((c) => c && !/^(PRIMARY|FOREIGN)$/i.test(c)) }));
  return (
    <div className="space-y-3">
      {tables.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {tables.map((t) => (
            <span key={t.name} className="rounded-lg bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
              <b>{t.name}</b> ({t.cols.join(', ')})
            </span>
          ))}
          <button className="text-indigo-600 hover:underline dark:text-indigo-400" onClick={() => setShowSchema((v) => !v)}>
            {showSchema ? 'Ocultar datos' : 'Ver esquema y datos'}
          </button>
        </div>
      )}
      {showSchema && <CodeBlock sample={{ lang: 'sql', code: schema.trim(), caption: 'Esquema de práctica' }} />}
      <CodeEditor value={q} onChange={setQ} rows={5} placeholder="SELECT ..." />
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={run} disabled={busy}>
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} Ejecutar SQL
        </Button>
        {hints.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setHintN((n) => Math.min(hints.length, n + 1))} disabled={hintN >= hints.length}>
            <Lightbulb size={14} /> Pista
          </Button>
        )}
        {solution && (
          <Button variant="ghost" size="sm" disabled={!tried} onClick={() => setShowSol((v) => !v)}>
            <Eye size={14} /> {tried ? (showSol ? 'Ocultar solución' : 'Ver solución') : 'Solución (intentá primero)'}
          </Button>
        )}
      </div>
      {hintN > 0 && (
        <ul className="space-y-1">
          {hints.slice(0, hintN).map((h, i) => (
            <li key={i} className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
              💡 {h}
            </li>
          ))}
        </ul>
      )}
      {res && <SqlTable r={res} />}
      {showSol && solution && <CodeBlock sample={{ lang: 'sql', code: solution }} />}
    </div>
  );
}

export function LangBadge({ lang }: { lang: string }) {
  return <Badge className={cx('uppercase')}>{lang}</Badge>;
}
