import { t, day } from './helpers';

test('t() builds a task without an id and defaults kind to other', () => {
  expect(t('Stretch')).toEqual({ label: 'Stretch', kind: 'other' });
  expect(t('3×20s plank', 'floor', 'plank')).toEqual({
    label: '3×20s plank', kind: 'floor', moveRef: 'plank',
  });
});

test('day() assigns 1-based ids and preserves order', () => {
  const d = day(8, 'Core + Walk', [t('A', 'core'), t('B', 'cardio')]);
  expect(d.n).toBe(8);
  expect(d.title).toBe('Core + Walk');
  expect(d.isRest).toBe(false);
  expect(d.tasks.map((x) => x.id)).toEqual(['d8-t1', 'd8-t2']);
  expect(d.tasks[0].label).toBe('A');
});

test('day() supports rest days', () => {
  const d = day(7, 'Rest', [t('Full rest', 'rest')], true);
  expect(d.isRest).toBe(true);
  expect(d.tasks).toHaveLength(1);
});
