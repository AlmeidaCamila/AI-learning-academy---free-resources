import type { Stage } from '../types';

export const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Fundamentos de programación y Python',
    short: 'Python',
    weeks: [1, 8],
    objective: 'Aprender a programar desde cero y adquirir una base sólida de Python.',
    projectId: 'p1',
    color: 'indigo',
  },
  {
    id: 2,
    title: 'SQL, bases de datos, APIs y web',
    short: 'SQL & APIs',
    weeks: [9, 12],
    objective: 'Aprender a trabajar con información y conectar diferentes sistemas.',
    projectId: 'p2',
    color: 'sky',
  },
  {
    id: 3,
    title: 'Automatización de procesos',
    short: 'Automatización',
    weeks: [13, 18],
    objective: 'Diseñar automatizaciones útiles para empresas con n8n, webhooks y APIs.',
    projectId: 'p3',
    color: 'emerald',
  },
  {
    id: 4,
    title: 'Inteligencia artificial generativa',
    short: 'IA generativa',
    weeks: [19, 24],
    objective: 'Comprender los modelos de IA y usarlos en aplicaciones reales (prompts, APIs, RAG).',
    projectId: 'p4',
    color: 'violet',
  },
  {
    id: 5,
    title: 'Agentes de IA y sistemas inteligentes',
    short: 'Agentes',
    weeks: [25, 29],
    objective: 'Desarrollar agentes que usen herramientas y ejecuten tareas supervisadas.',
    projectId: 'p5',
    color: 'amber',
  },
  {
    id: 6,
    title: 'Portfolio y empleabilidad internacional',
    short: 'Portfolio',
    weeks: [30, 36],
    objective: 'Convertir los conocimientos en un perfil profesional competitivo.',
    projectId: 'p6',
    color: 'rose',
  },
];

export const stageOfWeek = (n: number) => STAGES.find((s) => n >= s.weeks[0] && n <= s.weeks[1])!;
