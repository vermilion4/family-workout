import { phase1 } from './phase1';
import { EXERCISES } from '../exercises';

test('mummy phase1 has 30 days numbered 1..30', () => {
  expect(phase1.days).toHaveLength(30);
  expect(phase1.days.map((d) => d.n)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
});

test('mummy phase1 metadata', () => {
  expect(phase1.n).toBe(1);
  expect(phase1.name).toBe('Gentle Start');
});

test('mummy phase1 integrity + safety (no banned moves, no crunches in phase 1)', () => {
  const banned = /plank|leg raise|flutter|bicycle|russian|mountain climber|jog|jump|sit-up|squat|lunge/i;
  for (const d of phase1.days) {
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(d.tasks.length).toBeGreaterThan(0);
    if (d.isRest) expect(d.tasks[0].kind).toBe('rest');
    for (const task of d.tasks) {
      expect(task.label).not.toMatch(banned);
      expect(task.moveRef === 'gentle-crunch').toBe(false); // no crunches in phase 1
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});

test('mummy phase1 rest days are 7, 14, 21, 28', () => {
  const restDays = phase1.days.filter((d) => d.isRest).map((d) => d.n);
  expect(restDays).toEqual([7, 14, 21, 28]);
});
