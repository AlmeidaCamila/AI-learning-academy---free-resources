import { WEEKS, getWeek } from '../data/weeks';
import { STAGES, stageOfWeek } from '../data/stages';
import { PROJECTS } from '../data/projects';
import type { DataState } from '../store/useStore';
import { emptyWeek } from '../store/useStore';
import type { ExamAttempt, WeekProgress } from '../types';
import { addDays, daysBetween, mondayOf, parseISO, todayISO, toISO, weekKeyOf } from './date';

export const PASS = 80;

export const wp = (s: DataState, n: number): WeekProgress => s.weeks[n] ?? emptyWeek();

export const attemptsOf = (s: DataState, n: number) => s.attempts.filter((a) => a.week === n);

export const bestScore = (s: DataState, n: number) => {
  const a = attemptsOf(s, n);
  return a.length ? Math.max(...a.map((x) => x.score)) : null;
};

export type WeekStatus = 'aprobada' | 'lista para aprobar' | 'en curso' | 'no iniciada';

export interface Requirement {
  label: string;
  done: boolean;
}

export function requirements(s: DataState, n: number): Requirement[] {
  const w = getWeek(n)!;
  const p = wp(s, n);
  const best = bestScore(s, n);
  return [
    { label: `Clases estudiadas (${p.lessonsDone.length}/${w.lessons.length})`, done: w.lessons.every((l) => p.lessonsDone.includes(l.id)) },
    { label: `Al menos 1 ejercicio práctico resuelto (${p.exercisesDone.length}/${w.exercises.length})`, done: p.exercisesDone.length >= 1 },
    { label: 'Desafío empresarial completado', done: p.challengeDone },
    { label: 'Entregable con evidencia', done: p.deliverableDone && p.deliverableEvidence.trim().length > 0 },
    { label: `Evaluación ≥ ${PASS}/100 ${best !== null ? `(mejor: ${best})` : ''}`, done: best !== null && best >= PASS },
  ];
}

export const canApprove = (s: DataState, n: number) => requirements(s, n).every((r) => r.done);

export function weekStatus(s: DataState, n: number): WeekStatus {
  const p = s.weeks[n];
  if (p?.approved) return 'aprobada';
  if (canApprove(s, n)) return 'lista para aprobar';
  const touched = p && (p.lessonsDone.length || p.exercisesDone.length || p.challengeDone || p.deliverableDone || attemptsOf(s, n).length);
  if (touched) return 'en curso';
  return 'no iniciada';
}

export const approvedWeeks = (s: DataState) => WEEKS.filter((w) => s.weeks[w.n]?.approved).length;

export const projectDone = (s: DataState, id: string) => s.projects[id]?.status === 'terminado';

export function overallProgress(s: DataState) {
  const weeks = approvedWeeks(s);
  const projects = PROJECTS.filter((p) => projectDone(s, p.id)).length;
  return Math.round(((weeks + projects * 2) / (WEEKS.length + PROJECTS.length * 2)) * 100);
}

export const stageApproved = (s: DataState, stageId: number) => {
  const st = STAGES.find((x) => x.id === stageId)!;
  for (let n = st.weeks[0]; n <= st.weeks[1]; n++) if (!s.weeks[n]?.approved) return false;
  return true;
};

export const stageProgress = (s: DataState, stageId: number) => {
  const st = STAGES.find((x) => x.id === stageId)!;
  let ok = 0;
  const total = st.weeks[1] - st.weeks[0] + 1;
  for (let n = st.weeks[0]; n <= st.weeks[1]; n++) if (s.weeks[n]?.approved) ok++;
  return Math.round((ok / total) * 100);
};

// ── Horas
export const minutesInRange = (s: DataState, from: string, to: string) =>
  s.hourLogs.filter((l) => l.date >= from && l.date <= to).reduce((a, l) => a + l.minutes, 0);

export function thisWeekRange(d = new Date()) {
  const mon = mondayOf(d);
  return { from: toISO(mon), to: toISO(addDays(mon, 6)), key: weekKeyOf(d) };
}

export const targetMinutes = (s: DataState) => {
  const t = s.settings.weeklyTarget;
  return (t.theory + t.resources + t.practice + t.english) * 60;
};

export function minutesByCategory(s: DataState, from: string, to: string) {
  const out = { theory: 0, resources: 0, practice: 0, english: 0 };
  s.hourLogs.filter((l) => l.date >= from && l.date <= to).forEach((l) => (out[l.category] += l.minutes));
  return out;
}

/** Racha amable: días consecutivos con estudio, permitiendo 1 día de descanso entre sesiones. */
export function streak(s: DataState) {
  const days = new Set(s.hourLogs.filter((l) => l.minutes > 0).map((l) => l.date));
  let count = 0;
  let gap = 0;
  let d = new Date();
  if (!days.has(toISO(d))) d = addDays(d, -1);
  for (let i = 0; i < 400; i++) {
    const k = toISO(d);
    if (days.has(k)) {
      count++;
      gap = 0;
    } else {
      gap++;
      if (gap > 1) break;
    }
    d = addDays(d, -1);
  }
  return count;
}

export const studiedDaysThisWeek = (s: DataState) => {
  const { from, to } = thisWeekRange();
  return new Set(s.hourLogs.filter((l) => l.date >= from && l.date <= to && l.minutes > 0).map((l) => l.date)).size;
};

// ── Calendario académico (semanas extendidas desplazan las fechas proyectadas)
export function projectedWeekStart(s: DataState, n: number) {
  const start = mondayOf(parseISO(s.settings.startDate));
  let offset = 0;
  for (let i = 1; i < n; i++) offset += 1 + (s.weeks[i]?.extraWeeks ?? 0);
  return addDays(start, offset * 7);
}

