export interface DayMeals {
  day: string;            // 'Monday'..'Sunday'
  fasting?: string;       // note when breakfast is intentionally skipped
  breakfast?: string[];   // >=3 options; undefined on fasting days
  lunch: string[];        // >=3 options
  supper: string[];       // >=3 options
}
export interface MealPlan {
  personId: string;
  intro: string;
  week: DayMeals[];       // 7 entries, Monday..Sunday
}
