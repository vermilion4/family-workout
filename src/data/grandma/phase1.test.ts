import { phase1 } from './phase1';
import { EXERCISES } from '../exercises';

const banned = /jog|running|jump|deep squat|lunge|plank|leg raise|flutter|mountain climber|russian/i;

test('grandma phase1 has 30 days numbered 1..30', () => {
  expect(phase1.days).toHaveLength(30);
  expect(phase1.days.map((d) => d.n)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
});

test('grandma phase1 metadata', () => {
  expect(phase1.n).toBe(1);
  expect(phase1.name).toBe('Find Your Feet');
});

test('grandma phase1 integrity + age-appropriate safety (no banned moves)', () => {
  for (const d of phase1.days) {
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(d.tasks.length).toBeGreaterThan(0);
    if (d.isRest) expect(d.tasks[0].kind).toBe('rest');
    for (const task of d.tasks) {
      expect(task.label).not.toMatch(banned);
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});

test('grandma phase1 rest days are 7, 14, 21, 28', () => {
  const restDays = phase1.days.filter((d) => d.isRest).map((d) => d.n);
  expect(restDays).toEqual([7, 14, 21, 28]);
});
