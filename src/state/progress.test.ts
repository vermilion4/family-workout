import {
  loadProgress, saveProgress, setStartDate, toggleTask,
  isTaskChecked, isDayDone, getLastPerson, setLastPerson,
} from './progress';
import { day, t } from '../data/helpers';

test('saveProgress round-trips a full progress object', () => {
  saveProgress('ady', { startDateISO: '2026-07-14', checked: { 1: ['d1-t1'] } });
  const p = loadProgress('ady');
  expect(p.startDateISO).toBe('2026-07-14');
  expect(p.checked[1]).toEqual(['d1-t1']);
});

test('load defaults when nothing stored', () => {
  const p = loadProgress('ady');
  expect(p.startDateISO).toBeNull();
  expect(p.checked).toEqual({});
});

test('corrupt storage falls back to defaults', () => {
  localStorage.setItem('fw:v1:progress:ady', '{not json');
  expect(loadProgress('ady').startDateISO).toBeNull();
});

test('setStartDate persists and reloads', () => {
  setStartDate('ady', '2026-07-14');
  expect(loadProgress('ady').startDateISO).toBe('2026-07-14');
});

test('toggleTask adds then removes a task id', () => {
  toggleTask('ady', 1, 'd1-t1');
  expect(isTaskChecked(loadProgress('ady'), 1, 'd1-t1')).toBe(true);
  toggleTask('ady', 1, 'd1-t1');
  expect(isTaskChecked(loadProgress('ady'), 1, 'd1-t1')).toBe(false);
});

test('isDayDone true only when all tasks checked', () => {
  const d = day(1, 'X', [t('a'), t('b')]);
  toggleTask('ady', 1, 'd1-t1');
  expect(isDayDone(loadProgress('ady'), d)).toBe(false);
  toggleTask('ady', 1, 'd1-t2');
  expect(isDayDone(loadProgress('ady'), d)).toBe(true);
});

test('empty-task day is never done', () => {
  const d = day(1, 'Coming soon', []);
  expect(isDayDone(loadProgress('ady'), d)).toBe(false);
});

test('progress is isolated per person', () => {
  toggleTask('ady', 1, 'd1-t1');
  expect(isTaskChecked(loadProgress('mummy'), 1, 'd1-t1')).toBe(false);
});

test('last person round-trips', () => {
  expect(getLastPerson()).toBeNull();
  setLastPerson('grandma');
  expect(getLastPerson()).toBe('grandma');
});
