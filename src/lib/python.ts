/**
 * Ejecuta Python en el navegador con Pyodide (CPython compilado a WebAssembly),
 * dentro de un Web Worker para que un bucle infinito no congele la página.
 * Se descarga una sola vez (~10 MB) desde jsDelivr la primera vez que lo usás.
 */
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';

const HARNESS = `
import sys, io, json, traceback
_buf = io.StringIO()
_inputs = __stdin.split("\\n") if __stdin else []
def _fake_input(prompt=""):
    _buf.write(str(prompt))
    if _inputs:
        v = _inputs.pop(0)
        _buf.write(v + "\\n")
        return v
    raise EOFError("input() no tiene datos: escribí los valores en el campo 'Entrada (stdin)', uno por línea")
ns = {"__name__": "__main__", "input": _fake_input, "salida": lambda: _buf.getvalue()}
_old = (sys.stdout, sys.stderr)
sys.stdout = _buf
sys.stderr = _buf
result = {"ok": True, "error": None, "errorLine": None, "tests": None}
try:
    exec(compile(__code, "<tu_codigo>", "exec"), ns)
except BaseException as e:
    result["ok"] = False
    line = None
    for fr in traceback.extract_tb(e.__traceback__):
        if fr.filename == "<tu_codigo>":
            line = fr.lineno
    if isinstance(e, SyntaxError):
        line = e.lineno
    result["errorLine"] = line
    result["error"] = "".join(traceback.format_exception_only(type(e), e)).strip()
if result["ok"] and __tests.strip():
    try:
        exec(compile(__tests, "<tests>", "exec"), ns)
        result["tests"] = {"passed": True, "message": "Todos los tests pasaron"}
    except BaseException as e:
        failing = ""
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == "<tests>":
                try:
                    failing = __tests.split("\\n")[fr.lineno - 1].strip()
                except Exception:
                    failing = ""
        msg = str(e) if isinstance(e, AssertionError) and str(e) else "".join(traceback.format_exception_only(type(e), e)).strip()
        result["tests"] = {"passed": False, "message": msg or "Un test no pasó", "failing": failing}
sys.stdout, sys.stderr = _old
result["stdout"] = _buf.getvalue()
json.dumps(result)
`;

const WORKER_SRC = `
importScripts('${PYODIDE_URL}pyodide.js');
let py = null;
self.onmessage = async (e) => {
  const { id, type, code, tests, stdin, harness } = e.data;
  try {
    if (!py) py = await loadPyodide({ indexURL: '${PYODIDE_URL}' });
    if (type === 'init') { self.postMessage({ id, ready: true }); return; }
    py.globals.set('__code', code);
    py.globals.set('__tests', tests || '');
    py.globals.set('__stdin', stdin || '');
    const out = py.runPython(harness);
    self.postMessage({ id, result: JSON.parse(out) });
  } catch (err) {
    self.postMessage({ id, fatal: String(err) });
  }
};
`;

export interface PyResult {
  ok: boolean;
  stdout: string;
  error: string | null;
  errorLine: number | null;
  tests: { passed: boolean; message: string; failing?: string } | null;
  timeout?: boolean;
  fatal?: string;
}

let worker: Worker | null = null;
let ready: Promise<void> | null = null;
let seq = 0;
const pending = new Map<number, (d: unknown) => void>();

function spawn() {
  const blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
  worker = new Worker(URL.createObjectURL(blob));
  worker.onmessage = (e) => {
    const cb = pending.get(e.data.id);
    if (cb) {
      pending.delete(e.data.id);
      cb(e.data);
    }
  };
  worker.onerror = (e) => {
    pending.forEach((cb) => cb({ fatal: e.message || 'No se pudo cargar Python (¿sin conexión a internet?)' }));
    pending.clear();
  };
  const id = ++seq;
  ready = new Promise((res, rej) => {
    pending.set(id, (d) => ((d as { fatal?: string }).fatal ? rej(new Error((d as { fatal: string }).fatal)) : res()));
  });
  worker.postMessage({ id, type: 'init' });
}

function kill() {
  worker?.terminate();
  worker = null;
  ready = null;
}

export const pythonStatus = () => (worker ? 'loaded' : 'idle');

export async function preloadPython() {
  if (!worker) spawn();
  return ready;
}

export async function runPython(code: string, tests = '', stdin = '', timeoutMs = 8000): Promise<PyResult> {
  try {
    if (!worker) spawn();
    await ready;
  } catch (e) {
    kill();
    return { ok: false, stdout: '', error: null, errorLine: null, tests: null, fatal: (e as Error).message };
  }
  const id = ++seq;
  return new Promise<PyResult>((resolve) => {
    const timer = window.setTimeout(() => {
      pending.delete(id);
      kill();
      resolve({
        ok: false,
        stdout: '',
        error: 'TimeoutError: la ejecución superó ' + timeoutMs / 1000 + ' s. ¿Hay un bucle infinito (while sin condición de salida)?',
        errorLine: null,
        tests: null,
        timeout: true,
      });
    }, timeoutMs);
    pending.set(id, (d) => {
      window.clearTimeout(timer);
      const data = d as { result?: PyResult; fatal?: string };
      if (data.fatal) resolve({ ok: false, stdout: '', error: null, errorLine: null, tests: null, fatal: data.fatal });
      else resolve(data.result!);
    });
    worker!.postMessage({ id, type: 'run', code, tests, stdin, harness: HARNESS });
  });
}
