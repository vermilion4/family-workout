import { EXERCISES, getMove } from './exercises';

const REQUIRED = [
  'wonder-core-crunch', 'twist-crunch', 'pushup-handles', 'low-crunch',
  'plank', 'side-plank', 'bicycle-crunch', 'leg-raises', 'flutter-kicks',
  'russian-twist', 'mountain-climbers', 'power-walk',
];

test('all required moves exist with name + how text', () => {
  for (const ref of REQUIRED) {
    expect(EXERCISES[ref]).toBeDefined();
    expect(EXERCISES[ref].name.length).toBeGreaterThan(0);
    expect(EXERCISES[ref].how.length).toBeGreaterThan(10);
  }
});

test('getMove returns undefined for unknown ref', () => {
  expect(getMove('nope')).toBeUndefined();
  expect(getMove(undefined)).toBeUndefined();
  expect(getMove('plank')?.name).toBe('Plank');
});
