import { getMealPlan } from './index';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

for (const id of ['ady','mummy','grandma']) {
  test(`${id} meal plan is a valid Mon..Sun week`, () => {
    const plan = getMealPlan(id)!;
    expect(plan.week.map((d) => d.day)).toEqual(DAYS);
    for (const d of plan.week) {
      expect(d.lunch.length).toBeGreaterThanOrEqual(3);
      expect(d.supper.length).toBeGreaterThanOrEqual(3);
      if (d.fasting) {
        expect(d.breakfast).toBeUndefined();
      } else {
        expect(d.breakfast!.length).toBeGreaterThanOrEqual(3);
      }
      // halal: no pork anywhere
      const all = [...(d.breakfast ?? []), ...d.lunch, ...d.supper].join(' ').toLowerCase();
      expect(all).not.toContain('pork');
    }
  });
}

test('only Ady has fasting days, on Tuesday & Friday', () => {
  const fastingDays = (id: string) => getMealPlan(id)!.week.filter((d) => d.fasting).map((d) => d.day);
  expect(fastingDays('ady')).toEqual(['Tuesday','Friday']);
  expect(fastingDays('mummy')).toEqual([]);
  expect(fastingDays('grandma')).toEqual([]);
});
