import type { ExamAttempt, Question } from '../types';
import { runPython } from './python';
import { gradeSql } from './sql';

export const EXAM_SIZE = 6;

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Arma un examen priorizando preguntas que no aparecieron en el último intento
 * (repetir la evaluación = preguntas diferentes) y equilibrando dificultad.
 */
export function buildExam(bank: Question[], previous: ExamAttempt[]): Question[] {
  const size = Math.min(EXAM_SIZE, bank.length);
  const last = previous[previous.length - 1];
  const seenLast = new Set(last?.questionIds ?? []);
  const seenEver = new Set(previous.flatMap((a) => a.questionIds));
  const unseen = shuffle(bank.filter((q) => !seenEver.has(q.id)));
  const notLast = shuffle(bank.filter((q) => seenEver.has(q.id) && !seenLast.has(q.id)));
  const rest = shuffle(bank.filter((q) => seenLast.has(q.id)));
  const picked = [...unseen, ...notLast, ...rest].slice(0, size);
  // Garantizar al menos una pregunta práctica (código/SQL) si existe en el banco
  const practical = bank.filter((q) => q.type === 'python' || q.type === 'sql');
  if (practical.length && !picked.some((q) => q.type === 'python' || q.type === 'sql')) {
    const cand = shuffle(practical).sort((a, b) => Number(seenLast.has(a.id)) - Number(seenLast.has(b.id)))[0];
    picked[picked.length - 1] = cand;
  }
  const order = { basica: 0, intermedia: 1, avanzada: 2 };
  return picked.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
}

const normText = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[()."'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export interface GradeResult {
  correct: boolean;
  feedback: string;
  detail?: string;
}

export async function gradeQuestion(q: Question, answer: unknown): Promise<GradeResult> {
  switch (q.type) {
    case 'mcq':
      return { correct: answer === q.answer, feedback: answer === q.answer ? 'Correcto.' : `Respuesta correcta: ${q.options[q.answer]}` };
    case 'tf':
      return { correct: answer === q.answer, feedback: `Es ${q.answer ? 'verdadero' : 'falso'}.` };
    case 'short': {
      const ok = typeof answer === 'string' && q.accepted.map(normText).includes(normText(answer));
      return { correct: ok, feedback: ok ? 'Correcto.' : `Respuesta esperada: ${q.accepted[0]}` };
    }
    case 'python': {
      const code = String(answer ?? '');
      if (!code.trim() || code.trim() === q.starter.trim()) return { correct: false, feedback: 'No modificaste el código inicial.' };
      const r = await runPython(code, q.tests);
      if (r.fatal) return { correct: false, feedback: 'No se pudo ejecutar Python: ' + r.fatal };
      if (!r.ok) return { correct: false, feedback: 'Tu código produjo un error.', detail: r.error ?? '' };
      if (r.tests?.passed) return { correct: true, feedback: 'Todos los tests pasaron.' };
      return { correct: false, feedback: 'Algún test no pasó.', detail: [r.tests?.message, r.tests?.failing].filter(Boolean).join('\n') };
    }
    case 'sql': {
      const query = String(answer ?? '');
      if (!query.trim()) return { correct: false, feedback: 'No escribiste ninguna consulta.' };
      try {
        const g = await gradeSql(q.schema, query, q.solution, q.ordered);
        return { correct: g.correct, feedback: g.reason };
      } catch (e) {
        return { correct: false, feedback: (e as Error).message };
      }
    }
  }
}

export const DIFF_LABEL = { basica: 'Básica', intermedia: 'Intermedia', avanzada: 'Avanzada' } as const;
export const TYPE_LABEL = {
  mcq: 'Opción múltiple',
  tf: 'Verdadero o falso',
  python: 'Ejercicio de código',
  sql: 'Consulta SQL',
  short: 'Respuesta corta',
} as const;
