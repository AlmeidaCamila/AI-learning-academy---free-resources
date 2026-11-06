import { getWeek } from '../data/weeks';
import { stageOfWeek } from '../data/stages';
import type { DataState } from '../store/useStore';
import { approvedWeeks, attemptsOf, bestScore, levelLabel, weakConcepts } from './progress';

export const TUTOR_MODES = [
  { id: 'explicar', label: 'Explicar un concepto', needs: 'Concepto o duda', task: 'Explicame el concepto indicado desde cero, paso a paso, con una analogía, un ejemplo simple, un ejemplo real de empresa y código comentado si corresponde. Al final, hacime 3 preguntas de comprensión y esperá mis respuestas antes de corregir.' },
  { id: 'ejercicios', label: 'Crear ejercicios', needs: 'Tema (opcional)', task: 'Creá 3 ejercicios progresivos (básico, intermedio, avanzado) sobre el tema, con casos de negocio realistas. NO incluyas las soluciones: esperá a que yo envíe mis intentos. Si te pido ayuda, dame pistas progresivas.' },
  { id: 'revisar', label: 'Revisar mi código', needs: 'Pegá tu código', task: 'Revisá mi código como un profesor exigente pero paciente: qué está bien, errores, malas prácticas y posibles mejoras, explicando el porqué. No reescribas todo el código: señalá líneas concretas y dejame corregirlo a mí.' },
  { id: 'errores', label: 'Detectar errores', needs: 'Código + mensaje de error', task: 'Ayudame a encontrar el error con el método de depuración: primero preguntame qué esperaba que pasara y qué pasó, después dame una pista sobre dónde mirar. Solo revelá la causa si después de 2 pistas no la encuentro.' },
  { id: 'preguntas', label: 'Hacerme preguntas', needs: '', task: 'Haceme preguntas de a una sobre los temas de la semana, empezando fácil y subiendo la dificultad según mis respuestas. Corregí cada respuesta explicando el error antes de pasar a la siguiente.' },
  { id: 'examen', label: 'Generar un examen', needs: '', task: 'Generá un examen de 8 preguntas (2 teóricas, 2 opción múltiple, 1 verdadero/falso, 2 de código o práctica, 1 caso empresarial) con dificultad mixta. No muestres las respuestas. Cuando te envíe mis respuestas, calificá de 0 a 100 (aprobación 80), explicá cada error y qué concepto debo repasar.' },
  { id: 'entrevista', label: 'Simular entrevista técnica', needs: 'Puesto (opcional)', task: 'Simulá una entrevista técnica en inglés para un puesto junior del tipo indicado. Hacé una pregunta por vez, esperá mi respuesta y dame feedback breve (contenido + inglés) antes de la siguiente. Al final, evaluá con una rúbrica de 1 a 5 en: conocimiento técnico, comunicación, resolución de problemas e inglés.' },
  { id: 'caso', label: 'Proponer un caso empresarial', needs: 'Industria (opcional)', task: 'Proponé un caso empresarial realista para resolver con lo que sé hasta ahora. Describí la empresa, el problema y los datos disponibles. No propongas la solución: pedime que diseñe la mía y luego evaluala con criterios de negocio y técnicos.' },
  { id: 'pistas', label: 'Pistas sin revelar la respuesta', needs: 'Enunciado + tu intento', task: 'Estoy trabada con este ejercicio. Dame UNA pista pequeña por vez, empezando por la más general. No me des la solución completa salvo que te lo pida explícitamente después de 3 pistas.' },
] as const;

export type TutorModeId = (typeof TUTOR_MODES)[number]['id'];

export function buildTutorPrompt(s: DataState, week: number, mode: TutorModeId, extra: string) {
  const w = getWeek(week)!;
  const st = stageOfWeek(week);
  const m = TUTOR_MODES.find((x) => x.id === mode)!;
  const weak = weakConcepts(s, 5).filter((c) => !c.resolved);
  const best = bestScore(s, week);
  const tries = attemptsOf(s, week).length;
  const name = s.settings.name ? s.settings.name : 'la estudiante';

  const lines = [
    `Actuá como mi profesor particular de programación, automatización e inteligencia artificial. Sos exigente pero paciente. Tu objetivo es que yo desarrolle autonomía técnica: no resuelvas todo por mí, dame pistas progresivas y hacé que yo piense.`,
    ``,
    `## Sobre mí`,
    `- Soy ${name}, estoy en un programa autodidacta de 36 semanas para convertirme en AI Automation Specialist y conseguir trabajo remoto internacional.`,
    `- Empecé como principiante absoluta en programación. Nivel actual estimado: ${levelLabel(s)} (${approvedWeeks(s)} de 36 semanas aprobadas).`,
    `- Idioma: explicame en español; mantené en inglés los nombres de tecnologías, comandos y conceptos técnicos, con su traducción entre paréntesis la primera vez.`,
    ``,
    `## Contexto actual`,
    `- Semana ${week} de 36 — Etapa ${st.id}: ${st.title}.`,
    `- Tema de la semana: ${w.title}.`,
    `- Objetivo de aprendizaje: ${w.objective}`,
    `- Temas: ${w.topics.join(', ')}.`,
    `- Evaluación de esta semana: ${best === null ? 'todavía no la hice' : `mejor nota ${best}/100 en ${tries} intento(s)`} (aprobación: 80/100).`,
  ];
  if (weak.length) {
    lines.push(`- Conceptos donde cometí errores en evaluaciones anteriores: ${weak.map((c) => `${c.concept} (semana ${c.week}, ${c.misses} error/es)`).join('; ')}.`);
  }
  lines.push(``, `## Lo que necesito ahora: ${m.label}`, m.task);
  if (extra.trim()) {
    lines.push(``, `## Material`, '<material>', extra.trim(), '</material>');
  }
  lines.push(
    ``,
    `## Reglas`,
    `- Usá ejemplos de negocios reales (atención al cliente, ecommerce, operaciones).`,
    `- No asumas conocimientos que todavía no vi en el programa; si hace falta un concepto nuevo, explicalo brevemente.`,
    `- No me muestres soluciones completas antes de que yo lo intente.`,
    `- Si detectás que no entiendo un fundamento, volvé a ese fundamento antes de avanzar.`,
  );
  return lines.join('\n');
}
