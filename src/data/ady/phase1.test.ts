import { phase1 } from './phase1';
import { EXERCISES } from '../exercises';

test('phase1 has 30 days numbered 1..30', () => {
  expect(phase1.days).toHaveLength(30);
  expect(phase1.days.map((d) => d.n)).toEqual(
    Array.from({ length: 30 }, (_, i) => i + 1),
  );
});

test('phase1 metadata', () => {
  expect(phase1.n).toBe(1);
  expect(phase1.name).toBe('Foundation');
});

test('every day has tasks; rest days have exactly one rest task', () => {
  for (const d of phase1.days) {
    expect(d.tasks.length).toBeGreaterThan(0);
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length); // unique ids
    if (d.isRest) {
      expect(d.tasks).toHaveLength(1);
      expect(d.tasks[0].kind).toBe('rest');
    } else {
      expect(d.tasks.length).toBeGreaterThanOrEqual(2);
    }
    for (const task of d.tasks) {
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});

test('specific transcription: day 1', () => {
  const d1 = phase1.days[0];
  expect(d1.title).toBe('Core + Walk');
  expect(d1.tasks[0].label).toMatch(/warm-up 5 min/i);
  expect(d1.tasks.some((x) => x.kind === 'cardio')).toBe(true);
});
