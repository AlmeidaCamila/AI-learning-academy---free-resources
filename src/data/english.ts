export interface VocabItem {
  en: string;
  es: string;
  example: string;
}

export interface EnglishModule {
  id: string;
  title: string;
  stage: number;
  goal: string;
  vocab: VocabItem[];
  reading: { title: string; text: string; note: string };
  questions: { q: string; a: string }[];
  phrases: { en: string; es: string }[];
}

/**
 * Textos de lectura redactados para esta plataforma imitando el estilo
 * de documentación técnica real (no son copias de documentación existente).
 */
export const ENGLISH: EnglishModule[] = [
  {
    id: 'en1',
    title: 'Programming vocabulary',
    stage: 1,
    goal: 'Leer mensajes de error y tutoriales básicos de Python.',
    vocab: [
      { en: 'variable', es: 'variable', example: 'Assign the result to a variable.' },
      { en: 'to assign', es: 'asignar', example: 'The value 5 is assigned to x.' },
      { en: 'loop', es: 'bucle', example: 'The loop runs ten times.' },
      { en: 'to iterate', es: 'iterar / recorrer', example: 'Iterate over the list of tickets.' },
      { en: 'function', es: 'función', example: 'This function returns the total.' },
      { en: 'argument', es: 'argumento', example: 'Pass the name as an argument.' },
      { en: 'to return', es: 'devolver', example: 'The function returns None by default.' },
      { en: 'string', es: 'cadena de texto', example: 'Strings are immutable in Python.' },
      { en: 'list', es: 'lista', example: 'Append the item to the list.' },
      { en: 'dictionary', es: 'diccionario', example: 'Use a dictionary to map keys to values.' },
      { en: 'error / exception', es: 'error / excepción', example: 'Handle the exception with try/except.' },
      { en: 'to raise', es: 'lanzar (una excepción)', example: 'Raise a ValueError if the input is invalid.' },
      { en: 'to run / to execute', es: 'ejecutar', example: 'Run the script from the terminal.' },
      { en: 'output', es: 'salida', example: 'The output is printed to the console.' },
      { en: 'indentation', es: 'sangría / indentación', example: 'Python uses indentation to define blocks.' },
    ],
    reading: {
      title: 'Reading an error message',
      text: 'When Python encounters an error, it stops the program and prints a traceback. The last line of the traceback tells you the type of error and a short description. For example, "TypeError: can only concatenate str (not \'int\') to str" means that you tried to join a string with an integer. To fix it, convert the integer to a string first, or use an f-string. The lines above show where the error happened, including the file name and line number.',
      note: 'Texto de práctica en estilo de documentación.',
    },
    questions: [
      { q: 'What does the last line of a traceback tell you?', a: 'The type of error and a short description.' },
      { q: '¿Cómo se soluciona el TypeError del ejemplo?', a: 'Convirtiendo el entero a string o usando una f-string.' },
    ],
    phrases: [
      { en: 'It throws an error when…', es: 'Da un error cuando…' },
      { en: 'I\'m getting a TypeError on line 12.', es: 'Me aparece un TypeError en la línea 12.' },
      { en: 'Could you take a look at my code?', es: '¿Podrías revisar mi código?' },
    ],
  },
  {
    id: 'en2',
    title: 'Reading documentation',
    stage: 1,
    goal: 'Entender la estructura típica de la documentación oficial.',
    vocab: [
      { en: 'getting started', es: 'primeros pasos', example: 'Read the Getting Started guide first.' },
      { en: 'requirements', es: 'requisitos', example: 'Python 3.10 or later is required.' },
      { en: 'to install', es: 'instalar', example: 'Install the package with pip.' },
      { en: 'deprecated', es: 'obsoleto (desaconsejado)', example: 'This method is deprecated and will be removed.' },
      { en: 'default', es: 'valor por defecto', example: 'The default timeout is 30 seconds.' },
      { en: 'optional / required', es: 'opcional / obligatorio', example: 'The name parameter is required.' },
      { en: 'returns', es: 'devuelve', example: 'Returns a list of strings.' },
      { en: 'raises', es: 'lanza', example: 'Raises KeyError if the key is missing.' },
      { en: 'see also', es: 'ver también', example: 'See also: the json module.' },
      { en: 'note / warning', es: 'nota / advertencia', example: 'Warning: this operation cannot be undone.' },
    ],
    reading: {
      title: 'A function reference entry',
      text: 'load_tickets(path, *, encoding="utf-8")\nReads a JSON file and returns a list of ticket dictionaries.\nParameters: path (str) – the location of the file. encoding (str, optional) – defaults to "utf-8".\nReturns: list[dict].\nRaises: FileNotFoundError if the file does not exist; ValueError if the content is not valid JSON.\nNote: tickets without an "id" field are skipped and a warning is logged.',
      note: 'Formato típico de una referencia de API.',
    },
    questions: [
      { q: 'Is the encoding parameter required?', a: 'No, it is optional and defaults to "utf-8".' },
      { q: '¿Qué pasa con los tickets sin "id"?', a: 'Se omiten y se registra una advertencia.' },
    ],
    phrases: [
      { en: 'According to the docs…', es: 'Según la documentación…' },
      { en: 'The docs say it defaults to…', es: 'La documentación dice que por defecto es…' },
    ],
  },
  {
    id: 'en3',
    title: 'APIs and HTTP',
    stage: 2,
    goal: 'Leer documentación de APIs REST.',
    vocab: [
      { en: 'endpoint', es: 'endpoint / punto de acceso', example: 'Send a GET request to the /orders endpoint.' },
      { en: 'request / response', es: 'solicitud / respuesta', example: 'The response body is JSON.' },
      { en: 'header', es: 'encabezado', example: 'Include your API key in the Authorization header.' },
      { en: 'payload / body', es: 'cuerpo / datos enviados', example: 'The payload must include an email.' },
      { en: 'query parameter', es: 'parámetro de consulta', example: 'Use the limit query parameter to paginate.' },
      { en: 'rate limit', es: 'límite de solicitudes', example: 'You will receive a 429 if you exceed the rate limit.' },
      { en: 'to authenticate', es: 'autenticarse', example: 'Authenticate using a bearer token.' },
      { en: 'pagination', es: 'paginación', example: 'Results are paginated with a cursor.' },
      { en: 'status code', es: 'código de estado', example: 'A 201 status code means the resource was created.' },
      { en: 'to retry', es: 'reintentar', example: 'Retry with exponential backoff.' },
    ],
    reading: {
      title: 'Create an order',
      text: 'POST /v1/orders\nCreates a new order. The request body must be a JSON object containing customer_id and items. Each item requires a product_id and a quantity greater than zero.\nIf the request succeeds, the API returns 201 Created and the new order. If a field is missing, it returns 400 Bad Request with a list of errors. Requests are limited to 100 per minute; when the limit is exceeded, the API returns 429 and a Retry-After header indicating how many seconds to wait.',
      note: 'Texto de práctica en estilo de documentación de API.',
    },
    questions: [
      { q: 'What status code means the order was created?', a: '201 Created.' },
      { q: '¿Qué indica el header Retry-After?', a: 'Cuántos segundos esperar antes de reintentar.' },
    ],
    phrases: [
      { en: 'The endpoint returns a 404 when…', es: 'El endpoint devuelve 404 cuando…' },
      { en: 'We\'re hitting the rate limit.', es: 'Estamos alcanzando el límite de solicitudes.' },
    ],
  },
  {
    id: 'en4',
    title: 'Automation vocabulary',
    stage: 3,
    goal: 'Comunicar el diseño de workflows en inglés.',
    vocab: [
      { en: 'workflow', es: 'flujo de trabajo', example: 'The workflow runs every morning at 8 AM.' },
      { en: 'trigger', es: 'disparador', example: 'A new form submission triggers the workflow.' },
      { en: 'node', es: 'nodo', example: 'Add an IF node to check the priority.' },
      { en: 'branch', es: 'rama', example: 'Invalid records go to the error branch.' },
      { en: 'to map fields', es: 'mapear campos', example: 'Map the email field to the contact column.' },
      { en: 'scheduled', es: 'programado', example: 'It is a scheduled job.' },
      { en: 'to fail / failure', es: 'fallar / falla', example: 'The HTTP node failed with a timeout.' },
      { en: 'fallback', es: 'alternativa / plan B', example: 'Use a fallback when the API is down.' },
      { en: 'idempotent', es: 'idempotente', example: 'Make the update idempotent to avoid duplicates.' },
      { en: 'to notify', es: 'notificar', example: 'Notify the billing team on Slack.' },
    ],
    reading: {
      title: 'Workflow description (README)',
      text: 'This workflow receives customer inquiries through a webhook, validates the payload, and classifies each request into billing, shipping, or account issues. High-priority requests are posted to the team channel immediately. All requests are stored in the support database. If any step fails, the error workflow sends an alert with the execution ID so the issue can be investigated.',
      note: 'Ejemplo de descripción para tus README.',
    },
    questions: [
      { q: 'What happens when a step fails?', a: 'The error workflow sends an alert with the execution ID.' },
      { q: '¿Dónde se guardan todas las solicitudes?', a: 'En la base de datos de soporte.' },
    ],
    phrases: [
      { en: 'This workflow is triggered by…', es: 'Este workflow se dispara con…' },
      { en: 'It saves around X hours per week (in our test scenario).', es: 'Ahorra unas X horas semanales (en nuestro escenario de prueba).' },
    ],
  },
  {
    id: 'en5',
    title: 'AI terminology',
    stage: 4,
    goal: 'Entender documentación y conversaciones sobre LLMs y RAG.',
    vocab: [
      { en: 'large language model (LLM)', es: 'modelo de lenguaje grande', example: 'The LLM generates a draft reply.' },
      { en: 'prompt', es: 'instrucción / prompt', example: 'Refine the prompt with examples.' },
      { en: 'context window', es: 'ventana de contexto', example: 'The document does not fit in the context window.' },
      { en: 'hallucination', es: 'alucinación', example: 'Ground the answer in sources to reduce hallucinations.' },
      { en: 'embedding', es: 'embedding / vector semántico', example: 'Store the embeddings in a vector database.' },
      { en: 'retrieval', es: 'recuperación', example: 'Retrieval quality matters more than the model.' },
      { en: 'grounded', es: 'basado en fuentes', example: 'Answers must be grounded in the knowledge base.' },
      { en: 'to fine-tune', es: 'ajustar (un modelo)', example: 'We don\'t need to fine-tune; RAG is enough.' },
      { en: 'evaluation set', es: 'conjunto de evaluación', example: 'Run the prompt against the evaluation set.' },
      { en: 'guardrail', es: 'salvaguarda / límite', example: 'Add guardrails to block sensitive actions.' },
    ],
    reading: {
      title: 'Reducing hallucinations',
      text: 'Language models can produce answers that sound confident but are not supported by facts. To reduce this risk, provide the relevant documents in the prompt and instruct the model to answer only using that information. Ask the model to say "I don\'t know" when the documents do not contain the answer, and to quote the passage it relied on. Finally, evaluate the system with questions whose correct answers you already know, including questions that should not be answered.',
      note: 'Texto de práctica en estilo de guía técnica.',
    },
    questions: [
      { q: 'Name two techniques to reduce hallucinations.', a: 'Provide relevant documents in the prompt; instruct the model to say "I don\'t know"; ask for quotes; evaluate with known answers.' },
      { q: '¿Por qué incluir preguntas que no deberían responderse en la evaluación?', a: 'Para verificar que el sistema reconoce cuándo no tiene información.' },
    ],
    phrases: [
      { en: 'The model tends to hallucinate when…', es: 'El modelo tiende a alucinar cuando…' },
      { en: 'We measured 90% accuracy on our evaluation set.', es: 'Medimos 90% de acierto en nuestro set de evaluación.' },
    ],
  },
  {
    id: 'en6',
    title: 'GitHub and collaboration',
    stage: 6,
    goal: 'Colaborar en repositorios y escribir PRs e issues.',
    vocab: [
      { en: 'repository (repo)', es: 'repositorio', example: 'Clone the repo and install dependencies.' },
      { en: 'commit', es: 'commit / confirmación', example: 'Write a clear commit message.' },
      { en: 'branch', es: 'rama', example: 'Create a feature branch.' },
      { en: 'pull request (PR)', es: 'solicitud de integración', example: 'Open a PR for review.' },
      { en: 'to merge', es: 'fusionar', example: 'Merge the PR after approval.' },
      { en: 'issue', es: 'incidencia / tarea', example: 'Open an issue to report the bug.' },
      { en: 'to review', es: 'revisar', example: 'Could you review my PR?' },
      { en: 'conflict', es: 'conflicto', example: 'Resolve the merge conflict.' },
      { en: 'to deploy', es: 'desplegar', example: 'Deploy to production after tests pass.' },
      { en: 'README', es: 'archivo de presentación del repo', example: 'Update the README with setup steps.' },
    ],
    reading: {
      title: 'Pull request description',
      text: 'Summary: Adds retry logic with exponential backoff to the order sync step.\nWhy: The shipping API returns intermittent 503 errors, which caused about 2% of syncs to fail.\nHow: Requests are retried up to three times (1 s, 2 s, 4 s). Client errors (4xx) are not retried and are sent to the review queue.\nTesting: Added unit tests that simulate 503 and 400 responses.',
      note: 'Estructura recomendada para tus PRs.',
    },
    questions: [
      { q: 'Why are 4xx errors not retried?', a: 'Because they are client errors (bad data); retrying won\'t fix them.' },
      { q: '¿Qué secciones tiene la descripción del PR?', a: 'Summary, Why, How, Testing.' },
    ],
    phrases: [
      { en: 'This PR fixes…', es: 'Este PR corrige…' },
      { en: 'Could you take another look?', es: '¿Podrías revisarlo de nuevo?' },
    ],
  },
  {
    id: 'en7',
    title: 'Job interviews',
    stage: 6,
    goal: 'Responder preguntas frecuentes de entrevistas en inglés.',
    vocab: [
      { en: 'background', es: 'trayectoria / formación', example: 'My background is in customer operations.' },
      { en: 'to be in charge of', es: 'estar a cargo de', example: 'I was in charge of the support queue.' },
      { en: 'achievement', es: 'logro', example: 'My main achievement was…' },
      { en: 'challenge', es: 'desafío', example: 'The biggest challenge was data quality.' },
      { en: 'trade-off', es: 'compromiso / costo-beneficio', example: 'There was a trade-off between cost and accuracy.' },
      { en: 'to scale', es: 'escalar', example: 'How would this solution scale?' },
      { en: 'stakeholder', es: 'parte interesada', example: 'I gathered requirements from stakeholders.' },
      { en: 'time zone', es: 'zona horaria', example: 'I can overlap 4 hours with EST.' },
      { en: 'notice period', es: 'período de preaviso', example: 'My notice period is two weeks.' },
      { en: 'salary expectations', es: 'expectativas salariales', example: 'What are your salary expectations?' },
    ],
    reading: {
      title: 'Answering "Tell me about yourself"',
      text: 'I started my career in customer operations, where I saw how much time teams spent on repetitive tasks. Over the past nine months I trained intensively in Python, SQL, APIs, workflow automation with n8n, and generative AI. I built six projects, including a support assistant that answers questions from a knowledge base and escalates to a human when needed. I\'m now looking for a junior automation role where I can combine my business understanding with these technical skills.',
      note: 'Modelo para adaptar con tu historia real.',
    },
    questions: [
      { q: 'What is the structure of the answer?', a: 'Past (background) → present (training and projects) → future (role sought).' },
      { q: '¿Por qué menciona su experiencia previa?', a: 'Porque aporta conocimiento del negocio que complementa las habilidades técnicas.' },
    ],
    phrases: [
      { en: 'That\'s a great question. Let me think for a moment.', es: 'Buena pregunta. Dejame pensar un momento.' },
      { en: 'I haven\'t worked with that yet, but here\'s how I would approach it…', es: 'Todavía no trabajé con eso, pero así lo abordaría…' },
      { en: 'Could you clarify what you mean by…?', es: '¿Podrías aclarar a qué te referís con…?' },
    ],
  },
  {
    id: 'en8',
    title: 'Professional communication',
    stage: 6,
    goal: 'Comunicarte por escrito con un equipo internacional.',
    vocab: [
      { en: 'heads-up', es: 'aviso', example: 'Quick heads-up: the deploy is at 3 PM.' },
      { en: 'blocker', es: 'impedimento', example: 'I have a blocker: I need API access.' },
      { en: 'update', es: 'actualización / novedad', example: 'Here\'s a quick update on the project.' },
      { en: 'ETA', es: 'tiempo estimado', example: 'ETA for the fix is tomorrow.' },
      { en: 'to follow up', es: 'hacer seguimiento', example: 'I\'ll follow up after the meeting.' },
      { en: 'to sync', es: 'coordinar / reunirse', example: 'Can we sync tomorrow?' },
      { en: 'async', es: 'asíncrono', example: 'Let\'s handle this async.' },
      { en: 'action items', es: 'tareas acordadas', example: 'Here are the action items from today.' },
    ],
    reading: {
      title: 'Daily async update',
      text: 'Yesterday: finished the classification step and added tests.\nToday: working on the error workflow and the Slack alerts.\nBlockers: I need read access to the orders database to test with realistic data. Could someone grant it?',
      note: 'Formato de "standup" asíncrono.',
    },
    questions: [
      { q: 'What is the blocker?', a: 'Read access to the orders database.' },
      { q: '¿Qué tres partes tiene el update?', a: 'Yesterday, Today, Blockers.' },
    ],
    phrases: [
      { en: 'Just to confirm, …', es: 'Solo para confirmar, …' },
      { en: 'Let me know if you have any questions.', es: 'Avisame si tenés preguntas.' },
      { en: 'Sorry for the delay.', es: 'Perdón por la demora.' },
    ],
  },
];
