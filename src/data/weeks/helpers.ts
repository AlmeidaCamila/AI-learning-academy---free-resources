import type { Difficulty, MCQ, PyQ, SqlQ, TextQ, TFQ, WeekHours } from '../../types';

export const H12: WeekHours = { theory: 3, resources: 4, practice: 4, english: 1 };
export const HPROJ: WeekHours = { theory: 2, resources: 3, practice: 6, english: 1 };

type Common = { concept: string; d?: Difficulty; hints?: string[]; code?: string };

export const mcq = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  c: Common,
): MCQ => ({ id, type: 'mcq', prompt, options, answer, explanation, concept: c.concept, difficulty: c.d ?? 'basica', hints: c.hints ?? [], code: c.code });

export const tf = (id: string, prompt: string, answer: boolean, explanation: string, c: Common): TFQ => ({
  id,
  type: 'tf',
  prompt,
  answer,
  explanation,
  concept: c.concept,
  difficulty: c.d ?? 'basica',
  hints: c.hints ?? [],
  code: c.code,
});

export const py = (
  id: string,
  prompt: string,
  starter: string,
  tests: string,
  solution: string,
  explanation: string,
  c: Common,
): PyQ => ({ id, type: 'python', prompt, starter, tests, solution, explanation, concept: c.concept, difficulty: c.d ?? 'intermedia', hints: c.hints ?? [], code: c.code });

export const sql = (
  id: string,
  prompt: string,
  schema: string,
  solution: string,
  explanation: string,
  c: Common & { ordered?: boolean },
): SqlQ => ({ id, type: 'sql', prompt, schema, solution, explanation, ordered: c.ordered, concept: c.concept, difficulty: c.d ?? 'intermedia', hints: c.hints ?? [], code: c.code });

export const short = (id: string, prompt: string, accepted: string[], explanation: string, c: Common): TextQ => ({
  id,
  type: 'short',
  prompt,
  accepted,
  explanation,
  concept: c.concept,
  difficulty: c.d ?? 'basica',
  hints: c.hints ?? [],
  code: c.code,
});

/** Base de datos de ejemplo usada en las semanas de SQL (atención al cliente). */
export const SUPPORT_DB = `
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, pais TEXT, plan TEXT);
CREATE TABLE agentes (id INTEGER PRIMARY KEY, nombre TEXT, equipo TEXT);
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  agente_id INTEGER REFERENCES agentes(id),
  motivo TEXT, prioridad TEXT, estado TEXT,
  creado TEXT, resuelto TEXT, horas_resolucion REAL
);
INSERT INTO clientes VALUES
 (1,'Ana Torres','Argentina','premium'),(2,'Bruno Díaz','México','basico'),
 (3,'Carla Ruiz','España','premium'),(4,'Diego Paz','Chile','basico'),
 (5,'Elena Gómez','Argentina','basico'),(6,'Fabián Soto','Colombia','premium');
INSERT INTO agentes VALUES (1,'Lucía','Facturación'),(2,'Marcos','Soporte técnico'),(3,'Nora','Soporte técnico'),(4,'Óscar','Ventas');
INSERT INTO tickets VALUES
 (1,1,1,'facturacion','alta','resuelto','2026-03-01','2026-03-01',4),
 (2,2,2,'acceso','media','resuelto','2026-03-01','2026-03-02',20),
 (3,3,3,'acceso','alta','abierto','2026-03-02',NULL,NULL),
 (4,1,2,'envio','baja','resuelto','2026-03-02','2026-03-05',70),
 (5,4,1,'facturacion','media','resuelto','2026-03-03','2026-03-03',6),
 (6,5,4,'ventas','baja','cerrado','2026-03-03','2026-03-04',24),
 (7,6,3,'acceso','alta','resuelto','2026-03-04','2026-03-04',3),
 (8,2,NULL,'envio','media','abierto','2026-03-05',NULL,NULL),
 (9,3,1,'facturacion','alta','resuelto','2026-03-05','2026-03-06',18),
 (10,6,2,'acceso','media','resuelto','2026-03-06','2026-03-06',5);
`;
