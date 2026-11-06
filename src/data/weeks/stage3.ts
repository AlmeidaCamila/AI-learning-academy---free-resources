import type { Week } from '../../types';
import { H12, HPROJ, mcq, py, short, tf } from './helpers';

const N8N_NOTE =
  'n8n Cloud ofrece una prueba gratuita limitada y luego es pago. Para practicar sin costo instalá la versión self-hosted: con Node.js instalado, ejecutá "npx n8n" y abrí http://localhost:5678 (o usá Docker). Tus workflows quedan en tu computadora.';

export const STAGE3: Week[] = [
  // ───────────────────────────── SEMANA 13 ─────────────────────────────
  {
    n: 13,
    stage: 3,
    title: 'Pensar en procesos: qué y cómo automatizar',
    objective: 'Analizar procesos de negocio, identificar qué conviene automatizar y modelarlos con diagramas de flujo en términos de triggers, acciones y workflows.',
    topics: ['Qué es automatizar', 'Procesos manuales y automatizados', 'Diagramas de flujo', 'Triggers', 'Actions', 'Workflows'],
    review: 'Repaso semanas 2 y 12: las decisiones (if) y las APIs son los ladrillos de cualquier automatización.',
    lessons: [
      {
        id: 'w13l1',
        title: 'Del proceso manual al workflow',
        minutes: 80,
        sections: [
          {
            heading: '1. Qué significa automatizar',
            body: [
              'Automatizar es hacer que un sistema ejecute pasos de un proceso que antes hacía una persona, de forma confiable y repetible. No es "reemplazar personas", es liberar tiempo de tareas repetitivas para que se dediquen a lo que requiere criterio.',
              'Un AI Automation Specialist combina automatización clásica (reglas, integraciones) con IA (clasificar, resumir, extraer información de textos).',
            ],
          },
          {
            heading: '2. Qué conviene automatizar',
            body: [
              'Buenas candidatas: tareas frecuentes, repetitivas, basadas en reglas claras, con datos digitales y con errores costosos si se hacen a mano (copiar datos entre sistemas, enviar notificaciones, generar reportes).',
              'Malas candidatas: tareas raras, que cambian todo el tiempo, que requieren juicio humano delicado (despidos, diagnósticos) o cuyo proceso todavía no está definido. Automatizar un proceso desordenado solo produce desorden más rápido.',
              'Fórmula rápida de valor: (minutos por ejecución × ejecuciones por mes) − costo de mantener la automatización.',
            ],
          },
          {
            heading: '3. Triggers, actions y workflows',
            body: [
              'Trigger (disparador): evento que inicia la automatización. Ejemplos: llega un email, se envía un formulario, son las 9:00 (schedule), un sistema llama a un webhook.',
              'Action (acción): cada paso que se ejecuta: leer datos, transformarlos, decidir, escribir en otro sistema, notificar.',
              'Workflow: la secuencia completa trigger → acciones, incluyendo decisiones y manejo de errores.',
            ],
          },
          {
            heading: '4. Diagramas de flujo',
            body: [
              'Símbolos básicos: óvalo (inicio/fin), rectángulo (acción), rombo (decisión), paralelogramo (entrada/salida de datos). Las flechas indican el orden.',
              'Mapeá primero el proceso actual (as-is) con quién hace qué, y luego el proceso automatizado (to-be). Marcá dónde intervienen personas.',
            ],
            code: { lang: 'text', code: `[Inicio: llega formulario]\n        ↓\n[Extraer nombre, email, mensaje]\n        ↓\n<¿Mensaje menciona "factura"?> —sí→ [Asignar a Facturación]\n        │no\n        ↓\n[Asignar a Soporte general]\n        ↓\n[Registrar en planilla] → [Enviar confirmación al cliente] → [Fin]` },
          },
        ],
        keyConcepts: [
          { term: 'Proceso', def: 'Serie de pasos que transforma entradas en un resultado.' },
          { term: 'Trigger', def: 'Evento que inicia un workflow.' },
          { term: 'Action', def: 'Paso ejecutado dentro del workflow.' },
          { term: 'Workflow', def: 'Secuencia completa de trigger, acciones y decisiones.' },
          { term: 'As-is / To-be', def: 'Proceso actual / proceso futuro diseñado.' },
          { term: 'Human-in-the-loop', def: 'Punto del flujo donde una persona revisa o aprueba.' },
        ],
        simpleExample: 'Trigger: llega un email con adjunto → Acción: guardar el adjunto en Google Drive → Acción: avisar por Slack.',
        realExample: 'Una agencia inmobiliaria recibe consultas por web, WhatsApp y email. Las copiaban a mano a un Excel (≈ 6 h/semana). Un workflow centraliza las tres fuentes, clasifica por zona y presupuesto, y asigna automáticamente al agente correspondiente.',
        analogy: 'Un workflow es como una línea de producción: algo entra (trigger), pasa por estaciones (acciones) y sale terminado, con controles de calidad en el medio.',
        commonErrors: ['Automatizar sin entender el proceso actual.', 'No contemplar qué pasa cuando los datos vienen incompletos.', 'Eliminar la revisión humana en decisiones sensibles.'],
        bestPractices: ['Mapear as-is antes de diseñar to-be.', 'Empezar por el caso más frecuente y simple.', 'Medir el tiempo ahorrado.'],
        summary: ['Automatizar = sistemas que ejecutan pasos repetibles.', 'Trigger + acciones = workflow.', 'Diagramar antes de construir.'],
        comprehension: [
          { q: 'Nombrá 3 tipos de triggers.', a: 'Programado (schedule/cron), webhook (otro sistema llama una URL), evento de una app (nuevo email, nueva fila en una planilla, formulario enviado).' },
          { q: '¿Por qué automatizar un proceso desordenado es mala idea?', a: 'Porque reproduce y acelera los errores; primero hay que definir y simplificar el proceso.' },
        ],
        exercise: {
          statement: 'Elegí un proceso real (tuyo o de una empresa conocida) y entregá: descripción as-is (quién, qué, cuánto tiempo), diagrama to-be con trigger, acciones, decisiones y punto de revisión humana, y estimación de horas ahorradas por mes.',
          hints: ['Contá las ejecuciones por semana.', 'Marcá con un color los pasos que siguen siendo humanos.'],
          solution: 'Respuesta abierta. Debe incluir trigger explícito, al menos una decisión (rombo), manejo del caso "datos incompletos" y un cálculo de tiempo ahorrado.',
        },
      },
    ],
    resources: [
      { ref: 'zapier', why: 'Artículos introductorios sobre automatización de procesos de negocio y casos de uso.', minutes: 60 },
      { ref: 'make', why: 'Curso inicial de Make Academy: conceptos de escenarios, triggers y módulos (para comparar con n8n).', minutes: 90 },
      { ref: 'n8nacademy', why: 'Mirá la presentación del curso de nivel 1 para conocer la herramienta que usarás la próxima semana.', minutes: 30 },
    ],
    coursera: [{ courseId: 'c-tue-pm', note: 'Opcional: semana 1 de "Process Mining" para ver cómo se descubren procesos a partir de datos.' }],
    docs: [{ ref: 'n8ndocs', why: 'Leé "Understand workflows" y el glosario.' }],
    exercises: [
      { id: 'w13e1', title: 'Inventario de tareas', level: 'basica', kind: 'libre', statement: 'Listá 10 tareas repetitivas (tuyas o de un trabajo anterior) y puntuá cada una de 1 a 5 en frecuencia, reglas claras y datos digitales. Elegí las 3 mejores candidatas.', hints: ['Una planilla con columnas para cada criterio.'] },
      { id: 'w13e2', title: 'Diagrama as-is / to-be', level: 'intermedia', kind: 'libre', statement: 'Diagramá en draw.io el proceso de atención de consultas de clientes: as-is (manual) y to-be (automatizado).', hints: ['Incluí un rombo de decisión por categoría.'] },
      { id: 'w13e3', title: 'Simular un trigger', level: 'intermedia', kind: 'python', statement: 'Escribí procesar_evento(evento) que reciba un dict {"tipo": ..., "datos": {...}} y devuelva la lista de acciones a ejecutar: "nuevo_formulario" → ["registrar", "confirmar_cliente"]; "pago_fallido" → ["notificar_finanzas"]; otro → ["revisar_manual"].', hints: ['Un diccionario de reglas tipo → acciones.', '.get(tipo, valor_por_defecto)'], solution: `REGLAS = {\n    "nuevo_formulario": ["registrar", "confirmar_cliente"],\n    "pago_fallido": ["notificar_finanzas"],\n}\n\ndef procesar_evento(evento):\n    return REGLAS.get(evento.get("tipo"), ["revisar_manual"])`, starter: `def procesar_evento(evento):\n    return []`, tests: `assert procesar_evento({"tipo":"nuevo_formulario","datos":{}}) == ["registrar","confirmar_cliente"]\nassert procesar_evento({"tipo":"x"}) == ["revisar_manual"]\nassert procesar_evento({}) == ["revisar_manual"]` },
    ],
    challenge: {
      title: 'Propuesta de automatización para una clínica',
      context: 'Una clínica pequeña confirma turnos llamando por teléfono a cada paciente el día anterior (2 h diarias) y tiene 15% de ausentismo.',
      task: ['Mapeá el proceso actual.', 'Diseñá un workflow to-be: trigger programado, lectura de turnos, mensaje de confirmación, registro de respuesta, escalamiento humano.', 'Indicá riesgos (datos sensibles de salud) y cómo mitigarlos.', 'Estimá horas ahorradas y el impacto esperado en ausentismo (como hipótesis a medir, no como promesa).'],
      deliverable: 'Documento de 1–2 páginas con diagramas.',
    },
    deliverable: 'Inventario de tareas + diagramas + propuesta para la clínica.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Diagrama to-be con trigger, decisión y punto humano.', 'Justificar qué NO conviene automatizar.'],
    questions: [
      mcq('q13-1', '¿Qué es un trigger?', ['Un paso final', 'El evento que inicia un workflow', 'Un error', 'Una base de datos'], 1, 'Inicia la ejecución.', { concept: 'Triggers' }),
      mcq('q13-2', '¿Cuál es la mejor candidata para automatizar?', ['Negociar un contrato', 'Copiar datos de formularios a una planilla 50 veces por día', 'Diseñar la estrategia anual', 'Entrevistar candidatos'], 1, 'Frecuente, repetitiva y con reglas claras.', { concept: 'Qué es automatizar' }),
      tf('q13-3', 'Conviene automatizar un proceso aunque todavía no esté definido, para ordenarlo.', false, 'Primero se define y simplifica el proceso.', { concept: 'Procesos manuales y automatizados' }),
      mcq('q13-4', 'En un diagrama de flujo, el rombo representa...', ['Inicio', 'Acción', 'Decisión', 'Base de datos'], 2, 'Rombo = decisión (sí/no).', { concept: 'Diagramas de flujo' }),
      mcq('q13-5', '"Todos los días a las 8:00" es un trigger de tipo...', ['Webhook', 'Programado (schedule)', 'Manual', 'Error'], 1, 'Se ejecuta en un horario.', { concept: 'Triggers' }),
      tf('q13-6', 'Human-in-the-loop significa incluir revisión o aprobación de una persona en puntos clave del flujo.', true, 'Fundamental en decisiones sensibles.', { concept: 'Workflows' }),
      mcq('q13-7', 'Una tarea tarda 5 minutos y se hace 400 veces por mes. ¿Cuántas horas mensuales se podrían ahorrar como máximo?', ['20 h', '33,3 h', '50 h', '8 h'], 1, '5 × 400 = 2000 min ≈ 33,3 h.', { concept: 'Qué es automatizar', d: 'intermedia' }),
      mcq('q13-8', '¿Qué describe el diagrama as-is?', ['El proceso ideal', 'El proceso actual', 'El código', 'El costo'], 1, 'As-is = como es hoy.', { concept: 'Diagramas de flujo' }),
      py('q13-9', 'Completá vale_la_pena(min_por_ejecucion, ejecuciones_mes, horas_mantenimiento_mes) que devuelva True si las horas ahorradas superan al doble de las horas de mantenimiento.', `def vale_la_pena(min_por_ejecucion, ejecuciones_mes, horas_mantenimiento_mes):\n    return False`, `assert vale_la_pena(5, 400, 5) is True\nassert vale_la_pena(2, 30, 1) is False\nassert vale_la_pena(6, 100, 5) is False`, `def vale_la_pena(min_por_ejecucion, ejecuciones_mes, horas_mantenimiento_mes):\n    ahorro = min_por_ejecucion * ejecuciones_mes / 60\n    return ahorro > 2 * horas_mantenimiento_mes`, 'Cuantificar el valor es parte del trabajo de automatización.', { concept: 'Qué es automatizar', hints: ['Pasá minutos a horas dividiendo por 60.'] }),
      short('q13-10', '¿Cómo se llama en inglés cada paso que ejecuta un workflow?', ['action', 'actions', 'acción'], 'Actions.', { concept: 'Actions' }),
    ],
  },

  // ───────────────────────────── SEMANA 14 ─────────────────────────────
  {
    n: 14,
    stage: 3,
    title: 'Introducción a n8n',
    objective: 'Instalar o acceder a n8n, dominar su interfaz y construir tus primeros workflows entendiendo nodos, conexiones, datos (items) y ejecuciones.',
    topics: ['Introducción a n8n', 'Instalación o acceso', 'Interfaz', 'Nodos', 'Conexiones', 'Ejecuciones'],
    review: 'Repaso semana 5: los datos en n8n son listas de objetos JSON (como listas de diccionarios).',
    lessons: [
      {
        id: 'w14l1',
        title: 'n8n desde cero',
        minutes: 90,
        sections: [
          {
            heading: '1. Qué es n8n y cómo acceder gratis',
            body: [
              'n8n es una herramienta de automatización visual con licencia "fair-code": podés autoalojarla gratis. Permite conectar cientos de apps y también escribir código (JavaScript o Python) cuando hace falta.',
              N8N_NOTE,
            ],
            code: { lang: 'bash', code: `# Requiere Node.js 18 o superior\nnpx n8n\n# Luego abrí http://localhost:5678 y creá tu usuario local` },
          },
          {
            heading: '2. La interfaz',
            body: ['Canvas: donde arrastrás y conectás nodos. Panel del nodo: parámetros, a la izquierda los datos de entrada y a la derecha los de salida. Botón "Test workflow" ejecuta manualmente. Pestaña "Executions": historial de ejecuciones con sus datos y errores. Interruptor "Active": activa el workflow para que corra solo con su trigger.'],
          },
          {
            heading: '3. Nodos y conexiones',
            body: [
              'Cada nodo hace una cosa: trigger nodes (Manual, Schedule, Webhook, Gmail Trigger) y action nodes (HTTP Request, Google Sheets, Edit Fields/Set, IF, Code).',
              'Las conexiones pasan datos de un nodo al siguiente.',
            ],
          },
          {
            heading: '4. Items: cómo viajan los datos',
            body: [
              'En n8n los datos viajan como una lista de items; cada item es un objeto JSON. Si un nodo recibe 5 items, normalmente se ejecuta 5 veces (una por item).',
              'Es exactamente la lista de diccionarios que usaste en Python. Si entendiste eso, entendiste n8n.',
            ],
            code: { lang: 'json', code: `[\n  { "json": { "id": 1, "cliente": "Ana", "motivo": "acceso" } },\n  { "json": { "id": 2, "cliente": "Bruno", "motivo": "factura" } }\n]` },
          },
          {
            heading: '5. Primer workflow',
            body: ['Manual Trigger → HTTP Request (GET a una API pública) → Edit Fields (quedarte solo con los campos útiles) → ver el resultado. Después reemplazá el Manual Trigger por un Schedule Trigger.'],
          },
        ],
        keyConcepts: [
          { term: 'Nodo', def: 'Bloque que realiza una operación en el workflow.' },
          { term: 'Item', def: 'Unidad de datos (objeto JSON) que viaja entre nodos.' },
          { term: 'Ejecución', def: 'Corrida del workflow, guardada con sus datos.' },
          { term: 'Credential', def: 'Credenciales guardadas de forma segura para conectar apps.' },
          { term: 'Self-hosted', def: 'Instalado en tu propia computadora o servidor.' },
        ],
        simpleExample: 'Schedule Trigger (cada día 9:00) → HTTP Request (clima) → mostrar temperatura.',
        realExample: 'Cada mañana un workflow consulta la API de la tienda online, filtra pedidos sin despachar con más de 48 h y avisa al equipo de logística.',
        analogy: 'n8n es como un tablero de LEGO de integraciones: cada pieza (nodo) encaja con otras y los datos fluyen por las conexiones.',
        commonErrors: ['Olvidar activar el workflow (solo funciona en modo test).', 'No mirar la pestaña de datos de entrada/salida del nodo.', 'Confundir 1 item con 1 lista dentro de un item.'],
        bestPractices: ['Renombrá cada nodo con lo que hace ("Obtener pedidos").', 'Usá "Pin data" para probar sin llamar a la API cada vez.', 'Revisá Executions cuando algo falla.'],
        summary: ['n8n self-hosted es gratis.', 'Datos = lista de items JSON.', 'Nodos trigger y de acción.'],
        comprehension: [{ q: 'Si un nodo HTTP Request devuelve 10 items y el siguiente es Google Sheets "Append row", ¿cuántas filas se agregan?', a: '10, porque el nodo procesa cada item.' }],
        exercise: {
          statement: 'Instalá n8n localmente y construí: Manual Trigger → HTTP Request a https://api.github.com/users/octocat → Edit Fields con solo login, name y public_repos. Exportá el workflow (menú ⋯ → Download) y guardalo.',
          hints: ['En Edit Fields usá "Keep only set fields".', 'Arrastrá campos desde el panel de entrada.'],
          solution: 'El JSON exportado debe tener 3 nodos conectados y la salida de Edit Fields con exactamente 3 campos.',
        },
      },
    ],
    resources: [
      { ref: 'n8nacademy', why: 'Curso nivel 1 (Beginner), primeras lecciones.', minutes: 150 },
      { ref: 'n8ndocs', why: 'Quickstarts: "A very quick quickstart" y "Data structure".', minutes: 60 },
    ],
    docs: [{ ref: 'n8ndocs', why: 'Sección "Hosting → Installation → npm" o "Docker".' }],
    exercises: [
      { id: 'w14e1', title: 'Instalación', level: 'basica', kind: 'libre', statement: 'n8n corriendo en localhost:5678. Captura de la pantalla de inicio.', hints: ['Si npx falla, instalá Node.js LTS desde nodejs.org.'] },
      { id: 'w14e2', title: 'Workflow programado', level: 'intermedia', kind: 'libre', statement: 'Schedule Trigger cada hora → HTTP Request a una API pública → Edit Fields. Activalo y revisá 2 ejecuciones en Executions.', hints: ['La computadora debe estar encendida con n8n corriendo.'] },
      { id: 'w14e3', title: 'Pensar en items', level: 'intermedia', kind: 'python', statement: 'Simulá lo que hace "Edit Fields → Keep only set fields": mantener_campos(items, campos) recibe una lista de dicts y devuelve una lista con solo esas claves.', hints: ['Comprensión de diccionarios: {k: item[k] for k in campos if k in item}'], solution: `def mantener_campos(items, campos):\n    return [{k: it[k] for k in campos if k in it} for it in items]`, starter: `def mantener_campos(items, campos):\n    return items`, tests: `items=[{"a":1,"b":2,"c":3},{"a":4,"c":6}]\nassert mantener_campos(items,["a","c"]) == [{"a":1,"c":3},{"a":4,"c":6}]` },
    ],
    challenge: {
      title: 'Alerta diaria de tipo de cambio',
      context: 'Un área de compras necesita saber cada mañana el tipo de cambio para decidir pagos a proveedores del exterior.',
      task: ['Buscá una API pública gratuita de tipo de cambio que no requiera pago (verificá sus términos).', 'Workflow: Schedule 8:00 → HTTP Request → Edit Fields → (por ahora) dejar el resultado visible en la ejecución.', 'Documentá qué hace cada nodo.'],
      deliverable: 'Workflow exportado (.json) + captura de una ejecución exitosa.',
    },
    deliverable: 'n8n instalado + 2 workflows exportados.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'n8n funcionando localmente.', 'Explicar qué es un item y cómo afecta la ejecución.'],
    questions: [
      mcq('q14-1', 'En n8n, ¿en qué forma viajan los datos entre nodos?', ['Como un único texto', 'Como una lista de items JSON', 'Como archivos CSV', 'Como tablas SQL'], 1, 'Cada item es un objeto JSON.', { concept: 'Nodos' }),
      tf('q14-2', 'n8n self-hosted (Community Edition) puede usarse sin pagar.', true, 'Se instala localmente con npx o Docker.', { concept: 'Instalación o acceso' }),
      mcq('q14-3', '¿Dónde ves el historial de corridas y sus errores?', ['Credentials', 'Executions', 'Templates', 'Settings'], 1, 'La pestaña Executions guarda cada ejecución.', { concept: 'Ejecuciones' }),
      tf('q14-4', 'Un workflow con Schedule Trigger corre automáticamente aunque no esté activado.', false, 'Debe estar activo (y n8n corriendo).', { concept: 'Ejecuciones' }),
      mcq('q14-5', 'Si un nodo recibe 3 items, en general...', ['Se ejecuta 1 vez con el primero', 'Se ejecuta para cada item', 'Da error', 'Une los items'], 1, 'n8n procesa item por item.', { concept: 'Nodos', d: 'intermedia' }),
      mcq('q14-6', '¿Qué nodo usarías para llamar una API sin integración nativa?', ['IF', 'HTTP Request', 'Wait', 'Merge'], 1, 'HTTP Request permite llamar cualquier API.', { concept: 'Nodos' }),
      mcq('q14-7', '¿Para qué sirve "Pin data"?', ['Para borrar datos', 'Para fijar datos de un nodo y probar sin volver a ejecutarlo', 'Para encriptar', 'Para publicar'], 1, 'Ahorra llamadas y acelera las pruebas.', { concept: 'Interfaz', d: 'intermedia' }),
      tf('q14-8', 'Las credenciales en n8n se guardan en un sistema de credenciales separado y no deberían escribirse en parámetros de texto.', true, 'Así no quedan expuestas al exportar el workflow.', { concept: 'Interfaz', d: 'intermedia' }),
      mcq('q14-9', 'Para ejecutar n8n con npx necesitás tener instalado...', ['Python', 'Node.js', 'Java', 'PostgreSQL'], 1, 'n8n está hecho en Node.js.', { concept: 'Instalación o acceso' }),
      short('q14-10', '¿En qué puerto local corre n8n por defecto? (número)', ['5678'], 'http://localhost:5678', { concept: 'Instalación o acceso' }),
    ],
  },

  // ───────────────────────────── SEMANA 15 ─────────────────────────────
  {
    n: 15,
    stage: 3,
    title: 'Webhooks, formularios, Google Sheets y datos',
    objective: 'Recibir datos de otros sistemas mediante webhooks y formularios, transformarlos y guardarlos en Google Sheets u otras herramientas.',
    topics: ['Webhooks', 'Integraciones', 'APIs', 'Formularios', 'Google Sheets', 'Manejo de datos'],
    review: 'Repaso semana 12: un webhook es una API que vos exponés para que otros te llamen.',
    lessons: [
      {
        id: 'w15l1',
        title: 'Webhooks y flujo de datos entre apps',
        minutes: 80,
        sections: [
          {
            heading: '1. Qué es un webhook',
            body: [
              'Con una API vos preguntás ("¿hay pedidos nuevos?"). Con un webhook, el otro sistema te avisa ("hay un pedido nuevo, acá están los datos") haciendo un POST a una URL tuya. Es más eficiente que consultar cada X minutos (polling).',
              'En n8n, el nodo Webhook genera una URL de test y una de producción. Cuando alguien envía un POST a esa URL, el workflow se dispara con el body como item.',
            ],
          },
          {
            heading: '2. Probar webhooks localmente',
            body: [
              'Desde tu computadora podés enviar un POST de prueba a tu webhook con Postman, curl o Python.',
              'Para que un servicio externo (en internet) llegue a tu n8n local necesitás un túnel (n8n start --tunnel solo para pruebas) o un servidor. Para aprender, alcanza con enviar requests vos misma.',
            ],
            code: { lang: 'bash', code: `curl -X POST http://localhost:5678/webhook-test/consultas \\\n  -H "Content-Type: application/json" \\\n  -d '{"nombre":"Ana","email":"ana@mail.com","mensaje":"No puedo ingresar"}'` },
          },
          {
            heading: '3. Formularios',
            body: ['n8n tiene un nodo "n8n Form Trigger" que crea un formulario web y dispara el workflow con las respuestas. También podés recibir formularios de Google Forms (vía Google Sheets) o de tu propia web vía webhook.'],
          },
          {
            heading: '4. Google Sheets como base liviana',
            body: [
              'Muchas pymes viven en planillas. El nodo Google Sheets permite leer, agregar y actualizar filas. Requiere crear credenciales OAuth de Google (gratis) siguiendo la guía de credenciales de n8n.',
              'Buenas prácticas: una fila de encabezados fija, nombres de columna sin espacios raros, una columna id.',
            ],
          },
          {
            heading: '5. Transformar datos',
            body: ['Nodos clave: Edit Fields (Set) para crear/renombrar campos, Filter para descartar items, Sort, Remove Duplicates, Split Out (dividir una lista en items), Aggregate (unir items), Date & Time. Para lógica más compleja, el nodo Code (JavaScript o Python).'],
          },
        ],
        keyConcepts: [
          { term: 'Webhook', def: 'URL que recibe notificaciones (POST) de otros sistemas.' },
          { term: 'Polling', def: 'Consultar periódicamente si hay novedades.' },
          { term: 'Payload', def: 'Datos enviados en el body del request.' },
          { term: 'OAuth', def: 'Protocolo para autorizar a una app a usar tu cuenta sin compartir tu contraseña.' },
          { term: 'Transformación', def: 'Cambiar la forma de los datos para el siguiente sistema.' },
        ],
        simpleExample: 'Webhook recibe {"nombre":"Ana"} → Google Sheets agrega fila con Ana.',
        realExample: 'Una tienda Shopify envía un webhook en cada pedido; n8n registra el pedido en una planilla de logística y avisa si el producto tiene poco stock.',
        analogy: 'Polling es llamar cada 5 minutos al correo para preguntar si llegó una carta; un webhook es que el cartero toque el timbre.',
        commonErrors: ['Usar la URL de test en producción (solo funciona mientras "escuchás").', 'No validar el payload: campos faltantes rompen pasos posteriores.', 'Exponer un webhook sin ninguna autenticación.'],
        bestPractices: ['Validar campos obligatorios apenas entra el webhook.', 'Responder rápido al webhook y procesar después.', 'Agregar autenticación (header secreto) al webhook.'],
        summary: ['Webhook = te avisan; API = preguntás.', 'Validar y transformar antes de guardar.', 'Google Sheets como destino común en pymes.'],
        comprehension: [{ q: '¿Por qué un webhook es más eficiente que el polling?', a: 'Porque solo hay comunicación cuando ocurre un evento, en lugar de consultar repetidamente sin novedades.' }],
        exercise: {
          statement: 'Completá normalizar_payload(p) que reciba el body de un formulario y devuelva {"nombre", "email", "mensaje", "valido"} con textos limpios (strip, email en minúscula) y valido = True solo si nombre y mensaje no están vacíos y el email tiene "@".',
          hints: ['p.get("campo", "").strip()', 'email.lower()'],
          solution: `def normalizar_payload(p):\n    nombre = p.get("nombre", "").strip()\n    email = p.get("email", "").strip().lower()\n    mensaje = p.get("mensaje", "").strip()\n    valido = bool(nombre) and bool(mensaje) and "@" in email\n    return {"nombre": nombre, "email": email, "mensaje": mensaje, "valido": valido}`,
          starter: `def normalizar_payload(p):\n    return {}`,
          tests: `r = normalizar_payload({"nombre":" Ana ","email":"ANA@Mail.com ","mensaje":"Hola"})\nassert r == {"nombre":"Ana","email":"ana@mail.com","mensaje":"Hola","valido":True}\nassert normalizar_payload({"nombre":"","email":"x","mensaje":""})["valido"] is False`,
        },
      },
    ],
    resources: [
      { ref: 'n8nacademy', why: 'Curso nivel 1: lecciones de webhooks y Google Sheets.', minutes: 120 },
      { ref: 'n8ndocs', why: 'Nodo Webhook, nodo Google Sheets y guía de credenciales de Google.', minutes: 60 },
      { ref: 'postman', why: 'Usalo para enviar POST de prueba a tu webhook.', minutes: 30 },
    ],
    coursera: [{ courseId: 'c-austral-excel', note: 'Opcional: Excel avanzado para negocios te ayuda a diseñar mejores planillas destino.' }],
    docs: [{ ref: 'mdn', why: 'Repasá POST y Content-Type.' }],
    exercises: [
      { id: 'w15e1', title: 'Webhook → planilla', level: 'intermedia', kind: 'libre', statement: 'Workflow: Webhook (POST /consultas) → Edit Fields (limpiar) → Google Sheets (append). Probalo con 3 requests desde Postman.', hints: ['Primero "Listen for test event", luego enviá el POST.'] },
      { id: 'w15e2', title: 'Formulario de n8n', level: 'basica', kind: 'libre', statement: 'Creá un n8n Form Trigger con nombre, email y mensaje, y guardá las respuestas en la planilla.', hints: ['El nodo genera la URL del formulario.'] },
      { id: 'w15e3', title: 'Validar con IF', level: 'intermedia', kind: 'libre', statement: 'Agregá un nodo IF que separe registros válidos de inválidos; los inválidos van a otra hoja "errores".', hints: ['Condición: email contains "@" AND mensaje is not empty.'] },
    ],
    challenge: {
      title: 'Centralizar consultas de la web',
      context: 'Una academia online recibe consultas desde un formulario. Hoy llegan a un email que nadie revisa a tiempo.',
      task: ['Formulario o webhook de entrada.', 'Validación y normalización.', 'Registro en Google Sheets con fecha y estado "nuevo".', 'Respuesta al formulario confirmando recepción.'],
      deliverable: 'Workflow exportado + planilla de ejemplo + capturas.',
    },
    deliverable: 'Workflows de webhook y formulario con registro en planilla.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Workflow que valida y separa inválidos.', 'Explicar webhook vs polling.'],
    questions: [
      mcq('q15-1', '¿Qué es un webhook?', ['Un tipo de base de datos', 'Una URL que recibe notificaciones de otro sistema', 'Un lenguaje', 'Un navegador'], 1, 'Otro sistema hace POST a tu URL cuando ocurre algo.', { concept: 'Webhooks' }),
      tf('q15-2', 'La URL de test de un webhook en n8n funciona permanentemente aunque el workflow no esté escuchando.', false, 'Solo mientras escuchás un evento de prueba; la de producción requiere el workflow activo.', { concept: 'Webhooks' }),
      mcq('q15-3', 'Consultar una API cada 5 minutos para ver si hay novedades se llama...', ['Webhook', 'Polling', 'OAuth', 'Payload'], 1, 'Polling.', { concept: 'Integraciones' }),
      mcq('q15-4', 'El "payload" de un webhook es...', ['La URL', 'Los datos enviados en el body', 'El status code', 'La credencial'], 1, 'Payload = datos.', { concept: 'Webhooks' }),
      tf('q15-5', 'Es buena práctica validar los datos del webhook antes de guardarlos.', true, 'Los datos externos pueden venir incompletos o mal formados.', { concept: 'Manejo de datos' }),
      mcq('q15-6', '¿Qué nodo divide una lista dentro de un item en varios items?', ['Aggregate', 'Split Out', 'Merge', 'Wait'], 1, 'Split Out.', { concept: 'Manejo de datos', d: 'intermedia' }),
      mcq('q15-7', '¿Qué necesitás para conectar n8n con Google Sheets?', ['Nada', 'Credenciales OAuth de Google', 'Una tarjeta de crédito', 'Python'], 1, 'OAuth autoriza el acceso sin compartir tu contraseña.', { concept: 'Google Sheets' }),
      mcq('q15-8', '¿Cómo protegerías un webhook público?', ['No se puede', 'Exigiendo un header secreto o autenticación básica', 'Cambiando el puerto', 'Usando GET'], 1, 'n8n permite configurar autenticación en el nodo Webhook.', { concept: 'Webhooks', d: 'avanzada' }),
      py('q15-9', 'Completá deduplicar(items, clave) que devuelva los items sin repetir según el valor de clave, conservando el primero.', `def deduplicar(items, clave):\n    return items`, `its=[{"email":"a"},{"email":"b"},{"email":"a"}]\nassert deduplicar(its,"email") == [{"email":"a"},{"email":"b"}]`, `def deduplicar(items, clave):\n    vistos = set()\n    r = []\n    for it in items:\n        v = it.get(clave)\n        if v not in vistos:\n            vistos.add(v)\n            r.append(it)\n    return r`, 'Es lo que hace el nodo Remove Duplicates.', { concept: 'Manejo de datos', d: 'avanzada', hints: ['Usá un set de valores vistos.'] }),
      short('q15-10', '¿Qué método HTTP usan normalmente los webhooks para enviar datos?', ['post'], 'POST.', { concept: 'Webhooks' }),
    ],
  },

  // ───────────────────────────── SEMANA 16 ─────────────────────────────
  {
    n: 16,
    stage: 3,
    title: 'Automatizaciones de negocio: correos, clasificación y notificaciones',
    objective: 'Construir automatizaciones típicas de empresas: enviar y leer correos, clasificar consultas, notificar equipos y mantener registros actualizados.',
    topics: ['Automatización de correos', 'Clasificación de consultas', 'Notificaciones', 'Actualización de registros', 'Integraciones con herramientas de negocio'],
    review: 'Repaso semana 2: la clasificación por reglas es un if/elif con palabras clave.',
    lessons: [
      {
        id: 'w16l1',
        title: 'Patrones de automatización de atención al cliente',
        minutes: 80,
        sections: [
          {
            heading: '1. Correos: leer y enviar',
            body: [
              'Leer: Gmail Trigger o IMAP Email trigger detectan correos nuevos. Enviar: Gmail o Send Email (SMTP).',
              'Para practicar sin riesgo usá una cuenta de Gmail nueva solo para pruebas. Nunca automatices envíos masivos sin consentimiento de las personas destinatarias (spam y normativa de protección de datos).',
              'Plantillas: armá el cuerpo del correo con expresiones de n8n: Hola {{ $json.nombre }}, recibimos tu consulta #{{ $json.id }}.',
            ],
          },
          {
            heading: '2. Clasificación por reglas',
            body: [
              'Antes de usar IA, una clasificación por palabras clave resuelve gran parte de los casos: el nodo Switch enruta según reglas ("contains factura" → salida 1).',
              'Siempre incluí una salida "otros / revisión manual". En la etapa 4 vas a reemplazar o complementar esta clasificación con un modelo de IA.',
            ],
          },
          {
            heading: '3. Notificaciones',
            body: ['Slack, Microsoft Teams, Telegram, Discord o email. Una buena notificación es accionable: qué pasó, quién debe actuar, enlace directo al registro. Evitá la fatiga de alertas: no notifiques lo que no requiere acción.'],
          },
          {
            heading: '4. Actualizar registros',
            body: ['Patrón "upsert": si el registro existe, actualizalo; si no, crealo. Google Sheets tiene la operación "Append or Update". Con bases de datos, el nodo Postgres o SQLite permite INSERT/UPDATE parametrizados.'],
          },
          {
            heading: '5. Herramientas de negocio',
            body: ['CRMs (HubSpot tiene plan gratuito), herramientas de tickets, Notion, Airtable (plan gratuito limitado), Trello. Todas tienen API; muchas tienen nodo nativo en n8n. Si no hay nodo, usás HTTP Request con su documentación.'],
          },
        ],
        keyConcepts: [
          { term: 'Switch', def: 'Nodo que enruta items a distintas salidas según reglas.' },
          { term: 'Expresión', def: 'Código entre {{ }} que inserta datos dinámicos.' },
          { term: 'Upsert', def: 'Actualizar si existe, crear si no.' },
          { term: 'Fatiga de alertas', def: 'Exceso de notificaciones que hace que se ignoren.' },
        ],
        simpleExample: 'Gmail Trigger → Switch por asunto → Slack al canal del equipo.',
        realExample: 'Una fintech clasifica los correos entrantes en "fraude", "pagos", "cuenta" y "otros"; los de fraude crean un ticket urgente y notifican por Slack al equipo de riesgo en menos de un minuto.',
        analogy: 'El Switch es como la mesa de entradas de una oficina que mira cada sobre y lo deja en la bandeja del área correcta.',
        commonErrors: ['No tener salida por defecto en el Switch.', 'Enviar correos de prueba a clientes reales.', 'Notificar todo a todos.'],
        bestPractices: ['Probar con datos ficticios y casillas propias.', 'Mensajes con enlace al registro.', 'Registrar cada acción para auditoría.'],
        summary: ['Leer/enviar correos, clasificar, notificar, registrar.', 'Siempre una salida "otros".', 'Notificaciones accionables.'],
        comprehension: [{ q: '¿Qué debe tener una notificación accionable?', a: 'Qué pasó, por qué importa, quién debe actuar y un enlace o dato para actuar inmediatamente.' }],
        exercise: {
          statement: 'Completá enrutar(texto) que devuelva la lista de equipos a notificar: "fraude"/"robo" → "riesgo"; "factura"/"cobro" → "facturacion"; "contraseña"/"acceso" → "soporte". Un texto puede ir a varios equipos. Si ninguno aplica → ["revision_manual"].',
          hints: ['Recorré un diccionario equipo → palabras.', 'any(p in texto for p in palabras)'],
          solution: `REGLAS = {\n    "riesgo": ["fraude", "robo"],\n    "facturacion": ["factura", "cobro"],\n    "soporte": ["contraseña", "acceso"],\n}\n\ndef enrutar(texto):\n    t = texto.lower()\n    equipos = [eq for eq, pals in REGLAS.items() if any(p in t for p in pals)]\n    return equipos or ["revision_manual"]`,
          starter: `def enrutar(texto):\n    return ["revision_manual"]`,
          tests: `assert enrutar("Me cobraron dos veces la factura") == ["facturacion"]\nassert enrutar("Posible FRAUDE, no tengo acceso") == ["riesgo", "soporte"]\nassert enrutar("Hola") == ["revision_manual"]`,
        },
      },
    ],
    resources: [
      { ref: 'n8nacademy', why: 'Curso nivel 2 (Intermediate): primeras lecciones.', minutes: 120 },
      { ref: 'n8ndocs', why: 'Nodos Gmail, Switch, Slack/Telegram; sección "Expressions".', minutes: 60 },
      { ref: 'zapier', why: 'Guías de automatización de soporte al cliente para inspirarte con casos.', minutes: 30 },
    ],
    docs: [{ ref: 'n8ndocs', why: '"Expressions" y "Data transformation functions".' }],
    exercises: [
      { id: 'w16e1', title: 'Respuesta automática', level: 'intermedia', kind: 'libre', statement: 'Webhook de consulta → Gmail con respuesta personalizada usando expresiones (nombre e id). Enviala solo a tu propia casilla.', hints: ['{{ $json.nombre }}'] },
      { id: 'w16e2', title: 'Switch de clasificación', level: 'intermedia', kind: 'libre', statement: 'Agregá un Switch con 4 salidas (facturación, soporte, ventas, otros) y una notificación diferente por salida (Telegram o email).', hints: ['Telegram tiene bots gratuitos.'] },
      { id: 'w16e3', title: 'Upsert en planilla', level: 'avanzada', kind: 'libre', statement: 'Cuando llega una actualización de estado {id, estado}, usá Google Sheets "Append or Update" para actualizar la fila correcta.', hints: ['Columna para matchear: id.'] },
    ],
    challenge: {
      title: 'Mesa de entradas automática',
      context: 'Un estudio contable recibe 80 correos diarios mezclados: facturas de clientes, consultas, publicidad.',
      task: ['Detectar correos nuevos (cuenta de prueba).', 'Clasificar por reglas con Switch.', 'Registrar cada correo en una planilla con categoría y estado.', 'Notificar solo las categorías urgentes.', 'Documentar qué casos quedan para revisión manual.'],
      deliverable: 'Workflow exportado + planilla + documento de reglas.',
    },
    deliverable: 'Workflow de clasificación y notificación.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Switch con salida por defecto.', 'Notificaciones que contienen datos para actuar.'],
    questions: [
      mcq('q16-1', '¿Qué nodo de n8n enruta items a varias salidas según reglas?', ['Merge', 'Switch', 'Wait', 'Set'], 1, 'Switch.', { concept: 'Clasificación de consultas' }),
      mcq('q16-2', 'En n8n, ¿cómo insertás el nombre del item actual en un texto?', ['$nombre', '{{ $json.nombre }}', '[nombre]', 'f"{nombre}"'], 1, 'Las expresiones van entre {{ }} y $json es el item actual.', { concept: 'Automatización de correos' }),
      tf('q16-3', 'Un Switch de clasificación debería tener siempre una salida para casos no contemplados.', true, 'Evita que se pierdan items.', { concept: 'Clasificación de consultas' }),
      mcq('q16-4', '"Upsert" significa...', ['Borrar y crear', 'Actualizar si existe, crear si no', 'Subir un archivo', 'Enviar un email'], 1, 'Update + insert.', { concept: 'Actualización de registros' }),
      tf('q16-5', 'Para practicar envíos de correo conviene usar la base de clientes real.', false, 'Usá casillas de prueba propias.', { concept: 'Automatización de correos' }),
      mcq('q16-6', '¿Cuál es una notificación accionable?', ['"Hay novedades"', '"Ticket #482 de Ana (premium) sin respuesta hace 26 h — asignado a Soporte — [enlace]"', '"Error"', '"Revisar planilla"'], 1, 'Incluye qué, quién y dónde actuar.', { concept: 'Notificaciones' }),
      mcq('q16-7', 'Si una herramienta no tiene nodo nativo en n8n...', ['No se puede integrar', 'Se usa HTTP Request con su API', 'Hay que pagar', 'Se usa Excel'], 1, 'HTTP Request es universal.', { concept: 'Integraciones con herramientas de negocio' }),
      py('q16-8', 'Completá plantilla(t, datos) que reemplace marcadores {{campo}} en el texto t por datos[campo]. Si falta el dato, dejá "-".', `def plantilla(t, datos):\n    return t`, `assert plantilla("Hola {{nombre}}, ticket #{{id}}", {"nombre":"Ana","id":7}) == "Hola Ana, ticket #7"\nassert plantilla("Hola {{nombre}}", {}) == "Hola -"`, `import re\n\ndef plantilla(t, datos):\n    return re.sub(r"{{(\\w+)}}", lambda m: str(datos.get(m.group(1), "-")), t)`, 'Así funcionan internamente las plantillas de correo.', { concept: 'Automatización de correos', d: 'avanzada', hints: ['Podés usar re.sub con una función.', 'O recorrer datos y hacer replace, y luego manejar los faltantes.'] }),
      tf('q16-9', 'Enviar emails masivos automatizados sin consentimiento puede violar normativas de protección de datos y anti-spam.', true, 'Siempre con consentimiento y opción de baja.', { concept: 'Automatización de correos' }),
      short('q16-10', '¿Qué variable de n8n representa los datos JSON del item actual? (con $)', ['$json'], '$json.', { concept: 'Automatización de correos' }),
    ],
  },

  // ───────────────────────────── SEMANA 17 ─────────────────────────────
  {
    n: 17,
    stage: 3,
    title: 'Lógica avanzada: ramas, bucles, expresiones y errores',
    objective: 'Hacer workflows robustos: condiciones y ramas, procesamiento por lotes, expresiones, manejo de errores, reintentos y logs.',
    topics: ['Condiciones', 'Ramas', 'Bucles', 'Expresiones', 'Manejo de errores', 'Reintentos', 'Logs'],
    review: 'Repaso semanas 3 y 6: bucles y try/except tienen su equivalente visual en n8n.',
    lessons: [
      {
        id: 'w17l1',
        title: 'Workflows que no se rompen',
        minutes: 90,
        sections: [
          {
            heading: '1. Condiciones y ramas',
            body: ['IF divide en true/false; Switch en varias salidas; Merge vuelve a unir ramas (por posición, por campo coincidente o esperando ambas). Diseñá las ramas en el diagrama antes de construirlas.'],
          },
          {
            heading: '2. Bucles y lotes',
            body: [
              'Como n8n procesa item por item, muchas veces no necesitás un bucle explícito. El nodo Loop Over Items (Split in Batches) sirve para procesar de a N items, por ejemplo para respetar rate limits de una API (lotes de 10 con Wait de 1 s entre lotes).',
            ],
          },
          {
            heading: '3. Expresiones',
            body: [
              'Las expresiones usan JavaScript dentro de {{ }}: {{ $json.email.toLowerCase() }}, {{ $json.horas > 24 ? "alta" : "media" }}, {{ $now.toISO() }}.',
              'Acceder a datos de otro nodo: {{ $(\'Webhook\').item.json.body.email }}.',
            ],
          },
          {
            heading: '4. Manejo de errores',
            body: [
              'Por nodo: Settings → "Retry On Fail" (cantidad de reintentos y espera) y "On Error" (detener, continuar, o continuar por una salida de error).',
              'A nivel workflow: un "Error Workflow" separado con Error Trigger recibe los detalles de cualquier falla y notifica al equipo.',
              'Estrategia: reintentar errores transitorios (timeouts, 429, 5xx); no reintentar errores de datos (400): enviarlos a una cola de revisión.',
            ],
          },
          {
            heading: '5. Reintentos con backoff',
            body: ['Backoff exponencial: esperar 1 s, 2 s, 4 s, 8 s entre reintentos para no saturar al servicio. Limitá la cantidad total de reintentos.'],
            code: { lang: 'python', code: `import time, requests\n\ndef get_con_reintentos(url, intentos=4):\n    espera = 1\n    for i in range(intentos):\n        try:\n            r = requests.get(url, timeout=10)\n            if r.status_code == 429 or r.status_code >= 500:\n                raise requests.HTTPError(f"Transitorio {r.status_code}")\n            return r\n        except requests.RequestException:\n            if i == intentos - 1:\n                raise\n            time.sleep(espera)\n            espera *= 2` },
          },
          {
            heading: '6. Logs y observabilidad',
            body: ['Registrá en una planilla o tabla: fecha, workflow, id del registro, resultado, error. Te permite responder "¿qué pasó con la consulta de Ana del martes?". n8n además guarda ejecuciones (configurá cuántos días conservarlas).'],
          },
        ],
        keyConcepts: [
          { term: 'Merge', def: 'Nodo que une datos de dos ramas.' },
          { term: 'Loop Over Items', def: 'Procesa items en lotes.' },
          { term: 'Retry On Fail', def: 'Reintento automático de un nodo.' },
          { term: 'Error Workflow', def: 'Workflow que se ejecuta cuando otro falla.' },
          { term: 'Backoff exponencial', def: 'Esperas crecientes entre reintentos.' },
          { term: 'Idempotencia', def: 'Ejecutar dos veces produce el mismo resultado (evita duplicados al reintentar).' },
        ],
        simpleExample: 'HTTP Request con Retry On Fail: 3 intentos, 2000 ms de espera.',
        realExample: 'La API de un proveedor de envíos falla 2% de las veces con 503. Con reintentos y backoff, el workflow pasa de 20 fallas diarias a casi ninguna; las que persisten llegan al Error Workflow, que avisa por Slack con el id del pedido.',
        analogy: 'Un buen workflow es como un piloto con checklist de emergencias: no espera que todo salga bien, sabe qué hacer cuando algo falla.',
        commonErrors: ['Reintentar errores 400 (los datos seguirán mal).', 'Reintentar un POST que crea registros sin idempotencia (duplicados).', 'No tener ningún aviso cuando un workflow falla.'],
        bestPractices: ['Error Workflow obligatorio en producción.', 'Registrar cada ejecución relevante.', 'Lotes + Wait para respetar rate limits.'],
        summary: ['Ramas con IF/Switch/Merge.', 'Reintentos solo para errores transitorios.', 'Error Workflow + logs = observabilidad.'],
        comprehension: [{ q: '¿Por qué reintentar un POST puede generar duplicados y cómo se evita?', a: 'Si el primer POST sí se procesó pero la respuesta se perdió, el reintento crea otro registro. Se evita con claves de idempotencia o verificando si el registro ya existe (upsert).' }],
        exercise: {
          statement: 'Completá debe_reintentar(status, intento, max_intentos) que devuelva True solo si el status es 429 o 5xx y todavía quedan intentos (intento < max_intentos). Completá también espera(intento) que devuelva 2 ** intento segundos con un máximo de 30.',
          hints: ['Rango 5xx: 500 <= status < 600.', 'min(2 ** intento, 30)'],
          solution: `def debe_reintentar(status, intento, max_intentos):\n    transitorio = status == 429 or 500 <= status < 600\n    return transitorio and intento < max_intentos\n\ndef espera(intento):\n    return min(2 ** intento, 30)`,
          starter: `def debe_reintentar(status, intento, max_intentos):\n    return False\n\ndef espera(intento):\n    return 0`,
          tests: `assert debe_reintentar(503, 1, 3)\nassert not debe_reintentar(400, 1, 3)\nassert not debe_reintentar(429, 3, 3)\nassert espera(0) == 1 and espera(3) == 8 and espera(10) == 30`,
        },
      },
    ],
    resources: [
      { ref: 'n8nacademy', why: 'Curso nivel 2: lecciones de merging, loops y error handling.', minutes: 150 },
      { ref: 'n8ndocs', why: '"Error handling", "Looping" y "Expressions" (con ejemplos).', minutes: 60 },
    ],
    docs: [{ ref: 'n8ndocs', why: 'Flow logic: Splitting, Merging, Looping, Waiting, Error handling.' }],
    exercises: [
      { id: 'w17e1', title: 'Error Workflow', level: 'intermedia', kind: 'libre', statement: 'Creá un Error Workflow (Error Trigger → notificación) y asignalo a tu workflow de la semana 16. Provocá un error a propósito y verificá el aviso.', hints: ['Workflow Settings → Error workflow.'] },
      { id: 'w17e2', title: 'Lotes con Wait', level: 'intermedia', kind: 'libre', statement: 'Procesá 30 items en lotes de 5 con un Wait de 1 s entre lotes.', hints: ['Loop Over Items + Wait.'] },
      { id: 'w17e3', title: 'Log de ejecuciones', level: 'avanzada', kind: 'libre', statement: 'Agregá al final de cada rama un registro en una hoja "logs" con fecha, id, rama y resultado.', hints: ['{{ $now.toISO() }}'] },
    ],
    challenge: {
      title: 'Sincronización robusta de pedidos',
      context: 'Un ecommerce sincroniza pedidos desde una API inestable hacia su planilla de logística.',
      task: ['Obtener pedidos con reintentos y backoff.', 'Procesar en lotes.', 'Separar pedidos con datos inválidos a una cola de revisión.', 'Error Workflow con notificación.', 'Log de cada ejecución.'],
      deliverable: 'Workflow + Error Workflow exportados + documento de estrategia de errores.',
    },
    deliverable: 'Workflows con manejo de errores, reintentos y logs.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Error Workflow funcionando.', 'Diferenciar errores transitorios de errores de datos.'],
    questions: [
      mcq('q17-1', '¿Qué errores conviene reintentar?', ['400 Bad Request', '401 Unauthorized', '503 Service Unavailable y timeouts', '404 Not Found'], 2, 'Son transitorios.', { concept: 'Reintentos' }),
      tf('q17-2', 'Un Error Workflow se ejecuta cuando otro workflow falla y puede notificar al equipo.', true, 'Se configura en los settings del workflow.', { concept: 'Manejo de errores' }),
      mcq('q17-3', 'Backoff exponencial significa...', ['Reintentar inmediatamente siempre', 'Esperas crecientes (1, 2, 4, 8 s)', 'Nunca reintentar', 'Esperar 1 hora'], 1, 'Reduce la carga sobre el servicio.', { concept: 'Reintentos' }),
      mcq('q17-4', '¿Para qué usarías Loop Over Items?', ['Para unir ramas', 'Para procesar items en lotes (ej. respetar rate limits)', 'Para enviar correos', 'Para crear credenciales'], 1, 'Procesamiento por lotes.', { concept: 'Bucles' }),
      mcq('q17-5', '¿Qué hace {{ $json.horas > 24 ? "alta" : "media" }}?', ['Error', 'Devuelve "alta" si horas > 24, si no "media"', 'Siempre "alta"', 'Suma 24'], 1, 'Operador ternario de JavaScript.', { concept: 'Expresiones', d: 'intermedia' }),
      tf('q17-6', 'Reintentar un POST que crea registros siempre es seguro.', false, 'Puede duplicar registros si no es idempotente.', { concept: 'Reintentos', d: 'avanzada' }),
      mcq('q17-7', '¿Qué nodo une los datos de dos ramas?', ['Split Out', 'Merge', 'IF', 'Code'], 1, 'Merge.', { concept: 'Ramas' }),
      mcq('q17-8', '¿Qué deberías registrar en un log de automatización?', ['Solo los éxitos', 'Fecha, workflow, id del registro, resultado y error', 'Contraseñas', 'Nada'], 1, 'Permite auditar y depurar.', { concept: 'Logs' }),
      py('q17-9', 'Completá en_lotes(items, n) que devuelva una lista de listas de tamaño máximo n.', `def en_lotes(items, n):\n    return [items]`, `assert en_lotes([1,2,3,4,5], 2) == [[1,2],[3,4],[5]]\nassert en_lotes([], 3) == []`, `def en_lotes(items, n):\n    return [items[i:i+n] for i in range(0, len(items), n)]`, 'Slicing con paso n: lo que hace Loop Over Items.', { concept: 'Bucles', d: 'intermedia', hints: ['range(0, len(items), n)', 'items[i:i+n]'] }),
      mcq('q17-10', 'Un registro con email inválido debería...', ['Reintentarse 10 veces', 'Enviarse a una cola de revisión con el motivo', 'Ignorarse en silencio', 'Detener todo el workflow para siempre'], 1, 'Errores de datos no se arreglan reintentando.', { concept: 'Manejo de errores', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 18 ─────────────────────────────
  {
    n: 18,
    stage: 3,
    title: 'Workflows completos: seguridad, optimización y documentación',
    objective: 'Diseñar un workflow de punta a punta con criterios profesionales de seguridad, eficiencia y documentación, y entregar el Proyecto 3.',
    topics: ['Diseño de workflows completos', 'Seguridad', 'Optimización', 'Documentación', 'Proyecto final'],
    review: 'Repaso integral de la etapa 3 y de SQL (semana 11) para registrar en base de datos.',
    lessons: [
      {
        id: 'w18l1',
        title: 'De prototipo a workflow profesional',
        minutes: 80,
        sections: [
          {
            heading: '1. Diseño de punta a punta',
            body: ['Un workflow profesional tiene: entrada validada, lógica clara dividida en secciones (o sub-workflows con "Execute Workflow"), salidas definidas, manejo de errores, logs y una persona responsable.'],
          },
          {
            heading: '2. Seguridad',
            body: [
              'Credenciales solo en el gestor de credenciales de n8n (nunca en texto plano). Webhooks con autenticación. Principio de mínimo privilegio: la cuenta de servicio solo con los permisos necesarios.',
              'Datos personales: recolectá solo lo necesario, no los envíes a servicios innecesarios, definí cuánto tiempo se conservan las ejecuciones. Antes de compartir un workflow exportado, revisá que no contenga datos reales.',
            ],
          },
          {
            heading: '3. Optimización',
            body: ['Filtrá temprano (descartá items que no sirven antes de llamar APIs). Evitá llamadas repetidas (cacheá datos de referencia). Usá lotes. Preferí webhooks a polling cuando sea posible. Medí el tiempo de ejecución en Executions.'],
          },
          {
            heading: '4. Documentación',
            body: [
              'Sticky notes en el canvas explicando cada sección. Nombres de nodos descriptivos. Un README con: objetivo, diagrama, trigger, sistemas conectados, credenciales necesarias (sin valores), cómo probar, errores conocidos y responsable.',
              'La documentación es lo que diferencia un experimento de un entregable que una empresa puede mantener. Los reclutadores la miran.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Sub-workflow', def: 'Workflow invocado desde otro para modularizar.' },
          { term: 'Mínimo privilegio', def: 'Dar solo los permisos estrictamente necesarios.' },
          { term: 'Sticky note', def: 'Nota en el canvas de n8n para documentar.' },
          { term: 'Runbook', def: 'Guía de qué hacer cuando algo falla.' },
        ],
        simpleExample: 'Sticky note: "Sección 2 — Clasificación: reglas por palabras clave. Ver README §3".',
        realExample: 'Un workflow de onboarding de empleados toca RR. HH., IT y nómina. Está dividido en 3 sub-workflows, cada uno con su responsable, y un README con runbook de errores.',
        analogy: 'Documentar un workflow es como dejar el manual del auto en la guantera: quien lo maneje después lo va a necesitar.',
        commonErrors: ['Exportar workflows con datos de clientes pineados.', 'Un único workflow gigante imposible de leer.', 'Documentación que nadie actualiza.'],
        bestPractices: ['README + sticky notes + nombres claros.', 'Sub-workflows por responsabilidad.', 'Revisión de seguridad antes de publicar.'],
        summary: ['Seguridad, eficiencia y documentación son parte del entregable.', 'Modularizá con sub-workflows.', 'Nunca credenciales en texto plano.'],
        comprehension: [{ q: '¿Qué revisarías antes de subir un workflow exportado a GitHub?', a: 'Que no contenga credenciales, tokens, URLs privadas ni datos personales pineados o de ejemplo reales.' }],
        exercise: {
          statement: 'Escribí el README de tu workflow de la semana 16 o 17 con las secciones: Objetivo, Diagrama, Trigger, Sistemas, Credenciales necesarias, Cómo probar, Manejo de errores, Limitaciones.',
          hints: ['Usá Markdown.', 'Las credenciales se nombran, no se muestran.'],
          solution: 'Respuesta abierta evaluada con la checklist de secciones.',
        },
      },
    ],
    resources: [
      { ref: 'n8nacademy', why: 'Completá el curso nivel 2 si te faltaba.', minutes: 90 },
      { ref: 'n8ndocs', why: '"Sub-workflows", "Securing n8n" y "Workflow templates" para ver ejemplos documentados.', minutes: 60 },
    ],
    docs: [{ ref: 'n8ndocs', why: 'Security y Credentials.' }],
    exercises: [
      { id: 'w18e1', title: 'Revisión de seguridad', level: 'intermedia', kind: 'libre', statement: 'Aplicá esta checklist a tus workflows: credenciales en gestor, webhooks autenticados, sin datos reales pineados, retención de ejecuciones configurada, permisos mínimos.', hints: ['Anotá qué corregiste.'] },
      { id: 'w18e2', title: 'Proyecto 3', level: 'avanzada', kind: 'libre', statement: 'Desarrollá el Proyecto 3 completo (ver Proyectos).', hints: ['Reutilizá piezas de las semanas 15–17.'] },
    ],
    challenge: {
      title: 'Automatización de consultas de clientes (proyecto de etapa)',
      context: 'Un ecommerce recibe consultas por formulario. Necesita registrarlas, clasificarlas, priorizarlas y avisar al equipo correcto.',
      task: ['Recibir la consulta (webhook o formulario).', 'Identificar categoría y asignar prioridad.', 'Registrar en base (SQLite/Postgres o Google Sheets).', 'Notificar al equipo correspondiente.', 'Manejo de errores, logs y README.'],
      deliverable: 'Proyecto 3 completo (ver checklist en Proyectos).',
    },
    deliverable: 'Proyecto 3 documentado.',
    hours: HPROJ,
    passCriteria: ['Evaluación ≥ 80/100.', 'Proyecto 3 con todos los entregables obligatorios.', 'README que permita a otra persona ejecutarlo.'],
    questions: [
      mcq('q18-1', '¿Dónde deben guardarse las API keys en n8n?', ['En un nodo Set', 'En el gestor de credenciales', 'En sticky notes', 'En el nombre del workflow'], 1, 'El gestor las cifra y no se exportan en el workflow.', { concept: 'Seguridad' }),
      mcq('q18-2', 'El principio de mínimo privilegio indica...', ['Dar acceso de administrador para evitar errores', 'Dar solo los permisos necesarios', 'No usar credenciales', 'Compartir cuentas'], 1, 'Reduce el impacto de una filtración.', { concept: 'Seguridad' }),
      tf('q18-3', 'Filtrar items temprano en el workflow reduce llamadas innecesarias a APIs.', true, 'Optimización básica.', { concept: 'Optimización' }),
      mcq('q18-4', '¿Para qué sirven los sub-workflows?', ['Para duplicar código', 'Para modularizar y reutilizar lógica', 'Para guardar contraseñas', 'Para pagar menos'], 1, 'Igual que las funciones en Python.', { concept: 'Diseño de workflows completos' }),
      tf('q18-5', 'Antes de compartir un workflow exportado hay que verificar que no incluya datos personales pineados.', true, 'El pin data se exporta con el workflow.', { concept: 'Seguridad', d: 'intermedia' }),
      mcq('q18-6', '¿Qué NO debería estar en un README de workflow?', ['Objetivo', 'Diagrama', 'El valor de la API key', 'Cómo probar'], 2, 'Se nombran las credenciales necesarias, nunca sus valores.', { concept: 'Documentación' }),
      mcq('q18-7', 'Para reducir costos y carga, preferís...', ['Polling cada minuto', 'Webhooks cuando el sistema origen los ofrece', 'Ejecutar todo manualmente', 'Duplicar workflows'], 1, 'Solo se ejecuta cuando hay eventos.', { concept: 'Optimización' }),
      mcq('q18-8', 'Un runbook es...', ['Un tipo de nodo', 'Una guía de qué hacer cuando algo falla', 'Un lenguaje', 'Un trigger'], 1, 'Documentación operativa.', { concept: 'Documentación', d: 'intermedia' }),
      tf('q18-9', 'Documentar un workflow es opcional si funciona bien.', false, 'Sin documentación nadie más puede mantenerlo, y es parte de la calidad profesional.', { concept: 'Documentación' }),
      mcq('q18-10', '¿Qué demuestra mejor tu nivel ante un reclutador?', ['Una captura del canvas', 'Workflow exportado + README + diagrama + manejo de errores + demo', 'Un certificado', 'La cantidad de nodos'], 1, 'Evidencia completa y reproducible.', { concept: 'Proyecto final' }),
    ],
  },
];
