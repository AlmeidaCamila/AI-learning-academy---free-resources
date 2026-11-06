# AI Learning Academy

Plataforma educativa personal de 36 semanas para formarse como **AI Automation Specialist**: Python, SQL, APIs, automatización con n8n, IA generativa, agentes y preparación laboral internacional.

## Cómo usarla

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abrí http://localhost:5173. Para generar una versión estática (se puede abrir desde cualquier hosting estático, por ejemplo GitHub Pages):

```bash
npm run build
```

## Qué incluye

| Sección | Funcionalidad |
| --- | --- |
| Dashboard | Progreso general, semana y etapa actual, horas (semana / acumuladas / pendientes), racha, objetivos, próximas actividades, cursos en progreso, evaluaciones pendientes, proyectos activos, últimas notas, próximo hito y mensaje de orientación dinámico. |
| Roadmap | 36 semanas en 6 etapas, con estado, nota y fechas proyectadas (se ajustan al extender semanas). |
| Semana | Objetivo, temas, clases, recursos (Coursera, externos, documentación oficial), ejercicios, desafío empresarial, entregable, tiempo estimado, criterios y requisitos de aprobación. |
| Clases | Explicación por subtemas, conceptos clave, ejemplos simples y reales, analogía, código comentado, errores comunes, buenas prácticas, resumen, preguntas de comprensión (la respuesta se ve después de responder) y ejercicio práctico. |
| Evaluaciones | Exámenes de 6 preguntas tomadas de bancos de 10 por semana (opción múltiple, V/F, respuesta corta, **código Python ejecutable con tests** y **SQL ejecutable**), 3 niveles de dificultad, aprobación 80/100, pistas progresivas, plan de refuerzo, historial y conceptos débiles. Al repetir se priorizan preguntas no vistas. |
| AI Tutor | Genera prompts contextualizados (semana, nivel, errores, objetivos) en 9 modos, los copia, abre Claude y guarda las respuestas en una biblioteca. |
| Proyectos | 6 proyectos con objetivo, problema, requisitos, pasos, entregables, calidad, evaluación y documentación. No se pueden terminar sin los entregables obligatorios. |
| Mi beca | 19 cursos de Coursera Open Academy con prioridad, etapa, estado, fechas, progreso, certificado y notas; filtros, edición y cursos nuevos. |
| Recursos | Biblioteca de recursos gratuitos con procedencia, idioma, semanas donde se usan y límites de planes gratuitos. |
| Calendario | Planificador semanal (mover actividades entre días y semanas), registro de horas, Pomodoro, objetivos, historial y estadísticas. |
| Inglés técnico | 8 módulos con flashcards, vocabulario, lecturas en estilo documentación y frases útiles. |
| Portfolio | Perfil y fichas de proyecto, generador de README en inglés y exportación a Markdown. |
| Career Center | CV en inglés (generado desde tus datos), checklists de LinkedIn y GitHub, pitch, banco de preguntas de entrevista, evaluación de puestos según tu nivel real y tabla de postulaciones. |
| Ajustes | Objetivo de horas, semana actual, exportar/importar respaldo JSON, copias automáticas diarias (7 días) y borrado con doble confirmación. |

## Arquitectura

```
src/
  types.ts               Tipos del dominio (contenido y estado del usuario)
  data/                  Contenido académico (estático)
    weeks/stage1..6.ts   36 semanas: clases, ejercicios, desafíos, bancos de preguntas
    stages.ts            6 etapas
    resources.ts         Recursos externos con notas de planes gratuitos
    courses.ts           Cursos de Open Academy
    projects.ts          6 proyectos
    english.ts, career.ts
  store/useStore.ts      Estado persistido (Zustand + localStorage), copias automáticas, validación de respaldos
  lib/
    python.ts            Python en el navegador (Pyodide en Web Worker, con límite de tiempo)
    sql.ts               SQLite en el navegador (sql.js) y corrección de consultas
    exam.ts              Armado y corrección de exámenes
    progress.ts          Reglas de aprobación, progreso, racha, orientación, fechas proyectadas
    prompts.ts           Prompts del AI Tutor
  components/            UI reutilizable, editor/ejecutores de código, layout
  pages/                 Una página por sección
```

Stack: React 18, TypeScript, Tailwind CSS 4, React Router (hash routing), Zustand, Recharts, Lucide.

## Datos y privacidad

- Todo se guarda en el `localStorage` de **este navegador**. Cambiar de navegador o borrar los datos del sitio borra el progreso: exportá un respaldo JSON desde **Ajustes y datos** con regularidad.
- La plataforma no envía tus datos a ningún servidor.
- Los ejecutores de Python y SQL descargan Pyodide (~10 MB) y sql.js desde jsDelivr la primera vez que se usan; requieren conexión a internet en ese momento.

## AI Tutor por API (no configurado)

El tutor funciona en modo manual (copiar prompt → Claude → pegar respuesta). Para integrarlo por API se necesita una API key de Anthropic con créditos y un backend o función serverless que guarde la key como variable de entorno y reenvíe las solicitudes. La key **nunca** debe incluirse en el código del navegador.

## Notas sobre el contenido

- Los enlaces de Coursera son búsquedas oficiales (marcados "pendiente de verificación"); al inscribirte, reemplazalos por la URL exacta desde **Mi beca → Editar**.
- Las URLs de recursos externos provienen del plan original o de sitios oficiales. Los planes gratuitos cambian con el tiempo: verificá sus condiciones vigentes.
- Las lecturas de inglés están redactadas para la plataforma en estilo de documentación técnica (no son copias).
- Todas las soluciones de referencia de Python (90) y SQL se validan contra sus tests; ningún código inicial aprueba los tests sin modificarse.
