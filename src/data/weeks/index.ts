import type { Week } from '../../types';
import { STAGE1 } from './stage1';
import { STAGE2 } from './stage2';
import { STAGE3 } from './stage3';
import { STAGE4 } from './stage4';
import { STAGE5 } from './stage5';
import { STAGE6 } from './stage6';

export const WEEKS: Week[] = [...STAGE1, ...STAGE2, ...STAGE3, ...STAGE4, ...STAGE5, ...STAGE6].sort((a, b) => a.n - b.n);

export const getWeek = (n: number) => WEEKS.find((w) => w.n === n);

export const ALL_QUESTIONS = WEEKS.flatMap((w) => w.questions.map((q) => ({ ...q, week: w.n })));
