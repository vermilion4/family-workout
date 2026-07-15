import { addDays, diffDays, dateForDay, dayForDate, dayStatus } from './dates';

test('addDays and diffDays are inverses across month boundaries', () => {
  expect(addDays('2026-01-30', 3)).toBe('2026-02-02');
  expect(diffDays('2026-01-30', '2026-02-02')).toBe(3);
  expect(diffDays('2026-02-02', '2026-01-30')).toBe(-3);
});

test('dateForDay pins day 1 to start', () => {
  expect(dateForDay('2026-07-14', 1)).toBe('2026-07-14');
  expect(dateForDay('2026-07-14', 8)).toBe('2026-07-21');
});

test('dayForDate is the inverse within range', () => {
  expect(dayForDate('2026-07-14', '2026-07-14', 90)).toBe(1);
  expect(dayForDate('2026-07-14', '2026-07-21', 90)).toBe(8);
  expect(dayForDate('2026-07-14', '2026-07-13', 90)).toBeNull(); // before start
  expect(dayForDate('2026-07-14', '2027-01-01', 90)).toBeNull(); // past day 90
});

test('dayStatus classifies done/today/missed/upcoming', () => {
  const base = { startISO: '2026-07-14', totalDays: 90 };
  expect(dayStatus({ ...base, n: 5, todayISO: '2026-07-20', isDone: true })).toBe('done');
  // day 7 date = 2026-07-20 => today
  expect(dayStatus({ ...base, n: 7, todayISO: '2026-07-20', isDone: false })).toBe('today');
  // day 3 date = 2026-07-16, today later, not done => missed
  expect(dayStatus({ ...base, n: 3, todayISO: '2026-07-20', isDone: false })).toBe('missed');
  // day 10 date = 2026-07-23, today earlier => upcoming
  expect(dayStatus({ ...base, n: 10, todayISO: '2026-07-20', isDone: false })).toBe('upcoming');
});
