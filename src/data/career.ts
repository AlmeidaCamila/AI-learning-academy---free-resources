export const TARGET_ROLES: { role: string; requires: number[]; projects: string[]; note: string }[] = [
  { role: 'Junior Python Developer', requires: [1, 2], projects: ['p1', 'p2'], note: 'Requiere Python sólido, SQL y proyectos con tests. Competencia alta: destacá tu dominio de negocio.' },
  { role: 'Workflow Automation Specialist', requires: [1, 2, 3], projects: ['p3'], note: 'n8n/Make/Zapier, APIs, webhooks y manejo de errores.' },
  { role: 'Automation Specialist', requires: [1, 2, 3], projects: ['p2', 'p3'], note: 'Automatización de procesos con integraciones; a veces incluye RPA.' },
  { role: 'Technical Operations Analyst', requires: [1, 2, 3], projects: ['p2', 'p3'], note: 'SQL, procesos, herramientas internas y análisis operativo.' },
  { role: 'Junior AI Automation Specialist', requires: [1, 2, 3, 4], projects: ['p3', 'p4'], note: 'Automatización + LLMs + prompts + RAG básico.' },
  { role: 'AI Automation Developer', requires: [1, 2, 3, 4, 5], projects: ['p4', 'p5', 'p6'], note: 'Más técnico: integraciones con APIs de IA, agentes y deploy.' },
  { role: 'AI Operations Specialist', requires: [1, 2, 3, 4, 5], projects: ['p5', 'p6'], note: 'Operar y mejorar sistemas de IA: evaluación, monitoreo, supervisión.' },
  { role: 'Junior AI Solutions Specialist', requires: [1, 2, 3, 4, 5, 6], projects: ['p6'], note: 'Suele pedir experiencia con clientes y diseño de soluciones. Postulá si cumplís buena parte de los requisitos.' },
];

export const LINKEDIN_CHECKLIST = [
  'Foto profesional y banner relacionado con tu foco.',
  'Headline con rol objetivo y stack (ej.: AI Automation Specialist | Python · SQL · n8n · LLMs).',
  'About en primera persona: historia, qué construís, qué buscás.',
  'Sección Featured con 3 proyectos (enlaces a repo/demo).',
  'Experiencia previa redactada con logros transferibles (sin inflar).',
  'Proyectos con descripción breve y enlace.',
  'Skills relevantes (Python, SQL, APIs, n8n, Prompt Engineering, RAG).',
  'Certificaciones obtenidas (solo las completadas).',
  'Open to Work configurado (roles y modalidad remota).',
  'Al menos 1 publicación mensual sobre lo que aprendiste o construiste.',
];

export const GITHUB_CHECKLIST = [
  'README de perfil (repositorio con tu nombre de usuario).',
  'Foto, bio y enlace a LinkedIn/portfolio.',
  '6 repositorios pinneados (los proyectos del programa).',
  'Cada repo con descripción, topics y README completo.',
  'Licencia en cada repo (MIT es habitual).',
  '.gitignore correcto y sin credenciales en el historial.',
  'Capturas o GIF en cada README.',
  'Commits con mensajes claros a lo largo del tiempo.',
  'Al menos un repo con tests y GitHub Actions.',
];

export const INTERVIEW_QUESTIONS: { cat: string; q: string; tip: string }[] = [
  { cat: 'Behavioral', q: 'Tell me about yourself.', tip: 'Pasado → presente → futuro, 60–90 s.' },
  { cat: 'Behavioral', q: 'Why do you want to work in automation / AI?', tip: 'Conectá tu experiencia previa con problemas reales que resolviste.' },
  { cat: 'Behavioral', q: 'Tell me about a project you are proud of.', tip: 'STAR con tu proyecto integrador; incluí una decisión técnica y un problema que resolviste.' },
  { cat: 'Behavioral', q: 'Describe a time you had to learn something quickly.', tip: 'Usá un ejemplo del programa (n8n, RAG) con resultado concreto.' },
  { cat: 'Behavioral', q: 'How do you handle a mistake in production?', tip: 'Comunicar, contener, corregir, aprender (postmortem).' },
  { cat: 'Python', q: 'What is the difference between a list and a tuple?', tip: 'Mutabilidad y casos de uso.' },
  { cat: 'Python', q: 'How do you handle exceptions in Python? Give an example.', tip: 'try/except específico, else/finally, raise.' },
  { cat: 'Python', q: 'How would you read a CSV and remove duplicate rows?', tip: 'csv.DictReader + set de claves, o pandas.drop_duplicates.' },
  { cat: 'SQL', q: 'Explain the difference between INNER JOIN and LEFT JOIN.', tip: 'Con un ejemplo de tickets sin agente.' },
  { cat: 'SQL', q: 'WHERE vs HAVING?', tip: 'Filas antes de agrupar vs grupos después.' },
  { cat: 'APIs', q: 'What is the difference between a webhook and polling?', tip: 'Push vs pull, eficiencia.' },
  { cat: 'APIs', q: 'How would you handle a 429 response?', tip: 'Retry-After, backoff exponencial, límites.' },
  { cat: 'Automation', q: 'How do you decide whether a process should be automated?', tip: 'Frecuencia, reglas, datos digitales, costo de errores, ROI.' },
  { cat: 'Automation', q: 'How do you make a workflow reliable?', tip: 'Validación, reintentos, idempotencia, error workflow, logs.' },
  { cat: 'AI', q: 'What is RAG and when would you use it?', tip: 'Recuperar + generar; datos privados/actualizados; citas.' },
  { cat: 'AI', q: 'How do you reduce hallucinations?', tip: 'Contexto con fuentes, "no sé", validación, evaluación.' },
  { cat: 'AI', q: 'How would you evaluate an LLM-based classifier?', tip: 'Set etiquetado, accuracy, matriz de confusión, casos borde.' },
  { cat: 'AI', q: 'What is prompt injection and how do you mitigate it?', tip: 'Separar datos/instrucciones, mínimo privilegio, aprobación humana.' },
  { cat: 'Agents', q: 'When would you use an agent instead of a workflow?', tip: 'Pasos no predecibles; empezar simple.' },
  { cat: 'Agents', q: 'How do you keep humans in the loop?', tip: 'Estados de aprobación, contexto para decidir, audit log.' },
  { cat: 'Case', q: 'A logistics company receives 2,000 shipping inquiry emails per week. What would you build?', tip: 'Preguntas → proceso actual → propuesta → riesgos → métricas → plan incremental.' },
  { cat: 'Case', q: 'How would you automate customer onboarding for a SaaS company?', tip: 'Trigger de alta, tareas, comunicaciones, CRM, excepciones humanas.' },
];

export const JOB_SEARCH_TERMS = [
  'junior automation specialist remote',
  'workflow automation n8n',
  'AI automation junior',
  'automation engineer entry level remote',
  'technical operations analyst remote',
  'junior python developer remote',
  'AI operations specialist',
  'no-code automation specialist',
];
