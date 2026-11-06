// ───────────────────────── Contenido (estático) ─────────────────────────

export type ResourceSource = 'coursera' | 'externo' | 'docs' | 'propio' | 'proyecto';
export type Lang = 'es' | 'en' | 'es/en';

export interface Resource {
  id: string;
  title: string;
  url: string;
  source: ResourceSource;
  lang: Lang;
  category: 'python' | 'sql' | 'apis' | 'automatizacion' | 'ia' | 'agentes' | 'carrera' | 'herramientas';
  description: string;
  /** Restricciones de planes gratuitos, costos o requisitos. */
  freeNote?: string;
}

export interface WeekResource {
  ref: string; // Resource.id
  why: string; // por qué se usa esta semana / qué parte
  minutes?: number;
}

export interface KeyConcept {
  term: string;
  def: string;
}

export interface CodeSample {
  lang: 'python' | 'sql' | 'json' | 'bash' | 'text' | 'http' | 'yaml';
  code: string;
  caption?: string;
}

export interface ComprehensionQ {
  q: string;
  a: string;
}

export interface LessonExercise {
  statement: string;
  hints: string[];
  solution: string;
  /** Si es Python ejecutable: código inicial y tests (asserts) */
  starter?: string;
  tests?: string;
}

export interface LessonSection {
  heading: string;
  body: string[]; // párrafos
  code?: CodeSample;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  /** Explicación desde cero dividida en subtemas */
  sections: LessonSection[];
  keyConcepts: KeyConcept[];
  simpleExample: string;
  realExample: string;
  analogy: string;
  code?: CodeSample[];
  commonErrors: string[];
  bestPractices: string[];
  summary: string[];
  comprehension: ComprehensionQ[];
  exercise: LessonExercise;
}

export type Difficulty = 'basica' | 'intermedia' | 'avanzada';

interface QBase {
  id: string;
  concept: string;
  difficulty: Difficulty;
  prompt: string;
  hints: string[];
  explanation: string;
  code?: string; // fragmento a mostrar en el enunciado
}

export interface MCQ extends QBase {
  type: 'mcq';
  options: string[];
  answer: number;
}
export interface TFQ extends QBase {
  type: 'tf';
  answer: boolean;
}
export interface PyQ extends QBase {
  type: 'python';
  starter: string;
  tests: string; // código con asserts que se ejecuta tras el de la estudiante
  solution: string;
}
export interface SqlQ extends QBase {
  type: 'sql';
  schema: string; // CREATE + INSERT
  solution: string;
  ordered?: boolean;
}
export interface TextQ extends QBase {
  /** Respuesta corta autoevaluable: se compara contra variantes aceptadas (normalizadas). */
  type: 'short';
  accepted: string[];
}
export type Question = MCQ | TFQ | PyQ | SqlQ | TextQ;

export interface PracticeExercise {
  id: string;
  title: string;
  level: Difficulty;
  statement: string;
  hints: string[];
  solution?: string;
  starter?: string;
  tests?: string;
  kind: 'python' | 'sql' | 'libre';
  schema?: string;
}

export interface BusinessChallenge {
  title: string;
  context: string;
  task: string[];
  deliverable: string;
}

export interface WeekHours {
  theory: number;
  resources: number;
  practice: number;
  english: number;
}

export interface Week {
  n: number;
  stage: number;
  title: string;
  objective: string;
  topics: string[];
  lessons: Lesson[];
  resources: WeekResource[];
  coursera?: { courseId: string; note: string }[];
  docs: WeekResource[];
  exercises: PracticeExercise[];
  challenge: BusinessChallenge;
  deliverable: string;
  hours: WeekHours;
  passCriteria: string[];
  questions: Question[];
  review?: string; // repaso de semanas anteriores
}

export interface Stage {
  id: number;
  title: string;
  short: string;
  weeks: [number, number];
  objective: string;
  projectId: string;
  color: string; // clase tailwind para acento
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  description: string;
  stage: number | null;
  priority: 'fundamental' | 'complementario' | 'opcional';
  hours: number;
  url: string;
  urlVerified: boolean;
  custom?: boolean;
}

export interface ProjectDef {
  id: string;
  n: number;
  title: string;
  stage: number;
  objective: string;
  problem: string;
  requirements: string[];
  tech: string[];
  steps: string[];
  deliverables: { id: string; text: string; required: boolean }[];
  quality: string[];
  evaluation: string[];
  documentation: string[];
}

// ───────────────────────── Estado del usuario (persistido) ─────────────────────────

export type CourseStatus = 'pendiente' | 'en curso' | 'completado';

export interface CourseProgress {
  enrolled: boolean;
  status: CourseStatus;
  start?: string;
  end?: string;
  progress: number;
  certificate: boolean;
  certificateUrl?: string;
  notes: string;
}

export interface ExamAttempt {
  id: string;
  week: number;
  date: string;
  score: number;
  questionIds: string[];
  wrong: { qid: string; concept: string }[];
  answers: Record<string, unknown>;
}

export interface WeekProgress {
  lessonsDone: string[];
  exercisesDone: string[];
  exerciseNotes: Record<string, string>;
  challengeDone: boolean;
  challengeNotes: string;
  deliverableEvidence: string;
  deliverableDone: boolean;
  approved: boolean;
  approvedAt?: string;
  startedAt?: string;
  extraWeeks: number;
  notes: string;
  resourcesDone: string[];
}

export interface HourLog {
  id: string;
  date: string; // YYYY-MM-DD
  minutes: number;
  category: keyof WeekHours;
  week: number;
  note: string;
}

export interface PlannedActivity {
  id: string;
  title: string;
  weekKey: string; // lunes de esa semana YYYY-MM-DD
  day: number; // 0 = lunes
  minutes: number;
  category: keyof WeekHours;
  done: boolean;
  academyWeek?: number;
}

export interface WeeklyGoal {
  id: string;
  weekKey: string;
  text: string;
  done: boolean;
}

export interface ProjectProgress {
  status: 'no iniciado' | 'en progreso' | 'en revisión' | 'terminado';
  deliverables: string[]; // ids completados
  repoUrl: string;
  demoUrl: string;
  notes: string;
  stepsDone: number[];
}

export interface TutorEntry {
  id: string;
  date: string;
  week: number;
  mode: string;
  title: string;
  prompt: string;
  response: string;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  country: string;
  modality: string;
  url: string;
  date: string;
  status: 'interesada' | 'postulada' | 'entrevista' | 'prueba técnica' | 'oferta' | 'rechazada' | 'descartada';
  salary: string;
  notes: string;
}

export interface PortfolioProject {
  projectId: string;
  summary: string;
  problem: string;
  solution: string;
  results: string;
  screenshots: string;
  readme: string;
  visible: boolean;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  name: string;
  startDate: string; // YYYY-MM-DD
  weeklyTarget: WeekHours;
  currentWeek: number;
  onboarded: boolean;
}
