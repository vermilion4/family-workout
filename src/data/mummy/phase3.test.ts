import { phase3 } from './phase3';
import { EXERCISES } from '../exercises';

test('mummy phase3 has 30 days numbered 61..90', () => {
  expect(phase3.days).toHaveLength(30);
  expect(phase3.days.map((d) => d.n)).toEqual(Array.from({ length: 30 }, (_, i) => i + 61));
});

test('mummy phase3 metadata', () => {
  expect(phase3.n).toBe(3);
  expect(phase3.name).toBe('Steady & Strong');
});

test('mummy phase3 integrity + safety (no banned moves, gentle-crunch allowed)', () => {
  const banned = /plank|leg raise|flutter|bicycle|russian|mountain climber|jog|jump|sit-up|squat|lunge/i;
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

test('mummy phase3 rest days are 67, 74, 81, 88', () => {
  const restDays = phase3.days.filter((d) => d.isRest).map((d) => d.n);
  expect(restDays).toEqual([67, 74, 81, 88]);
});