export function suggestedWeekByDate(s: DataState) {
  const today = new Date();
  for (let n = WEEKS.length; n >= 1; n--) if (projectedWeekStart(s, n) <= today) return n;
  return 1;
}

export const projectedEnd = (s: DataState) => addDays(projectedWeekStart(s, WEEKS.length), 6 + (s.weeks[36]?.extraWeeks ?? 0) * 7);

export const weeksElapsed = (s: DataState) => Math.max(0, Math.floor(daysBetween(parseISO(s.settings.startDate), new Date()) / 7) + 1);

// ── Errores y conceptos débiles
export function weakConcepts(s: DataState, limit = 6) {
  const counts = new Map<string, { concept: string; week: number; misses: number }>();
  const passed = new Set(s.attempts.filter((a) => a.score >= PASS).map((a) => a.week));
  s.attempts.forEach((a: ExamAttempt) => {
    a.wrong.forEach((w) => {
      const k = `${a.week}::${w.concept}`;
      const cur = counts.get(k) ?? { concept: w.concept, week: a.week, misses: 0 };
      cur.misses++;
      counts.set(k, cur);
    });
  });
  return [...counts.values()]
    .map((c) => ({ ...c, resolved: passed.has(c.week) }))
    .sort((a, b) => Number(a.resolved) - Number(b.resolved) || b.misses - a.misses)
    .slice(0, limit);
}

// ── Mensaje de orientación dinámico
export function guidance(s: DataState): { tone: 'info' | 'warn' | 'ok'; text: string } {
  const n = s.settings.currentWeek;
  const w = getWeek(n)!;
  const p = wp(s, n);
  const st = stageOfWeek(n);
  const best = bestScore(s, n);
  const prevUnapproved = WEEKS.filter((x) => x.n < n && !s.weeks[x.n]?.approved).map((x) => x.n);
  const weak = weakConcepts(s, 3).filter((c) => !c.resolved);

  if (prevUnapproved.length >= 2)
    return { tone: 'warn', text: `Tenés las semanas ${prevUnapproved.slice(0, 4).join(', ')} sin aprobar. Antes de avanzar con temas nuevos, consolidá esas bases: los temas de esta etapa dependen de ellas.` };
  if (s.weeks[n]?.approved) return { tone: 'ok', text: `¡Aprobaste la semana ${n}! Cuando quieras, pasá a la semana ${Math.min(n + 1, 36)} desde el Roadmap.` };
  if (canApprove(s, n)) return { tone: 'ok', text: `Cumpliste todos los requisitos de la semana ${n}. Revisá tu trabajo y marcala como aprobada.` };
  if (best !== null && best < PASS)
    return { tone: 'warn', text: `Te falta aprobar la evaluación de esta unidad (mejor nota: ${best}). Repasá ${weak[0] ? `"${weak[0].concept}"` : 'los conceptos marcados'} y repetila: vas a recibir preguntas distintas.` };
  if (weak.length) return { tone: 'info', text: `Esta semana conviene reforzar "${weak[0].concept}" (semana ${weak[0].week}). Usá el AI Tutor para pedir ejercicios adicionales sobre ese tema.` };
  if (p.lessonsDone.length < w.lessons.length)
    return { tone: 'info', text: `${stageMessage(st.id, n)} Empezá por las clases de "${w.title}".` };
  if (best === null) return { tone: 'info', text: 'Ya estudiaste las clases. Resolvé los ejercicios prácticos y después hacé la evaluación para demostrar lo aprendido.' };
  if (!p.challengeDone || !p.deliverableDone) return { tone: 'info', text: 'Aprobaste la evaluación. Para cerrar la semana, completá el desafío empresarial y cargá la evidencia del entregable.' };
  return { tone: 'info', text: stageMessage(st.id, n) };
}

function stageMessage(stage: number, n: number) {
  switch (stage) {
    case 1:
      return n <= 3 ? 'Estás construyendo tus fundamentos de programación.' : n <= 6 ? 'Estás consolidando tus fundamentos de Python.' : 'Estás integrando todo lo aprendido de Python.';
    case 2:
      return n === 12 ? 'Ya podés comenzar a trabajar con APIs.' : 'Estás aprendiendo a trabajar con datos y bases de datos.';
    case 3:
      return 'Estás aprendiendo a diseñar automatizaciones reales para empresas.';
    case 4:
      return 'Estás incorporando IA generativa a tus soluciones.';
    case 5:
      return 'Estás construyendo agentes con herramientas y supervisión humana.';
    default:
      return 'Estás convirtiendo tus conocimientos en un perfil profesional.';
  }
}

export function nextMilestone(s: DataState) {
  for (const st of STAGES) {
    const proj = PROJECTS.find((p) => p.id === st.projectId)!;
    if (!projectDone(s, proj.id)) return { title: `Proyecto ${proj.n}: ${proj.title}`, detail: `Cierre de la etapa ${st.id} (semana ${st.weeks[1]})`, week: st.weeks[1], projectId: proj.id };
  }
  return { title: 'Primeras entrevistas', detail: 'Programa completo: ejecutá tu plan de postulaciones.', week: 36, projectId: null };
}

export const levelLabel = (s: DataState) => {
  const a = approvedWeeks(s);
  if (a < 4) return 'principiante absoluta';
  if (a < 8) return 'principiante con bases de Python';
  if (a < 12) return 'nivel inicial-intermedio (Python + SQL)';
  if (a < 18) return 'intermedio (Python, SQL, APIs, automatización)';
  if (a < 29) return 'intermedio-avanzado (automatización + IA generativa)';
  return 'perfil junior completo (automatización, IA y agentes)';
};

export { todayISO };
