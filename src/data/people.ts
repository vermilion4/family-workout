import type { Plan, Day } from './types';
import { adyPlan } from './ady';
import { mummyPlan } from './mummy';
import { stubPlan } from './stubs';

export interface Person {
  id: string;
  displayName: string;
  plan: Plan;
}

export const PEOPLE: Person[] = [
  { id: 'ady', displayName: 'Ady', plan: adyPlan },
  { id: 'mummy', displayName: 'Mummy', plan: mummyPlan },
  { id: 'grandma', displayName: 'Grandma', plan: stubPlan('grandma') },
];

export function getPerson(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

export function getDay(plan: Plan, n: number): Day | undefined {
  for (const phase of plan.phases) {
    const found = phase.days.find((d) => d.n === n);
    if (found) return found;
  }
  return undefined;
}
