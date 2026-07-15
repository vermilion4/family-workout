import { phase2 } from './phase2';
import { EXERCISES } from '../exercises';

test('phase2 has 30 days numbered 31..60', () => {
  expect(phase2.days).toHaveLength(30);
  expect(phase2.days.map((d) => d.n)).toEqual(
    Array.from({ length: 30 }, (_, i) => i + 31),
  );
});

test('phase2 metadata + integrity', () => {
  expect(phase2.n).toBe(2);
  expect(phase2.name).toBe('Momentum');
  for (const d of phase2.days) {
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(d.tasks.length).toBeGreaterThan(0);
    if (d.isRest) expect(d.tasks[0].kind).toBe('rest');
    for (const task of d.tasks) {
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});
