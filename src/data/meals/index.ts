import type { MealPlan } from './types';
import { adyMeals } from './ady';
import { mummyMeals } from './mummy';
import { grandmaMeals } from './grandma';

export const MEAL_PLANS: Record<string, MealPlan> = {
  ady: adyMeals, mummy: mummyMeals, grandma: grandmaMeals,
};
export function getMealPlan(personId: string): MealPlan | undefined {
  return MEAL_PLANS[personId];
}
export * from './types';
