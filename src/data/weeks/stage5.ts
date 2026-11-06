import type { Week } from '../../types';
import { H12, HPROJ, mcq, py, tf } from './helpers';

export const STAGE5: Week[] = [
  // ───────────────────────────── SEMANA 25 ─────────────────────────────
  {
    n: 25,
    stage: 5,
    title: 'Qué es un agente de IA',
    objective: 'Diferenciar chatbots, workflows y agentes, comprender el ciclo de ejecución de un agente y cuándo conviene (o no) usar uno.',
    topics: ['Qué es un agente de IA', 'Diferencias entre chatbot y agente', 'Ciclo de ejecución', 'Planificación'],
    review: 'Repaso semana 22: tool use es la pieza que convierte un LLM en agente.',
    lessons: [
      {
        id: 'w25l1',
        title: 'Del chatbot al agente',
        minutes: 85,
        sections: [
          {
            heading: '1. Tres niveles de autonomía',
            body: [
              'Chatbot: responde mensajes; no actúa sobre sistemas.',
              'Workflow con IA: el camino está definido por vos (n8n, código); el LLM resuelve pasos puntuales (clasificar, redactar). Predecible y fácil de auditar.',
              'Agente: el LLM decide qué pasos dar y qué herramientas usar, en un bucle, hasta cumplir un objetivo. Más flexible, pero menos predecible y más caro.',
            ],
          },
          {
            heading: '2. El ciclo del agente',
            body: [
              'Observar (recibir objetivo y contexto) → Pensar/planificar (decidir el próximo paso) → Actuar (llamar una herramienta) → Observar el resultado → repetir hasta terminar o alcanzar un límite.',
              'Este patrón se conoce como ReAct (Reason + Act). En código es un while con una condición de parada y un máximo de iteraciones.',
            ],
            code: { lang: 'python', code: `def ejecutar_agente(objetivo, max_pasos=6):\n    historial = [{"role": "user", "content": objetivo}]\n    for paso in range(max_pasos):\n        decision = llamar_modelo(historial, tools=TOOLS)  # el LLM decide\n        if decision.tipo == "respuesta_final":\n            return decision.texto\n        resultado = ejecutar_tool(decision.tool, decision.args)  # tu código ejecuta\n        historial.append({"role": "tool", "content": resultado})\n    return "No pude completar la tarea: se alcanzó el límite de pasos."` },
          },
          {
            heading: '3. Planificación',
            body: ['Para tareas de varios pasos, el agente puede primero escribir un plan ("1. buscar pedido, 2. verificar pago, 3. proponer acción") y luego ejecutarlo, revisándolo si algo cambia. Pedir el plan explícito mejora la trazabilidad y permite que una persona lo apruebe.'],
          },
          {
            heading: '4. ¿Cuándo usar un agente?',
            body: [
              'Usá un workflow cuando los pasos son conocidos. Usá un agente cuando los pasos dependen de la situación y no se pueden enumerar de antemano (investigar un caso, resolver incidencias variadas).',
              'Regla práctica de la industria: empezá con la solución más simple (un prompt, luego un workflow) y agregá autonomía solo si mejora resultados medibles.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Agente', def: 'Sistema donde un LLM decide pasos y herramientas en un bucle para cumplir un objetivo.' },
          { term: 'ReAct', def: 'Patrón razonar → actuar → observar.' },
          { term: 'Condición de parada', def: 'Cuándo el agente termina: respuesta final o límite.' },
          { term: 'Plan', def: 'Secuencia de pasos propuesta antes de actuar.' },
          { term: 'Autonomía', def: 'Grado en que el sistema decide sin intervención humana.' },
        ],
        simpleExample: 'Objetivo: "¿Dónde está mi pedido 4521?" → el agente llama buscar_pedido(4521) → ve "demorado" → llama consultar_envio() → responde con el estado y la nueva fecha.',
        realExample: 'Un agente de operaciones de TI recibe "el sitio está lento", consulta métricas, revisa logs, identifica la causa probable y propone una acción que un ingeniero aprueba.',
        analogy: 'Un workflow es un tren sobre rieles; un agente es un conductor con GPS que elige el camino según el tráfico. El conductor necesita reglas de tránsito (límites y supervisión).',
        commonErrors: ['Usar un agente donde un workflow alcanza.', 'No poner límite de pasos (bucles infinitos y costos).', 'No registrar las decisiones del agente.'],
        bestPractices: ['Empezar simple.', 'Límite de pasos y de costo.', 'Plan visible y aprobable.'],
        summary: ['Chatbot conversa; workflow sigue rieles; agente decide.', 'Ciclo: pensar, actuar, observar.', 'Más autonomía = más control necesario.'],
        comprehension: [{ q: '¿Por qué un agente necesita un máximo de iteraciones?', a: 'Para evitar bucles infinitos, costos descontrolados y garantizar que termine con un resultado o un aviso.' }],
        exercise: {
          statement: 'Completá simular_agente(plan, herramientas, max_pasos) que recorra la lista plan (nombres de herramientas), ejecute cada una desde el dict herramientas y devuelva la lista de resultados. Si una herramienta no existe, agregá "error:NOMBRE" y detené. Nunca ejecutes más de max_pasos.',
          hints: ['for i, nombre in enumerate(plan)', 'if i >= max_pasos: break'],
          solution: `def simular_agente(plan, herramientas, max_pasos):\n    resultados = []\n    for i, nombre in enumerate(plan):\n        if i >= max_pasos:\n            break\n        if nombre not in herramientas:\n            resultados.append(f"error:{nombre}")\n            break\n        resultados.append(herramientas[nombre]())\n    return resultados`,
          starter: `def simular_agente(plan, herramientas, max_pasos):\n    return []`,
          tests: `h = {"buscar": lambda: "ok-buscar", "verificar": lambda: "ok-verificar"}\nassert simular_agente(["buscar","verificar"], h, 5) == ["ok-buscar","ok-verificar"]\nassert simular_agente(["buscar","borrar","verificar"], h, 5) == ["ok-buscar","error:borrar"]\nassert simular_agente(["buscar"]*10, h, 3) == ["ok-buscar"]*3`,
        },
      },
    ],
    resources: [
      { ref: 'hfagents', why: 'Unidad 1: fundamentos de agentes (Thought-Action-Observation).', minutes: 150 },
      { ref: 'oaiagents', why: 'Guía conceptual sobre cuándo usar agentes.', minutes: 45 },
      { ref: 'anthropicdocs', why: 'Buscá el artículo de Anthropic "Building effective agents" (patrones de workflows vs agentes).', minutes: 45 },
    ],
    docs: [],
    exercises: [
      { id: 'w25e1', title: 'Workflow o agente', level: 'intermedia', kind: 'libre', statement: 'Para 6 tareas de operaciones (reembolsos, onboarding, triage de incidentes, reportes, etc.) decidí workflow o agente y justificá.', hints: ['¿Los pasos se conocen de antemano?'] },
      { id: 'w25e2', title: 'Diagrama del ciclo', level: 'basica', kind: 'libre', statement: 'Dibujá el ciclo de un agente de soporte con 3 herramientas, condición de parada y punto de aprobación humana.', hints: ['Incluí qué pasa si una tool falla.'] },
    ],
    challenge: {
      title: 'Diseño de un agente de reembolsos',
      context: 'Una tienda recibe pedidos de reembolso con situaciones muy variadas.',
      task: ['Definí objetivo, herramientas (buscar pedido, verificar pago, política de reembolsos, crear solicitud) y límites.', 'Definí qué decide el agente y qué requiere aprobación humana.', 'Escribí 5 escenarios de prueba con el comportamiento esperado.'],
      deliverable: 'Documento de diseño del agente.',
    },
    deliverable: 'Diseño del agente de reembolsos.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Diferenciar workflow y agente con criterios.', 'Diseño con límites y aprobación humana.'],
    questions: [
      mcq('q25-1', '¿Qué distingue a un agente de un workflow con IA?', ['Usa un LLM', 'El LLM decide qué pasos y herramientas usar en un bucle', 'Tiene interfaz de chat', 'Es más barato'], 1, 'En el workflow el camino lo definís vos.', { concept: 'Diferencias entre chatbot y agente' }),
      mcq('q25-2', 'El ciclo ReAct consiste en...', ['Leer y escribir archivos', 'Razonar, actuar, observar y repetir', 'Reaccionar a errores', 'Recargar la página'], 1, 'Reason + Act.', { concept: 'Ciclo de ejecución' }),
      tf('q25-3', 'Siempre conviene usar un agente porque es más flexible.', false, 'Más flexible implica menos predecible y más costoso; empezá simple.', { concept: 'Qué es un agente de IA' }),
      mcq('q25-4', '¿Por qué pedir al agente un plan explícito antes de actuar?', ['Para gastar más tokens', 'Para trazabilidad y para que una persona pueda aprobarlo', 'Porque es obligatorio', 'Para ir más rápido'], 1, 'Control y auditoría.', { concept: 'Planificación' }),
      mcq('q25-5', 'Una tarea con pasos fijos y conocidos se resuelve mejor con...', ['Un agente', 'Un workflow', 'Un chatbot', 'Deep learning'], 1, 'Predecible y auditable.', { concept: 'Diferencias entre chatbot y agente' }),
      tf('q25-6', 'Un agente debe tener una condición de parada y un límite de pasos.', true, 'Evita bucles y costos descontrolados.', { concept: 'Ciclo de ejecución' }),
      mcq('q25-7', '¿Quién ejecuta realmente las herramientas de un agente?', ['El modelo en sus servidores', 'El código de la aplicación', 'El usuario final', 'Nadie'], 1, 'El modelo solo decide; tu código ejecuta.', { concept: 'Ciclo de ejecución', d: 'intermedia' }),
      mcq('q25-8', 'Un chatbot que solo responde preguntas sin consultar sistemas es...', ['Un agente', 'Un chatbot', 'Un workflow', 'Una API'], 1, 'No actúa sobre sistemas.', { concept: 'Diferencias entre chatbot y agente' }),
      py('q25-9', 'Completá debe_parar(paso, max_pasos, respuesta_final, costo, costo_max) que devuelva True si hay respuesta final, si paso >= max_pasos o si costo >= costo_max.', `def debe_parar(paso, max_pasos, respuesta_final, costo, costo_max):\n    return False`, `assert debe_parar(1, 5, True, 0, 1)\nassert debe_parar(5, 5, False, 0, 1)\nassert debe_parar(1, 5, False, 1.2, 1)\nassert not debe_parar(2, 5, False, 0.1, 1)`, `def debe_parar(paso, max_pasos, respuesta_final, costo, costo_max):\n    return respuesta_final or paso >= max_pasos or costo >= costo_max`, 'Múltiples condiciones de parada protegen al sistema.', { concept: 'Ciclo de ejecución', hints: ['Combiná con or.'] }),
      tf('q25-10', 'Más autonomía en un agente requiere más mecanismos de control y supervisión.', true, 'Autonomía y control van de la mano.', { concept: 'Qué es un agente de IA', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 26 ─────────────────────────────
  {
    n: 26,
    stage: 5,
    title: 'Herramientas y ejecución de acciones',
    objective: 'Diseñar herramientas (tools) seguras para agentes, integrarlas con APIs reales y controlar la ejecución de acciones.',
    topics: ['Herramientas', 'Function calling', 'Integración con APIs', 'Ejecución de acciones'],
    review: 'Repaso semanas 12, 17 y 22: APIs, reintentos y tool use.',
    lessons: [
      {
        id: 'w26l1',
        title: 'Diseñar buenas herramientas',
        minutes: 85,
        sections: [
          {
            heading: '1. Una herramienta es una API para el modelo',
            body: [
              'El modelo elige herramientas leyendo su nombre, descripción y parámetros. Una descripción ambigua produce llamadas incorrectas. Escribilas como documentación para una persona nueva: qué hace, cuándo usarla, cuándo NO usarla, qué devuelve.',
              'Pocas herramientas bien definidas funcionan mejor que muchas parecidas.',
            ],
          },
          {
            heading: '2. Herramientas de lectura vs. de acción',
            body: [
              'Lectura (buscar_pedido, consultar_politica): bajo riesgo, pueden ejecutarse automáticamente.',
              'Acción (emitir_reembolso, enviar_email, actualizar_registro): modifican el mundo. Deben validar parámetros, tener límites (monto máximo) y, según el riesgo, requerir aprobación humana.',
            ],
          },
          {
            heading: '3. Validación y errores',
            body: [
              'Validá tipos y rangos antes de ejecutar. Devolvé errores claros al modelo ("pedido_id inexistente") para que pueda corregirse, en lugar de lanzar excepciones que rompan el agente.',
              'Hacé las acciones idempotentes cuando sea posible (una clave de operación evita duplicar un reembolso si se reintenta).',
            ],
            code: { lang: 'python', code: `def emitir_reembolso(pedido_id: int, monto: float, motivo: str) -> dict:\n    if monto <= 0 or monto > 200:\n        return {"ok": False, "error": "Monto fuera de rango permitido (0-200). Requiere aprobación humana."}\n    pedido = db_buscar_pedido(pedido_id)\n    if not pedido:\n        return {"ok": False, "error": f"Pedido {pedido_id} inexistente"}\n    if monto > pedido["total"]:\n        return {"ok": False, "error": "El monto supera el total del pedido"}\n    return {"ok": True, "estado": "pendiente_aprobacion", "pedido_id": pedido_id}` },
          },
          {
            heading: '4. Integración con APIs reales',
            body: ['Una tool suele envolver una llamada HTTP: timeout, reintentos para errores transitorios, credenciales desde variables de entorno y respuesta resumida (no devuelvas al modelo 5000 líneas de JSON: elegí los campos útiles para ahorrar tokens).'],
          },
          {
            heading: '5. Agentes en n8n',
            body: ['n8n tiene un nodo "AI Agent" al que se conectan un modelo de chat (incluye opción Ollama), herramientas (otros nodos o sub-workflows) y memoria. Es una buena forma de prototipar agentes visualmente y combinarlos con tus workflows.'],
          },
        ],
        keyConcepts: [
          { term: 'Tool description', def: 'Texto que explica al modelo qué hace una herramienta y cuándo usarla.' },
          { term: 'Tool de lectura / acción', def: 'Consulta información / modifica sistemas.' },
          { term: 'Idempotencia', def: 'Repetir la operación no cambia el resultado.' },
          { term: 'Guardrail', def: 'Regla o límite que restringe lo que el agente puede hacer.' },
        ],
        simpleExample: 'Tool "consultar_clima(ciudad)" con descripción "Usala solo cuando pregunten por el clima actual".',
        realExample: 'Un agente de soporte tiene 4 tools: buscar_pedido y consultar_politica (automáticas), crear_ticket (automática, idempotente) y emitir_reembolso (siempre queda pendiente de aprobación humana).',
        analogy: 'Las herramientas son las llaves que le das a un empleado nuevo: le das la del depósito, no la de la caja fuerte, hasta que gane confianza.',
        commonErrors: ['Descripciones vagas o duplicadas.', 'Devolver respuestas enormes al modelo.', 'Acciones sin límites ni validación.'],
        bestPractices: ['Descripciones con "cuándo usar" y "cuándo no".', 'Errores informativos.', 'Aprobación humana para acciones de riesgo.'],
        summary: ['Tools = API para el modelo.', 'Lectura automática; acción controlada.', 'Validar, limitar, registrar.'],
        comprehension: [{ q: '¿Por qué conviene devolver un error descriptivo en lugar de lanzar una excepción dentro de una tool?', a: 'Para que el agente pueda entender qué salió mal y corregir (pedir otro dato, elegir otra herramienta) en lugar de detenerse.' }],
        exercise: {
          statement: 'Completá validar_args(schema, args) que verifique que estén todos los campos "required" y que los tipos coincidan ("integer" → int, "number" → int o float, "string" → str). Devolvé una lista de errores (vacía si es válido).',
          hints: ['schema["properties"][campo]["type"]', 'isinstance(v, (int, float))', 'Ojo: bool es subclase de int en Python.'],
          solution: `TIPOS = {"integer": (int,), "number": (int, float), "string": (str,)}\n\ndef validar_args(schema, args):\n    errores = []\n    for campo in schema.get("required", []):\n        if campo not in args:\n            errores.append(f"falta {campo}")\n    for campo, valor in args.items():\n        prop = schema["properties"].get(campo)\n        if prop is None:\n            errores.append(f"campo desconocido {campo}")\n            continue\n        tipos = TIPOS.get(prop["type"], (object,))\n        if isinstance(valor, bool) or not isinstance(valor, tipos):\n            errores.append(f"tipo inválido {campo}")\n    return errores`,
          starter: `def validar_args(schema, args):\n    return []`,
          tests: `s = {"properties": {"pedido_id": {"type": "integer"}, "monto": {"type": "number"}}, "required": ["pedido_id"]}\nassert validar_args(s, {"pedido_id": 3, "monto": 9.5}) == []\nassert validar_args(s, {"monto": 1}) == ["falta pedido_id"]\nassert validar_args(s, {"pedido_id": "3"}) == ["tipo inválido pedido_id"]`,
        },
      },
    ],
    resources: [
      { ref: 'hfagents', why: 'Unidad sobre herramientas (tools) y su definición.', minutes: 120 },
      { ref: 'n8ndocs', why: 'Nodo AI Agent y "Tools" (incluye cómo conectar Ollama).', minutes: 60 },
      { ref: 'anthropicdocs', why: 'Tool use: buenas prácticas para definir herramientas.', minutes: 45 },
    ],
    docs: [{ ref: 'oaidev', why: 'Function calling: ejemplos de definiciones de herramientas.' }],
    exercises: [
      { id: 'w26e1', title: 'Definir 4 tools', level: 'intermedia', kind: 'libre', statement: 'Escribí las definiciones (nombre, descripción, JSON Schema) de 4 herramientas para un agente de operaciones de ecommerce, marcando cuáles requieren aprobación.', hints: ['Incluí "cuándo NO usar" en la descripción.'] },
      { id: 'w26e2', title: 'Agente en n8n', level: 'avanzada', kind: 'libre', statement: 'Construí en n8n un AI Agent con modelo local (Ollama) y 2 tools: consultar una planilla de pedidos y consultar una política. Probalo con 5 preguntas.', hints: ['Los modelos chicos fallan más en tool use: anotá los errores.'] },
    ],
    challenge: {
      title: 'Toolkit seguro para operaciones',
      context: 'Vas a construir las herramientas que usará tu agente del Proyecto 5.',
      task: ['Implementá en Python 3 tools de lectura y 1 de acción.', 'Validación de argumentos, errores descriptivos y límites.', 'La tool de acción devuelve "pendiente_aprobacion" en lugar de ejecutar.', 'Tests básicos para cada tool.'],
      deliverable: 'Módulo tools.py + tests.',
    },
    deliverable: 'Toolkit de herramientas con validación.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Herramientas con validación y errores descriptivos.', 'Separar lectura y acción con criterio de riesgo.'],
    questions: [
      mcq('q26-1', '¿Qué usa el modelo para decidir qué herramienta llamar?', ['El código fuente de la función', 'El nombre, la descripción y el esquema de parámetros', 'El azar', 'La base de datos'], 1, 'Por eso las descripciones deben ser claras.', { concept: 'Herramientas' }),
      tf('q26-2', 'Una herramienta que emite reembolsos debería ejecutarse sin límites para no frenar al agente.', false, 'Acciones de riesgo requieren límites y aprobación.', { concept: 'Ejecución de acciones' }),
      mcq('q26-3', '¿Qué conviene devolver si el pedido no existe?', ['Lanzar una excepción que detenga todo', 'Un error descriptivo para que el agente pueda corregir', 'Nada', 'Un pedido inventado'], 1, 'El agente puede reaccionar.', { concept: 'Herramientas', d: 'intermedia' }),
      mcq('q26-4', '¿Qué es un guardrail?', ['Un modelo', 'Una regla o límite que restringe lo que el agente puede hacer', 'Un tipo de token', 'Un webhook'], 1, 'Protección.', { concept: 'Ejecución de acciones' }),
      tf('q26-5', 'Devolver al modelo JSONs enormes de una API aumenta costos y puede empeorar su razonamiento.', true, 'Resumí a los campos útiles.', { concept: 'Integración con APIs', d: 'intermedia' }),
      mcq('q26-6', '¿Qué herramienta es de bajo riesgo?', ['emitir_reembolso', 'borrar_cliente', 'consultar_politica', 'enviar_email_masivo'], 2, 'Solo lectura.', { concept: 'Herramientas' }),
      mcq('q26-7', 'n8n permite construir agentes visualmente con el nodo...', ['Switch', 'AI Agent', 'Merge', 'Wait'], 1, 'AI Agent con modelo, tools y memoria.', { concept: 'Integración con APIs' }),
      py('q26-8', 'Completá requiere_aprobacion(tool, args) que devuelva True si tool es "emitir_reembolso" y args["monto"] > 50, o si tool está en {"borrar_registro", "enviar_email_masivo"}.', `def requiere_aprobacion(tool, args):\n    return False`, `assert requiere_aprobacion("emitir_reembolso", {"monto": 80})\nassert not requiere_aprobacion("emitir_reembolso", {"monto": 20})\nassert requiere_aprobacion("borrar_registro", {})\nassert not requiere_aprobacion("buscar_pedido", {"id": 1})`, `SIEMPRE = {"borrar_registro", "enviar_email_masivo"}\n\ndef requiere_aprobacion(tool, args):\n    if tool in SIEMPRE:\n        return True\n    if tool == "emitir_reembolso" and args.get("monto", 0) > 50:\n        return True\n    return False`, 'Política de aprobación basada en riesgo.', { concept: 'Ejecución de acciones', hints: ['Un set para las que siempre requieren aprobación.'] }),
      tf('q26-9', 'Es mejor tener muchas herramientas con funciones superpuestas para darle opciones al modelo.', false, 'Pocas tools claras reducen errores de selección.', { concept: 'Herramientas' }),
      mcq('q26-10', 'Una acción idempotente...', ['Se ejecuta una sola vez en la vida', 'Produce el mismo resultado aunque se repita', 'No hace nada', 'Es siempre de lectura'], 1, 'Protege ante reintentos.', { concept: 'Ejecución de acciones', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 27 ─────────────────────────────
  {
    n: 27,
    stage: 5,
    title: 'Memoria, contexto y RAG avanzado',
    objective: 'Dar memoria a los agentes (corto y largo plazo), gestionar el contexto de forma eficiente y mejorar la recuperación de información.',
    topics: ['Memoria', 'Contexto', 'Recuperación de información', 'RAG avanzado'],
    review: 'Repaso semana 23: el pipeline básico de RAG.',
    lessons: [
      {
        id: 'w27l1',
        title: 'Memoria y contexto de agentes',
        minutes: 85,
        sections: [
          {
            heading: '1. Memoria de corto plazo',
            body: ['Es el historial de la conversación o de los pasos actuales que se envía en cada request. Crece con cada interacción, así que hay que gestionarlo: ventana deslizante (últimos N mensajes), resumen de lo anterior, o eliminar resultados de herramientas ya usados.'],
          },
          {
            heading: '2. Memoria de largo plazo',
            body: ['Información que persiste entre sesiones: preferencias del cliente, casos anteriores, decisiones. Se guarda en una base (SQL o vectorial) y se recupera cuando es relevante. Es RAG aplicado a la historia del usuario. Cuidado con la privacidad: guardá solo lo necesario y con consentimiento.'],
          },
          {
            heading: '3. Ingeniería de contexto',
            body: ['El contexto es un recurso escaso: todo lo que agregues compite por la atención del modelo y cuesta tokens. Incluí lo relevante para el paso actual: instrucciones, estado de la tarea, resultados recientes, fragmentos recuperados. Ordená y etiquetá cada sección.'],
          },
          {
            heading: '4. RAG avanzado',
            body: [
              'Búsqueda híbrida: combinar búsqueda por palabras clave (útil para códigos, nombres propios) con búsqueda semántica.',
              'Filtros por metadatos: recuperar solo documentos vigentes, del país o del cliente correspondiente.',
              'Reescritura de consulta: el LLM reformula la pregunta ambigua antes de buscar.',
              'Re-ranking: recuperar 20 candidatos y reordenarlos con un modelo más preciso para quedarse con los 3 mejores.',
              'Evaluar con métricas de recuperación (¿el fragmento correcto está en el top-k?) y de respuesta (fidelidad, relevancia).',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Memoria de corto plazo', def: 'Historial de la sesión actual en el contexto.' },
          { term: 'Memoria de largo plazo', def: 'Información persistente recuperada entre sesiones.' },
          { term: 'Ventana deslizante', def: 'Conservar solo los últimos N mensajes.' },
          { term: 'Búsqueda híbrida', def: 'Palabras clave + semántica.' },
          { term: 'Re-ranking', def: 'Reordenar candidatos recuperados con un modelo más preciso.' },
          { term: 'Recall@k', def: 'Proporción de casos donde el documento correcto está en el top-k.' },
        ],
        simpleExample: 'El asistente recuerda que el cliente prefiere ser contactado por email porque lo guardó en su perfil (memoria de largo plazo).',
        realExample: 'Un agente de soporte B2B recupera los 3 tickets anteriores más similares del mismo cliente y la política vigente de su plan, filtrando por fecha, antes de proponer una solución.',
        analogy: 'Corto plazo es la libreta de notas de la llamada actual; largo plazo es el legajo del cliente en el archivo.',
        commonErrors: ['Enviar todo el historial siempre.', 'Guardar datos personales sin necesidad.', 'No filtrar documentos vencidos.'],
        bestPractices: ['Resumir historial largo.', 'Metadatos y filtros.', 'Medir recall@k.'],
        summary: ['Memoria corta = contexto gestionado.', 'Memoria larga = recuperación persistente.', 'RAG avanzado mejora la recuperación.'],
        comprehension: [{ q: '¿Cuándo es útil la búsqueda por palabras clave además de la semántica?', a: 'Con códigos, números de pedido, nombres propios o términos exactos que los embeddings pueden no distinguir bien.' }],
        exercise: {
          statement: 'Completá recortar_historial(mensajes, max_mensajes) que conserve siempre el primer mensaje si es de rol "system" y los últimos max_mensajes del resto.',
          hints: ['Separá el system del resto.', 'resto[-max_mensajes:]'],
          solution: `def recortar_historial(mensajes, max_mensajes):\n    if not mensajes:\n        return []\n    if mensajes[0]["role"] == "system":\n        return [mensajes[0]] + mensajes[1:][-max_mensajes:]\n    return mensajes[-max_mensajes:]`,
          starter: `def recortar_historial(mensajes, max_mensajes):\n    return mensajes`,
          tests: `m = [{"role":"system","c":0}] + [{"role":"user","c":i} for i in range(1,6)]\nr = recortar_historial(m, 2)\nassert [x["c"] for x in r] == [0, 4, 5]\nassert recortar_historial([], 3) == []`,
        },
      },
    ],
    resources: [
      { ref: 'lcacademy', why: 'Curso "Introduction to LangGraph": módulos de memoria y estado.', minutes: 150 },
      { ref: 'llamaindex', why: 'Guías de recuperación avanzada (hybrid search, reranking, metadata filters).', minutes: 60 },
    ],
    docs: [{ ref: 'chroma', why: 'Filtros "where" por metadatos.' }],
    exercises: [
      { id: 'w27e1', title: 'Memoria de cliente', level: 'intermedia', kind: 'libre', statement: 'Agregá a tu agente una tabla SQLite "preferencias" y una tool para leerla. Probá que la respuesta cambie según la preferencia.', hints: ['Guardá solo datos necesarios.'] },
      { id: 'w27e2', title: 'Recall@3', level: 'avanzada', kind: 'python', statement: 'recall_at_k(resultados, correctos, k) recibe una lista de listas de ids recuperados y la lista de ids correctos (uno por consulta). Devuelve la proporción (0–1) de consultas cuyo correcto está en los primeros k.', hints: ['zip(resultados, correctos)', 'correcto in recuperados[:k]'], solution: `def recall_at_k(resultados, correctos, k):\n    if not correctos:\n        return 0\n    aciertos = sum(1 for rec, c in zip(resultados, correctos) if c in rec[:k])\n    return aciertos / len(correctos)`, starter: `def recall_at_k(resultados, correctos, k):\n    return 0`, tests: `assert recall_at_k([["a","b","c"],["x","y","z"]], ["c","q"], 3) == 0.5\nassert recall_at_k([["a","b"]], ["b"], 1) == 0` },
    ],
    challenge: {
      title: 'RAG mejorado con evaluación',
      context: 'Tu asistente del Proyecto 4 falla en preguntas con números de pedido y documentos viejos.',
      task: ['Agregá metadatos de vigencia y filtralos.', 'Implementá búsqueda híbrida simple (palabra clave + semántica).', 'Medí recall@3 antes y después con 15 preguntas.'],
      deliverable: 'Código + tabla comparativa antes/después.',
    },
    deliverable: 'Mejoras de RAG medidas.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Mejora medible de recall@3.', 'Explicar memoria corta vs larga.'],
    questions: [
      mcq('q27-1', 'La memoria de corto plazo de un agente es...', ['Su entrenamiento', 'El historial que se envía en el contexto de la sesión actual', 'Una base de datos permanente', 'El disco rígido'], 1, 'Vive en el contexto.', { concept: 'Memoria' }),
      tf('q27-2', 'Enviar siempre todo el historial es la mejor estrategia aunque la conversación sea muy larga.', false, 'Aumenta costos y puede exceder el contexto; resumí o recortá.', { concept: 'Contexto' }),
      mcq('q27-3', 'La búsqueda híbrida combina...', ['Dos modelos de lenguaje', 'Búsqueda por palabras clave y semántica', 'SQL y Excel', 'Imágenes y texto'], 1, 'Mejor con términos exactos.', { concept: 'RAG avanzado' }),
      mcq('q27-4', 'Re-ranking significa...', ['Volver a entrenar', 'Reordenar candidatos recuperados con un modelo más preciso', 'Borrar documentos', 'Subir la temperatura'], 1, 'Mejora precisión del top-k.', { concept: 'RAG avanzado', d: 'intermedia' }),
      mcq('q27-5', 'Para no responder con políticas vencidas conviene...', ['Más temperatura', 'Filtrar por metadatos de vigencia', 'Más chunks', 'Nada'], 1, 'Filtros por metadatos.', { concept: 'Recuperación de información' }),
      tf('q27-6', 'La memoria de largo plazo debe respetar privacidad: guardar solo lo necesario y con consentimiento.', true, 'Principio de minimización.', { concept: 'Memoria' }),
      mcq('q27-7', 'Recall@3 mide...', ['La velocidad', 'Si el documento correcto aparece entre los 3 primeros recuperados', 'El costo', 'La longitud'], 1, 'Métrica de recuperación.', { concept: 'Recuperación de información', d: 'intermedia' }),
      py('q27-8', 'Completá filtrar_vigentes(docs, fecha) que devuelva los docs cuyo "vigente_hasta" (texto AAAA-MM-DD) sea mayor o igual a fecha.', `def filtrar_vigentes(docs, fecha):\n    return docs`, `d=[{"id":1,"vigente_hasta":"2026-12-31"},{"id":2,"vigente_hasta":"2025-01-01"}]\nassert [x["id"] for x in filtrar_vigentes(d,"2026-03-01")] == [1]`, `def filtrar_vigentes(docs, fecha):\n    return [d for d in docs if d["vigente_hasta"] >= fecha]`, 'Las fechas ISO se pueden comparar como texto.', { concept: 'Recuperación de información', hints: ['Las fechas AAAA-MM-DD se ordenan bien como strings.'] }),
      mcq('q27-9', 'Si la pregunta del usuario es ambigua, una técnica útil antes de buscar es...', ['Ignorarla', 'Reescribir la consulta con el LLM', 'Subir max_tokens', 'Usar más chunks'], 1, 'Query rewriting.', { concept: 'RAG avanzado', d: 'intermedia' }),
      tf('q27-10', 'Agregar más información al contexto siempre mejora la respuesta.', false, 'Información irrelevante distrae al modelo y cuesta más.', { concept: 'Contexto', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 28 ─────────────────────────────
  {
    n: 28,
    stage: 5,
    title: 'Agentes multi-step, orquestación y supervisión humana',
    objective: 'Orquestar agentes de varios pasos con estados, puntos de aprobación humana, permisos y controles de seguridad.',
    topics: ['Agentes multi-step', 'Orquestación', 'Supervisión humana', 'Seguridad', 'Permisos'],
    review: 'Repaso semanas 17 y 26: errores, reintentos y herramientas de acción.',
    lessons: [
      {
        id: 'w28l1',
        title: 'Orquestar con control',
        minutes: 90,
        sections: [
          {
            heading: '1. Estado explícito',
            body: ['Un agente multi-step debe tener un estado que se pueda inspeccionar: objetivo, plan, paso actual, resultados, acciones pendientes de aprobación. Guardarlo (por ejemplo en SQLite) permite pausar, reanudar y auditar.'],
          },
          {
            heading: '2. Patrones de orquestación',
            body: [
              'Cadena (prompt chaining): pasos fijos donde la salida de uno es la entrada del siguiente.',
              'Enrutador (router): un clasificador decide qué sub-flujo o agente especializado atiende.',
              'Orquestador-trabajadores: un agente divide la tarea y delega en otros.',
              'Evaluador-optimizador: un paso genera y otro revisa con criterios, iterando.',
              'Elegí el patrón más simple que resuelva el problema.',
            ],
          },
          {
            heading: '3. Human-in-the-loop',
            body: [
              'El agente propone; la persona aprueba, rechaza o edita. Se implementa como un estado "esperando_aprobacion" con la acción propuesta, su justificación y los datos usados. Al aprobar, se ejecuta y se registra quién aprobó.',
              'En n8n: nodos de espera (Wait for webhook / formulario de aprobación) o envío de botones por Slack/Telegram. En LangGraph: interrupciones (interrupts).',
            ],
          },
          {
            heading: '4. Permisos y seguridad',
            body: [
              'Mínimo privilegio: cada agente solo con las tools que necesita. Credenciales de servicio con permisos limitados. Listas de acciones permitidas (allowlist) en lugar de prohibidas.',
              'Tratá todo contenido externo (emails, webs, documentos) como datos no confiables: nunca como instrucciones. Límites de monto, cantidad y frecuencia. Registro completo de decisiones (audit log).',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Orquestación', def: 'Coordinación de pasos, agentes y herramientas.' },
          { term: 'Estado', def: 'Información persistente sobre el progreso de la tarea.' },
          { term: 'Router', def: 'Componente que decide qué flujo atiende una solicitud.' },
          { term: 'Human-in-the-loop', def: 'Aprobación humana integrada en el flujo.' },
          { term: 'Allowlist', def: 'Lista explícita de acciones permitidas.' },
          { term: 'Audit log', def: 'Registro de quién hizo qué y cuándo.' },
        ],
        simpleExample: 'Estado: {"paso": 3, "accion_propuesta": "reembolso 80 USD", "estado": "esperando_aprobacion"}.',
        realExample: 'Un agente de compras propone órdenes a proveedores; las menores a 500 USD se ejecutan, las mayores llegan por Slack al responsable con botones Aprobar/Rechazar y todo queda registrado.',
        analogy: 'Orquestar agentes es como coordinar una cocina: cada cocinero (agente) tiene su estación y herramientas, y el jefe (persona) aprueba los platos antes de salir.',
        commonErrors: ['Estado implícito solo en el historial del chat.', 'Aprobaciones sin contexto suficiente para decidir.', 'Un único agente con todas las herramientas.'],
        bestPractices: ['Estado persistente y legible.', 'Solicitudes de aprobación con justificación y datos.', 'Allowlist + límites + audit log.'],
        summary: ['Estado explícito permite pausar y auditar.', 'Patrón más simple posible.', 'Persona aprueba acciones de riesgo.'],
        comprehension: [{ q: '¿Qué debe incluir una solicitud de aprobación para que la persona decida bien?', a: 'La acción propuesta, su justificación, los datos usados, el impacto (monto, cliente) y opciones claras de aprobar/rechazar/editar.' }],
        exercise: {
          statement: 'Completá la máquina de estados avanzar(estado, evento): "propuesta" + "aprobar" → "ejecutada"; "propuesta" + "rechazar" → "rechazada"; "nueva" + "proponer" → "propuesta". Cualquier otra transición lanza ValueError.',
          hints: ['Diccionario de transiciones con tuplas (estado, evento).'],
          solution: `TRANSICIONES = {\n    ("nueva", "proponer"): "propuesta",\n    ("propuesta", "aprobar"): "ejecutada",\n    ("propuesta", "rechazar"): "rechazada",\n}\n\ndef avanzar(estado, evento):\n    clave = (estado, evento)\n    if clave not in TRANSICIONES:\n        raise ValueError(f"Transición inválida: {estado} + {evento}")\n    return TRANSICIONES[clave]`,
          starter: `def avanzar(estado, evento):\n    return estado`,
          tests: `assert avanzar("nueva","proponer") == "propuesta"\nassert avanzar("propuesta","aprobar") == "ejecutada"\ntry:\n    avanzar("nueva","aprobar"); assert False\nexcept ValueError:\n    pass`,
        },
      },
    ],
    resources: [
      { ref: 'lcacademy', why: 'LangGraph: módulos de human-in-the-loop e interrupciones.', minutes: 150 },
      { ref: 'hfagents', why: 'Unidades sobre frameworks y casos de uso.', minutes: 60 },
      { ref: 'oaiagents', why: 'Secciones sobre orquestación y guardrails.', minutes: 30 },
    ],
    docs: [{ ref: 'n8ndocs', why: 'Nodo Wait (resume on webhook / form) para aprobaciones.' }],
    exercises: [
      { id: 'w28e1', title: 'Aprobación en n8n', level: 'intermedia', kind: 'libre', statement: 'Workflow que propone una acción, envía la solicitud de aprobación (email/Telegram con enlace) y espera con Wait hasta que se apruebe o rechace.', hints: ['Wait → Resume: On Webhook Call.'] },
      { id: 'w28e2', title: 'Audit log', level: 'intermedia', kind: 'libre', statement: 'Agregá a tu agente una tabla audit_log (fecha, paso, tool, args, resultado, aprobado_por).', hints: ['Registrá antes y después de cada acción.'] },
    ],
    challenge: {
      title: 'Orquestación de solicitudes internas',
      context: 'El área de operaciones recibe solicitudes variadas (accesos, compras pequeñas, cambios de datos).',
      task: ['Router que clasifica la solicitud.', 'Sub-flujo por tipo con herramientas específicas.', 'Aprobación humana para compras y cambios de datos.', 'Estado persistente y audit log.'],
      deliverable: 'Diseño + implementación parcial (Python o n8n).',
    },
    deliverable: 'Orquestación con aprobación humana y audit log.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Flujo de aprobación funcionando.', 'Explicar el patrón elegido y por qué.'],
    questions: [
      mcq('q28-1', '¿Qué patrón usa un clasificador para decidir qué sub-flujo atiende la solicitud?', ['Evaluador-optimizador', 'Router (enrutador)', 'Cadena', 'Memoria'], 1, 'Router.', { concept: 'Orquestación' }),
      tf('q28-2', 'Guardar el estado del agente permite pausar, reanudar y auditar.', true, 'Estado explícito y persistente.', { concept: 'Agentes multi-step' }),
      mcq('q28-3', 'Una allowlist es...', ['Lista de acciones prohibidas', 'Lista explícita de acciones permitidas', 'Lista de usuarios', 'Lista de prompts'], 1, 'Más segura que prohibir casos.', { concept: 'Permisos' }),
      mcq('q28-4', 'El contenido de un email que procesa el agente debe tratarse como...', ['Instrucciones confiables', 'Datos no confiables', 'Código', 'Credenciales'], 1, 'Mitiga prompt injection.', { concept: 'Seguridad' }),
      mcq('q28-5', 'En human-in-the-loop, el agente...', ['Ejecuta todo y luego avisa', 'Propone y espera la aprobación para acciones de riesgo', 'No hace nada', 'Pide la contraseña del usuario'], 1, 'La persona decide.', { concept: 'Supervisión humana' }),
      tf('q28-6', 'Es preferible un único agente con acceso a todas las herramientas de la empresa.', false, 'Mínimo privilegio: agentes con herramientas acotadas.', { concept: 'Permisos' }),
      mcq('q28-7', 'Un audit log registra...', ['Solo errores', 'Quién hizo qué, cuándo, con qué datos y quién aprobó', 'Contraseñas', 'Prompts del sistema solamente'], 1, 'Trazabilidad.', { concept: 'Seguridad' }),
      mcq('q28-8', 'El patrón evaluador-optimizador consiste en...', ['Un paso genera y otro revisa iterativamente', 'Enrutar solicitudes', 'Guardar memoria', 'Ejecutar en paralelo'], 0, 'Generar → evaluar → mejorar.', { concept: 'Orquestación', d: 'intermedia' }),
      py('q28-9', 'Completá puede_ejecutar(agente, tool, permisos) que devuelva True solo si tool está en permisos[agente]. Si el agente no existe en permisos, False.', `def puede_ejecutar(agente, tool, permisos):\n    return True`, `p = {"soporte": {"buscar_pedido","crear_ticket"}}\nassert puede_ejecutar("soporte","crear_ticket",p)\nassert not puede_ejecutar("soporte","emitir_reembolso",p)\nassert not puede_ejecutar("ventas","buscar_pedido",p)`, `def puede_ejecutar(agente, tool, permisos):\n    return tool in permisos.get(agente, set())`, 'Allowlist por agente.', { concept: 'Permisos', hints: ['permisos.get(agente, set())'] }),
      tf('q28-10', 'Una solicitud de aprobación sin justificación ni datos dificulta la supervisión humana efectiva.', true, 'La persona necesita contexto para decidir.', { concept: 'Supervisión humana' }),
    ],
  },

  // ───────────────────────────── SEMANA 29 ─────────────────────────────
  {
    n: 29,
    stage: 5,
    title: 'Evaluación, fiabilidad y costos de agentes',
    objective: 'Evaluar agentes de forma sistemática, manejar errores, controlar costos y entregar el Proyecto 5.',
    topics: ['Evaluación de agentes', 'Manejo de errores', 'Costos', 'Fiabilidad', 'Proyecto final'],
    review: 'Repaso integral de la etapa 5.',
    lessons: [
      {
        id: 'w29l1',
        title: 'Medir y hacer confiable un agente',
        minutes: 85,
        sections: [
          {
            heading: '1. Qué evaluar',
            body: [
              'Resultado: ¿cumplió el objetivo? (tasa de éxito). Trayectoria: ¿usó las herramientas correctas en un orden razonable? Seguridad: ¿respetó límites y pidió aprobación cuando correspondía? Eficiencia: pasos, tokens, tiempo y costo por tarea.',
              'Armá escenarios de prueba con el resultado esperado, incluyendo casos de error (API caída, datos faltantes) y de manipulación.',
            ],
          },
          {
            heading: '2. Fiabilidad',
            body: ['Los LLM son probabilísticos: el mismo escenario puede dar resultados distintos. Ejecutá cada escenario varias veces y medí la tasa de éxito. Temperatura baja, herramientas claras, validación de salidas y fallbacks (si falla, derivar a humano) aumentan la fiabilidad.'],
          },
          {
            heading: '3. Manejo de errores en agentes',
            body: ['Errores de herramienta → mensaje descriptivo al agente, reintento si es transitorio. Errores del modelo (JSON inválido, tool inexistente) → validación y reintento acotado. Bucles → límite de pasos. Siempre un final controlado: respuesta, derivación o error informado.'],
          },
          {
            heading: '4. Costos',
            body: ['Costo por tarea = suma de tokens de todas las llamadas del bucle. Reducilo con: modelos pequeños para pasos simples (router), recorte de contexto, resultados de tools resumidos, caché, y límites de presupuesto por tarea.'],
          },
        ],
        keyConcepts: [
          { term: 'Tasa de éxito', def: 'Porcentaje de escenarios resueltos correctamente.' },
          { term: 'Trayectoria', def: 'Secuencia de pasos y herramientas usadas.' },
          { term: 'Fallback', def: 'Plan alternativo cuando algo falla.' },
          { term: 'Costo por tarea', def: 'Suma del costo de todas las llamadas para completar una tarea.' },
        ],
        simpleExample: 'Escenario: "pedido 999 inexistente" → esperado: el agente informa que no existe y ofrece derivar; no inventa un estado.',
        realExample: 'Un equipo ejecuta 40 escenarios × 3 repeticiones cada noche; si la tasa de éxito baja del 90% o el costo promedio sube más de 20%, se bloquea el despliegue de cambios.',
        analogy: 'Evaluar un agente es como evaluar a una persona en período de prueba: no alcanza con una buena tarea, mirás consistencia, criterio y costo.',
        commonErrors: ['Evaluar solo el caso feliz.', 'Ejecutar cada escenario una sola vez.', 'No medir costos.'],
        bestPractices: ['Escenarios con casos de error y manipulación.', 'Repeticiones y tasa de éxito.', 'Presupuesto por tarea.'],
        summary: ['Evaluá resultado, trayectoria, seguridad y costo.', 'Repetí para medir fiabilidad.', 'Final siempre controlado.'],
        comprehension: [{ q: '¿Por qué ejecutar el mismo escenario varias veces?', a: 'Porque los LLM son probabilísticos; una sola ejecución no muestra la fiabilidad real.' }],
        exercise: {
          statement: 'Completá resumen_eval(resultados) donde resultados es una lista de dicts {"escenario", "exito": bool, "costo": float}. Devolvé {"tasa_exito": %, "costo_promedio": float, "fallidos": [escenarios sin repetir, ordenados]}. Porcentaje y costo redondeados a 2 decimales.',
          hints: ['sum(r["exito"] for r in resultados)', 'sorted(set(...))'],
          solution: `def resumen_eval(resultados):\n    if not resultados:\n        return {"tasa_exito": 0, "costo_promedio": 0, "fallidos": []}\n    n = len(resultados)\n    exitos = sum(1 for r in resultados if r["exito"])\n    costo = sum(r["costo"] for r in resultados) / n\n    fallidos = sorted({r["escenario"] for r in resultados if not r["exito"]})\n    return {"tasa_exito": round(exitos / n * 100, 2), "costo_promedio": round(costo, 2), "fallidos": fallidos}`,
          starter: `def resumen_eval(resultados):\n    return {}`,
          tests: `rs=[{"escenario":"a","exito":True,"costo":0.1},{"escenario":"b","exito":False,"costo":0.3},{"escenario":"b","exito":False,"costo":0.2},{"escenario":"c","exito":True,"costo":0.2}]\nassert resumen_eval(rs) == {"tasa_exito":50.0,"costo_promedio":0.2,"fallidos":["b"]}`,
        },
      },
    ],
    resources: [
      { ref: 'hfagents', why: 'Unidad de evaluación/observabilidad de agentes y unidad final.', minutes: 120 },
      { ref: 'lcacademy', why: 'Contenido sobre evaluación (LangSmith tiene plan gratuito limitado; es opcional).', minutes: 60 },
    ],
    docs: [{ ref: 'anthropicdocs', why: 'Guía sobre crear evaluaciones empíricas (test cases).' }],
    exercises: [
      { id: 'w29e1', title: 'Suite de escenarios', level: 'intermedia', kind: 'libre', statement: 'Escribí 15 escenarios para tu agente (10 normales, 3 de error, 2 de manipulación) con resultado esperado.', hints: ['Incluí "API caída".'] },
      { id: 'w29e2', title: 'Proyecto 5', level: 'avanzada', kind: 'libre', statement: 'Desarrollá el Proyecto 5 completo (ver Proyectos).', hints: ['Reutilizá tools de la semana 26 y orquestación de la 28.'] },
    ],
    challenge: {
      title: 'Agente de operaciones (proyecto de etapa)',
      context: 'Operaciones de un ecommerce: solicitudes de clientes y del equipo interno sobre pedidos, reembolsos y datos.',
      task: ['Analizar la solicitud y planificar.', 'Consultar información con tools de lectura.', 'Proponer acciones y ejecutarlas solo si están autorizadas.', 'Supervisión humana para acciones de riesgo.', 'Evaluación con escenarios, costos y README.'],
      deliverable: 'Proyecto 5 completo (ver checklist en Proyectos).',
    },
    deliverable: 'Proyecto 5 con evaluación.',
    hours: HPROJ,
    passCriteria: ['Evaluación ≥ 80/100.', 'Proyecto 5 con todos los entregables obligatorios.', 'Tasa de éxito ≥ 80% en tus escenarios, sin violaciones de seguridad.'],
    questions: [
      mcq('q29-1', '¿Qué evalúa la "trayectoria" de un agente?', ['El costo', 'Las herramientas y pasos que usó', 'La interfaz', 'El idioma'], 1, 'Cómo llegó al resultado.', { concept: 'Evaluación de agentes' }),
      tf('q29-2', 'Un escenario ejecutado una vez con éxito demuestra que el agente es fiable.', false, 'Hay variabilidad: repetí y medí.', { concept: 'Fiabilidad' }),
      mcq('q29-3', 'Si la API de pedidos está caída, el agente debería...', ['Inventar el estado', 'Informar el problema y derivar o reintentar según política', 'Reintentar infinitamente', 'Borrar el pedido'], 1, 'Final controlado.', { concept: 'Manejo de errores' }),
      mcq('q29-4', '¿Qué reduce el costo por tarea?', ['Modelos grandes para todo', 'Modelos pequeños para pasos simples y contexto recortado', 'Más pasos', 'Temperatura 1'], 1, 'Optimización de costos.', { concept: 'Costos' }),
      tf('q29-5', 'Los escenarios de evaluación deben incluir intentos de manipulación.', true, 'Verifican la seguridad.', { concept: 'Evaluación de agentes' }),
      mcq('q29-6', 'Un fallback es...', ['Un error', 'Un plan alternativo cuando algo falla', 'Un tipo de modelo', 'Una métrica'], 1, 'Ej.: derivar a humano.', { concept: 'Fiabilidad' }),
      py('q29-7', 'Completá costo_tarea(llamadas, p_in, p_out) donde llamadas es una lista de (tokens_in, tokens_out) y los precios son por millón. Redondeá a 4 decimales.', `def costo_tarea(llamadas, p_in, p_out):\n    return 0`, `assert costo_tarea([(1000, 200), (1500, 300)], 3, 15) == 0.0150\nassert costo_tarea([], 3, 15) == 0`, `def costo_tarea(llamadas, p_in, p_out):\n    total = sum(ti / 1e6 * p_in + to / 1e6 * p_out for ti, to in llamadas)\n    return round(total, 4)`, 'Cada vuelta del bucle suma costo.', { concept: 'Costos', hints: ['Sumá el costo de cada llamada.'] }),
      mcq('q29-8', 'Un buen umbral para bloquear un cambio en producción podría ser...', ['Nunca bloquear', 'Si la tasa de éxito en la suite baja de un mínimo acordado', 'Si el prompt es largo', 'Si es lunes'], 1, 'Evaluación como gate de despliegue.', { concept: 'Evaluación de agentes', d: 'intermedia' }),
      tf('q29-9', 'Todo agente debería terminar siempre con una respuesta, una derivación o un error informado.', true, 'Nunca en silencio o en bucle.', { concept: 'Manejo de errores' }),
      mcq('q29-10', '¿Qué métrica combinarías con la tasa de éxito para decidir si un agente es viable?', ['Cantidad de líneas de código', 'Costo y tiempo por tarea, y violaciones de seguridad', 'Colores de la interfaz', 'Cantidad de tools'], 1, 'Viabilidad = efectividad + costo + seguridad.', { concept: 'Evaluación de agentes', d: 'avanzada' }),
    ],
  },
];
