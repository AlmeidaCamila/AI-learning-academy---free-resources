import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Application,
  Course,
  CourseProgress,
  ExamAttempt,
  HourLog,
  PlannedActivity,
  PortfolioProject,
  ProjectProgress,
  Settings,
  TutorEntry,
  WeekProgress,
  WeeklyGoal,
} from '../types';
import { todayISO } from '../lib/date';

export const STORAGE_KEY = 'ai-academy-v1';
export const SNAPSHOT_KEY = 'ai-academy-snapshots';

export interface CVData {
  fullName: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  certifications: string;
  languages: string;
}

export interface Profile {
  headline: string;
  about: string;
  skills: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
}

export interface DataState {
  version: 1;
  settings: Settings;
  weeks: Record<number, WeekProgress>;
  attempts: ExamAttempt[];
  courses: Record<string, CourseProgress>;
  customCourses: Course[];
  courseOverrides: Record<string, Partial<Course>>;
  hourLogs: HourLog[];
  activities: PlannedActivity[];
  goals: WeeklyGoal[];
  projects: Record<string, ProjectProgress>;
  tutor: TutorEntry[];
  applications: Application[];
  profile: Profile;
  portfolio: Record<string, PortfolioProject>;
  cv: CVData;
  pitch: string;
  linkedinDone: string[];
  githubDone: string[];
  interviewNotes: Record<string, string>;
  englishKnown: string[];
  englishDone: string[];
  englishNotes: Record<string, string>;
  resourceNotes: Record<string, string>;
}

export const emptyWeek = (): WeekProgress => ({
  lessonsDone: [],
  exercisesDone: [],
  exerciseNotes: {},
  challengeDone: false,
  challengeNotes: '',
  deliverableEvidence: '',
  deliverableDone: false,
  approved: false,
  extraWeeks: 0,
  notes: '',
  resourcesDone: [],
});

export const emptyProject = (): ProjectProgress => ({
  status: 'no iniciado',
  deliverables: [],
  repoUrl: '',
  demoUrl: '',
  notes: '',
  stepsDone: [],
});

export const emptyCourse = (): CourseProgress => ({
  enrolled: false,
  status: 'pendiente',
  progress: 0,
  certificate: false,
  notes: '',
});

export const initialData = (): DataState => ({
  version: 1,
  settings: {
    theme: 'system',
    name: '',
    startDate: todayISO(),
    weeklyTarget: { theory: 3, resources: 4, practice: 4, english: 1 },
    currentWeek: 1,
    onboarded: false,
  },
  weeks: {},
  attempts: [],
  courses: {},
  customCourses: [],
  courseOverrides: {},
  hourLogs: [],
  activities: [],
  goals: [],
  projects: {},
  tutor: [],
  applications: [],
  profile: { headline: '', about: '', skills: '', location: '', github: '', linkedin: '', website: '' },
  portfolio: {},
  cv: { fullName: '', location: '', email: '', linkedin: '', github: '', portfolio: '', summary: '', skills: '', experience: '', education: '', certifications: '', languages: '' },
  pitch: '',
  linkedinDone: [],
  githubDone: [],
  interviewNotes: {},
  englishKnown: [],
  englishDone: [],
  englishNotes: {},
  resourceNotes: {},
});

interface Actions {
  set: (fn: (s: DataState) => void) => void;
  updateWeek: (n: number, patch: Partial<WeekProgress> | ((w: WeekProgress) => Partial<WeekProgress>)) => void;
  updateProject: (id: string, patch: Partial<ProjectProgress>) => void;
  updateCourse: (id: string, patch: Partial<CourseProgress>) => void;
  replaceAll: (data: DataState) => void;
  resetAll: () => void;
}

export type Store = DataState & Actions;

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
export { uid };

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialData(),
      set: (fn) =>
        set((s) => {
          const draft = structuredClone(pickData(s));
          fn(draft);
          return draft;
        }),
      updateWeek: (n, patch) =>
        set((s) => {
          const cur = s.weeks[n] ?? emptyWeek();
          const p = typeof patch === 'function' ? patch(cur) : patch;
          const next = { ...cur, ...p };
          if (!next.startedAt) next.startedAt = todayISO();
          return { weeks: { ...s.weeks, [n]: next } };
        }),
      updateProject: (id, patch) =>
        set((s) => ({ projects: { ...s.projects, [id]: { ...(s.projects[id] ?? emptyProject()), ...patch } } })),
      updateCourse: (id, patch) =>
        set((s) => ({ courses: { ...s.courses, [id]: { ...(s.courses[id] ?? emptyCourse()), ...patch } } })),
      replaceAll: (data) => set(() => ({ ...initialData(), ...data })),
      resetAll: () => set(() => initialData()),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => pickData(s),
      version: 1,
    },
  ),
);

export function pickData(s: DataState | Store): DataState {
  const d = initialData();
  const out = {} as Record<string, unknown>;
  for (const k of Object.keys(d)) out[k] = (s as unknown as Record<string, unknown>)[k];
  return out as unknown as DataState;
}

// ───────── Respaldos automáticos (recuperación de progreso) ─────────

export interface Snapshot {
  date: string;
  savedAt: string;
  data: DataState;
}

export function readSnapshots(): Snapshot[] {
  try {
    return JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeSnapshot(data: DataState) {
  try {
    const snaps = readSnapshots();
    const date = todayISO();
    const filtered = snaps.filter((s) => s.date !== date);
    filtered.unshift({ date, savedAt: new Date().toISOString(), data });
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(filtered.slice(0, 7)));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora */
  }
}

let snapTimer: number | undefined;
useStore.subscribe((s) => {
  window.clearTimeout(snapTimer);
  snapTimer = window.setTimeout(() => writeSnapshot(pickData(s)), 4000);
});

export function validateBackup(obj: unknown): obj is DataState {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  return o.version === 1 && typeof o.settings === 'object' && typeof o.weeks === 'object' && Array.isArray(o.attempts);
}
