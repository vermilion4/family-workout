import { PEOPLE, getPerson, getDay } from './people';

test('three people in order with correct names/ids', () => {
  expect(PEOPLE.map((p) => p.id)).toEqual(['ady', 'mummy', 'grandma']);
  expect(PEOPLE.map((p) => p.displayName)).toEqual(['Ady', 'Mummy', 'Grandma']);
});

test('Ady plan is authored with 90 days across 3 phases', () => {
  const ady = getPerson('ady')!;
  expect(ady.plan.authored).toBe(true);
  expect(ady.plan.totalDays).toBe(90);
  const totalDays = ady.plan.phases.reduce((s, ph) => s + ph.days.length, 0);
  expect(totalDays).toBe(90);
});

test('stub plans are unauthored but still 90 days for the calendar', () => {
  const mummy = getPerson('mummy')!;
  expect(mummy.plan.authored).toBe(false);
  expect(mummy.plan.phases.reduce((s, ph) => s + ph.days.length, 0)).toBe(90);
});

test('getDay finds a day across phases', () => {
  const ady = getPerson('ady')!;
  expect(getDay(ady.plan, 1)?.n).toBe(1);
  expect(getDay(ady.plan, 45)?.n).toBe(45);
  expect(getDay(ady.plan, 90)?.n).toBe(90);
  expect(getDay(ady.plan, 91)).toBeUndefined();
});
