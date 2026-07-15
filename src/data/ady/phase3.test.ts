import { phase3 } from './phase3';
import { EXERCISES } from '../exercises';

test('phase3 has 30 days numbered 61..90', () => {
  expect(phase3.days).toHaveLength(30);
  expect(phase3.days.map((d) => d.n)).toEqual(
    Array.from({ length: 30 }, (_, i) => i + 61),
  );
});

test('phase3 metadata + integrity', () => {
  expect(phase3.n).toBe(3);
  expect(phase3.name).toBe('Peak');
  for (const d of phase3.days) {
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    if (d.isRest) expect(d.tasks[0].kind).toBe('rest');
    for (const task of d.tasks) {
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});
