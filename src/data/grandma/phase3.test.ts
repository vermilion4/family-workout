import { phase3 } from './phase3';
import { EXERCISES } from '../exercises';

const banned = /jog|running|jump|deep squat|lunge|plank|leg raise|flutter|mountain climber|russian/i;

test('grandma phase3 has 30 days numbered 61..90', () => {
  expect(phase3.days).toHaveLength(30);
  expect(phase3.days.map((d) => d.n)).toEqual(Array.from({ length: 30 }, (_, i) => i + 61));
});

test('grandma phase3 metadata', () => {
  expect(phase3.n).toBe(3);
  expect(phase3.name).toBe('Strong & Steady');
});

test('grandma phase3 integrity + age-appropriate safety (no banned moves)', () => {
  for (const d of phase3.days) {
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

test('grandma phase3 rest days are 67, 74, 81, 88', () => {
  const restDays = phase3.days.filter((d) => d.isRest).map((d) => d.n);
  expect(restDays).toEqual([67, 74, 81, 88]);
});
