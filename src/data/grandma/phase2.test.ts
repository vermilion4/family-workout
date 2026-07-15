import { phase2 } from './phase2';
import { EXERCISES } from '../exercises';

const banned = /jog|running|jump|deep squat|lunge|plank|leg raise|flutter|mountain climber|russian/i;

test('grandma phase2 has 30 days numbered 31..60', () => {
  expect(phase2.days).toHaveLength(30);
  expect(phase2.days.map((d) => d.n)).toEqual(Array.from({ length: 30 }, (_, i) => i + 31));
});

test('grandma phase2 metadata', () => {
  expect(phase2.n).toBe(2);
  expect(phase2.name).toBe('Stronger Every Week');
});

test('grandma phase2 integrity + age-appropriate safety (no banned moves)', () => {
  for (const d of phase2.days) {
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

test('grandma phase2 rest days are 37, 44, 51, 58', () => {
  const restDays = phase2.days.filter((d) => d.isRest).map((d) => d.n);
  expect(restDays).toEqual([37, 44, 51, 58]);
});
