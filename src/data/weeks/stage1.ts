import type { Week } from '../../types';
import { H12, HPROJ, mcq, py, short, tf } from './helpers';

export const STAGE1: Week[] = [
  // ───────────────────────────── SEMANA 1 ─────────────────────────────
  {
    n: 1,
    stage: 1,
    title: 'Qué es programar: algoritmos, variables y primeros programas',
    objective:
      'Entender qué hace una computadora cuando ejecuta un programa, escribir tus primeros programas en Python y usar variables, tipos de datos y operadores con seguridad.',
    topics: ['Qué es programar', 'Cómo funciona un lenguaje de programación', 'Algoritmos', 'Variables', 'Tipos de datos', 'Operadores', 'Primeros programas'],
    lessons: [
      {
        id: 'w1l1',
        title: 'Qué es programar y cómo Python entiende tus instrucciones',
        minutes: 60,
        sections: [
          {
            heading: '1. Programar es dar instrucciones precisas',
            body: [
              'Una computadora no "piensa": ejecuta instrucciones, una detrás de otra, exactamente como están escritas. Programar es escribir esas instrucciones en un idioma que la computadora pueda interpretar.',
              'La dificultad no está en el idioma, sino en la precisión: una persona entiende "traeme algo de tomar"; una computadora necesita saber qué bebida, de dónde, en qué recipiente y qué hacer si no hay.',
            ],
          },
          {
            heading: '2. Algoritmos: la receta antes del código',
            body: [
              'Un algoritmo es una secuencia finita y ordenada de pasos para resolver un problema. Existe antes del código: podés escribirlo en español, en un papel o como diagrama.',
              'Un buen algoritmo tiene: una entrada (datos con los que trabaja), pasos claros y sin ambigüedad, y una salida (el resultado). Antes de escribir código, siempre escribí el algoritmo en palabras. Esta costumbre te va a ahorrar horas.',
            ],
            code: {
              lang: 'text',
              caption: 'Algoritmo en lenguaje natural (pseudocódigo)',
              code: `ALGORITMO: Calcular el total de una compra con IVA
1. Pedir el precio del producto
2. Pedir la cantidad
3. subtotal = precio × cantidad
4. total = subtotal × 1.21
5. Mostrar el total`,
            },
          },
          {
            heading: '3. Lenguajes de programación e intérpretes',
            body: [
              'La computadora solo entiende código máquina (unos y ceros). Los lenguajes de programación como Python son una capa intermedia legible por personas.',
              'Python es un lenguaje interpretado: un programa llamado intérprete lee tu código línea por línea y lo ejecuta. Si una línea tiene un error, el intérprete se detiene ahí y te muestra un mensaje de error (traceback). Leer esos mensajes es una habilidad central, no un fracaso.',
              'Python es muy usado en automatización, datos e IA porque su sintaxis es clara y tiene miles de librerías listas para usar.',
            ],
          },
          {
            heading: '4. Dónde escribir y ejecutar Python',
            body: [
              'Para empezar no necesitás instalar nada: podés usar el editor integrado en esta plataforma (botón "Ejecutar"), Google Colab o Python Tutor. Más adelante (semana 7) vas a instalar Python localmente con un editor como VS Code.',
              'La instrucción más básica es print(), que muestra un valor en pantalla.',
            ],
            code: { lang: 'python', code: `print("Hola, soy Camila y estoy aprendiendo Python")\nprint(2 + 3)` },
          },
        ],
        keyConcepts: [
          { term: 'Programa', def: 'Conjunto de instrucciones que una computadora ejecuta en orden.' },
          { term: 'Algoritmo', def: 'Secuencia finita de pasos claros para resolver un problema, independiente del lenguaje.' },
          { term: 'Intérprete', def: 'Programa que lee y ejecuta código Python línea por línea.' },
          { term: 'Sintaxis', def: 'Reglas de escritura de un lenguaje (paréntesis, comillas, indentación).' },
          { term: 'Traceback', def: 'Mensaje de error de Python que indica qué falló y en qué línea.' },
        ],
        simpleExample: 'Algoritmo para preparar mate: calentar agua sin hervir → llenar el mate con yerba → inclinar → agregar agua → servir. Si cambiás el orden, el resultado cambia.',
        realExample:
          'Un equipo de soporte recibe 300 correos por día. Antes de automatizar la clasificación, alguien escribe el algoritmo: "si el asunto contiene \'factura\' → enviar a Facturación; si contiene \'contraseña\' → Soporte técnico; si no → revisión manual". Ese algoritmo después se convierte en código o en un workflow de n8n.',
        analogy:
          'Programar es como escribir una receta para alguien que nunca cocinó y que hace exactamente lo que dice el papel, ni más ni menos.',
        commonErrors: [
          'Escribir código sin haber pensado el algoritmo: terminás probando cosas al azar.',
          'Olvidar comillas en textos: print(Hola) da NameError porque Python busca una variable llamada Hola.',
          'Usar mayúsculas incorrectas: Print() no existe; Python distingue mayúsculas y minúsculas.',
          'Asustarse con el traceback en lugar de leer la última línea, que dice el tipo de error.',
        ],
        bestPractices: [
          'Escribí el algoritmo en comentarios (# ...) antes de programar.',
          'Ejecutá el código seguido, en pasos pequeños.',
          'Leé el error desde la última línea hacia arriba.',
        ],
        summary: [
          'Programar = dar instrucciones precisas y ordenadas.',
          'El algoritmo es el plan; el código es su traducción a un lenguaje.',
          'Python es interpretado: se ejecuta línea por línea y se detiene ante el primer error.',
        ],
        comprehension: [
          { q: '¿Cuál es la diferencia entre un algoritmo y un programa?', a: 'El algoritmo es la secuencia de pasos para resolver el problema (independiente del lenguaje); el programa es ese algoritmo escrito en un lenguaje concreto que la computadora puede ejecutar.' },
          { q: '¿Qué hace el intérprete de Python cuando encuentra un error en la línea 5 de un programa de 10 líneas?', a: 'Ejecuta las líneas 1 a 4, se detiene en la 5 y muestra un traceback; las líneas 6 a 10 no se ejecutan.' },
          { q: '¿Por qué print(Hola) falla y print("Hola") funciona?', a: 'Sin comillas, Python interpreta Hola como el nombre de una variable que no existe (NameError). Con comillas es un texto (string).' },
        ],
        exercise: {
          statement:
            'Escribí en comentarios el algoritmo para decidir si un cliente recibe envío gratis (compras de 50.000 o más) y luego mostrá con print() tres mensajes: el nombre de la tienda, el monto mínimo para envío gratis y un saludo.',
          hints: ['Los comentarios empiezan con #.', 'Cada print() muestra una línea.', 'Los números no necesitan comillas; los textos sí.'],
          solution: `# 1. Recibir el monto de la compra\n# 2. Si el monto es >= 50000 -> envío gratis\n# 3. Si no -> cobrar envío\nprint("Tienda Nube Sur")\nprint(50000)\nprint("¡Gracias por tu compra!")`,
          starter: `# Escribí aquí tu algoritmo en comentarios\n\n`,
        },
      },
      {
        id: 'w1l2',
        title: 'Variables, tipos de datos y operadores',
        minutes: 75,
        sections: [
          {
            heading: '1. Variables: nombres para guardar valores',
            body: [
              'Una variable es un nombre que apunta a un valor guardado en memoria. Se crea con el signo = (asignación). El = en programación no significa "es igual", significa "guardá el valor de la derecha en el nombre de la izquierda".',
              'Los nombres de variables deben empezar con letra o guion bajo, no pueden tener espacios ni tildes recomendadas, y por convención en Python se escriben en snake_case: nombre_cliente, total_con_iva.',
            ],
            code: { lang: 'python', code: `nombre_cliente = "Ana"\nedad = 31\nprecio = 1999.90\nes_premium = True\n\nprint(nombre_cliente, edad)\n\nedad = edad + 1   # reasignación: ahora edad vale 32\nprint(edad)` },
          },
          {
            heading: '2. Tipos de datos básicos',
            body: [
              'Cada valor tiene un tipo, que define qué operaciones se pueden hacer con él. Los cuatro tipos básicos son: int (enteros: 3, -10), float (decimales: 3.5), str (texto entre comillas: "hola") y bool (lógicos: True o False).',
              'La función type() te dice el tipo de un valor. Las funciones int(), float() y str() convierten entre tipos. Esto es clave porque input() siempre devuelve texto, aunque la persona escriba un número.',
            ],
            code: { lang: 'python', code: `print(type(42))        # <class 'int'>\nprint(type("42"))      # <class 'str'>\n\nedad_texto = "31"\nedad_numero = int(edad_texto)\nprint(edad_numero + 1)  # 32` },
          },
          {
            heading: '3. Operadores aritméticos',
            body: [
              'Python tiene: + suma, - resta, * multiplicación, / división (siempre devuelve float), // división entera, % resto (módulo) y ** potencia.',
              'El operador % es muy útil: n % 2 == 0 indica si un número es par; minutos % 60 da los minutos sobrantes de una conversión a horas.',
              'Con textos, + concatena ("Hola " + "Ana") y * repite ("-" * 10). Sumar texto con número da TypeError: hay que convertir primero.',
            ],
            code: { lang: 'python', code: `minutos = 135\nhoras = minutos // 60    # 2\nresto = minutos % 60     # 15\nprint(horas, "h", resto, "min")\n\nprint(7 / 2)   # 3.5\nprint(7 // 2)  # 3` },
          },
          {
            heading: '4. Entrada, salida y f-strings',
            body: [
              'input("mensaje") muestra un mensaje y espera que la persona escriba algo; devuelve siempre un str.',
              'Las f-strings permiten insertar variables dentro de un texto: f"Hola {nombre}". Son la forma moderna y legible de construir mensajes. Podés formatear decimales con {valor:.2f}.',
            ],
            code: { lang: 'python', code: `nombre = input("¿Cómo te llamás? ")\nprecio = float(input("Precio: "))\ncantidad = int(input("Cantidad: "))\ntotal = precio * cantidad * 1.21\nprint(f"{nombre}, tu total con IVA es {total:.2f}")` },
          },
        ],
        keyConcepts: [
          { term: 'Variable', def: 'Nombre que referencia un valor en memoria. Se crea con =.' },
          { term: 'int / float', def: 'Números enteros / números con decimales.' },
          { term: 'str', def: 'Cadena de texto, entre comillas simples o dobles.' },
          { term: 'bool', def: 'Valor lógico: True o False (con mayúscula inicial).' },
          { term: 'Casting', def: 'Convertir un valor de un tipo a otro: int("5"), str(3.2).' },
          { term: 'f-string', def: 'Texto con prefijo f que permite insertar expresiones entre llaves.' },
        ],
        simpleExample: 'precio = 100; cantidad = 3; print(precio * cantidad) → 300.',
        realExample: 'En un sistema de tickets, cada ticket tiene variables: id_ticket = 1045 (int), cliente = "Ana Torres" (str), horas_abierto = 5.5 (float), urgente = True (bool).',
        analogy: 'Una variable es como una etiqueta pegada en una caja: la etiqueta (nombre) te permite encontrar la caja (valor). Podés cambiar el contenido y la etiqueta sigue siendo la misma.',
        commonErrors: [
          'Sumar input() directamente: input() devuelve texto, "5" + "3" da "53", no 8.',
          'Usar = para comparar (eso es asignación; comparar es ==, se ve en la semana 2).',
          'Escribir true en minúscula: en Python es True.',
          'Nombres de variable con espacios o que empiezan con número: 1cliente es inválido.',
        ],
        bestPractices: [
          'Usá nombres descriptivos: total_factura en lugar de t.',
          'Convertí los datos de input() apenas los recibís.',
          'Preferí f-strings para construir mensajes.',
        ],
        summary: [
          'Las variables guardan valores; el = asigna.',
          'Tipos básicos: int, float, str, bool. type() los muestra.',
          'input() devuelve str: convertí con int() o float().',
          '// y % resuelven problemas de división entera y restos.',
        ],
        comprehension: [
          { q: '¿Qué imprime print("3" + "4") y por qué?', a: '"34", porque son strings y + los concatena.' },
          { q: '¿Qué tipo devuelve 10 / 2?', a: 'float (5.0). La división / siempre devuelve float; para entero usá //.' },
          { q: '¿Cómo calcularías si 17 es impar usando operadores?', a: '17 % 2 da 1; si el resto de dividir por 2 es 1, es impar.' },
        ],
        exercise: {
          statement:
            'Creá una función convertir_minutos(minutos) que devuelva un texto con el formato "X h Y min". Ejemplo: convertir_minutos(135) devuelve "2 h 15 min". (Las funciones se ven en la semana 4: por ahora solo completá las dos líneas marcadas.)',
          hints: ['Usá // para obtener las horas completas.', 'Usá % 60 para obtener los minutos sobrantes.', 'Construí el texto con una f-string.'],
          solution: `def convertir_minutos(minutos):\n    horas = minutos // 60\n    resto = minutos % 60\n    return f"{horas} h {resto} min"`,
          starter: `def convertir_minutos(minutos):\n    horas = 0   # completá\n    resto = 0   # completá\n    return f"{horas} h {resto} min"\n\nprint(convertir_minutos(135))`,
          tests: `assert convertir_minutos(135) == "2 h 15 min", "135 minutos deberían ser 2 h 15 min"\nassert convertir_minutos(59) == "0 h 59 min"\nassert convertir_minutos(120) == "2 h 0 min"`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 0 (Functions, Variables). Mirala con subtítulos en español y pausá para probar cada ejemplo.', minutes: 120 },
      { ref: 'pytutor', why: 'Pegá los ejemplos de variables y observá cómo cambian los valores paso a paso.', minutes: 30 },
      { ref: 'w3py', why: 'Secciones Variables, Data Types, Numbers, Casting como referencia rápida.', minutes: 45 },
      { ref: 'colab', why: 'Creá tu primer notebook "semana-01" y guardá ahí tus prácticas.', minutes: 45 },
    ],
    coursera: [{ courseId: 'c-lhtl', note: 'Empezá "Learning How to Learn" (módulo 1: modos de pensamiento enfocado y difuso). Te ayuda a sostener 36 semanas de estudio.' }],
    docs: [{ ref: 'pydocs', why: 'Capítulo 3 "An Informal Introduction to Python" (números y textos).' }],
    exercises: [
      { id: 'w1e1', title: 'Calculadora de IVA', level: 'basica', kind: 'python', statement: 'Definí precio = 2500 y cantidad = 3. Calculá subtotal y total con 21% de IVA y mostralos con print usando f-strings con 2 decimales.', hints: ['total = subtotal * 1.21', 'f"{total:.2f}"'], solution: `precio = 2500\ncantidad = 3\nsubtotal = precio * cantidad\ntotal = subtotal * 1.21\nprint(f"Subtotal: {subtotal:.2f}")\nprint(f"Total: {total:.2f}")`, starter: `precio = 2500\ncantidad = 3\n` },
      { id: 'w1e2', title: 'Intercambio de valores', level: 'intermedia', kind: 'python', statement: 'Tenés a = "pendiente" y b = "resuelto". Intercambiá sus valores para que a valga "resuelto" y b "pendiente".', hints: ['Podés usar una variable auxiliar.', 'Python también permite a, b = b, a.'], solution: `a = "pendiente"\nb = "resuelto"\na, b = b, a`, starter: `a = "pendiente"\nb = "resuelto"\n# intercambiá aquí\n`, tests: `assert a == "resuelto" and b == "pendiente", "Los valores no se intercambiaron"` },
      { id: 'w1e3', title: 'Algoritmo de un proceso real', level: 'basica', kind: 'libre', statement: 'Elegí un proceso de un trabajo que conozcas (atender un reclamo, facturar, reservar un turno) y escribí su algoritmo en 6–10 pasos numerados, indicando entradas y salida.', hints: ['¿Qué datos necesitás al inicio?', '¿Qué decisiones aparecen? Marcalas con "SI ... ENTONCES".'] },
    ],
    challenge: {
      title: 'Cotizador de horas de soporte',
      context: 'Una consultora cobra el soporte técnico por hora. La tarifa es 18 USD/h y los clientes premium tienen 15% de descuento.',
      task: ['Pedí con input() el nombre del cliente, las horas trabajadas (pueden tener decimales) y si es premium (escribí "si" o "no").', 'Calculá el subtotal y, por ahora, mostrá el monto con y sin descuento (las condiciones se ven la próxima semana).', 'Mostrá un resumen con f-strings y 2 decimales.'],
      deliverable: 'Archivo cotizador.py o notebook con el código y una captura de una ejecución.',
    },
    deliverable: 'Notebook o archivo semana-01 con: algoritmo escrito, ejercicios resueltos y el cotizador funcionando.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Explicar con tus palabras qué es un algoritmo y qué hace el intérprete.', 'Resolver el desafío convirtiendo correctamente input() a números.'],
    questions: [
      mcq('q1-1', '¿Qué es un algoritmo?', ['Un lenguaje de programación', 'Una secuencia finita y ordenada de pasos para resolver un problema', 'Un tipo de dato', 'Un error de Python'], 1, 'Un algoritmo es el plan de pasos, independiente del lenguaje en que luego se programe.', { concept: 'Algoritmos' }),
      mcq('q1-2', '¿Qué imprime este código?', ['8', '53', '"5"+"3"', 'Error'], 1, 'Ambos valores son strings, y + entre strings concatena: "53".', { concept: 'Tipos de datos', code: `a = "5"\nb = "3"\nprint(a + b)`, hints: ['Fijate si los valores tienen comillas.'] }),
      mcq('q1-3', '¿Cuál es el resultado de 17 // 5 y 17 % 5?', ['3.4 y 2', '3 y 2', '3 y 3', '2 y 3'], 1, '// es división entera (3) y % el resto (17 - 15 = 2).', { concept: 'Operadores', hints: ['¿Cuántas veces entra 5 en 17 completo?'] }),
      tf('q1-4', 'input() devuelve un número si la persona escribe un número.', false, 'input() siempre devuelve str. Hay que convertir con int() o float().', { concept: 'Tipos de datos' }),
      tf('q1-5', 'En Python, Nombre y nombre son dos variables diferentes.', true, 'Python distingue mayúsculas y minúsculas (case-sensitive).', { concept: 'Variables' }),
      mcq('q1-6', '¿Cuál es un nombre de variable válido y recomendado en Python?', ['1cliente', 'nombre cliente', 'nombre_cliente', 'nombre-cliente'], 2, 'snake_case: letras minúsculas separadas por guion bajo. No puede empezar con número, ni tener espacios o guiones.', { concept: 'Variables' }),
      mcq('q1-7', '¿Qué tipo tiene el valor True?', ['str', 'int', 'bool', 'float'], 2, 'True y False son valores booleanos (bool).', { concept: 'Tipos de datos' }),
      py('q1-8', 'Completá la función total_con_iva(precio) para que devuelva el precio con 21% de IVA.', `def total_con_iva(precio):\n    # completá\n    return 0`, `assert abs(total_con_iva(100) - 121) < 0.001, "total_con_iva(100) debería ser 121"\nassert abs(total_con_iva(0)) < 0.001`, `def total_con_iva(precio):\n    return precio * 1.21`, 'Multiplicar por 1.21 equivale a sumar el 21%.', { concept: 'Operadores', d: 'basica', hints: ['21% de IVA = precio + precio*0.21', 'Eso es lo mismo que precio * 1.21'] }),
      py('q1-9', 'La función segundos_a_hms(s) debe devolver una tupla (horas, minutos, segundos). Ej: 3725 → (1, 2, 5).', `def segundos_a_hms(s):\n    horas = 0\n    minutos = 0\n    segundos = 0\n    return (horas, minutos, segundos)`, `assert segundos_a_hms(3725) == (1, 2, 5), "3725 s = 1 h 2 min 5 s"\nassert segundos_a_hms(59) == (0, 0, 59)\nassert segundos_a_hms(3600) == (1, 0, 0)`, `def segundos_a_hms(s):\n    horas = s // 3600\n    minutos = (s % 3600) // 60\n    segundos = s % 60\n    return (horas, minutos, segundos)`, 'Se combinan // y % en cascada: primero horas, luego lo que sobra en minutos, luego segundos.', { concept: 'Operadores', d: 'avanzada', hints: ['Una hora tiene 3600 segundos.', 'Lo que sobra de las horas es s % 3600.', 'De ese resto, // 60 son los minutos.'] }),
      short('q1-10', '¿Qué función de Python muestra un valor en pantalla? (escribí solo el nombre)', ['print', 'print()'], 'print() envía un valor a la salida estándar.', { concept: 'Primeros programas' }),
    ],
  },

  // ───────────────────────────── SEMANA 2 ─────────────────────────────
  {
    n: 2,
    stage: 1,
    title: 'Condicionales y lógica booleana',
    objective: 'Hacer que tus programas tomen decisiones con if/elif/else, comparaciones y operadores lógicos, y resolver problemas descomponiéndolos en casos.',
    topics: ['Condicionales', 'Booleanos', 'Comparaciones', 'Operadores lógicos', 'Resolución de problemas'],
    review: 'Repaso semana 1: conversión de tipos con int()/float() y f-strings, que vas a usar en cada condicional.',
    lessons: [
      {
        id: 'w2l1',
        title: 'Tomar decisiones: comparaciones, if, elif y else',
        minutes: 70,
        sections: [
          {
            heading: '1. Comparaciones: preguntas que responden True o False',
            body: [
              'Los operadores de comparación producen un booleano: == (igual), != (distinto), > , < , >= , <=.',
              'Ojo: = asigna un valor, == compara. Es el error más común de esta semana.',
              'También se pueden comparar textos: "abierto" == "Abierto" es False porque las mayúsculas cuentan. Por eso suele normalizarse con .lower().',
            ],
            code: { lang: 'python', code: `monto = 60000\nprint(monto >= 50000)   # True\nestado = "Abierto"\nprint(estado.lower() == "abierto")  # True` },
          },
          {
            heading: '2. La estructura if / elif / else',
            body: [
              'if evalúa una condición; si es True, ejecuta el bloque indentado debajo. elif ("else if") se evalúa solo si las anteriores fueron False. else se ejecuta si ninguna se cumplió.',
              'La indentación (4 espacios) no es estética: define qué líneas pertenecen al bloque. Los dos puntos (:) al final de la línea del if son obligatorios.',
              'Python evalúa las condiciones en orden y ejecuta solo el primer bloque verdadero. Por eso el orden importa: poné las condiciones más específicas primero.',
            ],
            code: { lang: 'python', code: `horas_abierto = 30\n\nif horas_abierto > 48:\n    prioridad = "crítica"\nelif horas_abierto > 24:\n    prioridad = "alta"\nelif horas_abierto > 8:\n    prioridad = "media"\nelse:\n    prioridad = "baja"\n\nprint(prioridad)  # alta` },
          },
          {
            heading: '3. Operadores lógicos: and, or, not',
            body: [
              'and es True solo si ambas condiciones son True. or es True si al menos una lo es. not invierte el valor.',
              'Python usa evaluación en cortocircuito: en A and B, si A es False no evalúa B. Es útil para evitar errores: if lista and lista[0] == "x".',
              'Cuando combines muchos operadores, usá paréntesis para que la intención sea clara.',
            ],
            code: { lang: 'python', code: `es_premium = True\nmonto = 30000\n\nenvio_gratis = es_premium or monto >= 50000\nprint(envio_gratis)  # True\n\nbloquear = not es_premium and monto > 100000` },
          },
          {
            heading: '4. Resolver problemas: tabla de casos',
            body: [
              'Antes de programar una decisión, hacé una tabla con los casos posibles y el resultado esperado de cada uno. Incluí los casos borde: exactamente 50000, 0, valores negativos, texto vacío.',
              'Después escribí el if que cubre la tabla y probá cada fila. Esto es el embrión del testing que verás en la semana 31.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Booleano', def: 'Valor True o False que resulta de una comparación.' },
          { term: '== vs =', def: '== compara; = asigna.' },
          { term: 'if / elif / else', def: 'Estructura que ejecuta un único bloque según la primera condición verdadera.' },
          { term: 'Indentación', def: 'Espacios al inicio de línea que definen bloques de código en Python.' },
          { term: 'and / or / not', def: 'Operadores lógicos para combinar o invertir condiciones.' },
          { term: 'Caso borde', def: 'Valor en el límite de una condición (ej: exactamente 50000) que suele revelar errores.' },
        ],
        simpleExample: 'if edad >= 18: print("Mayor de edad") else: print("Menor de edad").',
        realExample: 'Un clasificador de tickets: si el texto contiene "no puedo ingresar" y el cliente es premium → prioridad alta y equipo Soporte técnico; si contiene "factura" → Facturación; si no → cola general.',
        analogy: 'Un if es como un semáforo de decisión en una ruta: según la condición, el auto toma un camino u otro, pero nunca dos a la vez.',
        commonErrors: [
          'Usar = en lugar de == dentro del if (SyntaxError).',
          'Olvidar los dos puntos o la indentación (IndentationError).',
          'Ordenar mal elif: si ponés "> 8" antes que "> 48", un ticket de 50 h quedaría como "media".',
          'Comparar texto sin normalizar mayúsculas: "Alta" != "alta".',
          'Escribir if x == 1 or 2 (siempre es True). Lo correcto: if x == 1 or x == 2, o if x in (1, 2).',
        ],
        bestPractices: [
          'Armá una tabla de casos antes de programar.',
          'Condiciones más específicas primero.',
          'Normalizá textos con .strip().lower() antes de comparar.',
        ],
        summary: [
          'Las comparaciones devuelven bool.',
          'if/elif/else ejecuta solo el primer bloque verdadero.',
          'and, or y not combinan condiciones.',
          'Probá siempre los casos borde.',
        ],
        comprehension: [
          { q: 'Si horas_abierto = 50 y el primer if fuera "if horas_abierto > 8", ¿qué prioridad saldría? ¿Por qué?', a: '"media", porque Python ejecuta el primer bloque verdadero y no evalúa los siguientes. Por eso las condiciones más restrictivas van primero.' },
          { q: '¿Qué devuelve True and False or True?', a: 'True. and se evalúa antes que or: (True and False) = False; False or True = True.' },
          { q: '¿Por qué if x == 1 or 2 siempre entra al bloque?', a: 'Porque se evalúa como (x == 1) or 2, y 2 es un valor "verdadero" (truthy).' },
        ],
        exercise: {
          statement: 'Completá clasificar_ticket(texto) que devuelva "Facturación" si el texto contiene "factura", "Soporte técnico" si contiene "contraseña" o "acceso", y "General" en otro caso. No distingas mayúsculas.',
          hints: ['Usá texto.lower() para normalizar.', 'El operador in verifica si un texto contiene otro: "fac" in "factura".', 'Usá or para combinar "contraseña" y "acceso".'],
          solution: `def clasificar_ticket(texto):\n    t = texto.lower()\n    if "factura" in t:\n        return "Facturación"\n    elif "contraseña" in t or "acceso" in t:\n        return "Soporte técnico"\n    else:\n        return "General"`,
          starter: `def clasificar_ticket(texto):\n    t = texto.lower()\n    # completá con if / elif / else\n    return "General"`,
          tests: `assert clasificar_ticket("Necesito mi FACTURA de marzo") == "Facturación"\nassert clasificar_ticket("Olvidé mi contraseña") == "Soporte técnico"\nassert clasificar_ticket("No tengo acceso") == "Soporte técnico"\nassert clasificar_ticket("Quiero comprar") == "General"`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 1 (Conditionals) y Problem Set 1. Intentá al menos 3 problemas.', minutes: 150 },
      { ref: 'pytutor', why: 'Visualizá un if/elif/else con distintos valores para ver qué rama se ejecuta.', minutes: 30 },
      { ref: 'exercism', why: 'Creá tu cuenta y resolvé los primeros ejercicios del track (Hello World, Ghost Gobble Arcade Game — practica booleanos).', minutes: 60 },
    ],
    coursera: [{ courseId: 'c-lhtl', note: 'Módulo 2: chunking y técnica Pomodoro (la vas a usar en el Calendario).' }],
    docs: [{ ref: 'pydocs', why: 'Sección 4.1 "if Statements" del tutorial.' }],
    exercises: [
      { id: 'w2e1', title: 'Envío gratis', level: 'basica', kind: 'python', statement: 'Escribí envio_gratis(monto, es_premium) que devuelva True si el cliente es premium o si el monto es >= 50000.', hints: ['Una sola expresión con or alcanza.'], solution: `def envio_gratis(monto, es_premium):\n    return es_premium or monto >= 50000`, starter: `def envio_gratis(monto, es_premium):\n    return False`, tests: `assert envio_gratis(10, True) == True\nassert envio_gratis(50000, False) == True\nassert envio_gratis(49999, False) == False` },
      { id: 'w2e2', title: 'Año bisiesto', level: 'avanzada', kind: 'python', statement: 'es_bisiesto(anio): es bisiesto si es divisible por 4, excepto los divisibles por 100, salvo que también sean divisibles por 400.', hints: ['Divisible = resto 0: anio % 4 == 0.', 'Combiná and/or con paréntesis.'], solution: `def es_bisiesto(anio):\n    return anio % 4 == 0 and (anio % 100 != 0 or anio % 400 == 0)`, starter: `def es_bisiesto(anio):\n    return False`, tests: `assert es_bisiesto(2024)\nassert not es_bisiesto(1900)\nassert es_bisiesto(2000)\nassert not es_bisiesto(2023)` },
      { id: 'w2e3', title: 'Tabla de casos', level: 'intermedia', kind: 'libre', statement: 'Para el cotizador de la semana 1, armá una tabla de casos (horas, premium, resultado esperado) con al menos 6 filas incluyendo casos borde, y agregá el descuento premium con if.', hints: ['Casos borde: 0 horas, horas con decimales, "SI" en mayúsculas.'] },
    ],
    challenge: {
      title: 'Reglas de priorización de soporte',
      context: 'Un ecommerce quiere priorizar automáticamente los reclamos. Reglas: si el cliente es premium y el reclamo es de "pago" → urgente. Si lleva más de 48 h abierto → urgente. Si es de "envío" y lleva más de 24 h → alta. Todo lo demás → normal.',
      task: ['Escribí la tabla de casos.', 'Implementá prioridad(tipo, es_premium, horas) con if/elif/else.', 'Probalo con al menos 8 combinaciones y documentá los resultados.'],
      deliverable: 'Código + tabla de casos con resultado esperado vs obtenido.',
    },
    deliverable: 'Archivo semana-02 con ejercicios y el priorizador con su tabla de casos.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'El priorizador devuelve el resultado correcto en todos los casos de tu tabla.', 'Poder explicar por qué importa el orden de los elif.'],
    questions: [
      mcq('q2-1', '¿Qué imprime este código?', ['media', 'alta', 'baja', 'Nada'], 0, 'La primera condición verdadera es horas > 8 (30 > 8), así que se asigna "media" y no se evalúan las demás. El orden de los elif está mal.', { concept: 'Orden de condiciones', d: 'intermedia', code: `horas = 30\nif horas > 8:\n    p = "media"\nelif horas > 24:\n    p = "alta"\nelse:\n    p = "baja"\nprint(p)`, hints: ['Python ejecuta solo el primer bloque verdadero.'] }),
      tf('q2-2', 'En Python, = y == hacen lo mismo.', false, '= asigna un valor; == compara dos valores y devuelve un bool.', { concept: 'Comparaciones' }),
      mcq('q2-3', '¿Cuál es el resultado de not (5 > 3 and 2 > 4)?', ['True', 'False', 'Error', 'None'], 0, '5 > 3 es True, 2 > 4 es False; True and False = False; not False = True.', { concept: 'Operadores lógicos', d: 'intermedia' }),
      mcq('q2-4', '¿Por qué if estado == "abierto" falla cuando estado = "Abierto"?', ['Porque falta else', 'Porque las comparaciones de texto distinguen mayúsculas', 'Porque los strings no se pueden comparar', 'No falla'], 1, 'Hay que normalizar con estado.lower() antes de comparar.', { concept: 'Comparaciones' }),
      tf('q2-5', 'Un bloque elif se evalúa aunque una condición anterior haya sido verdadera.', false, 'Solo se evalúa si todas las condiciones anteriores fueron False.', { concept: 'if / elif / else' }),
      mcq('q2-6', '¿Qué error produce olvidar la indentación dentro de un if?', ['TypeError', 'NameError', 'IndentationError', 'ValueError'], 2, 'Python usa la indentación para definir bloques.', { concept: 'Sintaxis' }),
      mcq('q2-7', 'if x == 1 or 2: ... ¿qué ocurre si x = 5?', ['No entra al bloque', 'Entra al bloque', 'Error', 'Depende'], 1, 'Se evalúa (x == 1) or 2 → False or 2 → 2, que es verdadero. Lo correcto es x == 1 or x == 2.', { concept: 'Operadores lógicos', d: 'avanzada' }),
      py('q2-8', 'Completá descuento(monto) que devuelva: 0.20 si monto >= 100000, 0.10 si >= 50000, y 0 en otro caso.', `def descuento(monto):\n    return 0`, `assert descuento(150000) == 0.20\nassert descuento(100000) == 0.20\nassert descuento(50000) == 0.10\nassert descuento(49999) == 0`, `def descuento(monto):\n    if monto >= 100000:\n        return 0.20\n    elif monto >= 50000:\n        return 0.10\n    else:\n        return 0`, 'La condición más exigente (>= 100000) va primero.', { concept: 'if / elif / else', hints: ['Empezá por el monto más alto.', 'Los casos borde 100000 y 50000 deben incluirse (>=).'] }),
      py('q2-9', 'Completá validar_ticket(prioridad, estado) que devuelva True solo si prioridad está en ("baja","media","alta") y estado en ("abierto","cerrado"). Ignorá mayúsculas.', `def validar_ticket(prioridad, estado):\n    return False`, `assert validar_ticket("Alta", "ABIERTO")\nassert not validar_ticket("urgente", "abierto")\nassert not validar_ticket("baja", "pendiente")`, `def validar_ticket(prioridad, estado):\n    return prioridad.lower() in ("baja", "media", "alta") and estado.lower() in ("abierto", "cerrado")`, 'Combina normalización (.lower()), pertenencia (in) y and.', { concept: 'Operadores lógicos', d: 'avanzada', hints: ['x in ("a","b") verifica pertenencia.', 'Ambas condiciones deben cumplirse: and.'] }),
      short('q2-10', '¿Qué palabra clave se usa para "si no, si..." en Python?', ['elif'], 'elif = else + if.', { concept: 'if / elif / else' }),
    ],
  },

  // ───────────────────────────── SEMANA 3 ─────────────────────────────
  {
    n: 3,
    stage: 1,
    title: 'Bucles: for, while, contadores y acumuladores',
    objective: 'Repetir tareas con bucles, recorrer datos y calcular totales, conteos y máximos: la base de cualquier automatización.',
    topics: ['Bucle for', 'Bucle while', 'Iteraciones', 'Contadores', 'Acumuladores', 'Ejercicios de lógica'],
    review: 'Repaso semana 2: los bucles suelen contener if. Repasá operadores lógicos.',
    lessons: [
      {
        id: 'w3l1',
        title: 'Repetir con for y while',
        minutes: 75,
        sections: [
          {
            heading: '1. Por qué repetir',
            body: [
              'Automatizar es, en gran parte, hacer lo mismo con muchos datos: revisar 500 tickets, enviar 80 correos, sumar 1000 ventas. Los bucles permiten escribir la instrucción una vez y repetirla.',
              'Cada repetición se llama iteración.',
            ],
          },
          {
            heading: '2. for: recorrer una secuencia',
            body: [
              'for variable in secuencia: ejecuta el bloque una vez por cada elemento. La secuencia puede ser un texto, una lista o un rango de números.',
              'range(n) genera 0, 1, ..., n-1. range(inicio, fin) va de inicio a fin-1. range(inicio, fin, paso) salta de a "paso". El fin nunca se incluye.',
            ],
            code: { lang: 'python', code: `for i in range(1, 6):\n    print("Procesando ticket", i)\n\nestados = ["abierto", "cerrado", "abierto"]\nfor estado in estados:\n    print(estado.upper())` },
          },
          {
            heading: '3. while: repetir mientras se cumpla una condición',
            body: [
              'while condición: repite mientras la condición sea True. Se usa cuando no sabés de antemano cuántas veces repetir (por ejemplo, hasta que la persona escriba un dato válido).',
              'Peligro: si la condición nunca se vuelve False tenés un bucle infinito. Asegurate de que algo dentro del bucle cambie la condición.',
              'break sale del bucle inmediatamente; continue salta a la siguiente iteración.',
            ],
            code: { lang: 'python', code: `intentos = 0\nwhile intentos < 3:\n    clave = input("Clave: ")\n    if clave == "1234":\n        print("Acceso concedido")\n        break\n    intentos += 1\nelse:\n    print("Cuenta bloqueada")` },
          },
          {
            heading: '4. Contadores y acumuladores',
            body: [
              'Un contador cuenta cuántas veces ocurre algo: se inicia en 0 antes del bucle y se suma 1 dentro (contador += 1).',
              'Un acumulador suma valores: se inicia en 0 y se le suma cada valor (total += monto). Para multiplicar se inicia en 1.',
              'Para encontrar un máximo, iniciá una variable con el primer valor (o con None) y actualizala cuando encuentres uno mayor.',
            ],
            code: { lang: 'python', code: `horas = [4, 20, 70, 6, 24]\ntotal = 0\nlentos = 0\nfor h in horas:\n    total += h\n    if h > 24:\n        lentos += 1\npromedio = total / len(horas)\nprint(f"Promedio: {promedio:.1f} h, tickets lentos: {lentos}")` },
          },
        ],
        keyConcepts: [
          { term: 'Iteración', def: 'Cada repetición del bloque de un bucle.' },
          { term: 'for', def: 'Bucle que recorre los elementos de una secuencia.' },
          { term: 'while', def: 'Bucle que repite mientras una condición sea verdadera.' },
          { term: 'range()', def: 'Genera una secuencia de enteros; el límite superior no se incluye.' },
          { term: 'Contador / acumulador', def: 'Variables que cuentan ocurrencias / suman valores a lo largo del bucle.' },
          { term: 'break / continue', def: 'Salir del bucle / pasar a la próxima iteración.' },
        ],
        simpleExample: 'for n in range(3): print(n) → imprime 0, 1, 2.',
        realExample: 'Un script recorre la lista de pedidos del día, cuenta cuántos están demorados, suma la facturación total y detecta el pedido más grande para un reporte diario automático.',
        analogy: 'for es como pasar lista en una clase: nombrás a cada estudiante una vez. while es como seguir golpeando una puerta hasta que alguien abra.',
        commonErrors: [
          'Inicializar el acumulador dentro del bucle: se reinicia en cada vuelta.',
          'Bucle while infinito porque nunca se actualiza la variable de la condición.',
          'Esperar que range(1, 5) incluya el 5.',
          'Modificar una lista mientras se la recorre con for.',
        ],
        bestPractices: [
          'Preferí for cuando sabés qué recorrer; while cuando depende de una condición.',
          'Nombrá la variable del for en singular: for ticket in tickets.',
          'Usá Python Tutor para ver el valor de contadores en cada vuelta.',
        ],
        summary: [
          'for recorre secuencias; while repite según una condición.',
          'range(a, b) va de a hasta b-1.',
          'Contadores y acumuladores se inicializan antes del bucle.',
        ],
        comprehension: [
          { q: '¿Cuántas veces se ejecuta for i in range(2, 10, 3)? ¿Qué valores toma i?', a: '3 veces: 2, 5, 8.' },
          { q: '¿Qué pasa si escribís total = 0 dentro del for?', a: 'Se reinicia en cada iteración y al final solo queda el último valor sumado.' },
          { q: '¿Cuándo usarías while en lugar de for?', a: 'Cuando no sabés cuántas repeticiones hacen falta: validar entradas, reintentar hasta tener éxito, procesar hasta que una cola esté vacía.' },
        ],
        exercise: {
          statement: 'Completá resumen_horas(horas) que reciba una lista de horas de resolución y devuelva una tupla (total, promedio, maximo). Si la lista está vacía devolvé (0, 0, 0).',
          hints: ['Verificá primero si la lista está vacía: if not horas.', 'Usá un acumulador para el total.', 'Para el máximo, empezá con el primer elemento y compará.'],
          solution: `def resumen_horas(horas):\n    if not horas:\n        return (0, 0, 0)\n    total = 0\n    maximo = horas[0]\n    for h in horas:\n        total += h\n        if h > maximo:\n            maximo = h\n    return (total, total / len(horas), maximo)`,
          starter: `def resumen_horas(horas):\n    # completá sin usar sum() ni max()\n    return (0, 0, 0)`,
          tests: `assert resumen_horas([4, 20, 70, 6]) == (100, 25.0, 70)\nassert resumen_horas([]) == (0, 0, 0)\nassert resumen_horas([5]) == (5, 5.0, 5)`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 2 (Loops) y Problem Set 2.', minutes: 150 },
      { ref: 'pytutor', why: 'Visualizá un acumulador y un while con break.', minutes: 30 },
      { ref: 'exercism', why: 'Ejercicios del track que usen loops (por ejemplo "Making the Grade").', minutes: 60 },
    ],
    coursera: [{ courseId: 'c-lhtl', note: 'Módulo 3: procrastinación y memoria. Terminá el curso a tu ritmo durante la etapa 1.' }],
    docs: [{ ref: 'pydocs', why: 'Secciones 4.2 (for), 4.3 (range) y 4.4 (break/continue).' }],
    exercises: [
      { id: 'w3e1', title: 'Contar estados', level: 'basica', kind: 'python', statement: 'contar_abiertos(estados) devuelve cuántos elementos son "abierto" (ignorando mayúsculas).', hints: ['Contador iniciado en 0.'], solution: `def contar_abiertos(estados):\n    c = 0\n    for e in estados:\n        if e.lower() == "abierto":\n            c += 1\n    return c`, starter: `def contar_abiertos(estados):\n    return 0`, tests: `assert contar_abiertos(["abierto","Cerrado","ABIERTO"]) == 2\nassert contar_abiertos([]) == 0` },
      { id: 'w3e2', title: 'Tabla de multiplicar', level: 'basica', kind: 'python', statement: 'Imprimí la tabla del 7 del 1 al 10 con el formato "7 x 1 = 7".', hints: ['range(1, 11)'], solution: `for i in range(1, 11):\n    print(f"7 x {i} = {7*i}")`, starter: `` },
      { id: 'w3e3', title: 'Validar edad con while', level: 'intermedia', kind: 'libre', statement: 'Pedí una edad con input() y repetí la pregunta mientras no sea un número entre 0 y 120. Usá .isdigit() para validar.', hints: ['while True: ... break cuando sea válido.'] },
      { id: 'w3e4', title: 'FizzBuzz', level: 'intermedia', kind: 'python', statement: 'fizzbuzz(n) devuelve una lista con los números de 1 a n, reemplazando múltiplos de 3 por "Fizz", de 5 por "Buzz" y de ambos por "FizzBuzz". (Pregunta clásica de entrevistas.)', hints: ['Revisá primero el caso de múltiplos de 15.', 'lista.append(valor) agrega a una lista.'], solution: `def fizzbuzz(n):\n    r = []\n    for i in range(1, n+1):\n        if i % 15 == 0:\n            r.append("FizzBuzz")\n        elif i % 3 == 0:\n            r.append("Fizz")\n        elif i % 5 == 0:\n            r.append("Buzz")\n        else:\n            r.append(i)\n    return r`, starter: `def fizzbuzz(n):\n    r = []\n    return r`, tests: `assert fizzbuzz(5) == [1, 2, "Fizz", 4, "Buzz"]\nassert fizzbuzz(15)[-1] == "FizzBuzz"` },
    ],
    challenge: {
      title: 'Reporte diario de soporte',
      context: 'El equipo de soporte recibe la lista de horas de resolución del día y quiere un mini reporte automático.',
      task: ['Recorré la lista [4, 20, 70, 6, 24, 3, 18, 5, 52] con un for.', 'Calculá total, promedio, cantidad de tickets que superan el SLA de 24 h y el ticket más lento.', 'Mostrá el reporte formateado.', 'Extra: calculá el porcentaje de cumplimiento del SLA.'],
      deliverable: 'Script reporte_diario.py con el resultado impreso.',
    },
    deliverable: 'Ejercicios de bucles + reporte diario de soporte.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Resolver FizzBuzz sin mirar la solución.', 'Explicar la diferencia entre contador y acumulador.'],
    questions: [
      mcq('q3-1', '¿Qué valores imprime for i in range(1, 4): print(i)?', ['1 2 3 4', '0 1 2 3', '1 2 3', '1 4'], 2, 'range(1, 4) va de 1 a 3: el límite superior no se incluye.', { concept: 'range()' }),
      mcq('q3-2', '¿Qué imprime este código?', ['10', '4', '0', '3'], 1, 'El acumulador se reinicia en cada vuelta porque total = 0 está dentro del for; al final vale solo el último número (4).', { concept: 'Acumuladores', d: 'intermedia', code: `for n in [1, 2, 3, 4]:\n    total = 0\n    total += n\nprint(total)`, hints: ['¿Dónde se inicializa total?'] }),
      tf('q3-3', 'Un while cuya condición nunca cambia puede generar un bucle infinito.', true, 'Hay que actualizar dentro del bucle algo que haga falsa la condición, o usar break.', { concept: 'while' }),
      mcq('q3-4', '¿Qué hace continue?', ['Termina el programa', 'Sale del bucle', 'Salta a la siguiente iteración', 'Repite la iteración actual'], 2, 'continue omite el resto del bloque y pasa a la próxima iteración.', { concept: 'break / continue' }),
      mcq('q3-5', '¿Cuántas veces se ejecuta el print?', ['5', '4', '3', '2'], 2, 'range(0, 10, 4) genera 0, 4, 8.', { concept: 'range()', d: 'intermedia', code: `for i in range(0, 10, 4):\n    print(i)` }),
      tf('q3-6', 'Para un acumulador de multiplicación, el valor inicial correcto es 1.', true, 'Multiplicar por 0 anularía todo el resultado.', { concept: 'Acumuladores', d: 'intermedia' }),
      py('q3-7', 'Completá sumar_pares(n) que devuelva la suma de los números pares entre 1 y n (inclusive).', `def sumar_pares(n):\n    return 0`, `assert sumar_pares(10) == 30\nassert sumar_pares(1) == 0\nassert sumar_pares(4) == 6`, `def sumar_pares(n):\n    total = 0\n    for i in range(1, n + 1):\n        if i % 2 == 0:\n            total += i\n    return total`, 'Acumulador + condición de paridad dentro de un for con range(1, n+1).', { concept: 'Acumuladores', hints: ['range(1, n + 1) incluye n.', 'Par: i % 2 == 0.'] }),
      py('q3-8', 'Completá primer_urgente(prioridades) que devuelva el índice (posición) de la primera "urgente" de la lista, o -1 si no hay.', `def primer_urgente(prioridades):\n    return -1`, `assert primer_urgente(["baja","urgente","urgente"]) == 1\nassert primer_urgente(["baja"]) == -1\nassert primer_urgente([]) == -1`, `def primer_urgente(prioridades):\n    for i in range(len(prioridades)):\n        if prioridades[i] == "urgente":\n            return i\n    return -1`, 'Recorrer con índices y cortar apenas se encuentra (return dentro del for actúa como break).', { concept: 'Iteraciones', d: 'avanzada', hints: ['range(len(lista)) da los índices.', 'Podés devolver desde dentro del for.'] }),
      mcq('q3-9', '¿Cuál es la mejor opción para pedir un dato hasta que sea válido?', ['for i in range(3)', 'while True con break al validar', 'Un if', 'range(infinito)'], 1, 'No se sabe cuántos intentos harán falta: while con break es el patrón estándar.', { concept: 'while' }),
      short('q3-10', '¿Qué función devuelve la cantidad de elementos de una lista? (solo el nombre)', ['len', 'len()'], 'len() devuelve la longitud de listas, textos y otras colecciones.', { concept: 'Iteraciones' }),
    ],
  },

  // ───────────────────────────── SEMANA 4 ─────────────────────────────
  {
    n: 4,
    stage: 1,
    title: 'Funciones: reutilizar y organizar código',
    objective: 'Escribir funciones con parámetros y return, entender el alcance de las variables y dividir problemas grandes en piezas pequeñas y testeables.',
    topics: ['Funciones', 'Parámetros', 'Argumentos', 'Return', 'Alcance de variables'],
    review: 'Repaso semanas 2 y 3: las funciones de esta semana combinan if y bucles.',
    lessons: [
      {
        id: 'w4l1',
        title: 'Definir funciones, parámetros y return',
        minutes: 80,
        sections: [
          {
            heading: '1. Qué es una función',
            body: [
              'Una función es un bloque de código con nombre que realiza una tarea. Se define una vez con def y se usa (llama) muchas veces.',
              'Ya usaste funciones: print(), len(), input(). Ahora vas a crear las tuyas. Esto evita repetir código y permite probar cada pieza por separado.',
            ],
            code: { lang: 'python', code: `def saludar(nombre):\n    mensaje = f"Hola, {nombre}. Recibimos tu consulta."\n    return mensaje\n\ntexto = saludar("Ana")\nprint(texto)` },
          },
          {
            heading: '2. Parámetros y argumentos',
            body: [
              'Los parámetros son los nombres que aparecen en la definición (nombre). Los argumentos son los valores concretos que pasás al llamar ("Ana").',
              'Podés pasar argumentos por posición o por nombre: calcular(precio=100, cantidad=2). Los parámetros pueden tener valores por defecto: def calcular(precio, iva=0.21).',
              'Los parámetros con valor por defecto van al final.',
            ],
            code: { lang: 'python', code: `def total(precio, cantidad=1, iva=0.21):\n    return precio * cantidad * (1 + iva)\n\nprint(total(100))                 # 121.0\nprint(total(100, 3))              # 363.0\nprint(total(100, iva=0))          # 100` },
          },
          {
            heading: '3. return vs print',
            body: [
              'return devuelve un valor a quien llamó la función, y termina la función. print solo muestra en pantalla: el valor no se puede reutilizar.',
              'Si una función no tiene return, devuelve None. Un error típico es hacer print dentro de la función y luego intentar usar el resultado: obtenés None.',
              'Regla práctica: las funciones calculan y devuelven; el código principal decide qué mostrar.',
            ],
          },
          {
            heading: '4. Alcance (scope) de variables',
            body: [
              'Las variables creadas dentro de una función son locales: solo existen mientras la función se ejecuta. Las creadas fuera son globales.',
              'Una función puede leer variables globales, pero depender de ellas hace el código frágil. Lo correcto es pasar los datos como parámetros y devolver resultados.',
            ],
            code: { lang: 'python', code: `tasa = 0.21  # global\n\ndef con_iva(precio):\n    resultado = precio * (1 + tasa)  # resultado es local\n    return resultado\n\nprint(con_iva(100))\n# print(resultado)  -> NameError: no existe fuera de la función` },
          },
          {
            heading: '5. Descomponer problemas',
            body: [
              'Un programa grande se construye con funciones pequeñas que hacen una sola cosa: validar_email(), calcular_prioridad(), formatear_respuesta(). Cada una se prueba por separado.',
              'Agregá un docstring (texto entre triple comillas debajo del def) explicando qué recibe y qué devuelve.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'def', def: 'Palabra clave para definir una función.' },
          { term: 'Parámetro', def: 'Variable en la definición de la función que recibe un valor.' },
          { term: 'Argumento', def: 'Valor concreto que se pasa al llamar la función.' },
          { term: 'return', def: 'Devuelve un valor y termina la función.' },
          { term: 'None', def: 'Valor que devuelve una función sin return.' },
          { term: 'Scope', def: 'Ámbito donde existe una variable: local (dentro de la función) o global.' },
          { term: 'Docstring', def: 'Documentación de la función entre triples comillas.' },
        ],
        simpleExample: 'def doble(x): return x * 2 → doble(4) devuelve 8.',
        realExample: 'Un workflow de soporte en Python tiene funciones separadas: limpiar_texto(), detectar_categoria(), asignar_prioridad(), registrar_ticket(). Si la categorización falla, sabés exactamente qué función revisar.',
        analogy: 'Una función es como una máquina de café: le das insumos (parámetros), hace su proceso interno (que no necesitás ver) y te devuelve un resultado (return).',
        commonErrors: [
          'Usar print en lugar de return y luego obtener None.',
          'Definir la función pero nunca llamarla.',
          'Llamar a la función antes de definirla en el archivo.',
          'Intentar usar una variable local fuera de la función (NameError).',
          'Poner parámetros con valor por defecto antes que los obligatorios.',
        ],
        bestPractices: [
          'Una función = una responsabilidad.',
          'Nombres con verbo: calcular_total, validar_email.',
          'Docstring breve con entrada y salida.',
          'Evitá depender de variables globales.',
        ],
        summary: [
          'def define, la llamada ejecuta.',
          'return devuelve; print solo muestra.',
          'Las variables locales no existen fuera de la función.',
        ],
        comprehension: [
          { q: '¿Qué devuelve una función que solo tiene print("hola")?', a: 'None. Muestra "hola" pero no devuelve ningún valor.' },
          { q: 'En def f(a, b=2), ¿qué valen a y b al llamar f(5)?', a: 'a = 5, b = 2 (valor por defecto).' },
          { q: '¿Por qué conviene pasar datos como parámetros en lugar de usar globales?', a: 'La función se vuelve independiente, predecible y fácil de testear; no se rompe si alguien cambia una variable global.' },
        ],
        exercise: {
          statement: 'Completá calcular_sla(prioridad) que devuelva las horas máximas de resolución: "alta" → 4, "media" → 24, "baja" → 72. Para cualquier otro valor, devolvé None. Luego completá cumple_sla(prioridad, horas) usando calcular_sla.',
          hints: ['cumple_sla debe llamar a calcular_sla.', 'Si el SLA es None, cumple_sla devuelve False.', 'cumple si horas <= sla.'],
          solution: `def calcular_sla(prioridad):\n    p = prioridad.lower()\n    if p == "alta":\n        return 4\n    elif p == "media":\n        return 24\n    elif p == "baja":\n        return 72\n    return None\n\ndef cumple_sla(prioridad, horas):\n    sla = calcular_sla(prioridad)\n    if sla is None:\n        return False\n    return horas <= sla`,
          starter: `def calcular_sla(prioridad):\n    return None\n\ndef cumple_sla(prioridad, horas):\n    return False`,
          tests: `assert calcular_sla("Alta") == 4\nassert calcular_sla("x") is None\nassert cumple_sla("media", 20) is True\nassert cumple_sla("alta", 5) is False\nassert cumple_sla("otra", 1) is False`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Repasá Lecture 0 (parte de funciones) y hacé Problem Set 0 completo.', minutes: 120 },
      { ref: 'pytutor', why: 'Visualizá cómo se crea y destruye el "frame" de una función (scope).', minutes: 30 },
      { ref: 'exercism', why: 'Ejercicios "Guido\'s Gorgeous Lasagna" y "Currency Exchange": funciones con parámetros y return.', minutes: 90 },
    ],
    docs: [{ ref: 'pydocs', why: 'Sección 4.7 "Defining Functions" y 4.8 "More on Defining Functions".' }],
    exercises: [
      { id: 'w4e1', title: 'Formatear respuesta', level: 'basica', kind: 'python', statement: 'respuesta(nombre, id_ticket) devuelve "Hola NOMBRE, tu ticket #ID fue recibido." con el nombre capitalizado (.title()).', hints: ['f-string', 'nombre.title()'], solution: `def respuesta(nombre, id_ticket):\n    return f"Hola {nombre.title()}, tu ticket #{id_ticket} fue recibido."`, starter: `def respuesta(nombre, id_ticket):\n    return ""`, tests: `assert respuesta("ana torres", 12) == "Hola Ana Torres, tu ticket #12 fue recibido."` },
      { id: 'w4e2', title: 'Validar email simple', level: 'intermedia', kind: 'python', statement: 'email_valido(email) devuelve True si contiene exactamente un "@", al menos un "." después del "@", y no tiene espacios.', hints: ['email.count("@")', 'email.split("@")', '" " in email'], solution: `def email_valido(email):\n    if " " in email or email.count("@") != 1:\n        return False\n    usuario, dominio = email.split("@")\n    return len(usuario) > 0 and "." in dominio`, starter: `def email_valido(email):\n    return False`, tests: `assert email_valido("ana@mail.com")\nassert not email_valido("ana@mail")\nassert not email_valido("ana mail@x.com")\nassert not email_valido("a@@b.com")` },
      { id: 'w4e3', title: 'Refactorizar', level: 'avanzada', kind: 'libre', statement: 'Tomá tu reporte diario de la semana 3 y reescribilo con funciones: calcular_promedio(), contar_fuera_de_sla(), ticket_mas_lento() y generar_reporte().', hints: ['Cada función recibe la lista como parámetro y devuelve un valor.'] },
    ],
    challenge: {
      title: 'Calculadora de presupuestos de automatización',
      context: 'Una agencia cobra proyectos de automatización: 25 USD/h de desarrollo, 15% extra si hay integración con IA y un mínimo de 200 USD por proyecto.',
      task: ['Escribí estimar_horas(cantidad_pasos) = 1.5 h por paso del workflow.', 'Escribí presupuesto(pasos, usa_ia=False) que use estimar_horas y aplique recargo y mínimo.', 'Agregá docstrings y probá 5 casos.'],
      deliverable: 'Módulo presupuesto.py con funciones documentadas y casos de prueba.',
    },
    deliverable: 'Ejercicios de funciones + reporte refactorizado + calculadora de presupuestos.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Diferenciar return de print con un ejemplo propio.', 'El reporte refactorizado usa solo parámetros, sin variables globales.'],
    questions: [
      mcq('q4-1', '¿Qué imprime este código?', ['8', 'None', 'Error', '4'], 1, 'La función usa print en vez de return, así que devuelve None. Se imprime 8 (dentro) y luego None.', { concept: 'return vs print', d: 'intermedia', code: `def doble(x):\n    print(x * 2)\n\nr = doble(4)\nprint(r)`, hints: ['¿La función tiene return?'] }),
      tf('q4-2', 'Una variable creada dentro de una función puede usarse fuera de ella.', false, 'Es local: solo existe durante la ejecución de la función.', { concept: 'Scope' }),
      mcq('q4-3', 'En def enviar(destino, asunto="Ticket"), ¿cómo se llama "Ticket"?', ['Argumento posicional', 'Valor por defecto', 'Variable global', 'Return'], 1, 'Es el valor por defecto del parámetro asunto.', { concept: 'Parámetros' }),
      mcq('q4-4', '¿Cuál definición es inválida?', ['def f(a, b=1):', 'def f(a=1, b):', 'def f():', 'def f(a, b):'], 1, 'Los parámetros con valor por defecto deben ir después de los obligatorios.', { concept: 'Parámetros', d: 'intermedia' }),
      tf('q4-5', 'return termina la ejecución de la función inmediatamente.', true, 'Las líneas posteriores al return no se ejecutan.', { concept: 'return vs print' }),
      mcq('q4-6', '¿Qué diferencia hay entre parámetro y argumento?', ['Ninguna', 'El parámetro está en la definición; el argumento es el valor al llamar', 'El argumento está en la definición', 'Los argumentos solo son números'], 1, 'Parámetro = nombre en def; argumento = valor concreto en la llamada.', { concept: 'Parámetros' }),
      py('q4-7', 'Completá promedio(numeros) que devuelva el promedio, o 0 si la lista está vacía.', `def promedio(numeros):\n    return 0`, `assert promedio([2, 4, 6]) == 4\nassert promedio([]) == 0`, `def promedio(numeros):\n    if not numeros:\n        return 0\n    return sum(numeros) / len(numeros)`, 'Proteger la división por cero es parte del diseño de una función.', { concept: 'return vs print', hints: ['sum() suma una lista.', 'Evitá dividir por cero.'] }),
      py('q4-8', 'Completá aplicar_descuento(precio, porcentaje=10) que devuelva el precio con descuento, redondeado a 2 decimales. Si el porcentaje no está entre 0 y 100, devolvé el precio original.', `def aplicar_descuento(precio, porcentaje=10):\n    return precio`, `assert aplicar_descuento(200) == 180\nassert aplicar_descuento(99.99, 15) == 84.99\nassert aplicar_descuento(100, 150) == 100`, `def aplicar_descuento(precio, porcentaje=10):\n    if porcentaje < 0 or porcentaje > 100:\n        return precio\n    return round(precio * (1 - porcentaje / 100), 2)`, 'Combina valor por defecto, validación y round().', { concept: 'Parámetros', d: 'avanzada', hints: ['round(x, 2)', 'Validá antes de calcular.'] }),
      mcq('q4-9', '¿Qué devuelve una función sin return?', ['0', '""', 'None', 'False'], 2, 'Implícitamente devuelve None.', { concept: 'return vs print' }),
      short('q4-10', '¿Qué palabra clave se usa para definir una función?', ['def'], 'def nombre(parámetros):', { concept: 'Funciones' }),
    ],
  },

  // ───────────────────────────── SEMANA 5 ─────────────────────────────
  {
    n: 5,
    stage: 1,
    title: 'Estructuras de datos: listas, tuplas, diccionarios y conjuntos',
    objective: 'Representar información real con la estructura adecuada y manipular colecciones de datos (como tickets o clientes) con soltura.',
    topics: ['Listas', 'Tuplas', 'Diccionarios', 'Conjuntos', 'Manipulación de datos'],
    review: 'Repaso semanas 3 y 4: vas a recorrer estructuras con for dentro de funciones.',
    lessons: [
      {
        id: 'w5l1',
        title: 'Listas y tuplas',
        minutes: 60,
        sections: [
          {
            heading: '1. Listas: colecciones ordenadas y modificables',
            body: [
              'Una lista guarda varios valores en orden: tickets = [101, 102, 103]. Se accede por índice empezando en 0: tickets[0] es 101. Los índices negativos cuentan desde el final: tickets[-1] es el último.',
              'Métodos clave: append() agrega al final, insert(i, x) inserta, remove(x) elimina por valor, pop() elimina y devuelve el último, sort() ordena, len() da la cantidad.',
            ],
            code: { lang: 'python', code: `cola = ["T-101", "T-102"]\ncola.append("T-103")\nprimero = cola.pop(0)   # atiende el primero\nprint(primero, cola)     # T-101 ['T-102', 'T-103']` },
          },
          {
            heading: '2. Slicing: porciones de una lista',
            body: ['lista[a:b] devuelve los elementos desde a hasta b-1. lista[:3] son los tres primeros; lista[-2:] los dos últimos. Funciona igual con strings.'],
          },
          {
            heading: '3. Comprensiones de listas',
            body: [
              'Forma compacta de crear una lista a partir de otra: [expresión for x in lista if condición]. Ejemplo: [h for h in horas if h > 24] filtra los tickets lentos.',
              'Usalas cuando sean legibles; si la lógica es larga, un for normal es más claro.',
            ],
            code: { lang: 'python', code: `horas = [4, 20, 70, 6, 52]\nlentos = [h for h in horas if h > 24]\nen_dias = [round(h / 24, 1) for h in horas]` },
          },
          {
            heading: '4. Tuplas: colecciones inmutables',
            body: [
              'Una tupla es como una lista pero no se puede modificar: punto = (10, 20). Se usa para datos que no deben cambiar o para devolver varios valores desde una función.',
              'Desempaquetado: total, promedio = calcular() asigna cada elemento a una variable.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Lista', def: 'Colección ordenada y mutable: [1, 2, 3].' },
          { term: 'Índice', def: 'Posición de un elemento, empezando en 0.' },
          { term: 'Slicing', def: 'Extraer una porción: lista[a:b].' },
          { term: 'Comprensión de lista', def: 'Crear listas en una línea: [x*2 for x in nums].' },
          { term: 'Tupla', def: 'Colección ordenada e inmutable: (1, 2).' },
        ],
        simpleExample: 'frutas = ["manzana", "pera"]; frutas.append("uva"); print(frutas[-1]) → uva.',
        realExample: 'Una cola de atención: los tickets nuevos se agregan con append() y el agente toma el siguiente con pop(0).',
        analogy: 'Una lista es una fila numerada de casilleros que podés reordenar; una tupla es la misma fila pero sellada.',
        commonErrors: ['IndexError al acceder a un índice que no existe (lista[len(lista)]).', 'Creer que sort() devuelve la lista ordenada: devuelve None y ordena en el lugar. sorted() devuelve una nueva.', 'Intentar modificar una tupla (TypeError).'],
        bestPractices: ['Usá nombres en plural para listas: tickets, clientes.', 'Preferí sorted() si necesitás conservar la original.', 'Usá tuplas para devolver múltiples valores.'],
        summary: ['Listas: ordenadas, mutables, índice desde 0.', 'Slicing [a:b] excluye b.', 'Tuplas: inmutables, útiles para retornos múltiples.'],
        comprehension: [
          { q: 'Si t = [5, 8, 2, 9], ¿qué es t[1:3] y t[-1]?', a: 't[1:3] = [8, 2]; t[-1] = 9.' },
          { q: '¿Qué devuelve lista.sort()?', a: 'None; ordena la lista original en el lugar.' },
        ],
        exercise: {
          statement: 'Completá top_lentos(horas, n) que devuelva una lista con los n valores más altos, de mayor a menor, sin modificar la lista original.',
          hints: ['sorted(lista, reverse=True)', 'Slicing [:n]'],
          solution: `def top_lentos(horas, n):\n    return sorted(horas, reverse=True)[:n]`,
          starter: `def top_lentos(horas, n):\n    return []`,
          tests: `h = [4, 70, 20, 52]\nassert top_lentos(h, 2) == [70, 52]\nassert h == [4, 70, 20, 52], "No modifiques la original"`,
        },
      },
      {
        id: 'w5l2',
        title: 'Diccionarios y conjuntos: datos con estructura',
        minutes: 70,
        sections: [
          {
            heading: '1. Diccionarios: pares clave → valor',
            body: [
              'Un diccionario asocia claves con valores: ticket = {"id": 1, "cliente": "Ana", "estado": "abierto"}. Se accede por clave: ticket["cliente"].',
              'Es la estructura más importante para automatización: los JSON que devuelven las APIs se convierten en diccionarios de Python.',
              'Si la clave no existe, ticket["x"] da KeyError. Usá ticket.get("x") que devuelve None (o un valor por defecto: ticket.get("x", "sin dato")).',
            ],
            code: { lang: 'python', code: `ticket = {"id": 1, "cliente": "Ana", "estado": "abierto"}\nticket["estado"] = "resuelto"     # modificar\nticket["prioridad"] = "alta"       # agregar\nprint(ticket.get("agente", "sin asignar"))\n\nfor clave, valor in ticket.items():\n    print(clave, "→", valor)` },
          },
          {
            heading: '2. Listas de diccionarios: una "tabla" en memoria',
            body: [
              'Una lista de diccionarios representa registros, como filas de una hoja de cálculo. Es el formato típico de datos que vas a procesar.',
            ],
            code: { lang: 'python', code: `tickets = [\n    {"id": 1, "motivo": "acceso", "horas": 20},\n    {"id": 2, "motivo": "factura", "horas": 4},\n    {"id": 3, "motivo": "acceso", "horas": 3},\n]\n\nconteo = {}\nfor t in tickets:\n    m = t["motivo"]\n    conteo[m] = conteo.get(m, 0) + 1\nprint(conteo)   # {'acceso': 2, 'factura': 1}` },
          },
          {
            heading: '3. Conjuntos: valores únicos',
            body: [
              'Un set guarda elementos sin repetir y sin orden: {"acceso", "factura"}. Útil para eliminar duplicados (set(lista)) y para operaciones como unión (|), intersección (&) y diferencia (-).',
              'Verificar pertenencia (x in conjunto) es muy rápido.',
            ],
          },
          {
            heading: '4. Elegir la estructura correcta',
            body: [
              'Lista: orden importa, puede haber repetidos. Tupla: datos fijos. Diccionario: buscar por nombre/clave, registros con campos. Set: unicidad y pertenencia.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'Diccionario', def: 'Colección de pares clave: valor, mutable.' },
          { term: '.get()', def: 'Obtiene un valor sin error si la clave no existe.' },
          { term: '.items()', def: 'Devuelve pares (clave, valor) para recorrer.' },
          { term: 'Set', def: 'Colección sin duplicados ni orden.' },
          { term: 'Lista de diccionarios', def: 'Representación de registros tipo tabla.' },
        ],
        simpleExample: 'precios = {"cafe": 1500, "te": 1200}; print(precios["te"]) → 1200.',
        realExample: 'La API de un CRM devuelve un contacto como {"name": "Ana", "email": "...", "tags": ["vip"]}. Tu automatización lee contacto["email"] para enviar un correo.',
        analogy: 'Un diccionario es como una agenda: buscás por nombre (clave) y encontrás el teléfono (valor).',
        commonErrors: ['KeyError al acceder a una clave inexistente con [].', 'Esperar orden en un set.', 'Usar listas como claves de diccionario (no se puede: deben ser inmutables).'],
        bestPractices: ['Usá .get() cuando un campo puede faltar.', 'Mantené las mismas claves en todos los registros.', 'Usá dict.get(k, 0) + 1 para contar.'],
        summary: ['Diccionarios = registros con campos.', 'Lista de diccionarios = tabla.', 'Sets = valores únicos.'],
        comprehension: [
          { q: '¿Qué diferencia hay entre d["x"] y d.get("x")?', a: 'd["x"] lanza KeyError si la clave no existe; d.get("x") devuelve None (o el valor por defecto indicado).' },
          { q: '¿Cómo eliminarías duplicados de una lista de emails?', a: 'Convirtiéndola a set: set(emails). Si importa el orden, list(dict.fromkeys(emails)).' },
        ],
        exercise: {
          statement: 'Completá contar_por_motivo(tickets) que reciba una lista de diccionarios con clave "motivo" y devuelva un diccionario {motivo: cantidad}.',
          hints: ['Diccionario vacío antes del for.', 'conteo.get(m, 0) + 1'],
          solution: `def contar_por_motivo(tickets):\n    conteo = {}\n    for t in tickets:\n        m = t["motivo"]\n        conteo[m] = conteo.get(m, 0) + 1\n    return conteo`,
          starter: `def contar_por_motivo(tickets):\n    return {}`,
          tests: `ts = [{"motivo":"acceso"},{"motivo":"envio"},{"motivo":"acceso"}]\nassert contar_por_motivo(ts) == {"acceso": 2, "envio": 1}\nassert contar_por_motivo([]) == {}`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 2 (listas y diccionarios dentro de loops) y Lecture 3 en adelante según tu ritmo.', minutes: 90 },
      { ref: 'w3py', why: 'Secciones Lists, Tuples, Sets, Dictionaries como referencia de métodos.', minutes: 60 },
      { ref: 'exercism', why: 'Ejercicios "Card Games" (listas) e "Inventory Management" (diccionarios).', minutes: 90 },
    ],
    docs: [{ ref: 'pydocs', why: 'Capítulo 5 "Data Structures".' }],
    exercises: [
      { id: 'w5e1', title: 'Filtrar por estado', level: 'basica', kind: 'python', statement: 'abiertos(tickets) devuelve solo los diccionarios con "estado" == "abierto".', hints: ['Comprensión de lista con if.'], solution: `def abiertos(tickets):\n    return [t for t in tickets if t["estado"] == "abierto"]`, starter: `def abiertos(tickets):\n    return []`, tests: `ts=[{"id":1,"estado":"abierto"},{"id":2,"estado":"cerrado"}]\nassert abiertos(ts) == [{"id":1,"estado":"abierto"}]` },
      { id: 'w5e2', title: 'Clientes únicos', level: 'intermedia', kind: 'python', statement: 'clientes_unicos(tickets) devuelve la lista ordenada alfabéticamente de clientes sin repetir.', hints: ['set()', 'sorted()'], solution: `def clientes_unicos(tickets):\n    return sorted({t["cliente"] for t in tickets})`, starter: `def clientes_unicos(tickets):\n    return []`, tests: `ts=[{"cliente":"Bea"},{"cliente":"Ana"},{"cliente":"Bea"}]\nassert clientes_unicos(ts) == ["Ana","Bea"]` },
      { id: 'w5e3', title: 'Promedio por motivo', level: 'avanzada', kind: 'python', statement: 'promedio_por_motivo(tickets) devuelve {motivo: promedio de "horas"} redondeado a 1 decimal.', hints: ['Acumulá sumas y conteos en dos diccionarios.'], solution: `def promedio_por_motivo(tickets):\n    suma, cant = {}, {}\n    for t in tickets:\n        m = t["motivo"]\n        suma[m] = suma.get(m, 0) + t["horas"]\n        cant[m] = cant.get(m, 0) + 1\n    return {m: round(suma[m] / cant[m], 1) for m in suma}`, starter: `def promedio_por_motivo(tickets):\n    return {}`, tests: `ts=[{"motivo":"a","horas":2},{"motivo":"a","horas":3},{"motivo":"b","horas":10}]\nassert promedio_por_motivo(ts) == {"a": 2.5, "b": 10.0}` },
    ],
    challenge: {
      title: 'Mini CRM en memoria',
      context: 'Una pyme guarda sus clientes en una planilla. Querés modelarlos en Python para luego automatizar seguimientos.',
      task: ['Creá una lista de 8 clientes como diccionarios (nombre, email, país, plan, compras).', 'Calculá: clientes por país, total de compras por plan, top 3 clientes por compras.', 'Detectá emails duplicados con un set.'],
      deliverable: 'Script mini_crm.py con los resultados impresos de forma clara.',
    },
    deliverable: 'Ejercicios de estructuras de datos + mini CRM.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Elegir y justificar la estructura adecuada para 3 situaciones distintas.', 'Mini CRM funcionando con lista de diccionarios.'],
    questions: [
      mcq('q5-1', 'Si tickets = [10, 20, 30, 40], ¿qué es tickets[1:3]?', ['[10, 20]', '[20, 30]', '[20, 30, 40]', '[10, 20, 30]'], 1, 'El slicing [1:3] toma índices 1 y 2.', { concept: 'Listas' }),
      mcq('q5-2', '¿Qué estructura usarías para guardar los datos de UN cliente (nombre, email, plan)?', ['Lista', 'Tupla', 'Diccionario', 'Set'], 2, 'Un diccionario permite acceder a cada campo por nombre.', { concept: 'Elegir estructura' }),
      tf('q5-3', 'Un set puede contener elementos repetidos.', false, 'Los sets eliminan duplicados automáticamente.', { concept: 'Conjuntos' }),
      mcq('q5-4', '¿Qué imprime este código?', ['None', 'KeyError', '"sin agente"', 'agente'], 2, '.get() con valor por defecto evita el KeyError.', { concept: 'Diccionarios', code: `t = {"id": 1}\nprint(t.get("agente", "sin agente"))` }),
      tf('q5-5', 'Las tuplas se pueden modificar después de creadas.', false, 'Son inmutables.', { concept: 'Tuplas' }),
      mcq('q5-6', '¿Qué imprime este código?', ['[3, 1, 2]', '[1, 2, 3]', 'None', 'Error'], 2, 'sort() ordena en el lugar y devuelve None.', { concept: 'Listas', d: 'intermedia', code: `n = [3, 1, 2]\nprint(n.sort())` }),
      mcq('q5-7', '¿Qué produce [x * 2 for x in range(4) if x % 2 == 0]?', ['[0, 4]', '[0, 2, 4, 6]', '[2, 6]', '[0, 4, 8]'], 0, 'x toma 0 y 2 (pares), multiplicados por 2: [0, 4].', { concept: 'Comprensiones', d: 'avanzada' }),
      py('q5-8', 'Completá agrupar_por_agente(tickets) que devuelva {agente: [ids de tickets]}.', `def agrupar_por_agente(tickets):\n    return {}`, `ts=[{"id":1,"agente":"Lu"},{"id":2,"agente":"Mar"},{"id":3,"agente":"Lu"}]\nassert agrupar_por_agente(ts) == {"Lu":[1,3],"Mar":[2]}`, `def agrupar_por_agente(tickets):\n    g = {}\n    for t in tickets:\n        g.setdefault(t["agente"], []).append(t["id"])\n    return g`, 'Patrón de agrupación: diccionario de listas.', { concept: 'Diccionarios', d: 'avanzada', hints: ['Si la clave no existe, creá una lista vacía.', 'dict.setdefault(k, []) devuelve la lista existente o crea una.'] }),
      py('q5-9', 'Completá emails_comunes(lista_a, lista_b) que devuelva un set con los emails presentes en ambas listas.', `def emails_comunes(lista_a, lista_b):\n    return set()`, `assert emails_comunes(["a@x.com","b@x.com"],["b@x.com","c@x.com"]) == {"b@x.com"}`, `def emails_comunes(lista_a, lista_b):\n    return set(lista_a) & set(lista_b)`, 'La intersección de conjuntos (&) da los elementos comunes.', { concept: 'Conjuntos', hints: ['Convertí ambas listas a set.', 'Operador &'] }),
      mcq('q5-10', 'Cuando una API devuelve JSON, en Python normalmente lo manipulás como...', ['Tuplas', 'Diccionarios y listas', 'Sets', 'Strings solamente'], 1, 'json.loads() convierte objetos JSON en diccionarios y arrays en listas.', { concept: 'Diccionarios' }),
    ],
  },

  // ───────────────────────────── SEMANA 6 ─────────────────────────────
  {
    n: 6,
    stage: 1,
    title: 'Strings, archivos y manejo de errores',
    objective: 'Limpiar y transformar texto, leer y escribir archivos (TXT, CSV, JSON) y hacer programas robustos que no se rompan ante datos inválidos.',
    topics: ['Strings', 'Archivos', 'Lectura y escritura', 'Manejo de excepciones', 'Validación de información'],
    review: 'Repaso semana 5: los archivos CSV y JSON se convierten en listas de diccionarios.',
    lessons: [
      {
        id: 'w6l1',
        title: 'Trabajar con texto (strings)',
        minutes: 50,
        sections: [
          {
            heading: '1. Métodos esenciales',
            body: [
              '.strip() quita espacios al inicio y final; .lower() / .upper() cambian mayúsculas; .replace(a, b) reemplaza; .split(sep) divide en lista; sep.join(lista) une; .startswith() / .endswith() verifican; .find() busca la posición.',
              'Los strings son inmutables: cada método devuelve un string nuevo. Hay que reasignar: texto = texto.strip().',
            ],
            code: { lang: 'python', code: `asunto = "  RE: Problema con FACTURA #4521  "\nlimpio = asunto.strip().lower()\nprint(limpio)                    # re: problema con factura #4521\nnumero = limpio.split("#")[1]    # "4521"\nprint(" | ".join(["ana", "alta", "abierto"]))` },
          },
          {
            heading: '2. Limpieza de datos de texto',
            body: [
              'Los datos reales vienen sucios: espacios extra, mayúsculas inconsistentes, tildes, formatos distintos. Normalizar antes de comparar o guardar evita errores en las automatizaciones.',
              'Una función normalizar(texto) que haga strip + lower es una de las más reutilizadas en cualquier proyecto.',
            ],
          },
        ],
        keyConcepts: [
          { term: '.strip()', def: 'Elimina espacios en los extremos.' },
          { term: '.split() / .join()', def: 'Dividir un texto en lista / unir una lista en texto.' },
          { term: 'Inmutabilidad', def: 'Los strings no cambian; los métodos devuelven uno nuevo.' },
        ],
        simpleExample: '"a,b,c".split(",") → ["a", "b", "c"].',
        realExample: 'Normalizar nombres de clientes antes de buscarlos en la base evita que "Ana Torres " y "ana torres" se registren como dos personas distintas.',
        analogy: 'Limpiar strings es como ordenar papeles antes de archivarlos: si no, nunca encontrás nada.',
        commonErrors: ['Llamar texto.strip() sin reasignar el resultado.', 'Olvidar que split() sin argumentos separa por cualquier espacio.'],
        bestPractices: ['Normalizá en un solo lugar (una función).', 'No modifiques el dato original si lo necesitás para auditoría.'],
        summary: ['Los métodos de string devuelven strings nuevos.', 'strip, lower, split y join resuelven la mayoría de los casos.'],
        comprehension: [{ q: '¿Qué imprime "  Hola ".strip().upper()?', a: '"HOLA"' }],
        exercise: {
          statement: 'Completá extraer_numero_ticket(asunto) que devuelva el número que sigue a "#" como int, o None si no hay "#".',
          hints: ['"#" in asunto', 'split("#")[1]', 'Puede haber texto después: split()[0]'],
          solution: `def extraer_numero_ticket(asunto):\n    if "#" not in asunto:\n        return None\n    despues = asunto.split("#")[1].strip()\n    return int(despues.split()[0])`,
          starter: `def extraer_numero_ticket(asunto):\n    return None`,
          tests: `assert extraer_numero_ticket("RE: Factura #4521 pendiente") == 4521\nassert extraer_numero_ticket("Hola") is None`,
        },
      },
      {
        id: 'w6l2',
        title: 'Archivos y excepciones',
        minutes: 80,
        sections: [
          {
            heading: '1. Abrir archivos con with open',
            body: [
              'open(ruta, modo) abre un archivo. Modos: "r" leer, "w" escribir (borra el contenido), "a" agregar al final. Usá siempre encoding="utf-8" para que las tildes funcionen.',
              'with cierra el archivo automáticamente aunque ocurra un error. Es la forma correcta.',
            ],
            code: { lang: 'python', code: `with open("log.txt", "a", encoding="utf-8") as f:\n    f.write("Ticket 101 procesado\\n")\n\nwith open("log.txt", "r", encoding="utf-8") as f:\n    for linea in f:\n        print(linea.strip())` },
          },
          {
            heading: '2. CSV y JSON',
            body: [
              'CSV: texto con valores separados por comas, como una planilla. El módulo csv con DictReader convierte cada fila en un diccionario.',
              'JSON: formato estándar de intercambio de datos de las APIs. json.dump() guarda, json.load() lee.',
            ],
            code: { lang: 'python', code: `import csv, json\n\nwith open("tickets.csv", encoding="utf-8") as f:\n    tickets = list(csv.DictReader(f))\n\nwith open("tickets.json", "w", encoding="utf-8") as f:\n    json.dump(tickets, f, ensure_ascii=False, indent=2)` },
          },
          {
            heading: '3. Excepciones: errores que podés manejar',
            body: [
              'Una excepción es un error en tiempo de ejecución: ValueError (int("abc")), KeyError, FileNotFoundError, ZeroDivisionError.',
              'try/except permite capturarlas y reaccionar en lugar de que el programa se caiga. else se ejecuta si no hubo error; finally siempre se ejecuta.',
              'Capturá excepciones específicas. Un except: vacío esconde errores reales y hace imposible depurar.',
            ],
            code: { lang: 'python', code: `def leer_horas(texto):\n    try:\n        horas = float(texto)\n    except ValueError:\n        print(f"Valor inválido: {texto!r}")\n        return None\n    if horas < 0:\n        raise ValueError("Las horas no pueden ser negativas")\n    return horas` },
          },
          {
            heading: '4. Validar antes de procesar',
            body: [
              'En automatización, los datos llegan de formularios, correos y APIs: asumí que pueden venir mal. Validá tipo, rango, formato y campos obligatorios, y registrá qué registros fallaron y por qué en lugar de detener todo el proceso.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'with open()', def: 'Abre un archivo y lo cierra automáticamente.' },
          { term: 'CSV', def: 'Formato tabular de texto separado por comas.' },
          { term: 'JSON', def: 'Formato de datos clave-valor usado por las APIs.' },
          { term: 'Excepción', def: 'Error en tiempo de ejecución que interrumpe el flujo.' },
          { term: 'try / except', def: 'Captura y maneja excepciones.' },
          { term: 'raise', def: 'Lanza una excepción a propósito.' },
        ],
        simpleExample: 'try: int("abc") except ValueError: print("No es un número").',
        realExample: 'Un script importa 2000 filas de un CSV de pedidos. 15 tienen montos inválidos. En lugar de romperse en la fila 37, las guarda en errores.csv con el motivo y procesa las demás.',
        analogy: 'try/except es como una red de seguridad en un circo: no evita la caída, pero evita que termine en desastre.',
        commonErrors: ['Usar modo "w" cuando querías agregar: borra el archivo.', 'Olvidar encoding="utf-8" y ver caracteres raros.', 'except: sin tipo, que oculta errores.', 'Poner demasiado código dentro del try.'],
        bestPractices: ['Siempre with open(..., encoding="utf-8").', 'Capturá excepciones específicas.', 'Registrá los errores (log) en lugar de ignorarlos.'],
        summary: ['with open maneja archivos de forma segura.', 'csv y json convierten archivos en estructuras de Python.', 'try/except hace programas robustos.'],
        comprehension: [
          { q: '¿Qué diferencia hay entre los modos "w" y "a"?', a: '"w" sobrescribe el archivo completo; "a" agrega al final sin borrar.' },
          { q: '¿Por qué es mala práctica usar except: sin especificar el tipo?', a: 'Captura cualquier error, incluso bugs y la interrupción con Ctrl+C, ocultando problemas reales.' },
        ],
        exercise: {
          statement: 'Completá parsear_montos(lista_textos) que convierta cada texto a float y devuelva una tupla (validos, errores) donde validos es la lista de floats y errores la lista de textos que no se pudieron convertir.',
          hints: ['try/except ValueError dentro del for.', 'Dos listas: append en una u otra.'],
          solution: `def parsear_montos(lista_textos):\n    validos, errores = [], []\n    for t in lista_textos:\n        try:\n            validos.append(float(t))\n        except ValueError:\n            errores.append(t)\n    return validos, errores`,
          starter: `def parsear_montos(lista_textos):\n    return [], []`,
          tests: `assert parsear_montos(["10", "abc", "2.5", ""]) == ([10.0, 2.5], ["abc", ""])`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 3 (Exceptions) y Lecture 6 (File I/O).', minutes: 150 },
      { ref: 'exercism', why: 'Ejercicios de strings ("Little Sister\'s Vocabulary") y de excepciones.', minutes: 60 },
      { ref: 'colab', why: 'Subí un CSV propio y practicá lectura con csv.DictReader.', minutes: 30 },
    ],
    docs: [
      { ref: 'pydocs', why: 'Capítulo 7.2 "Reading and Writing Files" y capítulo 8 "Errors and Exceptions".' },
      { ref: 'json', why: 'Leé la página para entender la estructura de objetos y arrays.' },
    ],
    exercises: [
      { id: 'w6e1', title: 'Normalizar nombres', level: 'basica', kind: 'python', statement: 'normalizar(nombre) quita espacios extra (también internos) y devuelve el nombre en formato Título.', hints: ['" ".join(nombre.split())', '.title()'], solution: `def normalizar(nombre):\n    return " ".join(nombre.split()).title()`, starter: `def normalizar(nombre):\n    return nombre`, tests: `assert normalizar("  ana    TORRES ") == "Ana Torres"` },
      { id: 'w6e2', title: 'Validar registro', level: 'avanzada', kind: 'python', statement: 'validar(registro) recibe un dict y devuelve una lista de errores (strings). Reglas: "email" obligatorio con "@"; "monto" convertible a float y >= 0.', hints: ['Empezá con errores = [].', 'Usá .get() para campos que pueden faltar.', 'try/except para el monto.'], solution: `def validar(registro):\n    errores = []\n    email = registro.get("email", "")\n    if "@" not in email:\n        errores.append("email inválido")\n    try:\n        if float(registro.get("monto", "")) < 0:\n            errores.append("monto negativo")\n    except ValueError:\n        errores.append("monto inválido")\n    return errores`, starter: `def validar(registro):\n    return []`, tests: `assert validar({"email":"a@b.com","monto":"10"}) == []\nassert validar({"email":"ab","monto":"x"}) == ["email inválido","monto inválido"]\nassert validar({"email":"a@b.com","monto":"-1"}) == ["monto negativo"]` },
      { id: 'w6e3', title: 'CSV → JSON', level: 'intermedia', kind: 'libre', statement: 'En Colab o tu computadora, creá un tickets.csv con 10 filas, leelo con DictReader, convertí "horas" a float con manejo de errores y guardá el resultado limpio en tickets.json.', hints: ['csv.DictReader', 'json.dump(..., ensure_ascii=False, indent=2)'] },
    ],
    challenge: {
      title: 'Importador de pedidos con reporte de errores',
      context: 'Un ecommerce exporta pedidos a CSV, pero el archivo tiene filas con montos vacíos, emails mal escritos y fechas inválidas.',
      task: ['Leé el CSV y validá cada fila (email, monto, fecha con formato AAAA-MM-DD).', 'Guardá las válidas en pedidos_ok.json.', 'Guardá las inválidas en errores.csv con una columna "motivo".', 'Mostrá un resumen: total, válidas, inválidas.'],
      deliverable: 'Script importador.py + archivos de entrada y salida de ejemplo.',
    },
    deliverable: 'Ejercicios de strings y archivos + importador con reporte de errores.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'El importador no se detiene ante filas inválidas.', 'Usar with open y encoding="utf-8" en todos los casos.'],
    questions: [
      mcq('q6-1', '¿Qué imprime este código?', ['"  Hola  "', '"Hola"', '"hola"', 'None'], 0, 'strip() no modifica el string original: hay que reasignar t = t.strip().', { concept: 'Strings', d: 'intermedia', code: `t = "  Hola  "\nt.strip()\nprint(repr(t))` }),
      mcq('q6-2', '¿Qué modo de open() agrega contenido al final sin borrar?', ['"r"', '"w"', '"a"', '"x"'], 2, '"a" = append.', { concept: 'Archivos' }),
      tf('q6-3', 'with open(...) cierra el archivo automáticamente aunque ocurra un error.', true, 'Es la ventaja principal del bloque with (context manager).', { concept: 'Archivos' }),
      mcq('q6-4', '¿Qué excepción produce int("abc")?', ['TypeError', 'ValueError', 'KeyError', 'NameError'], 1, 'El tipo es correcto (str) pero el valor no es convertible: ValueError.', { concept: 'Excepciones' }),
      mcq('q6-5', '"a;b;c".split(";") devuelve...', ['"abc"', '["a;b;c"]', '["a", "b", "c"]', '("a","b","c")'], 2, 'split divide el texto en una lista usando el separador.', { concept: 'Strings' }),
      tf('q6-6', 'Usar except: sin tipo de excepción es una buena práctica porque captura todo.', false, 'Oculta errores inesperados y dificulta depurar. Capturá excepciones específicas.', { concept: 'Excepciones' }),
      mcq('q6-7', '¿Qué módulo convierte filas de un CSV en diccionarios?', ['json.load', 'csv.DictReader', 'open().read()', 'csv.writer'], 1, 'DictReader usa la primera fila como claves.', { concept: 'Archivos' }),
      py('q6-8', 'Completá dividir_seguro(a, b) que devuelva a / b, o None si b es 0 (usá try/except).', `def dividir_seguro(a, b):\n    return a / b`, `assert dividir_seguro(10, 2) == 5\nassert dividir_seguro(1, 0) is None`, `def dividir_seguro(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None`, 'ZeroDivisionError es la excepción específica de dividir por cero.', { concept: 'Excepciones', hints: ['¿Qué excepción lanza 1/0?'] }),
      py('q6-9', 'Completá parsear_linea(linea) que reciba "id;cliente;prioridad" y devuelva un dict con esas claves, id como int y textos sin espacios extra. Si faltan campos, lanzá ValueError.', `def parsear_linea(linea):\n    return {}`, `assert parsear_linea(" 7 ; Ana ; alta ") == {"id": 7, "cliente": "Ana", "prioridad": "alta"}\ntry:\n    parsear_linea("1;Ana")\n    assert False, "Debía lanzar ValueError"\nexcept ValueError:\n    pass`, `def parsear_linea(linea):\n    partes = [p.strip() for p in linea.split(";")]\n    if len(partes) != 3:\n        raise ValueError("Formato inválido")\n    return {"id": int(partes[0]), "cliente": partes[1], "prioridad": partes[2]}`, 'split + strip + validación de cantidad de campos + raise.', { concept: 'Validación', d: 'avanzada', hints: ['split(";") y strip() en cada parte.', 'Verificá len(partes) == 3.', 'raise ValueError("...")'] }),
      short('q6-10', '¿Qué formato de texto usan casi todas las APIs web para intercambiar datos? (sigla)', ['json'], 'JSON: JavaScript Object Notation.', { concept: 'Archivos' }),
    ],
  },

  // ───────────────────────────── SEMANA 7 ─────────────────────────────
  {
    n: 7,
    stage: 1,
    title: 'Módulos, librerías, POO y entornos virtuales',
    objective: 'Organizar código en módulos, usar librerías externas, modelar entidades con clases y preparar tu entorno de desarrollo local de forma profesional.',
    topics: ['Módulos', 'Librerías', 'Programación orientada a objetos', 'Clases y objetos', 'Introducción a entornos virtuales'],
    review: 'Repaso semanas 4 y 5: una clase agrupa datos (como un diccionario) y funciones (métodos).',
    lessons: [
      {
        id: 'w7l1',
        title: 'Módulos, librerías y entornos virtuales',
        minutes: 60,
        sections: [
          {
            heading: '1. Módulos: dividir el código en archivos',
            body: [
              'Un módulo es un archivo .py. Podés importar funciones de otro archivo: from utilidades import normalizar. Así un proyecto se organiza por responsabilidades (validaciones.py, reportes.py).',
              'Python trae una biblioteca estándar enorme: datetime (fechas), json, csv, random, pathlib (rutas), statistics.',
            ],
            code: { lang: 'python', code: `from datetime import datetime, timedelta\n\nahora = datetime.now()\nvence = ahora + timedelta(hours=24)\nprint(vence.strftime("%Y-%m-%d %H:%M"))` },
          },
          {
            heading: '2. Librerías externas y pip',
            body: [
              'Las librerías de terceros se instalan con pip desde PyPI: pip install requests. Ejemplos clave para tu perfil: requests (APIs), pandas (datos), python-dotenv (credenciales).',
              'Antes de instalar, verificá que la librería sea mantenida y popular: buscala en PyPI y en su repositorio.',
            ],
          },
          {
            heading: '3. Instalación local y entornos virtuales',
            body: [
              'Instalá Python desde python.org (en Windows, marcá "Add Python to PATH") y VS Code con la extensión Python.',
              'Un entorno virtual (venv) es una carpeta aislada con su propio Python y librerías. Cada proyecto tiene el suyo, así las versiones no chocan.',
              'requirements.txt lista las dependencias para que otra persona (o un servidor) pueda reproducir tu entorno.',
            ],
            code: { lang: 'bash', code: `python -m venv .venv\n# Windows:\n.venv\\Scripts\\activate\n# macOS / Linux:\nsource .venv/bin/activate\n\npip install requests\npip freeze > requirements.txt` },
          },
        ],
        keyConcepts: [
          { term: 'Módulo', def: 'Archivo .py que se puede importar.' },
          { term: 'Biblioteca estándar', def: 'Módulos que vienen con Python.' },
          { term: 'pip', def: 'Gestor de paquetes para instalar librerías de PyPI.' },
          { term: 'venv', def: 'Entorno virtual aislado por proyecto.' },
          { term: 'requirements.txt', def: 'Lista de dependencias del proyecto.' },
        ],
        simpleExample: 'import random; print(random.choice(["alta", "media", "baja"])).',
        realExample: 'Tu proyecto de soporte tiene: main.py, tickets.py (lógica), almacenamiento.py (archivos), y requirements.txt. Cualquiera puede clonarlo y ejecutarlo.',
        analogy: 'Un entorno virtual es como una caja de herramientas por proyecto: no mezclás las herramientas de plomería con las de carpintería.',
        commonErrors: ['Instalar librerías sin activar el venv.', 'Nombrar un archivo propio igual que un módulo (json.py, random.py): rompe el import.', 'Subir la carpeta .venv a GitHub.'],
        bestPractices: ['Un venv por proyecto.', 'requirements.txt siempre actualizado.', 'Agregá .venv al .gitignore.'],
        summary: ['Módulos organizan el código.', 'pip instala librerías.', 'venv aísla dependencias.'],
        comprehension: [{ q: '¿Por qué no deberías llamar a tu archivo json.py?', a: 'Porque Python importaría tu archivo en lugar del módulo estándar json, y fallaría.' }],
        exercise: {
          statement: 'Completá horas_entre(inicio, fin) que reciba dos fechas "AAAA-MM-DD HH:MM" y devuelva las horas transcurridas como float (usá datetime.strptime).',
          hints: ['datetime.strptime(texto, "%Y-%m-%d %H:%M")', 'La resta da un timedelta: .total_seconds() / 3600'],
          solution: `from datetime import datetime\n\ndef horas_entre(inicio, fin):\n    f = "%Y-%m-%d %H:%M"\n    delta = datetime.strptime(fin, f) - datetime.strptime(inicio, f)\n    return delta.total_seconds() / 3600`,
          starter: `from datetime import datetime\n\ndef horas_entre(inicio, fin):\n    return 0`,
          tests: `assert horas_entre("2026-03-01 08:00", "2026-03-02 10:30") == 26.5`,
        },
      },
      {
        id: 'w7l2',
        title: 'Programación orientada a objetos: clases y objetos',
        minutes: 80,
        sections: [
          {
            heading: '1. Por qué clases',
            body: [
              'Hasta ahora representaste un ticket con un diccionario y funciones sueltas. Una clase agrupa los datos (atributos) y el comportamiento (métodos) de una entidad en un solo lugar.',
              'La clase es el molde; cada objeto (instancia) es un ticket concreto creado con ese molde.',
            ],
          },
          {
            heading: '2. Definir una clase',
            body: [
              '__init__ es el método constructor: se ejecuta al crear el objeto e inicializa sus atributos. self representa al objeto actual: self.estado es "el estado de este ticket".',
              'Los métodos son funciones dentro de la clase; siempre reciben self como primer parámetro.',
            ],
            code: { lang: 'python', code: `class Ticket:\n    def __init__(self, id, cliente, motivo, prioridad="media"):\n        self.id = id\n        self.cliente = cliente\n        self.motivo = motivo\n        self.prioridad = prioridad\n        self.estado = "abierto"\n\n    def cerrar(self):\n        self.estado = "cerrado"\n\n    def __str__(self):\n        return f"#{self.id} {self.cliente} [{self.prioridad}] {self.estado}"\n\nt = Ticket(1, "Ana", "acceso", "alta")\nt.cerrar()\nprint(t)   # #1 Ana [alta] cerrado` },
          },
          {
            heading: '3. Encapsular reglas de negocio',
            body: [
              'La ventaja real: las reglas viven dentro de la clase. Por ejemplo, cambiar_prioridad() puede validar que el valor sea permitido. Nadie puede dejar un ticket en un estado inválido si todos usan los métodos.',
              'Una segunda clase, GestorTickets, puede contener la lista de tickets y métodos como agregar(), buscar(), filtrar_por_estado().',
            ],
          },
          {
            heading: '4. Herencia (introducción)',
            body: ['Una clase puede heredar de otra: class TicketPremium(Ticket) reutiliza todo y agrega o cambia comportamiento (por ejemplo, SLA más corto). Usala con moderación: la composición (una clase que contiene otras) suele ser más simple.'],
          },
        ],
        keyConcepts: [
          { term: 'Clase', def: 'Molde que define atributos y métodos.' },
          { term: 'Objeto / instancia', def: 'Elemento concreto creado a partir de una clase.' },
          { term: '__init__', def: 'Constructor: inicializa los atributos.' },
          { term: 'self', def: 'Referencia al objeto actual dentro de los métodos.' },
          { term: 'Método', def: 'Función definida dentro de una clase.' },
          { term: 'Herencia', def: 'Una clase hija reutiliza y extiende a una clase padre.' },
        ],
        simpleExample: 'class Perro: def ladrar(self): return "Guau" → Perro().ladrar().',
        realExample: 'Las librerías que vas a usar están hechas de clases: requests.Response, datetime, y los clientes de APIs de IA (client = Anthropic(); client.messages.create(...)). Entender clases te permite leer su documentación.',
        analogy: 'La clase es el plano de una casa; los objetos son las casas construidas con ese plano, cada una con sus propios muebles (atributos).',
        commonErrors: ['Olvidar self en la definición de un método (TypeError al llamarlo).', 'Escribir estado = "x" en vez de self.estado = "x" (crea una variable local).', 'Confundir la clase (Ticket) con una instancia (t).'],
        bestPractices: ['Nombres de clases en PascalCase: GestorTickets.', 'Métodos que validan antes de modificar atributos.', 'Definí __str__ para depurar fácilmente.'],
        summary: ['Clases = datos + comportamiento.', '__init__ inicializa; self es el objeto.', 'Las reglas de negocio viven en métodos.'],
        comprehension: [
          { q: '¿Qué pasa si en __init__ escribís estado = "abierto" sin self?', a: 'Se crea una variable local que desaparece al terminar __init__; el objeto no tendrá atributo estado.' },
          { q: '¿Cuál es la diferencia entre Ticket y Ticket(1, "Ana", "acceso")?', a: 'Ticket es la clase (molde); Ticket(...) crea una instancia concreta.' },
        ],
        exercise: {
          statement: 'Completá la clase Ticket: cambiar_prioridad(nueva) debe aceptar solo "baja", "media" o "alta" (si no, lanzar ValueError), y esta_abierto() debe devolver True si el estado es "abierto".',
          hints: ['if nueva not in (...): raise ValueError(...)', 'return self.estado == "abierto"'],
          solution: `class Ticket:\n    def __init__(self, id, cliente):\n        self.id = id\n        self.cliente = cliente\n        self.prioridad = "media"\n        self.estado = "abierto"\n\n    def cambiar_prioridad(self, nueva):\n        if nueva not in ("baja", "media", "alta"):\n            raise ValueError("Prioridad inválida")\n        self.prioridad = nueva\n\n    def esta_abierto(self):\n        return self.estado == "abierto"`,
          starter: `class Ticket:\n    def __init__(self, id, cliente):\n        self.id = id\n        self.cliente = cliente\n        self.prioridad = "media"\n        self.estado = "abierto"\n\n    def cambiar_prioridad(self, nueva):\n        pass\n\n    def esta_abierto(self):\n        pass`,
          tests: `t = Ticket(1, "Ana")\nt.cambiar_prioridad("alta")\nassert t.prioridad == "alta"\nassert t.esta_abierto() is True\ntry:\n    t.cambiar_prioridad("urgentísima")\n    assert False, "Debía lanzar ValueError"\nexcept ValueError:\n    pass`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 4 (Libraries) y Lecture 8 (Object-Oriented Programming).', minutes: 150 },
      { ref: 'pyvenv', why: 'Leé la introducción y creá tu primer entorno virtual.', minutes: 30 },
      { ref: 'exercism', why: 'Ejercicio "Ellen\'s Alien Game" (clases).', minutes: 60 },
    ],
    docs: [{ ref: 'pydocs', why: 'Capítulo 6 "Modules" y capítulo 9 "Classes" (secciones 9.3 a 9.5).' }],
    exercises: [
      { id: 'w7e1', title: 'Entorno local', level: 'basica', kind: 'libre', statement: 'Instalá Python y VS Code, creá una carpeta proyecto-tickets con un venv, instalá requests y generá requirements.txt. Sacá una captura de pip list.', hints: ['Ver comandos de la lección.', 'En Windows, si "python" no funciona probá "py".'] },
      { id: 'w7e2', title: 'Clase Cliente', level: 'intermedia', kind: 'python', statement: 'Clase Cliente(nombre, email) con lista compras = [] y métodos agregar_compra(monto) (rechaza montos <= 0 con ValueError) y total() que devuelve la suma.', hints: ['self.compras = [] en __init__.', 'sum(self.compras)'], solution: `class Cliente:\n    def __init__(self, nombre, email):\n        self.nombre = nombre\n        self.email = email\n        self.compras = []\n\n    def agregar_compra(self, monto):\n        if monto <= 0:\n            raise ValueError("Monto inválido")\n        self.compras.append(monto)\n\n    def total(self):\n        return sum(self.compras)`, starter: `class Cliente:\n    pass`, tests: `c = Cliente("Ana","a@x.com")\nc.agregar_compra(100)\nc.agregar_compra(50)\nassert c.total() == 150\ntry:\n    c.agregar_compra(0)\n    assert False\nexcept ValueError:\n    pass` },
      { id: 'w7e3', title: 'Dividir en módulos', level: 'avanzada', kind: 'libre', statement: 'En tu computadora, separá el importador de la semana 6 en validaciones.py, archivos.py y main.py, importando entre ellos.', hints: ['from validaciones import validar'] },
    ],
    challenge: {
      title: 'Modelo de dominio para un help desk',
      context: 'Vas a diseñar las clases que usará tu proyecto final de etapa.',
      task: ['Diseñá (en papel) las clases Ticket y GestorTickets con sus atributos y métodos.', 'Implementalas en módulos separados.', 'GestorTickets debe permitir agregar, buscar por id y filtrar por estado.'],
      deliverable: 'Carpeta del proyecto con venv, requirements.txt, modelos.py y una prueba manual en main.py.',
    },
    deliverable: 'Entorno local funcionando + clases del help desk.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Entorno virtual creado y activado en tu computadora.', 'Explicar qué es self y para qué sirve __init__.'],
    questions: [
      mcq('q7-1', '¿Para qué sirve un entorno virtual?', ['Para ejecutar Python más rápido', 'Para aislar las librerías de cada proyecto', 'Para conectarse a internet', 'Para escribir clases'], 1, 'Cada proyecto tiene sus dependencias sin interferir con otros.', { concept: 'Entornos virtuales' }),
      mcq('q7-2', '¿Qué representa self en un método?', ['La clase', 'El módulo', 'El objeto (instancia) actual', 'Una variable global'], 2, 'self es la instancia sobre la que se llama el método.', { concept: 'Clases y objetos' }),
      tf('q7-3', '__init__ se ejecuta automáticamente al crear un objeto.', true, 'Es el constructor.', { concept: 'Clases y objetos' }),
      mcq('q7-4', '¿Qué comando instala una librería externa?', ['python install requests', 'pip install requests', 'import requests', 'venv requests'], 1, 'pip instala paquetes desde PyPI.', { concept: 'Librerías' }),
      tf('q7-5', 'Es recomendable subir la carpeta .venv a GitHub.', false, 'Se sube requirements.txt; el venv se recrea en cada máquina.', { concept: 'Entornos virtuales' }),
      mcq('q7-6', '¿Qué imprime este código?', ['abierto', 'cerrado', 'Error', 'None'], 0, 'En cerrar() falta self: se crea una variable local "estado" y el atributo no cambia.', { concept: 'Clases y objetos', d: 'avanzada', code: `class T:\n    def __init__(self):\n        self.estado = "abierto"\n    def cerrar(self):\n        estado = "cerrado"\n\nt = T()\nt.cerrar()\nprint(t.estado)`, hints: ['Mirá si cerrar() modifica self.estado.'] }),
      mcq('q7-7', 'requirements.txt sirve para...', ['Documentar requisitos de negocio', 'Listar las dependencias para reproducir el entorno', 'Guardar contraseñas', 'Configurar VS Code'], 1, 'pip install -r requirements.txt reproduce el entorno.', { concept: 'Librerías' }),
      py('q7-8', 'Completá la clase Contador con métodos incrementar() y valor().', `class Contador:\n    def __init__(self):\n        pass\n    def incrementar(self):\n        pass\n    def valor(self):\n        pass`, `c = Contador()\nc.incrementar(); c.incrementar()\nassert c.valor() == 2\nassert Contador().valor() == 0`, `class Contador:\n    def __init__(self):\n        self.n = 0\n    def incrementar(self):\n        self.n += 1\n    def valor(self):\n        return self.n`, 'El estado del objeto se guarda en atributos de self.', { concept: 'Clases y objetos', hints: ['Inicializá self.n = 0 en __init__.'] }),
      py('q7-9', 'Completá GestorTickets: agregar(ticket_dict) y buscar(id) que devuelva el dict con ese "id" o None.', `class GestorTickets:\n    def __init__(self):\n        self.tickets = []\n    def agregar(self, t):\n        pass\n    def buscar(self, id):\n        pass`, `g = GestorTickets()\ng.agregar({"id": 1, "cliente": "Ana"})\ng.agregar({"id": 2, "cliente": "Beto"})\nassert g.buscar(2)["cliente"] == "Beto"\nassert g.buscar(9) is None`, `class GestorTickets:\n    def __init__(self):\n        self.tickets = []\n    def agregar(self, t):\n        self.tickets.append(t)\n    def buscar(self, id):\n        for t in self.tickets:\n            if t["id"] == id:\n                return t\n        return None`, 'Composición: una clase que administra una colección.', { concept: 'Clases y objetos', d: 'avanzada', hints: ['Recorré self.tickets.'] }),
      mcq('q7-10', '¿Qué módulo de la biblioteca estándar maneja fechas?', ['time2', 'datetime', 'calendar2', 'dates'], 1, 'datetime con datetime, date y timedelta.', { concept: 'Módulos' }),
    ],
  },

  // ───────────────────────────── SEMANA 8 ─────────────────────────────
  {
    n: 8,
    stage: 1,
    title: 'Integración, depuración y proyecto final de Python',
    objective: 'Integrar todo lo aprendido en un sistema de gestión de tickets, aprender a depurar de forma sistemática y demostrar tu nivel en una evaluación general.',
    topics: ['Integración de conocimientos', 'Depuración', 'Proyecto final de Python', 'Evaluación general'],
    review: 'Repaso integral de la etapa 1. Revisá tus errores frecuentes en el historial de evaluaciones.',
    lessons: [
      {
        id: 'w8l1',
        title: 'Depurar como profesional',
        minutes: 60,
        sections: [
          {
            heading: '1. Leer el traceback',
            body: [
              'Leé de abajo hacia arriba: la última línea dice el tipo de error y el mensaje; las líneas anteriores muestran el camino (archivo y número de línea) por donde pasó la ejecución.',
              'Errores frecuentes: NameError (nombre no definido o mal escrito), TypeError (operación con tipos incompatibles), KeyError, IndexError, AttributeError (método que no existe para ese tipo).',
            ],
          },
          {
            heading: '2. Método científico para bugs',
            body: [
              '1) Reproducí el error de forma consistente. 2) Formulá una hipótesis. 3) Verificala con print() o el depurador. 4) Corregí una sola cosa. 5) Volvé a probar todos los casos.',
              'El depurador de VS Code permite poner breakpoints (puntos de pausa) y ver el valor de cada variable. Es más potente que llenar el código de prints.',
              'La técnica del "pato de goma": explicar el código en voz alta línea por línea suele revelar el error.',
            ],
          },
          {
            heading: '3. Integrar módulos en un proyecto',
            body: [
              'Un proyecto pequeño bien organizado: modelos.py (clases), almacenamiento.py (leer/guardar JSON), servicios.py (reglas de negocio), main.py (menú de consola). Cada módulo se prueba por separado.',
              'Usá assert para verificaciones rápidas mientras desarrollás.',
            ],
            code: { lang: 'python', code: `def menu():\n    while True:\n        print("1) Nuevo ticket  2) Buscar  3) Listar  4) Salir")\n        op = input("> ").strip()\n        if op == "1":\n            crear_ticket()\n        elif op == "2":\n            buscar_ticket()\n        elif op == "3":\n            listar_tickets()\n        elif op == "4":\n            break\n        else:\n            print("Opción inválida")` },
          },
        ],
        keyConcepts: [
          { term: 'Bug', def: 'Comportamiento incorrecto del programa.' },
          { term: 'Breakpoint', def: 'Punto donde el depurador pausa la ejecución.' },
          { term: 'Reproducibilidad', def: 'Poder provocar el error a voluntad para estudiarlo.' },
          { term: 'assert', def: 'Verifica una condición y lanza AssertionError si es falsa.' },
        ],
        simpleExample: 'AttributeError: \'list\' object has no attribute \'lower\' → estás llamando .lower() sobre una lista en lugar de un string.',
        realExample: 'Una automatización deja de clasificar correos un lunes. El traceback muestra KeyError: "subject": un proveedor cambió el formato. La solución es usar .get() y registrar los correos sin asunto.',
        analogy: 'Depurar es trabajo de detective: no adivinás al culpable, juntás evidencia hasta que solo queda una explicación.',
        commonErrors: ['Cambiar muchas cosas a la vez y no saber cuál arregló (o rompió) algo.', 'Ignorar el número de línea del traceback.', 'No volver a probar los casos que ya funcionaban.'],
        bestPractices: ['Una hipótesis, un cambio, una prueba.', 'Usá el depurador de VS Code.', 'Guardá casos de prueba para repetirlos.'],
        summary: ['El traceback se lee de abajo hacia arriba.', 'Depurar es un método, no suerte.', 'Proyectos organizados en módulos son más fáciles de depurar.'],
        comprehension: [{ q: '¿Qué te dice "TypeError: can only concatenate str (not "int") to str"?', a: 'Intentaste sumar un string con un entero; hay que convertir con str() o usar una f-string.' }],
        exercise: {
          statement: 'La función tiene 2 bugs. Encontralos y corregilos: debe devolver el promedio de horas de los tickets cerrados.',
          hints: ['Probá con una lista donde haya tickets abiertos.', '¿El contador cuenta lo correcto?', '¿Qué pasa si no hay cerrados?'],
          solution: `def promedio_cerrados(tickets):\n    total = 0\n    cantidad = 0\n    for t in tickets:\n        if t["estado"] == "cerrado":\n            total += t["horas"]\n            cantidad += 1\n    if cantidad == 0:\n        return 0\n    return total / cantidad`,
          starter: `def promedio_cerrados(tickets):\n    total = 0\n    cantidad = 0\n    for t in tickets:\n        if t["estado"] == "cerrado":\n            total += t["horas"]\n        cantidad += 1\n    return total / cantidad`,
          tests: `ts = [{"estado":"cerrado","horas":4},{"estado":"abierto","horas":100},{"estado":"cerrado","horas":6}]\nassert promedio_cerrados(ts) == 5\nassert promedio_cerrados([{"estado":"abierto","horas":3}]) == 0`,
        },
      },
    ],
    resources: [
      { ref: 'cs50p', why: 'Lecture 5 (Unit Tests) — introducción a probar tu código, y "Final Project" como inspiración.', minutes: 90 },
      { ref: 'pytutor', why: 'Usalo para depurar los ejercicios donde te trabes.', minutes: 30 },
    ],
    docs: [{ ref: 'pydocs', why: 'Repasá el capítulo 8 (Errors and Exceptions) antes del proyecto.' }],
    exercises: [
      { id: 'w8e1', title: 'Depurar con breakpoints', level: 'intermedia', kind: 'libre', statement: 'En VS Code, poné un breakpoint en tu reporte diario, ejecutá con F5 y observá cómo cambian las variables en cada vuelta. Anotá 3 cosas que descubriste.', hints: ['Run and Debug → Python File.'] },
      { id: 'w8e2', title: 'Proyecto 1: Gestor de tickets', level: 'avanzada', kind: 'libre', statement: 'Desarrollá el Proyecto 1 completo (ver sección Proyectos): registrar, consultar, clasificar y actualizar tickets con persistencia en JSON.', hints: ['Empezá por el modelo Ticket.', 'Después almacenamiento (cargar/guardar JSON).', 'El menú va al final.'] },
    ],
    challenge: {
      title: 'Gestor de consultas de clientes (proyecto de etapa)',
      context: 'Un pequeño estudio contable recibe consultas por email y teléfono, y las anota en un cuaderno. Necesitan un sistema simple para registrarlas y hacer seguimiento.',
      task: ['Ticket con: id, cliente, motivo, estado, prioridad y fecha.', 'Funciones: registrar, buscar por id/cliente, listar por estado y prioridad, actualizar estado y prioridad.', 'Persistencia en tickets.json y validación de entradas.', 'README con instrucciones de uso.'],
      deliverable: 'Repositorio o carpeta con el Proyecto 1 funcionando (ver checklist en Proyectos).',
    },
    deliverable: 'Proyecto 1 (Gestor de tickets) completo y documentado.',
    hours: HPROJ,
    passCriteria: ['Evaluación general ≥ 80/100.', 'Proyecto 1 con todos los entregables obligatorios.', 'Poder explicar cada parte del código sin mirarlo.'],
    questions: [
      mcq('q8-1', '¿Por dónde conviene empezar a leer un traceback?', ['Por la primera línea', 'Por la última línea', 'Por el medio', 'No hace falta leerlo'], 1, 'La última línea indica el tipo de error y su mensaje.', { concept: 'Depuración' }),
      mcq('q8-2', '¿Qué error produce "Total: " + 5?', ['ValueError', 'TypeError', 'SyntaxError', 'NameError'], 1, 'No se puede concatenar str con int.', { concept: 'Depuración' }),
      mcq('q8-3', '¿Qué imprime este código?', ['[1, 2, 3]', '[1, 2, 3, 4]', 'None', 'Error'], 2, 'append modifica la lista y devuelve None.', { concept: 'Listas', d: 'intermedia', code: `nums = [1, 2, 3]\nnums = nums.append(4)\nprint(nums)` }),
      tf('q8-4', 'Al depurar conviene cambiar varias cosas a la vez para ahorrar tiempo.', false, 'Cambiá una cosa por vez para saber qué efecto tuvo.', { concept: 'Depuración' }),
      mcq('q8-5', 'AttributeError: \'int\' object has no attribute \'lower\' significa que...', ['Falta importar lower', 'Llamaste .lower() sobre un entero', 'El string está vacío', 'Hay un error de indentación'], 1, 'lower() es un método de str, no de int.', { concept: 'Depuración', d: 'intermedia' }),
      mcq('q8-6', '¿Qué estructura es la más adecuada para guardar muchos tickets con varios campos cada uno?', ['Un string largo', 'Una lista de diccionarios u objetos', 'Un set', 'Una tupla de números'], 1, 'Cada ticket es un registro con campos; la colección es una lista.', { concept: 'Elegir estructura' }),
      py('q8-7', 'Completá actualizar_estado(tickets, id, nuevo) que cambie el "estado" del ticket con ese id y devuelva True, o devuelva False si no existe. Estados válidos: "abierto", "en curso", "cerrado" (otro valor → ValueError).', `def actualizar_estado(tickets, id, nuevo):\n    return False`, `ts=[{"id":1,"estado":"abierto"}]\nassert actualizar_estado(ts, 1, "cerrado") is True and ts[0]["estado"] == "cerrado"\nassert actualizar_estado(ts, 5, "cerrado") is False\ntry:\n    actualizar_estado(ts, 1, "perdido"); assert False\nexcept ValueError:\n    pass`, `def actualizar_estado(tickets, id, nuevo):\n    if nuevo not in ("abierto", "en curso", "cerrado"):\n        raise ValueError("Estado inválido")\n    for t in tickets:\n        if t["id"] == id:\n            t["estado"] = nuevo\n            return True\n    return False`, 'Integra validación, búsqueda y modificación.', { concept: 'Integración', d: 'avanzada', hints: ['Validá el estado primero.', 'Buscá con un for y modificá el dict.'] }),
      py('q8-8', 'Completá siguiente_id(tickets) que devuelva el id máximo + 1, o 1 si la lista está vacía.', `def siguiente_id(tickets):\n    return 1`, `assert siguiente_id([{"id":3},{"id":7}]) == 8\nassert siguiente_id([]) == 1`, `def siguiente_id(tickets):\n    if not tickets:\n        return 1\n    return max(t["id"] for t in tickets) + 1`, 'Patrón común para generar identificadores.', { concept: 'Integración', hints: ['max() con una expresión generadora.'] }),
      py('q8-9', 'Completá filtrar(tickets, estado=None, prioridad=None) que devuelva los tickets que coincidan con los filtros indicados (None = no filtrar).', `def filtrar(tickets, estado=None, prioridad=None):\n    return tickets`, `ts=[{"estado":"abierto","prioridad":"alta"},{"estado":"abierto","prioridad":"baja"},{"estado":"cerrado","prioridad":"alta"}]\nassert len(filtrar(ts)) == 3\nassert len(filtrar(ts, estado="abierto")) == 2\nassert filtrar(ts, estado="abierto", prioridad="alta") == [ts[0]]`, `def filtrar(tickets, estado=None, prioridad=None):\n    r = []\n    for t in tickets:\n        if estado is not None and t["estado"] != estado:\n            continue\n        if prioridad is not None and t["prioridad"] != prioridad:\n            continue\n        r.append(t)\n    return r`, 'Parámetros opcionales con None para filtros combinables.', { concept: 'Funciones', d: 'avanzada', hints: ['Si el filtro es None, no lo apliques.', 'continue descarta el ticket.'] }),
      tf('q8-10', 'Leer las clases explicativas alcanza para aprobar una unidad.', false, 'En esta academia se aprueba demostrando aplicación: evaluación ≥ 80 y entregables.', { concept: 'Método de estudio' }),
    ],
  },
];
