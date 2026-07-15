import { PEOPLE, getPerson, getDay } from './people';

test('three people in order with correct names/ids', () => {
  expect(PEOPLE.map((p) => p.id)).toEqual(['ady', 'mummy', 'grandma']);
  expect(PEOPLE.map((p) => p.displayName)).toEqual(['Ady', 'Mummy', 'Grandma']);
});

test('all three people are authored with 90 days across 3 phases', () => {
  for (const person of PEOPLE) {
    expect(person.plan.authored).toBe(true);
    expect(person.plan.totalDays).toBe(90);
    expect(person.plan.phases).toHaveLength(3);
    const totalDays = person.plan.phases.reduce((s, ph) => s + ph.days.length, 0);
    expect(totalDays).toBe(90);
  }
});

test('getDay finds a day across phases', () => {
  const ady = getPerson('ady')!;
  expect(getDay(ady.plan, 1)?.n).toBe(1);
  expect(getDay(ady.plan, 45)?.n).toBe(45);
  expect(getDay(ady.plan, 90)?.n).toBe(90);
  expect(getDay(ady.plan, 91)).toBeUndefined();
});
