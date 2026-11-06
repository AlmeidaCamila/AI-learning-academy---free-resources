import type { Week } from '../../types';
import { H12, HPROJ, mcq, py, short, sql, SUPPORT_DB, tf } from './helpers';

export const STAGE2: Week[] = [
  // ───────────────────────────── SEMANA 9 ─────────────────────────────
  {
    n: 9,
    stage: 2,
    title: 'Bases de datos relacionales: tablas, claves y relaciones',
    objective: 'Comprender cómo se organiza la información en una base de datos relacional y diseñar un modelo simple de atención al cliente.',
    topics: ['Qué es una base de datos', 'Tablas', 'Registros', 'Columnas', 'Claves primarias', 'Relaciones'],
    review: 'Repaso semana 5: una tabla es parecida a una lista de diccionarios, pero con reglas estrictas.',
    lessons: [
      {
        id: 'w9l1',
        title: 'Del archivo JSON a la base de datos',
        minutes: 75,
        sections: [
          {
            heading: '1. Por qué no alcanza con archivos',
            body: [
              'Guardar tickets en un JSON funciona con 100 registros y una persona. Con 100.000 registros, varias personas escribiendo a la vez y la necesidad de responder "¿cuántos tickets de facturación se resolvieron en marzo?", los archivos se vuelven lentos y frágiles.',
              'Una base de datos (BD) es un sistema especializado en guardar, consultar y proteger datos. Un sistema gestor (DBMS) como PostgreSQL o SQLite se encarga de eso.',
            ],
          },
          {
            heading: '2. Tablas, filas y columnas',
            body: [
              'En una BD relacional los datos se organizan en tablas. Cada columna es un atributo con un tipo definido (INTEGER, TEXT, REAL, DATE). Cada fila (registro) es una entidad concreta: un ticket, un cliente.',
              'A diferencia de un diccionario, todas las filas tienen las mismas columnas: la estructura (esquema) se define antes de cargar datos.',
            ],
            code: { lang: 'sql', code: `CREATE TABLE clientes (\n  id      INTEGER PRIMARY KEY,\n  nombre  TEXT NOT NULL,\n  email   TEXT UNIQUE,\n  pais    TEXT\n);` },
          },
          {
            heading: '3. Clave primaria (primary key)',
            body: [
              'Cada tabla necesita una columna que identifique cada fila de forma única y que nunca cambie: la clave primaria. Normalmente es un id numérico.',
              'El nombre no sirve como clave: puede haber dos "Ana Torres" y una persona puede cambiar su email.',
            ],
          },
          {
            heading: '4. Relaciones y claves foráneas',
            body: [
              'En lugar de repetir los datos del cliente en cada ticket, el ticket guarda solo el id del cliente (cliente_id). Esa columna es una clave foránea (foreign key): apunta a la clave primaria de otra tabla.',
              'Tipos de relación: uno a muchos (un cliente tiene muchos tickets), muchos a muchos (tickets y etiquetas, que requiere una tabla intermedia), uno a uno (poco frecuente).',
              'Esta separación se llama normalización: cada dato vive en un solo lugar. Si un cliente cambia de email, se actualiza una fila, no 300.',
            ],
            code: { lang: 'sql', code: `CREATE TABLE tickets (\n  id          INTEGER PRIMARY KEY,\n  cliente_id  INTEGER REFERENCES clientes(id),\n  motivo      TEXT,\n  prioridad   TEXT,\n  estado      TEXT,\n  creado      TEXT\n);` },
          },
          {
            heading: '5. Diagrama entidad-relación',
            body: ['Antes de crear tablas, dibujá cajas (entidades) con sus columnas y líneas entre ellas indicando la relación (1 → N). Herramientas gratuitas: papel, draw.io o dbdiagram.io.'],
          },
        ],
        keyConcepts: [
          { term: 'Base de datos relacional', def: 'Datos organizados en tablas relacionadas entre sí.' },
          { term: 'Esquema', def: 'Definición de tablas, columnas y tipos.' },
          { term: 'Registro / fila', def: 'Una entidad concreta dentro de una tabla.' },
          { term: 'Primary key', def: 'Columna que identifica de forma única cada fila.' },
          { term: 'Foreign key', def: 'Columna que referencia la clave primaria de otra tabla.' },
          { term: 'Normalización', def: 'Organizar datos para que cada dato viva en un solo lugar.' },
        ],
        simpleExample: 'Tabla libros(id, titulo, autor_id) y autores(id, nombre): autor_id conecta cada libro con su autor.',
        realExample: 'Un help desk tiene clientes, agentes, tickets y mensajes. Cada ticket pertenece a un cliente y a un agente; cada mensaje pertenece a un ticket.',
        analogy: 'Una BD relacional es como un archivo de oficina con carpetas separadas (clientes, tickets) que se referencian por número de legajo en lugar de fotocopiar todo en cada carpeta.',
        commonErrors: ['Usar el nombre o el email como clave primaria.', 'Repetir datos del cliente en cada ticket (desnormalizar sin motivo).', 'Guardar varios valores en una sola columna ("acceso, factura").'],
        bestPractices: ['Nombres de tablas en plural y columnas en snake_case.', 'Una clave primaria por tabla.', 'Diseñar el diagrama antes de escribir SQL.'],
        summary: ['Tablas con esquema fijo.', 'PK identifica; FK relaciona.', 'Normalizar evita inconsistencias.'],
        comprehension: [
          { q: '¿Por qué el email no es buena clave primaria?', a: 'Porque puede cambiar y podría repetirse o faltar; la PK debe ser única, obligatoria y estable.' },
          { q: '¿Qué relación hay entre clientes y tickets?', a: 'Uno a muchos: un cliente puede tener muchos tickets; cada ticket pertenece a un cliente.' },
        ],
        exercise: {
          statement: 'Diseñá en papel o draw.io un modelo para atención al cliente con las tablas clientes, agentes, tickets y mensajes. Indicá PK, FK y tipo de relación. Explicá en 3 líneas por qué no guardás el nombre del cliente dentro de tickets.',
          hints: ['mensajes tiene ticket_id.', 'tickets tiene cliente_id y agente_id.'],
          solution: 'clientes(id PK, nombre, email, pais) 1—N tickets(id PK, cliente_id FK, agente_id FK, motivo, prioridad, estado, creado, resuelto); agentes(id PK, nombre, equipo) 1—N tickets; tickets 1—N mensajes(id PK, ticket_id FK, autor, texto, fecha). No se guarda el nombre en tickets porque duplicaría el dato y un cambio exigiría actualizar muchas filas.',
        },
      },
    ],
    resources: [
      { ref: 'sqlbolt', why: 'Introducción y lecciones 1 a 4 (SELECT básico).', minutes: 60 },
      { ref: 'sqlitedocs', why: 'Leé "About SQLite" para entender qué es una BD embebida.', minutes: 20 },
      { ref: 'cs50p', why: 'Opcional: CS50 tiene un curso aparte, CS50 SQL (cs50.harvard.edu/sql), con clases muy claras sobre diseño de bases.', minutes: 90 },
    ],
    coursera: [{ courseId: 'c-meta-datamgmt', note: 'Empezá "Introduction to Data Management" (Meta): módulos sobre modelos de datos y bases relacionales.' }],
    docs: [{ ref: 'pgdocs', why: 'Tutorial, capítulo 2 "The SQL Language", secciones de conceptos y creación de tablas.' }],
    exercises: [
      { id: 'w9e1', title: 'Diagrama ER', level: 'intermedia', kind: 'libre', statement: 'Dibujá el diagrama del help desk (ejercicio de la lección) y subilo como imagen a tu carpeta de proyecto.', hints: ['dbdiagram.io permite escribir el modelo como texto.'] },
      { id: 'w9e2', title: 'Detectar problemas de diseño', level: 'intermedia', kind: 'libre', statement: 'Una planilla tiene columnas: ticket, cliente, email_cliente, telefono_cliente, motivos (varios separados por coma), agente, equipo_agente. Listá todos los problemas de diseño y proponé las tablas correctas.', hints: ['¿Qué datos se repiten?', '¿Qué columna tiene varios valores?'] },
      { id: 'w9e3', title: 'Crear tablas', level: 'basica', kind: 'sql', statement: 'En el editor SQL, escribí un CREATE TABLE para agentes(id, nombre, equipo) con id como PRIMARY KEY y nombre NOT NULL. Luego insertá 2 agentes y consultalos con SELECT * FROM agentes;', hints: ['Podés ejecutar varias sentencias separadas por ;'], schema: '' },
    ],
    challenge: {
      title: 'Modelo de datos para una tienda online',
      context: 'Una tienda online quiere centralizar pedidos y reclamos.',
      task: ['Identificá entidades: clientes, productos, pedidos, items de pedido, reclamos.', 'Definí PK, FK y tipos de columna.', 'Explicá cómo resolvés la relación muchos a muchos entre pedidos y productos.'],
      deliverable: 'Diagrama ER + documento breve con justificación.',
    },
    deliverable: 'Diagrama ER del help desk + desafío de la tienda online.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Diagrama con PK/FK correctas.', 'Explicar normalización con un ejemplo propio.'],
    questions: [
      mcq('q9-1', '¿Qué es una clave primaria?', ['Una contraseña de la base', 'Una columna que identifica de forma única cada fila', 'La primera columna de la tabla', 'Un índice de texto'], 1, 'Debe ser única, no nula y estable.', { concept: 'Claves primarias' }),
      mcq('q9-2', 'En tickets(cliente_id), cliente_id es...', ['Primary key', 'Foreign key', 'Un registro', 'Una tabla'], 1, 'Referencia la PK de clientes.', { concept: 'Relaciones' }),
      tf('q9-3', 'En una tabla relacional, cada fila puede tener columnas distintas.', false, 'Todas las filas comparten el esquema de la tabla.', { concept: 'Tablas' }),
      mcq('q9-4', 'Un cliente tiene muchos pedidos y cada pedido pertenece a un cliente. ¿Qué relación es?', ['1 a 1', '1 a N', 'N a N', 'Ninguna'], 1, 'Uno a muchos.', { concept: 'Relaciones' }),
      mcq('q9-5', '¿Cómo se modela una relación muchos a muchos (pedidos y productos)?', ['Con una columna con varios ids separados por coma', 'Con una tabla intermedia (pedido_items)', 'No se puede', 'Duplicando la tabla productos'], 1, 'La tabla intermedia tiene FK a ambas tablas.', { concept: 'Relaciones', d: 'intermedia' }),
      tf('q9-6', 'Guardar el nombre del cliente dentro de cada ticket es la forma normalizada.', false, 'Normalizado es guardar solo cliente_id.', { concept: 'Normalización' }),
      mcq('q9-7', '¿Qué problema genera tener "email_cliente" repetido en 300 tickets?', ['Ninguno', 'Si cambia el email hay que actualizar 300 filas y pueden quedar inconsistencias', 'La base se vuelve más rápida', 'No se pueden hacer consultas'], 1, 'Anomalías de actualización: la razón principal para normalizar.', { concept: 'Normalización', d: 'intermedia' }),
      sql('q9-8', 'Usando la base de soporte, mostrá todas las columnas de la tabla agentes.', SUPPORT_DB, 'SELECT * FROM agentes;', 'SELECT * devuelve todas las columnas.', { concept: 'Tablas', d: 'basica', hints: ['SELECT * FROM tabla;'] }),
      sql('q9-9', 'Mostrá el nombre y el país de todos los clientes.', SUPPORT_DB, 'SELECT nombre, pais FROM clientes;', 'Se listan columnas específicas separadas por coma.', { concept: 'Tablas', d: 'basica', hints: ['SELECT col1, col2 FROM ...'] }),
      short('q9-10', '¿Cómo se llama la columna que referencia la clave primaria de otra tabla? (en inglés, dos palabras)', ['foreign key', 'foreignkey', 'fk'], 'Foreign key = clave foránea.', { concept: 'Relaciones' }),
    ],
  },

  // ───────────────────────────── SEMANA 10 ─────────────────────────────
  {
    n: 10,
    stage: 2,
    title: 'SQL para consultar y analizar datos',
    objective: 'Escribir consultas SQL para filtrar, ordenar, agrupar y resumir datos de negocio.',
    topics: ['SQL', 'SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'COUNT, SUM y AVG'],
    review: 'Repaso semana 9: recordá la estructura de la base de soporte (clientes, agentes, tickets).',
    lessons: [
      {
        id: 'w10l1',
        title: 'SELECT, WHERE y ORDER BY',
        minutes: 60,
        sections: [
          {
            heading: '1. Anatomía de una consulta',
            body: [
              'SQL (Structured Query Language) es el lenguaje estándar para hablar con bases relacionales. Es declarativo: decís qué querés, no cómo buscarlo.',
              'Orden de escritura: SELECT columnas FROM tabla WHERE condición ORDER BY columna LIMIT n;',
            ],
            code: { lang: 'sql', code: `SELECT id, motivo, prioridad\nFROM tickets\nWHERE estado = 'abierto'\nORDER BY creado DESC\nLIMIT 5;` },
          },
          {
            heading: '2. Filtrar con WHERE',
            body: [
              'Operadores: =, <> (distinto), >, <, >=, <=, AND, OR, NOT, IN (lista), BETWEEN a AND b, LIKE con comodines (% = cualquier texto, _ = un carácter), IS NULL / IS NOT NULL.',
              'En SQL los textos van entre comillas simples. NULL significa "sin dato": no se compara con =, sino con IS NULL.',
            ],
            code: { lang: 'sql', code: `SELECT * FROM tickets\nWHERE prioridad IN ('alta', 'media')\n  AND resuelto IS NULL;` },
          },
          {
            heading: '3. Ordenar y limitar',
            body: ['ORDER BY col ASC (ascendente, por defecto) o DESC. Podés ordenar por varias columnas. LIMIT restringe la cantidad de filas: útil para "top 5".'],
          },
        ],
        keyConcepts: [
          { term: 'SELECT', def: 'Elige las columnas a devolver.' },
          { term: 'WHERE', def: 'Filtra filas según condiciones.' },
          { term: 'ORDER BY', def: 'Ordena el resultado.' },
          { term: 'NULL', def: 'Ausencia de valor. Se consulta con IS NULL.' },
          { term: 'LIKE', def: 'Coincidencia de patrones de texto con % y _.' },
        ],
        simpleExample: "SELECT nombre FROM clientes WHERE pais = 'Chile';",
        realExample: 'Una supervisora pide cada mañana los tickets de prioridad alta sin resolver, del más antiguo al más nuevo. Es una consulta de 4 líneas que luego una automatización envía por email.',
        analogy: 'SELECT es elegir qué columnas de la planilla mirar; WHERE es aplicar un filtro; ORDER BY es ordenar.',
        commonErrors: ['Usar comillas dobles para textos (en PostgreSQL significan nombres de columnas).', 'Comparar con = NULL en lugar de IS NULL.', 'Olvidar paréntesis al mezclar AND y OR.'],
        bestPractices: ['Escribí palabras clave en MAYÚSCULAS para legibilidad.', 'Evitá SELECT * en consultas de producción.', 'Probá la consulta con LIMIT primero.'],
        summary: ['SELECT … FROM … WHERE … ORDER BY … LIMIT.', 'NULL se trata con IS NULL.', 'Textos entre comillas simples.'],
        comprehension: [{ q: '¿Por qué WHERE resuelto = NULL no devuelve filas?', a: 'Porque NULL no es igual a nada, ni siquiera a NULL; hay que usar IS NULL.' }],
        exercise: {
          statement: 'Mostrá id, motivo y horas_resolucion de los tickets resueltos con más de 10 horas de resolución, ordenados de mayor a menor.',
          hints: ["estado = 'resuelto'", 'AND horas_resolucion > 10', 'ORDER BY ... DESC'],
          solution: "SELECT id, motivo, horas_resolucion FROM tickets WHERE estado = 'resuelto' AND horas_resolucion > 10 ORDER BY horas_resolucion DESC;",
        },
      },
      {
        id: 'w10l2',
        title: 'Agregaciones: COUNT, SUM, AVG y GROUP BY',
        minutes: 70,
        sections: [
          {
            heading: '1. Funciones de agregación',
            body: ['COUNT(*) cuenta filas; COUNT(col) cuenta valores no nulos; SUM, AVG, MIN y MAX operan sobre una columna numérica. Devuelven un solo valor a partir de muchas filas.'],
            code: { lang: 'sql', code: `SELECT COUNT(*) AS total,\n       AVG(horas_resolucion) AS promedio_horas\nFROM tickets\nWHERE estado = 'resuelto';` },
          },
          {
            heading: '2. GROUP BY: resumir por categoría',
            body: [
              'GROUP BY agrupa las filas que comparten un valor y calcula la agregación para cada grupo. Ejemplo: cantidad de tickets por motivo.',
              'Regla: toda columna del SELECT que no esté dentro de una función de agregación debe estar en el GROUP BY.',
              'AS asigna un alias legible a una columna calculada.',
            ],
            code: { lang: 'sql', code: `SELECT motivo, COUNT(*) AS cantidad\nFROM tickets\nGROUP BY motivo\nORDER BY cantidad DESC;` },
          },
          {
            heading: '3. HAVING: filtrar grupos',
            body: ['WHERE filtra filas antes de agrupar; HAVING filtra grupos después de agrupar. Ejemplo: motivos con más de 2 tickets → HAVING COUNT(*) > 2.'],
          },
          {
            heading: '4. Orden lógico de ejecución',
            body: ['FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Por eso no podés usar en WHERE un alias definido en SELECT.'],
          },
        ],
        keyConcepts: [
          { term: 'COUNT / SUM / AVG', def: 'Funciones de agregación.' },
          { term: 'GROUP BY', def: 'Agrupa filas para calcular agregados por grupo.' },
          { term: 'HAVING', def: 'Filtra grupos ya agregados.' },
          { term: 'Alias (AS)', def: 'Nombre alternativo para una columna o tabla.' },
        ],
        simpleExample: 'SELECT pais, COUNT(*) FROM clientes GROUP BY pais;',
        realExample: 'Un reporte operativo semanal: tickets por motivo, tiempo promedio de resolución por equipo, porcentaje de tickets fuera de SLA. Todo con GROUP BY.',
        analogy: 'GROUP BY es como separar los tickets en pilas por motivo y después contar cada pila.',
        commonErrors: ['Poner en SELECT una columna que no está en GROUP BY.', 'Usar WHERE COUNT(*) > 2 (va en HAVING).', 'Olvidar que AVG ignora los NULL.'],
        bestPractices: ['Usá alias claros: AS promedio_horas.', 'Redondeá con ROUND(valor, 1) en reportes.'],
        summary: ['Agregaciones resumen muchas filas.', 'GROUP BY por categoría; HAVING filtra grupos.'],
        comprehension: [{ q: '¿Diferencia entre WHERE y HAVING?', a: 'WHERE filtra filas individuales antes de agrupar; HAVING filtra los grupos después de agrupar y puede usar agregaciones.' }],
        exercise: {
          statement: 'Calculá el promedio de horas de resolución por motivo (solo tickets resueltos), redondeado a 1 decimal, ordenado de mayor a menor.',
          hints: ['WHERE estado = ...', 'GROUP BY motivo', 'ROUND(AVG(...), 1)'],
          solution: "SELECT motivo, ROUND(AVG(horas_resolucion), 1) AS promedio FROM tickets WHERE estado = 'resuelto' GROUP BY motivo ORDER BY promedio DESC;",
        },
      },
    ],
    resources: [
      { ref: 'sqlbolt', why: 'Lecciones 1 a 12 (incluye agregaciones).', minutes: 90 },
      { ref: 'sqlzoo', why: 'Secciones "SELECT basics", "SELECT from World" y "SUM and COUNT".', minutes: 90 },
      { ref: 'modesql', why: 'Basic SQL e Intermediate SQL (aggregate functions, GROUP BY, HAVING).', minutes: 60 },
    ],
    coursera: [{ courseId: 'c-meta-datamgmt', note: 'Continuá con los módulos de consultas.' }],
    docs: [{ ref: 'pgdocs', why: 'Tutorial 2.5 "Querying a Table" y 2.7 "Aggregate Functions".' }],
    exercises: [
      { id: 'w10e1', title: 'Tickets abiertos', level: 'basica', kind: 'sql', statement: 'Listá id, motivo y prioridad de los tickets con estado abierto.', hints: ["WHERE estado = 'abierto'"], schema: SUPPORT_DB, solution: "SELECT id, motivo, prioridad FROM tickets WHERE estado = 'abierto';" },
      { id: 'w10e2', title: 'Clientes por plan', level: 'basica', kind: 'sql', statement: 'Contá cuántos clientes hay en cada plan.', hints: ['GROUP BY plan'], schema: SUPPORT_DB, solution: 'SELECT plan, COUNT(*) AS cantidad FROM clientes GROUP BY plan;' },
      { id: 'w10e3', title: 'Motivos frecuentes', level: 'intermedia', kind: 'sql', statement: 'Mostrá los motivos con 3 o más tickets.', hints: ['HAVING COUNT(*) >= 3'], schema: SUPPORT_DB, solution: 'SELECT motivo, COUNT(*) AS n FROM tickets GROUP BY motivo HAVING COUNT(*) >= 3;' },
    ],
    challenge: {
      title: 'Reporte operativo semanal',
      context: 'La gerencia de atención al cliente quiere un reporte con 5 indicadores.',
      task: ['Total de tickets y cuántos siguen abiertos.', 'Tickets por motivo, ordenados.', 'Promedio de horas de resolución por prioridad.', 'Porcentaje de tickets resueltos en menos de 24 h.', 'Escribí cada consulta y una frase de interpretación para la gerencia.'],
      deliverable: 'Archivo reporte.sql con las 5 consultas comentadas + interpretación.',
    },
    deliverable: 'Consultas de práctica + reporte operativo.',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Diferenciar WHERE y HAVING.', 'Interpretar los resultados en lenguaje de negocio.'],
    questions: [
      mcq('q10-1', '¿Cuál es el orden correcto de las cláusulas?', ['SELECT WHERE FROM ORDER BY', 'SELECT FROM WHERE ORDER BY', 'FROM SELECT ORDER BY WHERE', 'WHERE SELECT FROM'], 1, 'SELECT … FROM … WHERE … ORDER BY.', { concept: 'SELECT' }),
      tf('q10-2', 'WHERE resuelto = NULL devuelve las filas sin fecha de resolución.', false, 'Se usa IS NULL.', { concept: 'NULL' }),
      mcq('q10-3', "¿Qué devuelve WHERE nombre LIKE 'A%'?", ['Nombres que terminan en A', 'Nombres que empiezan con A', 'Nombres que contienen %', 'Nombres de una letra'], 1, '% representa cualquier texto.', { concept: 'WHERE' }),
      mcq('q10-4', '¿Dónde se filtra por una agregación (ej. COUNT(*) > 2)?', ['WHERE', 'HAVING', 'ORDER BY', 'SELECT'], 1, 'HAVING filtra grupos.', { concept: 'GROUP BY', d: 'intermedia' }),
      sql('q10-5', 'Contá cuántos tickets hay en total. La columna del resultado puede llamarse como quieras.', SUPPORT_DB, 'SELECT COUNT(*) FROM tickets;', 'COUNT(*) cuenta todas las filas.', { concept: 'COUNT, SUM y AVG', d: 'basica', hints: ['COUNT(*)'] }),
      sql('q10-6', 'Mostrá id y prioridad de los tickets de motivo "acceso", ordenados por id ascendente.', SUPPORT_DB, "SELECT id, prioridad FROM tickets WHERE motivo = 'acceso' ORDER BY id;", 'Filtro con WHERE y orden con ORDER BY.', { concept: 'WHERE', ordered: true, hints: ["Textos entre comillas simples: 'acceso'"] }),
      sql('q10-7', 'Mostrá cada motivo con su cantidad de tickets (2 columnas: motivo y cantidad).', SUPPORT_DB, 'SELECT motivo, COUNT(*) FROM tickets GROUP BY motivo;', 'GROUP BY motivo + COUNT(*).', { concept: 'GROUP BY', hints: ['GROUP BY motivo'] }),
      sql('q10-8', 'Mostrá la prioridad y el promedio de horas_resolucion (redondeado a 1 decimal) de los tickets resueltos, por prioridad, ordenado por promedio de mayor a menor.', SUPPORT_DB, "SELECT prioridad, ROUND(AVG(horas_resolucion), 1) AS p FROM tickets WHERE estado = 'resuelto' GROUP BY prioridad ORDER BY p DESC;", 'Combina WHERE, GROUP BY, AVG, ROUND y ORDER BY.', { concept: 'COUNT, SUM y AVG', d: 'avanzada', ordered: true, hints: ['Filtrá resueltos primero.', 'ROUND(AVG(col), 1)', 'Ordená por el alias.'] }),
      sql('q10-9', 'Mostrá los motivos que tienen 2 o más tickets en prioridad alta (columna motivo y cantidad).', SUPPORT_DB, "SELECT motivo, COUNT(*) FROM tickets WHERE prioridad = 'alta' GROUP BY motivo HAVING COUNT(*) >= 2;", 'WHERE filtra filas (alta) y HAVING filtra grupos (>= 2).', { concept: 'GROUP BY', d: 'avanzada', hints: ['Primero WHERE prioridad = ...', 'Luego HAVING COUNT(*) >= 2'] }),
      mcq('q10-10', 'AVG(horas_resolucion) cuando algunas filas tienen NULL...', ['Da error', 'Cuenta los NULL como 0', 'Ignora los NULL', 'Devuelve NULL siempre'], 2, 'Las agregaciones (salvo COUNT(*)) ignoran NULL.', { concept: 'NULL', d: 'intermedia' }),
    ],
  },

  // ───────────────────────────── SEMANA 11 ─────────────────────────────
  {
    n: 11,
    stage: 2,
    title: 'JOIN, subconsultas y modificación de datos',
    objective: 'Combinar tablas relacionadas, escribir subconsultas y modificar datos con INSERT, UPDATE y DELETE de forma segura, usando SQLite desde Python.',
    topics: ['JOIN', 'Relaciones entre tablas', 'Subconsultas', 'INSERT', 'UPDATE', 'DELETE', 'Introducción a SQLite y PostgreSQL'],
    review: 'Repaso semanas 9 y 10: claves foráneas y GROUP BY.',
    lessons: [
      {
        id: 'w11l1',
        title: 'Combinar tablas con JOIN',
        minutes: 70,
        sections: [
          {
            heading: '1. Por qué JOIN',
            body: ['Como normalizamos, el nombre del cliente está en clientes y el ticket en tickets. JOIN las une usando la relación (tickets.cliente_id = clientes.id).'],
            code: { lang: 'sql', code: `SELECT t.id, c.nombre, t.motivo\nFROM tickets AS t\nJOIN clientes AS c ON t.cliente_id = c.id;` },
          },
          {
            heading: '2. INNER JOIN vs LEFT JOIN',
            body: [
              'INNER JOIN (o JOIN) devuelve solo las filas que tienen coincidencia en ambas tablas.',
              'LEFT JOIN devuelve todas las filas de la tabla izquierda, y NULL donde no hay coincidencia. Ejemplo: tickets sin agente asignado aparecen con agente NULL. Muy útil para detectar "huecos".',
            ],
            code: { lang: 'sql', code: `SELECT t.id, a.nombre AS agente\nFROM tickets t\nLEFT JOIN agentes a ON t.agente_id = a.id\nWHERE a.id IS NULL;   -- tickets sin agente` },
          },
          {
            heading: '3. JOIN + GROUP BY',
            body: ['La combinación más usada en análisis: unir y luego resumir. Ejemplo: tickets por equipo de agentes.'],
            code: { lang: 'sql', code: `SELECT a.equipo, COUNT(*) AS tickets\nFROM tickets t\nJOIN agentes a ON t.agente_id = a.id\nGROUP BY a.equipo;` },
          },
          {
            heading: '4. Subconsultas',
            body: ['Una consulta dentro de otra. Ejemplo: tickets con horas mayores al promedio: WHERE horas_resolucion > (SELECT AVG(horas_resolucion) FROM tickets). También: WHERE cliente_id IN (SELECT id FROM clientes WHERE plan = \'premium\').'],
          },
        ],
        keyConcepts: [
          { term: 'JOIN / INNER JOIN', def: 'Une filas con coincidencia en ambas tablas.' },
          { term: 'LEFT JOIN', def: 'Conserva todas las filas de la izquierda.' },
          { term: 'ON', def: 'Condición de unión entre tablas.' },
          { term: 'Alias de tabla', def: 'Nombre corto: tickets AS t.' },
          { term: 'Subconsulta', def: 'SELECT anidado dentro de otra consulta.' },
        ],
        simpleExample: 'SELECT c.nombre, t.motivo FROM tickets t JOIN clientes c ON t.cliente_id = c.id;',
        realExample: 'Para enviar una encuesta de satisfacción, una automatización consulta tickets resueltos ayer JOIN clientes para obtener nombre y email.',
        analogy: 'JOIN es como cruzar dos planillas con BUSCARV usando el número de cliente.',
        commonErrors: ['Olvidar ON y generar un producto cartesiano (todas las combinaciones).', 'Columnas ambiguas (id existe en ambas tablas): usá alias t.id.', 'Usar INNER JOIN cuando necesitabas ver filas sin coincidencia.'],
        bestPractices: ['Alias cortos y consistentes.', 'Prefijá siempre las columnas con el alias en consultas con JOIN.'],
        summary: ['JOIN combina tablas por su relación.', 'LEFT JOIN revela faltantes.', 'Subconsultas resuelven preguntas en dos pasos.'],
        comprehension: [{ q: '¿Qué ticket desaparece con INNER JOIN agentes pero aparece con LEFT JOIN?', a: 'El ticket sin agente asignado (agente_id NULL): el ticket 8 en la base de práctica.' }],
        exercise: {
          statement: 'Mostrá el nombre de cada cliente premium y cuántos tickets tiene.',
          hints: ['JOIN clientes y tickets.', "WHERE c.plan = 'premium'", 'GROUP BY c.nombre'],
          solution: "SELECT c.nombre, COUNT(*) AS tickets FROM tickets t JOIN clientes c ON t.cliente_id = c.id WHERE c.plan = 'premium' GROUP BY c.nombre;",
        },
      },
      {
        id: 'w11l2',
        title: 'INSERT, UPDATE, DELETE y SQLite desde Python',
        minutes: 70,
        sections: [
          {
            heading: '1. Modificar datos',
            body: [
              'INSERT INTO tabla (cols) VALUES (...) agrega filas. UPDATE tabla SET col = valor WHERE condición modifica. DELETE FROM tabla WHERE condición elimina.',
              'Regla de oro: UPDATE y DELETE sin WHERE afectan TODAS las filas. Antes de ejecutarlos, probá el mismo WHERE con un SELECT.',
            ],
            code: { lang: 'sql', code: `INSERT INTO tickets (id, cliente_id, motivo, prioridad, estado, creado)\nVALUES (11, 2, 'facturacion', 'media', 'abierto', '2026-03-07');\n\nUPDATE tickets SET estado = 'resuelto' WHERE id = 11;\n\nDELETE FROM tickets WHERE id = 11;` },
          },
          {
            heading: '2. Transacciones',
            body: ['Una transacción agrupa varias operaciones que deben ocurrir todas o ninguna (COMMIT / ROLLBACK). Ejemplo: registrar un pago y marcar la factura como pagada.'],
          },
          {
            heading: '3. SQLite desde Python',
            body: [
              'Python trae el módulo sqlite3: no necesitás instalar nada. La base es un archivo .db.',
              'Usá siempre parámetros (?) en lugar de armar el SQL con f-strings: evita errores y ataques de inyección SQL.',
            ],
            code: { lang: 'python', code: `import sqlite3\n\ncon = sqlite3.connect("soporte.db")\ncur = con.cursor()\ncur.execute("CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY, motivo TEXT, estado TEXT)")\ncur.execute("INSERT INTO tickets (motivo, estado) VALUES (?, ?)", ("acceso", "abierto"))\ncon.commit()\n\nfor fila in cur.execute("SELECT id, motivo FROM tickets WHERE estado = ?", ("abierto",)):\n    print(fila)\ncon.close()` },
          },
          {
            heading: '4. SQLite vs PostgreSQL',
            body: [
              'SQLite: un archivo, sin servidor, ideal para prototipos, apps pequeñas y aprendizaje.',
              'PostgreSQL: servidor de BD profesional, multiusuario, usado en producción. Servicios como Supabase o Neon ofrecen PostgreSQL con plan gratuito limitado. El SQL que aprendiste funciona en ambos con mínimas diferencias.',
            ],
          },
        ],
        keyConcepts: [
          { term: 'INSERT / UPDATE / DELETE', def: 'Agregar / modificar / eliminar filas.' },
          { term: 'Transacción', def: 'Conjunto de operaciones atómicas: todas o ninguna.' },
          { term: 'commit()', def: 'Confirma los cambios en la base.' },
          { term: 'Consulta parametrizada', def: 'SQL con ? y valores separados; previene inyección SQL.' },
          { term: 'Inyección SQL', def: 'Ataque que inserta SQL malicioso a través de datos de entrada.' },
        ],
        simpleExample: "UPDATE clientes SET plan = 'premium' WHERE id = 4;",
        realExample: 'Un workflow de n8n recibe un formulario y ejecuta un INSERT parametrizado en la tabla tickets; cuando el agente responde, un UPDATE cambia el estado.',
        analogy: 'UPDATE sin WHERE es como pedir "pintá la pared" en un edificio y que pinten todas las paredes.',
        commonErrors: ['UPDATE/DELETE sin WHERE.', 'Olvidar con.commit() en Python: los cambios no se guardan.', 'Armar SQL con f-strings usando datos de usuarios.'],
        bestPractices: ['SELECT con el mismo WHERE antes de UPDATE/DELETE.', 'Parámetros siempre.', 'Respaldar la base antes de cambios masivos.'],
        summary: ['INSERT, UPDATE, DELETE modifican datos.', 'WHERE es obligatorio en la práctica.', 'sqlite3 + parámetros = acceso seguro desde Python.'],
        comprehension: [{ q: '¿Por qué cur.execute(f"... WHERE nombre = \'{nombre}\'") es peligroso?', a: 'Si nombre contiene SQL (por ejemplo una comilla y otra instrucción), se ejecutaría como código: inyección SQL. Con ? el valor se trata siempre como dato.' }],
        exercise: {
          statement: 'Escribí la secuencia: insertá un ticket nuevo (id 11, cliente 5, motivo envio, prioridad alta, estado abierto, creado 2026-03-07), luego cambiá su estado a resuelto y finalmente consultá todos los tickets de cliente 5.',
          hints: ['Tres sentencias separadas por ;', 'UPDATE ... WHERE id = 11'],
          solution: "INSERT INTO tickets (id, cliente_id, motivo, prioridad, estado, creado) VALUES (11, 5, 'envio', 'alta', 'abierto', '2026-03-07');\nUPDATE tickets SET estado = 'resuelto' WHERE id = 11;\nSELECT * FROM tickets WHERE cliente_id = 5;",
        },
      },
    ],
    resources: [
      { ref: 'sqlbolt', why: 'Lecciones de JOIN, NULL, INSERT, UPDATE, DELETE y CREATE TABLE.', minutes: 75 },
      { ref: 'sqlzoo', why: 'Secciones "The JOIN operation" y "Nested SELECT".', minutes: 90 },
      { ref: 'modesql', why: 'Intermediate: SQL Joins y LEFT JOIN.', minutes: 45 },
    ],
    docs: [
      { ref: 'sqlitedocs', why: 'Referencia de sintaxis (SQL As Understood By SQLite).' },
      { ref: 'pydocs', why: 'Buscá "sqlite3" en la documentación de la biblioteca estándar: sección de consultas parametrizadas.' },
    ],
    exercises: [
      { id: 'w11e1', title: 'Tickets con cliente', level: 'basica', kind: 'sql', statement: 'Mostrá id del ticket, nombre del cliente y motivo.', hints: ['JOIN clientes c ON t.cliente_id = c.id'], schema: SUPPORT_DB, solution: 'SELECT t.id, c.nombre, t.motivo FROM tickets t JOIN clientes c ON t.cliente_id = c.id;' },
      { id: 'w11e2', title: 'Tickets sin agente', level: 'intermedia', kind: 'sql', statement: 'Encontrá los tickets que no tienen agente asignado usando LEFT JOIN.', hints: ['LEFT JOIN agentes', 'WHERE a.id IS NULL'], schema: SUPPORT_DB, solution: 'SELECT t.id FROM tickets t LEFT JOIN agentes a ON t.agente_id = a.id WHERE a.id IS NULL;' },
      { id: 'w11e3', title: 'SQLite desde Python', level: 'avanzada', kind: 'libre', statement: 'En tu computadora, migrá el Proyecto 1 de JSON a SQLite: creá las tablas y reemplazá cargar/guardar por consultas parametrizadas.', hints: ['sqlite3.connect("tickets.db")', 'CREATE TABLE IF NOT EXISTS'] },
    ],
    challenge: {
      title: 'Análisis por equipo y cliente',
      context: 'La dirección quiere saber qué equipos están sobrecargados y qué clientes generan más reclamos.',
      task: ['Tickets y promedio de horas por equipo (JOIN agentes).', 'Top 3 clientes con más tickets (JOIN clientes).', 'Tickets con horas mayores al promedio general (subconsulta).', 'Proponé una acción de negocio basada en los resultados.'],
      deliverable: 'Archivo analisis.sql + conclusiones.',
    },
    deliverable: 'Consultas con JOIN + migración del Proyecto 1 a SQLite (opcional pero recomendado).',
    hours: H12,
    passCriteria: ['Evaluación ≥ 80/100.', 'Explicar INNER vs LEFT JOIN con un ejemplo.', 'Usar consultas parametrizadas en Python.'],
    questions: [
      mcq('q11-1', '¿Qué devuelve un LEFT JOIN?', ['Solo coincidencias', 'Todas las filas de la tabla izquierda, con NULL donde no hay coincidencia', 'Todas las filas de la derecha', 'Un producto cartesiano'], 1, 'Conserva la tabla izquierda completa.', { concept: 'JOIN' }),
      tf('q11-2', 'UPDATE tickets SET estado = \'cerrado\'; sin WHERE modifica todas las filas.', true, 'Sin WHERE se aplica a toda la tabla.', { concept: 'UPDATE' }),
      mcq('q11-3', '¿Cuál es la forma segura de ejecutar una consulta con un dato del usuario en sqlite3?', ['f-string', 'Concatenar con +', 'Consulta parametrizada con ?', 'format()'], 2, 'Evita inyección SQL.', { concept: 'SQLite y PostgreSQL', d: 'intermedia' }),
      tf('q11-4', 'En sqlite3, si no llamás a commit(), los INSERT no se guardan en el archivo.', true, 'commit() confirma la transacción.', { concept: 'SQLite y PostgreSQL' }),
      sql('q11-5', 'Mostrá id del ticket y nombre del agente de todos los tickets que tienen agente (INNER JOIN).', SUPPORT_DB, 'SELECT t.id, a.nombre FROM tickets t JOIN agentes a ON t.agente_id = a.id;', 'INNER JOIN excluye el ticket sin agente.', { concept: 'JOIN', hints: ['JOIN agentes a ON t.agente_id = a.id'] }),
      sql('q11-6', 'Mostrá el equipo y la cantidad de tickets de cada equipo.', SUPPORT_DB, 'SELECT a.equipo, COUNT(*) FROM tickets t JOIN agentes a ON t.agente_id = a.id GROUP BY a.equipo;', 'JOIN + GROUP BY.', { concept: 'JOIN', d: 'intermedia', hints: ['Primero JOIN, después GROUP BY a.equipo'] }),
      sql('q11-7', 'Mostrá el id de los tickets cuyas horas_resolucion superan el promedio de todos los tickets.', SUPPORT_DB, 'SELECT id FROM tickets WHERE horas_resolucion > (SELECT AVG(horas_resolucion) FROM tickets);', 'La subconsulta calcula el promedio y la externa filtra.', { concept: 'Subconsultas', d: 'avanzada', hints: ['(SELECT AVG(...) FROM tickets)'] }),
      sql('q11-8', 'Mostrá el nombre de los clientes que tienen al menos un ticket con estado abierto (sin repetir nombres).', SUPPORT_DB, "SELECT DISTINCT c.nombre FROM clientes c JOIN tickets t ON t.cliente_id = c.id WHERE t.estado = 'abierto';", 'DISTINCT elimina repetidos.', { concept: 'JOIN', d: 'avanzada', hints: ['DISTINCT', "WHERE t.estado = 'abierto'"] }),
      mcq('q11-9', '¿Qué base usarías para un prototipo local sin servidor?', ['PostgreSQL', 'SQLite', 'Oracle', 'Ninguna'], 1, 'SQLite es un archivo, sin servidor.', { concept: 'SQLite y PostgreSQL' }),
      mcq('q11-10', 'Antes de un DELETE, la buena práctica es...', ['Ejecutarlo dos veces', 'Correr un SELECT con el mismo WHERE para ver qué se borrará', 'Borrar la tabla', 'Nada'], 1, 'Verificás exactamente qué filas se afectan.', { concept: 'DELETE' }),
    ],
  },

  // ───────────────────────────── SEMANA 12 ─────────────────────────────
  {
    n: 12,
    stage: 2,
    title: 'APIs y HTTP: conectar sistemas',
    objective: 'Entender cómo se comunican los sistemas por HTTP, leer documentación de APIs, probarlas con Postman y consumirlas desde Python con requests.',
    topics: ['Qué es una API', 'HTTP', 'Métodos GET, POST, PUT y DELETE', 'JSON', 'Headers', 'Autenticación', 'Requests con Python', 'Postman'],
    review: 'Repaso semanas 5 y 6: diccionarios y JSON son la base de las respuestas de APIs.',
    lessons: [
      {
        id: 'w12l1',
        title: 'Qué es una API y cómo funciona HTTP',
        minutes: 70,
        sections: [
          {
            heading: '1. API: un contrato entre sistemas',
            body: [
              'Una API (Application Programming Interface) es una forma acordada de pedirle algo a otro sistema. Una API web recibe pedidos (requests) por internet y devuelve respuestas (responses), normalmente en JSON.',
              'Ejemplos: la API de Google Sheets permite agregar filas; la de un CRM, crear contactos; la de un modelo de IA, generar texto. Automatizar es, en gran medida, conectar APIs.',
            ],
          },
          {
            heading: '2. Anatomía de un request HTTP',
            body: [
              'URL (endpoint): dirección del recurso, ej. https://api.ejemplo.com/v1/tickets/42. Método: qué querés hacer. Headers: metadatos (tipo de contenido, autenticación). Body: datos enviados (en POST/PUT). Query params: filtros en la URL (?estado=abierto&limit=10).',
              'Métodos: GET leer, POST crear, PUT/PATCH actualizar (PUT reemplaza, PATCH modifica parcialmente), DELETE eliminar.',
            ],
            code: { lang: 'http', code: `POST /v1/tickets HTTP/1.1\nHost: api.ejemplo.com\nContent-Type: application/json\nAuthorization: Bearer TU_TOKEN\n\n{"cliente": "Ana", "motivo": "acceso", "prioridad": "alta"}` },
          },
          {
            heading: '3. Códigos de estado',
            body: ['2xx éxito (200 OK, 201 Created). 4xx error del cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests). 5xx error del servidor (500, 503). Tu automatización debe reaccionar distinto según el código: un 429 se reintenta más tarde; un 400 indica que tus datos están mal.'],
          },
          {
            heading: '4. Autenticación',
            body: [
              'Las APIs necesitan saber quién sos. Formas comunes: API key en un header (x-api-key: ...), Bearer token (Authorization: Bearer ...), OAuth 2.0 (inicio de sesión delegado, como "Conectar con Google").',
              'Una API key es como una contraseña: nunca la escribas en el código ni la subas a GitHub. Guardala en variables de entorno (semana 31).',
            ],
          },
        ],
        keyConcepts: [
          { term: 'API', def: 'Interfaz para que un programa use funciones o datos de otro.' },
          { term: 'Endpoint', def: 'URL específica de un recurso de la API.' },
          { term: 'Método HTTP', def: 'GET, POST, PUT, PATCH, DELETE.' },
          { term: 'Header', def: 'Metadato del request/response (ej. Content-Type, Authorization).' },
          { term: 'Status code', def: 'Número que indica el resultado: 2xx, 4xx, 5xx.' },
          { term: 'API key / token', def: 'Credencial para autenticarse ante una API.' },
        ],
        simpleExample: 'GET https://api.github.com/users/octocat devuelve un JSON con los datos públicos de ese usuario.',
        realExample: 'Cuando un cliente completa un formulario, la web hace un POST a la API del help desk; este responde 201 Created con el id del ticket, y otra automatización hace GET para consultar su estado.',
        analogy: 'Una API es como el mozo de un restaurante: no entrás a la cocina; hacés un pedido según el menú (documentación) y te traen el resultado.',
        commonErrors: ['Confundir 401 (no autenticado) con 403 (sin permiso).', 'Enviar datos en el body con GET.', 'Pegar la API key en el código.'],
        bestPractices: ['Leé la documentación de la API antes de programar.', 'Probá primero en Postman.', 'Manejá los códigos de error explícitamente.'],
        summary: ['API = contrato entre sistemas.', 'Request = método + URL + headers + body.', 'Status codes guían el manejo de errores.'],
        comprehension: [
          { q: '¿Qué método usarías para crear un ticket y cuál para consultarlo?', a: 'POST para crear, GET para consultar.' },
          { q: 'Tu automatización recibe un 429. ¿Qué hacés?', a: 'Esperar y reintentar (idealmente con espera creciente), porque excediste el límite de requests.' },
        ],
        exercise: {
          statement: 'Elegí una API pública documentada (por ejemplo la de GitHub) y escribí: un endpoint, qué método usa, qué parámetros acepta, qué devuelve y qué códigos de error documenta.',
          hints: ['docs.github.com/rest', 'Buscá un endpoint GET simple como "Get a user".'],
          solution: 'Ejemplo: GET https://api.github.com/users/{username}. Parámetro de ruta: username. Devuelve JSON con login, name, public_repos, etc. Errores: 404 si el usuario no existe; límites de requests por hora sin autenticación.',
        },
      },
      {
        id: 'w12l2',
        title: 'Consumir APIs con Python y Postman',
        minutes: 70,
        sections: [
          {
            heading: '1. Postman: probar sin programar',
            body: ['Postman permite armar requests, ver respuestas y guardar colecciones. Usalo para entender una API antes de automatizarla. Alternativas: la extensión Thunder Client de VS Code o el comando curl.'],
          },
          {
            heading: '2. requests en Python',
            body: [
              'pip install requests. requests.get(url, params=..., headers=..., timeout=10) devuelve un objeto Response con .status_code, .json() y .text.',
              'Siempre poné timeout: sin él, tu programa puede quedar esperando indefinidamente.',
              'response.raise_for_status() lanza una excepción si el código es 4xx/5xx.',
            ],
            code: { lang: 'python', code: `import requests\n\nurl = "https://api.github.com/users/octocat"\ntry:\n    r = requests.get(url, timeout=10)\n    r.raise_for_status()\n    datos = r.json()\n    print(datos["name"], datos["public_repos"])\nexcept requests.exceptions.HTTPError as e:\n    print("Error HTTP:", e)\nexcept requests.exceptions.RequestException as e:\n    print("Error de conexión:", e)` },
          },
          {
            heading: '3. Enviar datos con POST',
            body: ['requests.post(url, json=datos, headers=headers) serializa el diccionario a JSON y agrega el Content-Type. Para practicar sin una API real podés usar httpbin.org/post o webhook.site, que muestran lo que enviaste.'],
            code: { lang: 'python', code: `import os, requests\n\nheaders = {"Authorization": f"Bearer {os.environ.get('API_TOKEN', '')}"}\nnuevo = {"cliente": "Ana", "motivo": "acceso"}\nr = requests.post("https://httpbin.org/post", json=nuevo, headers=headers, timeout=10)\nprint(r.status_code)\nprint(r.json()["json"])` },
          },
          {
            heading: '4. Paginación y límites',
            body: ['Las APIs devuelven datos por páginas (page, limit, cursor). Para obtener todo hay que iterar hasta que no haya más resultados, respetando los límites de requests (rate limits).'],
          },
        ],
        keyConcepts: [
          { term: 'requests', def: 'Librería de Python para hacer requests HTTP.' },
          { term: 'timeout', def: 'Tiempo máximo de espera de una respuesta.' },
          { term: '.json()', def: 'Convierte la respuesta JSON en dict/list.' },
          { term: 'Paginación', def: 'Datos divididos en páginas que se piden de a una.' },
          { term: 'Rate limit', def: 'Límite de requests por período de tiempo.' },
        ],
        simpleExample: 'requests.get("https://api.github.com").status_code → 200.',
        realExample: 'Un script diario consulta la API de una tienda online, obtiene los pedidos del día (paginados), los guarda en SQLite y genera un reporte.',
        analogy: 'Postman es como probar una receta en una porción chica antes de cocinar para 100 personas con Python.',
        commonErrors: ['Olvidar timeout.', 'Llamar .json() sin verificar el status (falla si la respuesta es un HTML de error).', 'Usar data= cuando la API espera json=.'],
        bestPractices: ['raise_for_status() + try/except.', 'Credenciales en variables de entorno.', 'Respetar rate limits.'],
        summary: ['Postman para explorar; requests para automatizar.', 'Siempre timeout y manejo de errores.', 'json= para enviar JSON.'],
        comprehension: [{ q: '¿Qué hace raise_for_status()?', a: 'Lanza requests.HTTPError si el status code es 4xx o 5xx; si es 2xx no hace nada.' }],
        exercise: {
          statement: 'Completá extraer_resumen(usuario) que reciba el dict que devuelve la API de GitHub para un usuario y devuelva "login (N repos)". Si falta public_repos, usá 0.',
          hints: ['dict.get("public_repos", 0)', 'f-string'],
          solution: `def extraer_resumen(usuario):\n    return f"{usuario['login']} ({usuario.get('public_repos', 0)} repos)"`,
          starter: `def extraer_resumen(usuario):\n    return ""`,
          tests: `assert extraer_resumen({"login":"octocat","public_repos":8}) == "octocat (8 repos)"\nassert extraer_resumen({"login":"ana"}) == "ana (0 repos)"`,
        },
      },
    ],
    resources: [
      { ref: 'postman', why: 'Getting started: enviar tu primer request y crear una colección.', minutes: 60 },
      { ref: 'mdn', why: 'Guía "HTTP overview", "HTTP request methods" y "HTTP response status codes" (en español).', minutes: 60 },
      { ref: 'requests', why: 'Quickstart completo.', minutes: 45 },
      { ref: 'fastapi', why: 'Opcional: leé "First Steps" del tutorial para ver una API desde el lado del servidor.', minutes: 30 },
    ],
    docs: [{ ref: 'json', why: 'Repasá la estructura de JSON.' }],
    exercises: [
      { id: 'w12e1', title: 'Colección en Postman', level: 'basica', kind: 'libre', statement: 'Creá una colección "Práctica APIs" con 3 requests: GET a api.github.com/users/octocat, GET con query params a otra API pública, y POST a httpbin.org/post con un JSON de ticket.', hints: ['Pestaña Body → raw → JSON para el POST.'] },
      { id: 'w12e2', title: 'Script de consulta', level: 'intermedia', kind: 'libre', statement: 'Escribí un script que consulte la API de GitHub para 3 usuarios, maneje el 404 del que no existe y guarde los resultados en un JSON.', hints: ['for usuario in [...]', 'if r.status_code == 404'] },
      { id: 'w12e3', title: 'Procesar respuesta JSON', level: 'intermedia', kind: 'python', statement: 'contar_por_estado(respuesta) recibe un dict {"data": [{"estado": ...}, ...]} y devuelve {estado: cantidad}.', hints: ['respuesta["data"]', 'dict.get(k, 0) + 1'], solution: `def contar_por_estado(respuesta):\n    c = {}\n    for item in respuesta.get("data", []):\n        e = item["estado"]\n        c[e] = c.get(e, 0) + 1\n    return c`, starter: `def contar_por_estado(respuesta):\n    return {}`, tests: `assert contar_por_estado({"data":[{"estado":"a"},{"estado":"a"},{"estado":"b"}]}) == {"a":2,"b":1}\nassert contar_por_estado({}) == {}` },
    ],
    challenge: {
      title: 'Base de datos de atención al cliente (proyecto de etapa)',
      context: 'Integrás lo aprendido: una base SQLite de atención al cliente con consultas de análisis, y un script que importa tickets desde un JSON (simulando una API).',
      task: ['Esquema con clientes, agentes y tickets (PK/FK).', 'Script Python que carga datos desde JSON con consultas parametrizadas.', 'Consultas de análisis: volumen, motivos, tiempos de resolución, rendimiento por agente/equipo.', 'Documento con hallazgos y recomendaciones.'],
      deliverable: 'Proyecto 2 completo (ver checklist en Proyectos).',
    },
    deliverable: 'Colección de Postman + script de API + Proyecto 2.',
    hours: HPROJ,
    passCriteria: ['Evaluación ≥ 80/100.', 'Hacer GET y POST desde Python con manejo de errores.', 'Proyecto 2 con sus entregables obligatorios.'],
    questions: [
      mcq('q12-1', '¿Qué método HTTP se usa para crear un recurso?', ['GET', 'POST', 'DELETE', 'HEAD'], 1, 'POST crea; GET lee.', { concept: 'Métodos HTTP' }),
      mcq('q12-2', 'Un status 401 significa...', ['Todo bien', 'No autenticado: credenciales faltantes o inválidas', 'Recurso no encontrado', 'Error del servidor'], 1, '401 Unauthorized.', { concept: 'HTTP' }),
      mcq('q12-3', '¿Y un 404?', ['Recurso no encontrado', 'Demasiados requests', 'Creado', 'Prohibido'], 0, '404 Not Found.', { concept: 'HTTP' }),
      tf('q12-4', 'Es aceptable escribir la API key directamente en el código si el repositorio es privado.', false, 'Los repos privados se filtran, se comparten o se hacen públicos. Usá variables de entorno.', { concept: 'Autenticación' }),
      mcq('q12-5', '¿Para qué sirve el parámetro timeout en requests?', ['Para reintentar', 'Para no esperar indefinidamente una respuesta', 'Para autenticarse', 'Para paginar'], 1, 'Sin timeout, un servidor lento puede bloquear tu programa.', { concept: 'Requests con Python' }),
      mcq('q12-6', '¿Dónde suelen enviarse las credenciales de una API?', ['En la URL siempre', 'En un header (Authorization o x-api-key)', 'En el nombre del archivo', 'En el status code'], 1, 'Los headers transportan la autenticación.', { concept: 'Headers' }),
      tf('q12-7', 'Un 429 Too Many Requests indica que conviene esperar y reintentar.', true, 'Se superó el rate limit.', { concept: 'HTTP', d: 'intermedia' }),
      mcq('q12-8', 'requests.post(url, json=datos) ...', ['Envía datos como formulario', 'Serializa datos a JSON y agrega Content-Type: application/json', 'Hace un GET', 'Guarda un archivo'], 1, 'json= se encarga de la serialización.', { concept: 'Requests con Python', d: 'intermedia' }),
      py('q12-9', 'Completá clasificar_status(code) que devuelva "ok" para 2xx, "reintentar" para 429 y 5xx, "error_cliente" para otros 4xx y "desconocido" en otro caso.', `def clasificar_status(code):\n    return "desconocido"`, `assert clasificar_status(200) == "ok"\nassert clasificar_status(201) == "ok"\nassert clasificar_status(429) == "reintentar"\nassert clasificar_status(503) == "reintentar"\nassert clasificar_status(404) == "error_cliente"\nassert clasificar_status(302) == "desconocido"`, `def clasificar_status(code):\n    if 200 <= code < 300:\n        return "ok"\n    if code == 429 or 500 <= code < 600:\n        return "reintentar"\n    if 400 <= code < 500:\n        return "error_cliente"\n    return "desconocido"`, 'Lógica típica de manejo de errores en integraciones: el 429 se evalúa antes que los demás 4xx.', { concept: 'HTTP', d: 'avanzada', hints: ['Rangos: 200 <= code < 300.', 'Evaluá 429 antes que el rango 4xx.'] }),
      short('q12-10', '¿Cómo se llama la herramienta gráfica para probar APIs vista esta semana?', ['postman'], 'Postman.', { concept: 'Postman' }),
    ],
  },
];
