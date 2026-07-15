import type { Plan, Phase } from './types';
import { day } from './helpers';

const NAMES: Record<1 | 2 | 3, string> = { 1: 'Phase 1', 2: 'Phase 2', 3: 'Phase 3' };

function stubPhase(n: 1 | 2 | 3): Phase {
  const start = (n - 1) * 30 + 1;
  return {
    n,
    name: NAMES[n],
    subtitle: 'coming soon',
    days: Array.from({ length: 30 }, (_, i) => day(start + i, 'Coming soon', [], false)),
  };
}

export function stubPlan(personId: string): Plan {
  return {
    personId,
    totalDays: 90,
    authored: false,
    phases: [stubPhase(1), stubPhase(2), stubPhase(3)],
  };
}
