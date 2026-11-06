import type { Week } from '../../types';
import { H12, HPROJ, mcq, py, short, tf } from './helpers';

const API_COST_NOTE =
  'Las APIs de modelos comerciales (Anthropic, OpenAI y otras) cobran por tokens y requieren cargar créditos. Para practicar gratis: Ollama con un modelo local pequeño (por ejemplo llama3.2:1b o qwen2.5:1.5b) expone una API en http://localhost:11434. Algunos proveedores ofrecen planes gratuitos con límites estrictos que cambian con frecuencia: verificá sus condiciones vigentes antes de depender de ellos.';

export const STAGE4: Week[] = [
  // ───────────────────────────── SEMANA 19 ─────────────────────────────
  {
    n: 19,
    stage: 4,
    title: 'Qué es la inteligencia artificial',
    objective: 'Diferenciar IA, Machine Learning, Deep Learning e IA generativa, y reconocer qué tipo de problema resuelve cada una en una empresa.',
    topics: ['Qué es inteligencia artificial', 'Machine Learning', 'Deep Learning', 'IA generativa', 'Diferencias y aplicaciones'],
    review: 'Repaso semana 13: no todo problema necesita IA; muchas veces alcanzan reglas.',
    lessons: [
      {
        id: 'w19l1',
        title: 'Mapa de la inteligencia artificial',
        minutes: 75,
        sections: [
          {
            heading: '1. IA: sistemas que realizan tareas "inteligentes"',
            body: [
              'Inteligencia artificial es el campo que busca que las computadoras realicen tareas que asociamos a la inteligencia humana: reconocer imágenes, entender lenguaje, decidir, predecir.',
              'Hay dos grandes enfoques: reglas escritas por personas (sistemas expertos, como tu clasificador por palabras clave) y aprendizaje a partir de datos (Machine Learning).',
            ],
          },
          {
            heading: '2. Machine Learning',
            body: [
              'En ML no se programan las reglas: se le muestran al algoritmo muchos ejemplos (datos de entrenamiento) y aprende patrones. Luego predice sobre datos nuevos.',
              'Tipos: supervisado (ejemplos con la respuesta correcta: correos marcados como spam/no spam → clasificar), no supervisado (sin respuestas: agrupar clientes por comportamiento), y por refuerzo (aprende por prueba, error y recompensa).',
              'Tareas típicas: clasificación (¿qué categoría?), regresión (¿qué número? ej. demanda de la semana próxima), clustering (¿qué grupos hay?).',
            ],
          },
          {
            heading: '3. Deep Learning',
            body: ['Subcampo del ML que usa redes neuronales con muchas capas. Es lo que permitió los grandes avances en visión, voz y lenguaje. Necesita muchos datos y capacidad de cómputo.'],
          },
          {
            heading: '4. IA generativa',
            body: [
              'Modelos de deep learning que generan contenido nuevo: texto (LLMs como Claude, GPT, Llama), imágenes, audio, código. Se entrenan con enormes cantidades de datos y luego se ajustan para seguir instrucciones.',
              'Diferencia clave: un modelo clásico de ML predice una etiqueta o un número; un modelo generativo produce una secuencia (un texto, una imagen).',
            ],
          },
          {
            heading: '5. ¿Reglas, ML o IA generativa?',
            body: [
              'Reglas: cuando la lógica es clara y estable (si monto > X → aprobar).',
              'ML clásico: cuando tenés datos históricos etiquetados y una predicción concreta (probabilidad de abandono).',
              'IA generativa: cuando hay lenguaje no estructurado (emails, documentos) o hay que redactar, resumir, extraer o conversar.',
              'En la práctica, las mejores soluciones combinan las tres.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'IA', def: 'Campo que busca que las máquinas realicen tareas inteligentes.' },
          { term: 'Machine Learning', def: 'Sistemas que aprenden patrones a partir de datos.' },
          { term: 'Aprendizaje supervisado', def: 'Aprender de ejemplos con la respuesta correcta.' },
          { term: 'Deep Learning', def: 'ML con redes neuronales de muchas capas.' },
          { term: 'IA generativa', def: 'Modelos que generan contenido nuevo.' },
          { term: 'LLM', def: 'Large Language Model: modelo generativo de texto.' },
        ],
        simpleExample: 'Reglas: "si contiene la palabra oferta → spam". ML: el sistema aprende qué es spam viendo 100.000 correos etiquetados.',
        realExample: 'Un banco usa reglas para límites de transferencias, ML para detectar fraude por patrones y un LLM para resumir reclamos y redactar borradores de respuesta que revisa una persona.',
        analogy: 'Reglas son una receta escrita; ML es aprender a cocinar probando muchos platos; IA generativa es un cocinero que inventa platos nuevos a partir de todo lo que probó.',
        commonErrors: ['Usar IA generativa donde una regla simple alcanza (más costo, menos control).', 'Creer que el modelo "entiende" o "sabe" como una persona.', 'Confundir IA con automatización: se complementan.'],
        bestPractices: ['Empezar por la solución más simple que funcione.', 'Definir cómo se medirá si la IA funciona bien.'],
        summary: ['IA ⊃ ML ⊃ Deep Learning ⊃ IA generativa (aprox.).', 'Elegí reglas, ML o GenAI según el problema.'],
        comprehension: [{ q: '¿Qué enfoque usarías para predecir cuántos tickets llegarán la próxima semana y por qué?', a: 'ML clásico (regresión/series temporales) a partir de datos históricos, porque es una predicción numérica, no generación de texto.' }],
        exercise: {
          statement: 'Para cada caso, indicá si usarías reglas, ML clásico o IA generativa, y justificá: 1) aprobar reintegros menores a 10 USD; 2) resumir un hilo de 30 emails; 3) predecir abandono de clientes; 4) extraer datos de facturas en PDF con formatos variados; 5) enviar recordatorio 24 h antes de un turno.',
          hints: ['¿Hay texto no estructurado?', '¿Hay una regla clara?', '¿Hay datos históricos con la respuesta?'],
          solution: '1) Reglas. 2) IA generativa. 3) ML clásico (clasificación supervisada). 4) IA generativa (o modelos de extracción de documentos) con validación. 5) Reglas + automatización programada.',
        },
      },
    ],
    resources: [
      { ref: 'elementsai', why: 'Capítulos 1 a 3 de "Introduction to AI" (disponible en español).', minutes: 150 },
      { ref: 'mlcc', why: 'Introducción a ML: qué es y tipos de aprendizaje.', minutes: 60 },
      { ref: 'mslearnai', why: 'Ruta introductoria de conceptos de IA (en español).', minutes: 30 },
    ],
    coursera: [
      { courseId: 'c-gcp-genai', note: 'Completalo esta semana (es corto).' },
      { courseId: 'c-ms-aiml', note: 'Empezá los primeros módulos; continuá durante la etapa.' },
    ],
    docs: [],
    exercises: [
      { id: 'w19e1', title: 'Glosario personal', level: 'basica', kind: 'libre', statement: 'Armá un glosario de 15 términos de IA con definición en español, término en inglés y un ejemplo propio.', hints: ['Usalo también en la sección Inglés técnico.'] },
      { id: 'w19e2', title: 'Casos de uso por área', level: 'intermedia', kind: 'libre', statement: 'Para atención al cliente, ventas y finanzas, proponé 2 casos de uso de IA cada uno, indicando el enfoque (reglas/ML/GenAI) y el riesgo principal.', hints: ['Pensá en volumen, texto no estructurado y errores costosos.'] },
    ],
    challenge: {
      title: 'Diagnóstico de IA para una pyme',
      context: 'Una distribuidora mayorista quiere "usar IA" pero no sabe para qué.',
      task: ['Listá 6 procesos de la empresa.', 'Para cada uno, decidí si conviene reglas, ML, IA generativa o nada.', 'Elegí el caso con mejor relación valor/riesgo y explicá por qué.'],
      deliverable: 'Documento de 1 página con tabla de decisión.',
    },
    deliverable: 'Glosario + diagnóstico de IA.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Justificar correctamente el enfoque para 5 casos.'],
    questions: [
      mcq('q19-1', 'Un sistema aprende a detectar spam a partir de miles de correos etiquetados. Es...', ['Aprendizaje supervisado', 'No supervisado', 'Por refuerzo', 'Sistema de reglas'], 0, 'Hay ejemplos con la respuesta correcta.', { concept: 'Machine Learning' }),
      mcq('q19-2', 'Agrupar clientes por comportamiento sin categorías previas es...', ['Clasificación', 'Clustering (no supervisado)', 'Regresión', 'Generación'], 1, 'No hay etiquetas previas.', { concept: 'Machine Learning' }),
      tf('q19-3', 'Deep Learning es un subcampo del Machine Learning.', true, 'Usa redes neuronales profundas.', { concept: 'Deep Learning' }),
      mcq('q19-4', '¿Qué produce un modelo de IA generativa de texto?', ['Una etiqueta fija', 'Una secuencia de texto nueva', 'Una tabla SQL', 'Un número exacto siempre'], 1, 'Genera contenido.', { concept: 'IA generativa' }),
      mcq('q19-5', 'Para "si el monto es mayor a 1000, pedir aprobación" conviene...', ['Un LLM', 'Una regla', 'Deep learning', 'Clustering'], 1, 'Lógica clara y estable.', { concept: 'Diferencias y aplicaciones' }),
      mcq('q19-6', 'Predecir el monto de ventas del próximo mes es una tarea de...', ['Clasificación', 'Regresión', 'Clustering', 'Generación de imágenes'], 1, 'Predicción de un valor numérico.', { concept: 'Machine Learning', d: 'intermedia' }),
      tf('q19-7', 'Un LLM comprende y sabe las cosas como una persona experta.', false, 'Genera texto probable según patrones; puede equivocarse con seguridad aparente.', { concept: 'IA generativa' }),
      mcq('q19-8', 'Resumir hilos largos de correos es un buen caso para...', ['Reglas', 'IA generativa', 'Regresión', 'SQL'], 1, 'Lenguaje no estructurado.', { concept: 'Diferencias y aplicaciones' }),
      mcq('q19-9', '¿Qué significa LLM?', ['Linear Learning Machine', 'Large Language Model', 'Logic Language Module', 'Long Learning Memory'], 1, 'Large Language Model.', { concept: 'IA generativa' }),
      tf('q19-10', 'La mejor solución empresarial suele combinar reglas, ML e IA generativa según cada parte del problema.', true, 'Cada enfoque tiene fortalezas distintas.', { concept: 'Diferencias y aplicaciones', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 20 ─────────────────────────────
  {
    n: 20,
    stage: 4,
    title: 'Cómo funcionan los LLM',
    objective: 'Entender tokens, ventana de contexto, temperatura, alucinaciones y limitaciones de los LLM, para usarlos con criterio y estimar costos.',
    topics: ['Qué son los LLM', 'Tokens', 'Contexto', 'Temperatura', 'Alucinaciones', 'Limitaciones'],
    review: 'Repaso semana 19: un LLM es un modelo generativo de texto.',
    lessons: [
      {
        id: 'w20l1',
        title: 'Dentro de un LLM',
        minutes: 80,
        sections: [
          {
            heading: '1. Predecir el siguiente token',
            body: [
              'Un LLM genera texto prediciendo, una y otra vez, cuál es el siguiente fragmento más adecuado dado todo lo anterior. Aprendió esas probabilidades durante el entrenamiento con enormes cantidades de texto.',
              'Después del preentrenamiento, se ajusta (fine-tuning y aprendizaje con retroalimentación humana) para seguir instrucciones y comportarse como asistente.',
            ],
          },
          {
            heading: '2. Tokens',
            body: [
              'El modelo no lee palabras, lee tokens: fragmentos de texto (una palabra corta, parte de una palabra, un signo). En inglés, 1 token ≈ 4 caracteres ≈ 0,75 palabras; en español suele haber algo más de tokens por palabra.',
              'Los tokens importan porque: las APIs cobran por token (entrada y salida por separado), y la ventana de contexto se mide en tokens.',
            ],
          },
          {
            heading: '3. Ventana de contexto',
            body: [
              'Es la cantidad máxima de tokens que el modelo puede considerar a la vez: instrucciones + historial + documentos + respuesta. Lo que no está en el contexto, el modelo no lo "ve".',
              'El modelo no recuerda conversaciones anteriores por sí mismo: las apps reenvían el historial en cada request. Por eso conversaciones largas cuestan más.',
            ],
          },
          {
            heading: '4. Temperatura y parámetros',
            body: [
              'Temperatura controla la aleatoriedad: baja (0–0,3) → respuestas más deterministas y consistentes, ideal para clasificar o extraer datos. Alta (0,7–1) → más variadas, útil para ideas o redacción creativa.',
              'max_tokens limita la longitud de la respuesta (y el costo).',
            ],
          },
          {
            heading: '5. Alucinaciones y limitaciones',
            body: [
              'Alucinación: el modelo genera información falsa con tono seguro (una cita inexistente, un dato inventado). Ocurre porque produce texto plausible, no verifica hechos.',
              'Otras limitaciones: conocimiento con fecha de corte, errores en cálculos exactos, sensibilidad a cómo se formula el pedido, sesgos de los datos de entrenamiento.',
              'Mitigaciones: darle la información en el contexto (RAG, semana 23), pedirle que diga "no sé", validar la salida con código, revisión humana en decisiones importantes.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Token', def: 'Unidad de texto que procesa el modelo.' },
          { term: 'Ventana de contexto', def: 'Máximo de tokens que el modelo considera por request.' },
          { term: 'Temperatura', def: 'Parámetro de aleatoriedad de la generación.' },
          { term: 'Alucinación', def: 'Información falsa generada con apariencia de verdad.' },
          { term: 'Fecha de corte', def: 'Hasta cuándo llegan los datos de entrenamiento.' },
          { term: 'Input / output tokens', def: 'Tokens enviados / generados; se cobran por separado.' },
        ],
        simpleExample: '"Automatización" puede dividirse en varios tokens, por ejemplo "Autom" + "atiz" + "ación".',
        realExample: 'Un clasificador de tickets usa temperatura 0 para que el mismo ticket reciba siempre la misma categoría; un generador de borradores de respuesta usa 0,5 para sonar natural.',
        analogy: 'Un LLM es como un autocompletado extremadamente avanzado: muy útil, pero no un archivo de verdades.',
        commonErrors: ['Pedir datos factuales sin darle fuentes.', 'Usar temperatura alta para tareas que necesitan consistencia.', 'Ignorar el costo de reenviar historiales largos.'],
        bestPractices: ['Temperatura baja para tareas estructuradas.', 'Dar contexto y fuentes.', 'Validar salidas con código.'],
        summary: ['Los LLM predicen tokens.', 'Contexto limitado y sin memoria propia.', 'Alucinan: verificá.'],
        comprehension: [
          { q: '¿Por qué una conversación muy larga con un asistente se vuelve más cara por mensaje?', a: 'Porque en cada request se reenvía todo el historial como tokens de entrada.' },
          { q: '¿Qué temperatura usarías para extraer el número de factura de un email?', a: 'Baja (0 o cercana), porque se busca una respuesta exacta y consistente.' },
        ],
        exercise: {
          statement: 'Completá costo_usd(tokens_in, tokens_out, precio_in_por_millon, precio_out_por_millon) y luego costo_mensual(tickets_por_dia, tokens_in, tokens_out, p_in, p_out) para 30 días. Redondeá a 2 decimales.',
          hints: ['costo = tokens / 1_000_000 * precio', 'Sumá entrada y salida.'],
          solution: `def costo_usd(tokens_in, tokens_out, p_in, p_out):\n    return tokens_in / 1_000_000 * p_in + tokens_out / 1_000_000 * p_out\n\ndef costo_mensual(tickets_por_dia, tokens_in, tokens_out, p_in, p_out):\n    return round(costo_usd(tokens_in, tokens_out, p_in, p_out) * tickets_por_dia * 30, 2)`,
          starter: `def costo_usd(tokens_in, tokens_out, p_in, p_out):\n    return 0\n\ndef costo_mensual(tickets_por_dia, tokens_in, tokens_out, p_in, p_out):\n    return 0`,
          tests: `assert abs(costo_usd(1_000_000, 0, 3, 15) - 3) < 1e-9\nassert costo_mensual(200, 800, 200, 3, 15) == 32.4`,
        },
      },
    ],
    resources: [
      { ref: 'hflearn', why: 'LLM Course, capítulo 1 "Transformer models" (conceptos, sin necesidad de entender todo el código).', minutes: 120 },
      { ref: 'dlai', why: 'Curso corto introductorio sobre LLMs o "Generative AI for Everyone" si lo hacés en Coursera.', minutes: 60 },
      { ref: 'ollama', why: 'Instalá Ollama y descargá un modelo pequeño para experimentar gratis con temperatura.', minutes: 60 },
    ],
    coursera: [
      { courseId: 'c-genai-everyone', note: 'Módulos sobre cómo funciona la IA generativa y sus limitaciones.' },
      { courseId: 'c-ms-aiml', note: 'Continuá a tu ritmo.' },
    ],
    docs: [{ ref: 'anthropicdocs', why: 'Glosario y la página sobre ventana de contexto y tokens.' }],
    exercises: [
      { id: 'w20e1', title: 'Experimento de temperatura', level: 'intermedia', kind: 'libre', statement: 'Con Ollama (o un chat que permita ajustarla), pedí 3 veces "Proponé un nombre para una app de soporte" con temperatura 0 y 3 veces con 1. Registrá diferencias.', hints: ['En Ollama podés pasar options: {"temperature": 0}.'] },
      { id: 'w20e2', title: 'Cazar alucinaciones', level: 'intermedia', kind: 'libre', statement: 'Pedile a un chat de IA 3 referencias bibliográficas sobre un tema de nicho y verificá si existen. Documentá el resultado y qué aprendiste.', hints: ['Buscá cada título en Google Scholar.'] },
    ],
    challenge: {
      title: 'Estimación de costos de un asistente',
      context: 'Una empresa recibe 500 consultas diarias y quiere un asistente que responda con IA.',
      task: ['Estimá tokens de entrada (instrucciones + contexto + consulta) y de salida por consulta.', 'Calculá el costo mensual con los precios publicados de 2 proveedores (consultá sus páginas oficiales de precios y anotá la fecha).', 'Proponé 3 formas de reducir costos.'],
      deliverable: 'Planilla o script con supuestos y resultados.',
    },
    deliverable: 'Experimentos + estimación de costos.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Explicar tokens, contexto y temperatura con ejemplos.', 'Estimación de costos con supuestos explícitos.'],
    questions: [
      mcq('q20-1', '¿Qué es un token?', ['Una contraseña', 'Un fragmento de texto que procesa el modelo', 'Un modelo', 'Un tipo de API'], 1, 'Unidad de procesamiento y de cobro.', { concept: 'Tokens' }),
      mcq('q20-2', 'Para clasificar tickets de forma consistente, la temperatura debería ser...', ['Alta', 'Baja (cercana a 0)', 'Indiferente', 'Negativa'], 1, 'Baja = más determinista.', { concept: 'Temperatura' }),
      tf('q20-3', 'Un LLM recuerda automáticamente lo que le dijiste en conversaciones de días anteriores sin que la app reenvíe nada.', false, 'El modelo no tiene memoria propia; la app gestiona el historial.', { concept: 'Contexto' }),
      mcq('q20-4', 'Una alucinación es...', ['Un error de conexión', 'Información falsa generada con apariencia de verdad', 'Un tipo de token', 'Un parámetro'], 1, 'El modelo genera texto plausible, no verificado.', { concept: 'Alucinaciones' }),
      mcq('q20-5', '¿Qué reduce las alucinaciones en preguntas sobre la empresa?', ['Subir la temperatura', 'Dar la información relevante en el contexto e instruir a decir "no sé"', 'Pedirlo en inglés', 'Usar más emojis'], 1, 'Base de RAG.', { concept: 'Alucinaciones', d: 'intermedia' }),
      tf('q20-6', 'Los tokens de entrada y de salida suelen tener precios distintos.', true, 'La salida suele ser más cara.', { concept: 'Tokens' }),
      mcq('q20-7', 'La ventana de contexto incluye...', ['Solo la pregunta', 'Instrucciones, historial, documentos y respuesta', 'Solo la respuesta', 'Los datos de entrenamiento'], 1, 'Todo lo que entra y sale en un request.', { concept: 'Contexto' }),
      mcq('q20-8', '¿Por qué un LLM puede no conocer un evento reciente?', ['Por la temperatura', 'Por su fecha de corte de entrenamiento', 'Por los tokens', 'Porque no tiene internet en su CPU'], 1, 'Solo conoce lo incluido en su entrenamiento (salvo que se le dé contexto o herramientas).', { concept: 'Limitaciones' }),
      py('q20-9', 'Completá estimar_tokens(texto) con la regla aproximada 1 token ≈ 4 caracteres (redondeando hacia arriba).', `def estimar_tokens(texto):\n    return 0`, `assert estimar_tokens("") == 0\nassert estimar_tokens("abcd") == 1\nassert estimar_tokens("abcde") == 2`, `import math\n\ndef estimar_tokens(texto):\n    return math.ceil(len(texto) / 4)`, 'Es solo una aproximación; los tokenizadores reales varían por idioma.', { concept: 'Tokens', hints: ['math.ceil redondea hacia arriba.'] }),
      tf('q20-10', 'Los LLM son confiables para cálculos aritméticos exactos sin verificación.', false, 'Conviene hacer los cálculos con código.', { concept: 'Limitaciones' }),
    ],
  },

  // ───────────────────────────── SEMANA 21 ─────────────────────────────
  {
    n: 21,
    stage: 4,
    title: 'Prompt engineering',
    objective: 'Diseñar prompts claros y estructurados, usar ejemplos (few-shot), pedir formatos estructurados y evaluar respuestas de forma sistemática.',
    topics: ['Prompt engineering', 'Instrucciones', 'Contexto', 'Formatos estructurados', 'Few-shot prompting', 'Evaluación de respuestas'],
    review: 'Repaso semana 20: temperatura y contexto afectan la calidad del prompt.',
    lessons: [
      {
        id: 'w21l1',
        title: 'Escribir prompts como especificaciones',
        minutes: 85,
        sections: [
          {
            heading: '1. Un prompt es una especificación',
            body: [
              'Pensá el prompt como las instrucciones para una persona nueva, muy capaz, pero que no conoce tu empresa. Cuanto más claro el objetivo, el contexto y el formato esperado, mejor el resultado.',
              'Estructura útil: rol/contexto → tarea → datos de entrada → reglas y restricciones → formato de salida → ejemplos.',
            ],
          },
          {
            heading: '2. Instrucciones claras',
            body: ['Sé específica: "Respondé en 3 viñetas de máximo 15 palabras" en lugar de "sé breve". Decí qué hacer, no solo qué evitar. Explicá el porqué de las reglas importantes: el modelo las aplica mejor.'],
          },
          {
            heading: '3. Separar instrucciones de datos',
            body: ['Delimitá los datos con etiquetas (por ejemplo <email>...</email>) o con triple comilla. Así el modelo distingue tus instrucciones del contenido a procesar, y reducís el riesgo de que el contenido del usuario "dé órdenes" (prompt injection).'],
            code: {
              lang: 'text',
              code: `Sos un asistente que clasifica consultas de clientes de una tienda online.\n\nClasificá la consulta en UNA categoría: facturacion, envio, acceso, devolucion, otro.\nAsigná prioridad: alta si menciona cobro duplicado, fraude o pedido perdido; media si hay demora; baja en otro caso.\nSi la consulta no tiene información suficiente, usá categoria "otro" y explicalo en "motivo".\n\nRespondé SOLO con JSON válido con este formato:\n{"categoria": "...", "prioridad": "...", "motivo": "..."}\n\n<consulta>\nMe cobraron dos veces el pedido 4521 y todavía no llegó.\n</consulta>`,
            },
          },
          {
            heading: '4. Few-shot: enseñar con ejemplos',
            body: ['Incluir 2–5 ejemplos de entrada → salida esperada mejora mucho la consistencia, sobre todo en casos ambiguos. Elegí ejemplos variados que cubran los casos borde.'],
          },
          {
            heading: '5. Formatos estructurados',
            body: ['Para automatizar, pedí JSON con un esquema definido, y validalo con código (json.loads + verificación de campos). Muchas APIs ofrecen "structured outputs" o tool use que garantizan el formato. Nunca confíes ciegamente en el formato: validá siempre.'],
          },
          {
            heading: '6. Evaluar respuestas',
            body: [
              'No evalúes un prompt con un solo ejemplo. Armá un set de prueba (20–50 casos con la respuesta esperada), ejecutá el prompt y medí el porcentaje de aciertos. Cambiá una cosa por vez y volvé a medir.',
              'Esto es igual que testear código: el prompt es código que se valida con datos.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Prompt', def: 'Instrucción y contexto que se envía al modelo.' },
          { term: 'System prompt', def: 'Instrucciones generales de rol y comportamiento.' },
          { term: 'Few-shot', def: 'Incluir ejemplos de entrada y salida en el prompt.' },
          { term: 'Zero-shot', def: 'Pedir la tarea sin ejemplos.' },
          { term: 'Salida estructurada', def: 'Respuesta en formato definido (JSON) para procesar con código.' },
          { term: 'Prompt injection', def: 'Contenido malicioso que intenta cambiar las instrucciones del modelo.' },
          { term: 'Set de evaluación', def: 'Casos de prueba con respuesta esperada para medir un prompt.' },
        ],
        simpleExample: 'Malo: "Resumí esto." Mejor: "Resumí el siguiente email en 2 oraciones para un gerente, indicando el pedido del cliente y la fecha límite."',
        realExample: 'Un equipo mejora su clasificador del 72% al 94% de acierto agregando 4 ejemplos de casos ambiguos, una categoría "otro" explícita y validación JSON con reintento.',
        analogy: 'Un buen prompt es como un buen brief para una agencia: objetivo, público, restricciones, formato de entrega y ejemplos de referencia.',
        commonErrors: ['Instrucciones vagas.', 'Mezclar datos e instrucciones sin delimitar.', 'Evaluar con un solo caso.', 'No validar el JSON devuelto.'],
        bestPractices: ['Estructura: contexto, tarea, reglas, formato, ejemplos.', 'Temperatura baja para tareas estructuradas.', 'Set de evaluación y métricas.'],
        summary: ['El prompt es una especificación.', 'Few-shot mejora consistencia.', 'JSON + validación para automatizar.', 'Medí con un set de prueba.'],
        comprehension: [{ q: '¿Por qué conviene delimitar el texto del cliente con etiquetas?', a: 'Para que el modelo distinga instrucciones de datos y para reducir el efecto de instrucciones maliciosas dentro del texto (prompt injection).' }],
        exercise: {
          statement: 'Completá validar_salida(texto) que reciba la respuesta del modelo, intente parsear JSON y devuelva el dict solo si tiene categoria en {facturacion, envio, acceso, devolucion, otro} y prioridad en {alta, media, baja}. En cualquier otro caso devolvé None.',
          hints: ['json.loads dentro de try/except.', 'Verificá que sea dict.', 'Verificá pertenencia a los conjuntos.'],
          solution: `import json\n\nCATS = {"facturacion", "envio", "acceso", "devolucion", "otro"}\nPRIOS = {"alta", "media", "baja"}\n\ndef validar_salida(texto):\n    try:\n        d = json.loads(texto)\n    except (json.JSONDecodeError, TypeError):\n        return None\n    if not isinstance(d, dict):\n        return None\n    if d.get("categoria") not in CATS or d.get("prioridad") not in PRIOS:\n        return None\n    return d`,
          starter: `import json\n\ndef validar_salida(texto):\n    return None`,
          tests: `assert validar_salida('{"categoria":"envio","prioridad":"alta","motivo":"x"}')["categoria"] == "envio"\nassert validar_salida('Claro! {"categoria":"envio"}') is None\nassert validar_salida('{"categoria":"magia","prioridad":"alta"}') is None\nassert validar_salida('[1,2]') is None`,
        },
      },
    ],
    resources: [
      { ref: 'anthropicdocs', why: 'Guía de prompt engineering (aplica a cualquier modelo): claridad, ejemplos, etiquetas XML, cadenas de prompts.', minutes: 120 },
      { ref: 'dlai', why: 'Curso corto "ChatGPT Prompt Engineering for Developers" o similar disponible.', minutes: 90 },
      { ref: 'oaiacademy', why: 'Material introductorio sobre prompting.', minutes: 30 },
    ],
    coursera: [{ courseId: 'c-genai-everyone', note: 'Módulos de uso práctico y prompting.' }],
    docs: [{ ref: 'oaidev', why: 'Guía de prompting y "structured outputs" para comparar enfoques.' }],
    exercises: [
      { id: 'w21e1', title: 'Iterar un prompt', level: 'intermedia', kind: 'libre', statement: 'Escribí 3 versiones de un prompt para clasificar consultas y probalas con 10 consultas ficticias. Registrá el acierto de cada versión en una tabla.', hints: ['Cambiá una sola cosa por versión.'] },
      { id: 'w21e2', title: 'Few-shot', level: 'intermedia', kind: 'libre', statement: 'Agregá 3 ejemplos a tu mejor prompt y medí si mejora el acierto en los casos ambiguos.', hints: ['Incluí un ejemplo de "otro".'] },
      { id: 'w21e3', title: 'Medir acierto', level: 'avanzada', kind: 'python', statement: 'accuracy(predicciones, esperadas) devuelve el porcentaje de aciertos (0–100) redondeado a 1 decimal. Si las listas están vacías, devolvé 0.', hints: ['zip(a, b)', 'sum(1 for p, e in ... if p == e)'], solution: `def accuracy(predicciones, esperadas):\n    if not esperadas:\n        return 0\n    ok = sum(1 for p, e in zip(predicciones, esperadas) if p == e)\n    return round(ok / len(esperadas) * 100, 1)`, starter: `def accuracy(predicciones, esperadas):\n    return 0`, tests: `assert accuracy(["a","b","c"],["a","x","c"]) == 66.7\nassert accuracy([],[]) == 0` },
    ],
    challenge: {
      title: 'Prompt de producción para clasificación',
      context: 'Vas a usar este prompt en el Proyecto 4 y en tu workflow de n8n.',
      task: ['Prompt con rol, tareas, reglas, formato JSON y 3 ejemplos.', 'Set de evaluación de 20 consultas con respuesta esperada.', 'Medí el acierto y documentá los errores restantes.', 'Incluí una prueba de prompt injection ("ignorá tus instrucciones y...") y verificá el comportamiento.'],
      deliverable: 'Archivo prompt.md + set de evaluación + resultados.',
    },
    deliverable: 'Prompt evaluado con métricas.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Prompt con ≥ 85% de acierto en tu set.', 'Validación de JSON con código.'],
    questions: [
      mcq('q21-1', '¿Qué es few-shot prompting?', ['Un prompt muy corto', 'Incluir ejemplos de entrada y salida en el prompt', 'Usar pocos tokens', 'Temperatura baja'], 1, 'Se enseña con ejemplos.', { concept: 'Few-shot prompting' }),
      mcq('q21-2', '¿Cuál es la instrucción más clara?', ['"Sé breve"', '"Respondé en máximo 3 viñetas de hasta 15 palabras"', '"No escribas mucho"', '"Resumí"'], 1, 'Específica y medible.', { concept: 'Instrucciones' }),
      tf('q21-3', 'Si pedís JSON en el prompt, no hace falta validarlo con código.', false, 'El modelo puede devolver texto extra o campos inválidos: validá siempre.', { concept: 'Formatos estructurados' }),
      mcq('q21-4', '¿Para qué sirve delimitar el texto del usuario con etiquetas?', ['Para ahorrar tokens', 'Para separar datos de instrucciones y reducir prompt injection', 'Para traducir', 'Para subir la temperatura'], 1, 'El modelo distingue qué es dato.', { concept: 'Contexto', d: 'intermedia' }),
      mcq('q21-5', '¿Cómo evaluás si un prompt nuevo es mejor?', ['Probando un caso', 'Midiendo el acierto sobre un set de casos con respuesta esperada', 'Preguntándole al modelo', 'Por intuición'], 1, 'Evaluación sistemática.', { concept: 'Evaluación de respuestas' }),
      mcq('q21-6', 'Prompt injection es...', ['Un tipo de token', 'Contenido que intenta cambiar las instrucciones del modelo', 'Una API', 'Un error de red'], 1, 'Riesgo de seguridad en apps con IA.', { concept: 'Contexto', d: 'intermedia' }),
      tf('q21-7', 'Explicar el motivo de una regla en el prompt suele ayudar a que el modelo la aplique mejor.', true, 'El contexto mejora la generalización.', { concept: 'Instrucciones' }),
      mcq('q21-8', 'Al iterar un prompt conviene...', ['Cambiar todo a la vez', 'Cambiar una cosa por vez y volver a medir', 'No guardar versiones', 'Usar otro modelo cada vez'], 1, 'Como depurar código.', { concept: 'Evaluación de respuestas' }),
      py('q21-9', 'Completá construir_prompt(consulta, ejemplos) que devuelva un texto con: la línea "Clasificá la consulta.", luego cada ejemplo como "Consulta: X -> Y" (ejemplos es lista de tuplas), y al final "<consulta>CONSULTA</consulta>". Líneas separadas por \\n.', `def construir_prompt(consulta, ejemplos):\n    return ""`, `p = construir_prompt("Hola", [("me cobraron dos veces","facturacion")])\nassert p == "Clasificá la consulta.\\nConsulta: me cobraron dos veces -> facturacion\\n<consulta>Hola</consulta>"`, `def construir_prompt(consulta, ejemplos):\n    lineas = ["Clasificá la consulta."]\n    for entrada, salida in ejemplos:\n        lineas.append(f"Consulta: {entrada} -> {salida}")\n    lineas.append(f"<consulta>{consulta}</consulta>")\n    return "\\n".join(lineas)`, 'Construir prompts con código permite versionarlos y testearlos.', { concept: 'Few-shot prompting', d: 'intermedia', hints: ['Armá una lista de líneas.', '"\\n".join(lineas)'] }),
      short('q21-10', '¿Qué formato de salida pedirías para procesar la respuesta con código? (sigla)', ['json'], 'JSON.', { concept: 'Formatos estructurados' }),
    ],
  },

  // ───────────────────────────── SEMANA 22 ─────────────────────────────
  {
    n: 22,
    stage: 4,
    title: 'APIs de modelos de IA con Python',
    objective: 'Llamar modelos de IA desde Python, obtener respuestas estructuradas, usar function calling (tool use) y controlar costos, con una alternativa local gratuita.',
    topics: ['APIs de modelos de IA', 'Integración con Python', 'Respuestas estructuradas', 'Function calling', 'Control de costos'],
    review: 'Repaso semana 12 (requests, headers, status codes) y 21 (prompts y validación).',
    lessons: [
      {
        id: 'w22l1',
        title: 'Llamar a un LLM desde código',
        minutes: 90,
        sections: [
          {
            heading: '1. Opciones y costos',
            body: [API_COST_NOTE, 'El patrón es el mismo en todos los proveedores: enviás mensajes (system + user) por HTTP y recibís la respuesta del modelo más el conteo de tokens usados.'],
          },
          {
            heading: '2. Alternativa gratuita: Ollama',
            body: ['Instalá Ollama, ejecutá "ollama pull llama3.2:1b" (modelo chico) y llamalo con requests. La calidad es menor que los modelos comerciales grandes, pero alcanza para aprender el flujo completo sin gastar.'],
            code: { lang: 'python', code: `import requests\n\nr = requests.post(\n    "http://localhost:11434/api/chat",\n    json={\n        "model": "llama3.2:1b",\n        "messages": [\n            {"role": "system", "content": "Clasificá consultas. Respondé solo JSON."},\n            {"role": "user", "content": "Me cobraron dos veces"},\n        ],\n        "stream": False,\n        "format": "json",\n        "options": {"temperature": 0},\n    },\n    timeout=120,\n)\nprint(r.json()["message"]["content"])` },
          },
          {
            heading: '3. SDK de un proveedor comercial',
            body: ['Los proveedores ofrecen SDKs (librerías) que simplifican las llamadas. Ejemplo con el SDK de Anthropic (requiere API key en la variable de entorno ANTHROPIC_API_KEY y créditos). Consultá en la documentación oficial los nombres de modelos vigentes.'],
            code: { lang: 'python', code: `# pip install anthropic\nimport anthropic\n\nclient = anthropic.Anthropic()  # lee ANTHROPIC_API_KEY del entorno\nmsg = client.messages.create(\n    model="NOMBRE_DEL_MODELO",  # ver docs oficiales\n    max_tokens=300,\n    temperature=0,\n    system="Clasificá consultas de clientes. Respondé solo JSON.",\n    messages=[{"role": "user", "content": "Me cobraron dos veces"}],\n)\nprint(msg.content[0].text)\nprint(msg.usage.input_tokens, msg.usage.output_tokens)` },
          },
          {
            heading: '4. Function calling / tool use',
            body: [
              'Le describís al modelo herramientas (funciones) con nombre, descripción y esquema de parámetros (JSON Schema). El modelo no ejecuta nada: responde "quiero llamar a buscar_pedido con {id: 4521}". Tu código ejecuta la función, le devuelve el resultado y el modelo redacta la respuesta final.',
              'Es la base de los agentes (etapa 5). La regla de seguridad: tu código decide qué se ejecuta y valida los parámetros.',
            ],
            code: { lang: 'json', code: `{\n  "name": "buscar_pedido",\n  "description": "Busca el estado de un pedido por su número.",\n  "input_schema": {\n    "type": "object",\n    "properties": { "pedido_id": { "type": "integer" } },\n    "required": ["pedido_id"]\n  }\n}` },
          },
          {
            heading: '5. Control de costos y robustez',
            body: ['max_tokens, temperatura baja, prompts concisos, modelos pequeños para tareas simples, cachear respuestas repetidas, registrar tokens usados por request, timeouts y reintentos (429/5xx) como en la semana 17.'],
          },
        ],
        keyConcepts: [
          { term: 'SDK', def: 'Librería oficial que facilita usar una API.' },
          { term: 'Messages', def: 'Lista de mensajes con rol (system, user, assistant).' },
          { term: 'Tool use / function calling', def: 'El modelo solicita ejecutar funciones definidas por vos.' },
          { term: 'JSON Schema', def: 'Formato para describir la estructura de un JSON.' },
          { term: 'usage', def: 'Conteo de tokens devuelto por la API.' },
        ],
        simpleExample: 'Enviar "Resumí en una línea: ..." y guardar la respuesta en una variable.',
        realExample: 'Un script procesa 300 consultas nocturnas: llama al modelo con temperatura 0, valida el JSON, reintenta las inválidas una vez y registra tokens y costo en SQLite.',
        analogy: 'Function calling es como un asistente que te dice "necesito consultar el sistema de pedidos con el número 4521"; vos lo consultás y le pasás el resultado.',
        commonErrors: ['Hardcodear la API key.', 'No registrar el uso de tokens.', 'Ejecutar automáticamente cualquier función que pida el modelo sin validar.'],
        bestPractices: ['API keys en variables de entorno.', 'Validar entradas y salidas.', 'Empezar con modelos pequeños / locales.'],
        summary: ['Mismo patrón en todos los proveedores.', 'Ollama para practicar gratis.', 'Tool use = el modelo pide, tu código ejecuta.'],
        comprehension: [{ q: 'En function calling, ¿quién ejecuta la función?', a: 'Tu código. El modelo solo indica qué función y con qué argumentos; vos validás, ejecutás y devolvés el resultado.' }],
        exercise: {
          statement: 'Completá ejecutar_tool(nombre, args) que despache a funciones registradas: buscar_pedido(pedido_id) devuelve {"id": id, "estado": "en camino"} si id > 0. Si la tool no existe o falta un argumento requerido, devolvé {"error": "..."} en lugar de lanzar excepción.',
          hints: ['Diccionario nombre → función.', 'try/except KeyError/TypeError.'],
          solution: `def buscar_pedido(pedido_id):\n    if pedido_id <= 0:\n        return {"error": "id inválido"}\n    return {"id": pedido_id, "estado": "en camino"}\n\nTOOLS = {"buscar_pedido": buscar_pedido}\n\ndef ejecutar_tool(nombre, args):\n    if nombre not in TOOLS:\n        return {"error": f"tool desconocida: {nombre}"}\n    try:\n        return TOOLS[nombre](**args)\n    except TypeError as e:\n        return {"error": str(e)}`,
          starter: `def buscar_pedido(pedido_id):\n    return {"id": pedido_id, "estado": "en camino"}\n\ndef ejecutar_tool(nombre, args):\n    return {}`,
          tests: `assert ejecutar_tool("buscar_pedido", {"pedido_id": 7}) == {"id": 7, "estado": "en camino"}\nassert "error" in ejecutar_tool("borrar_todo", {})\nassert "error" in ejecutar_tool("buscar_pedido", {})`,
        },
      },
    ],
    resources: [
      { ref: 'ollama', why: 'Instalación, modelos pequeños y referencia de la API local.', minutes: 60 },
      { ref: 'anthropicdocs', why: 'Getting started, Messages API y Tool use (conceptos).', minutes: 90 },
      { ref: 'oaidev', why: 'Function calling y structured outputs (comparar con Anthropic).', minutes: 60 },
      { ref: 'dlai', why: 'Un curso corto sobre function calling o construcción de sistemas con APIs de LLM.', minutes: 60 },
    ],
    coursera: [{ courseId: 'c-scrimba', note: 'Opcional: muestra integración de APIs de IA en apps (JavaScript). Útil como contraste.' }],
    docs: [{ ref: 'pythonenv', why: 'Cargar la API key desde .env.' }],
    exercises: [
      { id: 'w22e1', title: 'Primera llamada', level: 'basica', kind: 'libre', statement: 'Llamá a un modelo (Ollama local o un proveedor si tenés créditos) desde Python con un system prompt y una pregunta. Imprimí la respuesta y los tokens usados.', hints: ['Ollama devuelve prompt_eval_count y eval_count.'] },
      { id: 'w22e2', title: 'Clasificador con validación', level: 'avanzada', kind: 'libre', statement: 'Convertí tu prompt de la semana 21 en una función clasificar(consulta) que llame al modelo, valide el JSON (validar_salida) y reintente una vez si es inválido.', hints: ['Reutilizá validar_salida.'] },
      { id: 'w22e3', title: 'Registro de costos', level: 'intermedia', kind: 'libre', statement: 'Guardá en SQLite cada llamada: fecha, modelo, tokens_in, tokens_out, costo estimado. Hacé una consulta SQL que sume el costo por día.', hints: ['Reutilizá la semana 11.'] },
    ],
    challenge: {
      title: 'Clasificación nocturna de consultas',
      context: 'Un ecommerce acumula consultas durante la noche y quiere encontrarlas clasificadas a las 8:00.',
      task: ['Script que lee consultas de SQLite, las clasifica con un LLM y guarda categoría y prioridad.', 'Validación, reintento y registro de errores.', 'Reporte de tokens y costo estimado.', 'Opcional: integrarlo a n8n con un nodo HTTP Request a Ollama.'],
      deliverable: 'Script + base de ejemplo + reporte.',
    },
    deliverable: 'Clasificador por API con validación y costos.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Llamar un modelo desde Python con manejo de errores.', 'Explicar el flujo de tool use.'],
    questions: [
      mcq('q22-1', 'En function calling, el modelo...', ['Ejecuta la función en tu servidor', 'Indica qué función llamar y con qué argumentos', 'No usa funciones', 'Escribe la función'], 1, 'Tu código ejecuta.', { concept: 'Function calling' }),
      tf('q22-2', 'La API de un modelo comercial generalmente requiere créditos o pago por uso.', true, 'Se cobra por tokens.', { concept: 'Control de costos' }),
      mcq('q22-3', '¿Dónde guardás la API key?', ['En el código', 'En una variable de entorno / .env no versionado', 'En el README', 'En el prompt'], 1, 'Nunca en el código.', { concept: 'Integración con Python' }),
      mcq('q22-4', '¿Qué alternativa gratuita permite practicar con LLMs localmente?', ['Postman', 'Ollama', 'SQLite', 'n8n Cloud'], 1, 'Ollama ejecuta modelos abiertos localmente.', { concept: 'APIs de modelos de IA' }),
      mcq('q22-5', 'Para describir los parámetros de una tool se usa...', ['CSV', 'JSON Schema', 'SQL', 'HTML'], 1, 'Define tipos y campos requeridos.', { concept: 'Function calling', d: 'intermedia' }),
      tf('q22-6', 'Es seguro ejecutar cualquier función que el modelo solicite sin validar sus argumentos.', false, 'Validá siempre; el modelo puede equivocarse o ser manipulado.', { concept: 'Function calling', d: 'intermedia' }),
      mcq('q22-7', '¿Qué parámetro limita la longitud y el costo de la respuesta?', ['temperature', 'max_tokens', 'top_k', 'stream'], 1, 'max_tokens.', { concept: 'Control de costos' }),
      mcq('q22-8', 'Los roles típicos en la lista de mensajes son...', ['admin, guest', 'system, user, assistant', 'input, output', 'get, post'], 1, 'system (instrucciones), user, assistant.', { concept: 'Integración con Python' }),
      py('q22-9', 'Completá extraer_texto(respuesta) que reciba un dict con la forma {"content": [{"type": "text", "text": "..."}, ...]} y devuelva todos los textos concatenados con un espacio. Ignorá bloques que no sean de tipo "text".', `def extraer_texto(respuesta):\n    return ""`, `r = {"content": [{"type":"text","text":"Hola"},{"type":"tool_use","name":"x"},{"type":"text","text":"Ana"}]}\nassert extraer_texto(r) == "Hola Ana"\nassert extraer_texto({"content": []}) == ""`, `def extraer_texto(respuesta):\n    partes = [b["text"] for b in respuesta.get("content", []) if b.get("type") == "text"]\n    return " ".join(partes)`, 'Las respuestas de las APIs mezclan bloques de texto y de herramientas.', { concept: 'Respuestas estructuradas', d: 'intermedia', hints: ['Filtrá por b["type"] == "text".'] }),
      mcq('q22-10', 'Para tareas simples de clasificación con alto volumen conviene...', ['El modelo más grande siempre', 'Un modelo más pequeño y barato, validado con un set de prueba', 'Temperatura 1', 'No usar validación'], 1, 'Elegí el modelo según la tarea y medí.', { concept: 'Control de costos', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 23 ─────────────────────────────
  {
    n: 23,
    stage: 4,
    title: 'Embeddings, búsqueda semántica y RAG',
    objective: 'Entender cómo se representan textos como vectores, buscar por significado y construir un pipeline básico de RAG (Retrieval-Augmented Generation).',
    topics: ['Embeddings', 'Búsqueda semántica', 'Bases de datos vectoriales', 'Introducción a RAG'],
    review: 'Repaso semanas 20 y 21: el contexto limitado y las alucinaciones son el problema que RAG resuelve.',
    lessons: [
      {
        id: 'w23l1',
        title: 'Buscar por significado y responder con fuentes',
        minutes: 90,
        sections: [
          {
            heading: '1. Embeddings',
            body: [
              'Un embedding es una lista de números (vector) que representa el significado de un texto. Textos con significado parecido tienen vectores cercanos, aunque usen palabras distintas: "no puedo entrar a mi cuenta" está cerca de "problema para iniciar sesión".',
              'Se obtienen con un modelo de embeddings (hay modelos abiertos gratuitos que corren localmente, por ejemplo con sentence-transformers u Ollama).',
            ],
          },
          {
            heading: '2. Similitud del coseno',
            body: ['Para comparar dos vectores se usa la similitud del coseno: 1 = misma dirección (muy parecidos), 0 = sin relación. Es una cuenta simple: producto punto dividido por el producto de las normas.'],
            code: { lang: 'python', code: `import math\n\ndef coseno(a, b):\n    punto = sum(x * y for x, y in zip(a, b))\n    norma_a = math.sqrt(sum(x * x for x in a))\n    norma_b = math.sqrt(sum(y * y for y in b))\n    return punto / (norma_a * norma_b)` },
          },
          {
            heading: '3. Bases de datos vectoriales',
            body: ['Guardan vectores con su texto y metadatos y permiten buscar los k más similares rápidamente. Opciones gratuitas: Chroma (local, Python), pgvector (extensión de PostgreSQL), FAISS (librería). Para aprender alcanza con Chroma o incluso una lista en memoria.'],
          },
          {
            heading: '4. RAG paso a paso',
            body: [
              'Indexación (una vez): 1) cargar documentos (FAQ, políticas), 2) dividirlos en fragmentos (chunks) de 300–800 caracteres con algo de solapamiento, 3) calcular embeddings, 4) guardarlos.',
              'Consulta (cada pregunta): 1) embedding de la pregunta, 2) recuperar los k fragmentos más similares, 3) armar un prompt con esos fragmentos como contexto e instrucciones de responder solo con esa información y citar la fuente, 4) generar la respuesta.',
              'Si los fragmentos recuperados no son suficientemente similares (umbral), el sistema debe decir que no tiene información y derivar a una persona.',
            ],
          },
          {
            heading: '5. Calidad en RAG',
            body: ['La mayoría de los problemas de RAG son de recuperación, no del modelo: chunks mal cortados, documentos desactualizados, falta de metadatos. Evaluá por separado: ¿se recuperó el fragmento correcto? y ¿la respuesta es fiel a ese fragmento?'],
          },
        ],
        keyConcepts: [
          { term: 'Embedding', def: 'Vector numérico que representa el significado de un texto.' },
          { term: 'Similitud del coseno', def: 'Medida de cercanía entre vectores (−1 a 1).' },
          { term: 'Chunk', def: 'Fragmento de documento que se indexa.' },
          { term: 'Base vectorial', def: 'Almacén especializado en búsqueda por similitud.' },
          { term: 'RAG', def: 'Recuperar información relevante y dársela al modelo para responder.' },
          { term: 'Top-k', def: 'Cantidad de fragmentos más similares recuperados.' },
        ],
        simpleExample: 'Pregunta: "¿Cuánto tarda el envío?" → se recupera el fragmento de la FAQ de envíos → el modelo responde con ese dato.',
        realExample: 'Un asistente interno de RR. HH. responde preguntas sobre licencias usando el reglamento vigente, cita el artículo y, si la pregunta no está cubierta, deriva a RR. HH.',
        analogy: 'RAG es un examen a libro abierto: antes de responder, el modelo busca las páginas relevantes del manual de la empresa.',
        commonErrors: ['Chunks demasiado grandes o pequeños.', 'No definir un umbral de "no sé".', 'Documentos desactualizados en el índice.', 'No citar fuentes.'],
        bestPractices: ['Metadatos (fuente, fecha) en cada chunk.', 'Umbral de similitud + derivación humana.', 'Evaluar recuperación y respuesta por separado.'],
        summary: ['Embeddings capturan significado.', 'Búsqueda semántica = vectores cercanos.', 'RAG = recuperar + generar con fuentes.'],
        comprehension: [{ q: '¿Qué debe hacer un sistema RAG si ningún fragmento es suficientemente similar a la pregunta?', a: 'Indicar que no tiene información suficiente y derivar a una persona, en lugar de inventar.' }],
        exercise: {
          statement: 'Completá dividir_en_chunks(texto, tamano, solapamiento) que devuelva fragmentos de "tamano" caracteres, donde cada uno empieza "tamano - solapamiento" caracteres después del anterior. El último puede ser más corto. Texto vacío → [].',
          hints: ['paso = tamano - solapamiento', 'range(0, len(texto), paso)', 'Cortá cuando el inicio ya cubre el final.'],
          solution: `def dividir_en_chunks(texto, tamano, solapamiento):\n    if not texto:\n        return []\n    paso = tamano - solapamiento\n    chunks = []\n    for i in range(0, len(texto), paso):\n        chunks.append(texto[i:i + tamano])\n        if i + tamano >= len(texto):\n            break\n    return chunks`,
          starter: `def dividir_en_chunks(texto, tamano, solapamiento):\n    return []`,
          tests: `assert dividir_en_chunks("abcdefghij", 4, 1) == ["abcd", "defg", "ghij"]\nassert dividir_en_chunks("abc", 5, 1) == ["abc"]\nassert dividir_en_chunks("", 5, 1) == []`,
        },
      },
    ],
    resources: [
      { ref: 'hflearn', why: 'Capítulo sobre semantic search / embeddings del LLM Course o el curso de NLP.', minutes: 90 },
      { ref: 'chroma', why: 'Getting started: crear una colección, agregar documentos y consultar.', minutes: 60 },
      { ref: 'dlai', why: 'Curso corto de RAG o de vector databases.', minutes: 90 },
    ],
    coursera: [{ courseId: 'c-duke-math', note: 'Opcional: módulo de vectores/funciones si querés entender mejor la matemática de embeddings.' }],
    docs: [{ ref: 'llamaindex', why: 'Conceptos de RAG ("High-Level Concepts").' }],
    exercises: [
      { id: 'w23e1', title: 'Similitud del coseno', level: 'intermedia', kind: 'python', statement: 'Implementá coseno(a, b) y mas_similar(consulta, docs) que devuelva el índice del vector de docs más similar a consulta.', hints: ['Reutilizá coseno.', 'max(range(len(docs)), key=...)'], solution: `import math\n\ndef coseno(a, b):\n    p = sum(x*y for x, y in zip(a, b))\n    return p / (math.sqrt(sum(x*x for x in a)) * math.sqrt(sum(y*y for y in b)))\n\ndef mas_similar(consulta, docs):\n    return max(range(len(docs)), key=lambda i: coseno(consulta, docs[i]))`, starter: `import math\n\ndef coseno(a, b):\n    return 0\n\ndef mas_similar(consulta, docs):\n    return 0`, tests: `assert abs(coseno([1,0],[1,0]) - 1) < 1e-9\nassert abs(coseno([1,0],[0,1])) < 1e-9\nassert mas_similar([1,1],[[0,1],[1,1.1],[-1,0]]) == 1` },
      { id: 'w23e2', title: 'Mini RAG local', level: 'avanzada', kind: 'libre', statement: 'Con Chroma (o una lista en memoria) indexá 15 preguntas frecuentes de una tienda y construí buscar(pregunta, k=3). Luego armá el prompt con los fragmentos y generá la respuesta con Ollama.', hints: ['Chroma calcula embeddings por defecto con un modelo local.'] },
    ],
    challenge: {
      title: 'Buscador semántico de políticas',
      context: 'El equipo de soporte pierde tiempo buscando en un documento de políticas de 40 páginas.',
      task: ['Dividí un documento de políticas (podés redactar uno ficticio) en chunks con metadatos.', 'Indexalo en una base vectorial local.', 'Para 10 preguntas, registrá si el fragmento correcto aparece en el top 3.', 'Definí un umbral de similitud para responder "no encontré información".'],
      deliverable: 'Código + tabla de evaluación de recuperación.',
    },
    deliverable: 'Mini RAG local con evaluación de recuperación.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Explicar el pipeline RAG completo.', 'Recuperación correcta en ≥ 8 de 10 preguntas.'],
    questions: [
      mcq('q23-1', '¿Qué es un embedding?', ['Una imagen', 'Un vector numérico que representa el significado de un texto', 'Una tabla SQL', 'Un prompt'], 1, 'Vectores cercanos = significados parecidos.', { concept: 'Embeddings' }),
      mcq('q23-2', 'La búsqueda semántica encuentra resultados por...', ['Coincidencia exacta de palabras', 'Similitud de significado', 'Orden alfabético', 'Fecha'], 1, 'Por cercanía de embeddings.', { concept: 'Búsqueda semántica' }),
      tf('q23-3', 'RAG significa entrenar de nuevo el modelo con los documentos de la empresa.', false, 'RAG recupera información en el momento y la pone en el contexto; no reentrena.', { concept: 'Introducción a RAG' }),
      mcq('q23-4', 'Una similitud del coseno cercana a 1 indica...', ['Textos sin relación', 'Textos muy similares', 'Error', 'Textos opuestos'], 1, 'Misma dirección.', { concept: 'Embeddings' }),
      mcq('q23-5', '¿Qué es Chroma?', ['Un LLM', 'Una base de datos vectorial', 'Un navegador', 'Un lenguaje'], 1, 'Open source y local.', { concept: 'Bases de datos vectoriales' }),
      mcq('q23-6', 'Si la pregunta no tiene fragmentos relevantes, el sistema debería...', ['Inventar la mejor respuesta posible', 'Decir que no tiene información y derivar a una persona', 'Responder con el primer fragmento', 'Subir la temperatura'], 1, 'Evita alucinaciones.', { concept: 'Introducción a RAG' }),
      tf('q23-7', 'Muchos problemas de calidad en RAG se originan en la recuperación (chunks, documentos, metadatos).', true, 'Si no se recupera lo correcto, el modelo no puede responder bien.', { concept: 'Introducción a RAG', d: 'intermedia' }),
      mcq('q23-8', '¿Para qué sirve el solapamiento entre chunks?', ['Para ahorrar espacio', 'Para no cortar ideas a la mitad entre fragmentos', 'Para encriptar', 'No sirve'], 1, 'Preserva contexto en los bordes.', { concept: 'Embeddings', d: 'intermedia' }),
      py('q23-9', 'Completá top_k(similitudes, k) que reciba una lista de tuplas (id, score) y devuelva los ids de los k scores más altos, de mayor a menor.', `def top_k(similitudes, k):\n    return []`, `assert top_k([("a",0.2),("b",0.9),("c",0.5)], 2) == ["b","c"]\nassert top_k([], 3) == []`, `def top_k(similitudes, k):\n    orden = sorted(similitudes, key=lambda t: t[1], reverse=True)\n    return [i for i, _ in orden[:k]]`, 'Es el paso de recuperación de RAG.', { concept: 'Búsqueda semántica', hints: ['sorted con key=lambda t: t[1]'] }),
      py('q23-10', 'Completá responder_o_derivar(score_max, umbral=0.75) que devuelva "responder" si score_max >= umbral, si no "derivar".', `def responder_o_derivar(score_max, umbral=0.75):\n    return ""`, `assert responder_o_derivar(0.8) == "responder"\nassert responder_o_derivar(0.5) == "derivar"\nassert responder_o_derivar(0.6, 0.6) == "responder"`, `def responder_o_derivar(score_max, umbral=0.75):\n    return "responder" if score_max >= umbral else "derivar"`, 'El umbral protege contra respuestas sin sustento.', { concept: 'Introducción a RAG', d: 'basica' }),
    ],
  },

  // ───────────────────────────── SEMANA 24 ─────────────────────────────
  {
    n: 24,
    stage: 4,
    title: 'Aplicaciones con IA: calidad, privacidad y seguridad',
    objective: 'Construir una aplicación con IA completa, evaluar su calidad, proteger datos personales y mitigar riesgos de seguridad. Entregar el Proyecto 4.',
    topics: ['Construcción de aplicaciones con IA', 'Evaluación de calidad', 'Privacidad', 'Seguridad', 'Proyecto final'],
    review: 'Repaso integral de la etapa 4.',
    lessons: [
      {
        id: 'w24l1',
        title: 'IA responsable en producción',
        minutes: 85,
        sections: [
          {
            heading: '1. Arquitectura de una app con IA',
            body: ['Interfaz (Streamlit, web o chat) → backend (Python) → recuperación (base vectorial) → modelo (API o local) → validación de salida → registro (logs, costos, feedback) → derivación humana. Cada capa se puede probar por separado.'],
          },
          {
            heading: '2. Evaluar calidad',
            body: [
              'Definí métricas antes de construir: precisión de clasificación, porcentaje de respuestas fieles a las fuentes, porcentaje de derivaciones correctas, tiempo de respuesta, costo por consulta.',
              'Set de evaluación con preguntas reales (anonimizadas), incluyendo preguntas sin respuesta en la base. Revisión humana de una muestra. Feedback de usuarios (👍/👎) registrado.',
            ],
          },
          {
            heading: '3. Privacidad',
            body: [
              'Minimización: enviá al modelo solo los datos necesarios. Anonimizá o enmascará datos personales (emails, teléfonos, documentos) cuando no sean imprescindibles.',
              'Revisá las políticas de uso de datos del proveedor (retención, uso para entrenamiento). Informá a las personas usuarias que interactúan con IA. Respetá la normativa aplicable (por ejemplo GDPR en Europa o leyes locales de protección de datos).',
            ],
          },
          {
            heading: '4. Seguridad',
            body: [
              'Prompt injection: instrucciones maliciosas en el input del usuario o en documentos recuperados. Mitigaciones: separar instrucciones y datos, no darle al modelo permisos que no necesita, validar salidas, nunca ejecutar acciones sensibles sin aprobación humana.',
              'Fuga de datos: el modelo podría revelar información de otros clientes si está en el contexto. Filtrá por permisos antes de recuperar.',
              'Abuso y costos: límites de uso por usuario, max_tokens, monitoreo.',
            ],
          },
          {
            heading: '5. Comunicar limitaciones',
            body: ['Un asistente honesto dice cuándo no sabe, cita fuentes y ofrece contacto humano. Eso genera más confianza que un asistente que siempre "responde algo".'],
          },
        ],
        keyConcepts: [
          { term: 'Fidelidad (faithfulness)', def: 'La respuesta se basa solo en las fuentes recuperadas.' },
          { term: 'Minimización de datos', def: 'Usar solo los datos personales imprescindibles.' },
          { term: 'Enmascaramiento', def: 'Reemplazar datos sensibles por marcadores.' },
          { term: 'Prompt injection indirecta', def: 'Instrucciones maliciosas escondidas en documentos recuperados.' },
          { term: 'Human handoff', def: 'Derivación a una persona.' },
        ],
        simpleExample: 'Antes de enviar "Soy Ana, mi email es ana@mail.com y mi DNI 30111222", enviás "Soy [NOMBRE], mi email es [EMAIL] y mi DNI [DOC]".',
        realExample: 'Un asistente de soporte bancario responde preguntas generales con RAG, pero cualquier consulta sobre movimientos de cuenta se deriva a un agente autenticado; ningún dato de cuenta llega al modelo.',
        analogy: 'Desplegar IA sin evaluación ni controles es como abrir una sucursal sin capacitación ni supervisión: puede salir bien, pero no lo sabrás hasta que salga mal.',
        commonErrors: ['Enviar datos personales innecesarios al modelo.', 'No probar con preguntas fuera de la base.', 'Dar al modelo acceso a acciones sensibles.'],
        bestPractices: ['Métricas definidas antes de construir.', 'Enmascarar datos personales.', 'Derivación humana visible y fácil.'],
        summary: ['Arquitectura en capas.', 'Calidad se mide.', 'Privacidad y seguridad desde el diseño.'],
        comprehension: [{ q: '¿Qué es prompt injection indirecta y cómo la mitigás?', a: 'Instrucciones maliciosas dentro de documentos o webs que el sistema recupera. Se mitiga tratando ese contenido como datos, limitando permisos del modelo, validando salidas y requiriendo aprobación humana para acciones.' }],
        exercise: {
          statement: 'Completá enmascarar(texto) que reemplace emails por [EMAIL] y secuencias de 7 a 11 dígitos (documentos/teléfonos) por [NUM].',
          hints: ['Usá el módulo re.', 'Email simple: \\S+@\\S+\\.\\w+', 'Dígitos: \\b\\d{7,11}\\b'],
          solution: `import re\n\ndef enmascarar(texto):\n    texto = re.sub(r"\\S+@\\S+\\.\\w+", "[EMAIL]", texto)\n    texto = re.sub(r"\\b\\d{7,11}\\b", "[NUM]", texto)\n    return texto`,
          starter: `import re\n\ndef enmascarar(texto):\n    return texto`,
          tests: `assert enmascarar("Soy Ana, ana@mail.com, DNI 30111222") == "Soy Ana, [EMAIL], DNI [NUM]"\nassert enmascarar("Pedido 4521") == "Pedido 4521"`,
        },
      },
    ],
    resources: [
      { ref: 'streamlit', why: 'Tutorial "Build an LLM app" / chat elements para crear la interfaz del Proyecto 4.', minutes: 90 },
      { ref: 'anthropicdocs', why: 'Secciones sobre reducir alucinaciones y mitigar prompt injection / jailbreaks.', minutes: 60 },
      { ref: 'hflearn', why: 'Contenido sobre evaluación de modelos y sesgos (según disponibilidad).', minutes: 45 },
    ],
    coursera: [
      { courseId: 'c-ucsc-ethics', note: 'AI, Empathy & Ethics: complementa privacidad, sesgo y diseño responsable.' },
      { courseId: 'c-meta-genai-da', note: 'Opcional: aplicaciones de GenAI al análisis de datos.' },
    ],
    docs: [{ ref: 'chroma', why: 'Filtros por metadatos (para restringir qué se recupera).' }],
    exercises: [
      { id: 'w24e1', title: 'Set de evaluación', level: 'intermedia', kind: 'libre', statement: 'Armá 25 preguntas para tu asistente: 15 con respuesta en la base, 5 sin respuesta (debe derivar) y 5 con intentos de manipulación. Registrá el resultado esperado.', hints: ['Una planilla con columnas: pregunta, tipo, esperado, obtenido, ok.'] },
      { id: 'w24e2', title: 'Proyecto 4', level: 'avanzada', kind: 'libre', statement: 'Desarrollá el Proyecto 4 completo (ver Proyectos).', hints: ['Reutilizá el mini RAG de la semana 23.'] },
    ],
    challenge: {
      title: 'Asistente inteligente de soporte (proyecto de etapa)',
      context: 'Una tienda online quiere un asistente que responda preguntas frecuentes con su base de conocimiento y sepa cuándo derivar.',
      task: ['Base de conocimiento indexada (RAG).', 'Respuestas con cita de fuente.', 'Mensaje explícito cuando no hay información suficiente.', 'Derivación humana cuando corresponde (reclamos, datos de cuenta, enojo).', 'Evaluación con el set de 25 preguntas y README.'],
      deliverable: 'Proyecto 4 completo (ver checklist en Proyectos).',
    },
    deliverable: 'Proyecto 4 con evaluación documentada.',
    hours: HPROJ,
    passCriteria: ['Evaluación ≥ 80/100.', 'Proyecto 4 con todos los entregables obligatorios.', 'El asistente deriva correctamente las preguntas sin respuesta.'],
    questions: [
      mcq('q24-1', '¿Qué es la minimización de datos?', ['Comprimir archivos', 'Usar solo los datos personales imprescindibles', 'Borrar la base', 'Usar menos tokens'], 1, 'Principio de privacidad.', { concept: 'Privacidad' }),
      tf('q24-2', 'Un asistente que siempre responde algo, aunque no tenga información, genera más confianza.', false, 'Reconocer límites y derivar genera confianza y evita errores.', { concept: 'Evaluación de calidad' }),
      mcq('q24-3', 'Prompt injection indirecta ocurre cuando...', ['El usuario escribe en mayúsculas', 'Un documento recuperado contiene instrucciones maliciosas', 'Se usa temperatura alta', 'Falla la red'], 1, 'El contenido externo intenta dar órdenes.', { concept: 'Seguridad', d: 'intermedia' }),
      mcq('q24-4', '¿Qué métrica mide si la respuesta se basa en las fuentes?', ['Latencia', 'Fidelidad (faithfulness)', 'Costo', 'Tokens'], 1, 'Fidelidad a las fuentes.', { concept: 'Evaluación de calidad' }),
      tf('q24-5', 'Antes de usar un proveedor de IA conviene revisar su política de retención y uso de datos.', true, 'Afecta la privacidad de tus clientes.', { concept: 'Privacidad' }),
      mcq('q24-6', '¿Qué consulta debería derivarse a una persona?', ['¿Cuál es el horario?', '"Quiero ver los movimientos de mi cuenta y hacer un reclamo formal"', '¿Hacen envíos?', '¿Qué medios de pago aceptan?'], 1, 'Datos de cuenta y reclamos formales requieren autenticación y criterio humano.', { concept: 'Seguridad' }),
      mcq('q24-7', 'Un set de evaluación debería incluir...', ['Solo preguntas fáciles', 'Preguntas con respuesta, sin respuesta y de manipulación', 'Solo preguntas del desarrollador', 'Nada'], 1, 'Cubre el comportamiento esperado en todos los casos.', { concept: 'Evaluación de calidad', d: 'intermedia' }),
      tf('q24-8', 'Darle al modelo acceso directo para ejecutar reembolsos sin aprobación es una buena práctica de eficiencia.', false, 'Acciones sensibles requieren aprobación humana.', { concept: 'Seguridad' }),
      py('q24-9', 'Completá requiere_humano(texto) que devuelva True si el texto contiene alguna de: "reclamo formal", "abogado", "denuncia", "mi cuenta", "estafa" (sin distinguir mayúsculas).', `def requiere_humano(texto):\n    return False`, `assert requiere_humano("Voy a hacer una DENUNCIA")\nassert requiere_humano("Quiero ver mi cuenta")\nassert not requiere_humano("¿Cuánto tarda el envío?")`, `CLAVES = ["reclamo formal", "abogado", "denuncia", "mi cuenta", "estafa"]\n\ndef requiere_humano(texto):\n    t = texto.lower()\n    return any(c in t for c in CLAVES)`, 'Reglas simples complementan a la IA para decidir derivaciones.', { concept: 'Construcción de aplicaciones con IA', hints: ['any(...)', '.lower()'] }),
      mcq('q24-10', '¿Qué herramienta de Python permite crear rápidamente una interfaz web para una app de IA?', ['pytest', 'Streamlit', 'sqlite3', 'venv'], 1, 'Streamlit.', { concept: 'Construcción de aplicaciones con IA' }),
    ],
  },
];
