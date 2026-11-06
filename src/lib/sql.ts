/**
 * SQLite en el navegador con sql.js (WebAssembly), cargado bajo demanda desde jsDelivr.
 */
const SQLJS_URL = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';

interface SqlJsDb {
  exec(sql: string): { columns: string[]; values: unknown[][] }[];
  close(): void;
}
interface SqlJsStatic {
  Database: new () => SqlJsDb;
}
declare global {
  interface Window {
    initSqlJs?: (cfg: { locateFile: (f: string) => string }) => Promise<SqlJsStatic>;
  }
}

let sqlPromise: Promise<SqlJsStatic> | null = null;

function loadSql(): Promise<SqlJsStatic> {
  if (sqlPromise) return sqlPromise;
  sqlPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SQLJS_URL + 'sql-wasm.js';
    s.onload = () => {
      window.initSqlJs!({ locateFile: (f) => SQLJS_URL + f }).then(resolve, reject);
    };
    s.onerror = () => {
      sqlPromise = null;
      reject(new Error('No se pudo cargar SQLite (¿sin conexión a internet?)'));
    };
    document.head.appendChild(s);
  });
  return sqlPromise;
}

export interface SqlResult {
  ok: boolean;
  columns: string[];
  rows: unknown[][];
  error?: string;
  statements: number;
}

export async function runSql(schema: string, query: string): Promise<SqlResult> {
  const SQL = await loadSql();
  const db = new SQL.Database();
  try {
    if (schema.trim()) db.exec(schema);
    const res = db.exec(query);
    const last = res[res.length - 1];
    return { ok: true, columns: last?.columns ?? [], rows: last?.values ?? [], statements: res.length };
  } catch (e) {
    return { ok: false, columns: [], rows: [], error: (e as Error).message, statements: 0 };
  } finally {
    db.close();
  }
}

const norm = (v: unknown) => {
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(4);
  if (v === null || v === undefined) return 'NULL';
  return String(v);
};

/** Compara el resultado de la consulta de la estudiante con el de la solución. */
export async function gradeSql(schema: string, query: string, solution: string, ordered = false) {
  const [mine, expected] = await Promise.all([runSql(schema, query), runSql(schema, solution)]);
  if (!mine.ok) return { correct: false, mine, expected, reason: `Error de SQL: ${mine.error}` };
  if (mine.columns.length !== expected.columns.length)
    return { correct: false, mine, expected, reason: `Tu consulta devuelve ${mine.columns.length} columna(s); se esperaban ${expected.columns.length}.` };
  if (mine.rows.length !== expected.rows.length)
    return { correct: false, mine, expected, reason: `Tu consulta devuelve ${mine.rows.length} fila(s); se esperaban ${expected.rows.length}.` };
  const a = mine.rows.map((r) => r.map(norm).join('|'));
  const b = expected.rows.map((r) => r.map(norm).join('|'));
  if (!ordered) {
    a.sort();
    b.sort();
  }
  const same = a.every((x, i) => x === b[i]);
  return {
    correct: same,
    mine,
    expected,
    reason: same ? 'Resultado correcto.' : ordered ? 'Los valores o el orden de las filas no coinciden con lo esperado.' : 'Los valores de las filas no coinciden con lo esperado.',
  };
}
