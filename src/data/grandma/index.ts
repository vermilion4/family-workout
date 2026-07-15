import type { Plan } from '../types';
import { phase1 } from './phase1';
import { phase2 } from './phase2';
import { phase3 } from './phase3';

export const grandmaPlan: Plan = {
  personId: 'grandma',
  totalDays: 90,
  authored: true,
  phases: [phase1, phase2, phase3],
};
