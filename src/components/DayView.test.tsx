import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DayView } from './DayView';
import { day, t } from '../data/helpers';
import type { PersonProgress } from '../state/progress';

const d = day(1, 'Core + Walk', [t('Warm-up', 'other'), t('15 min walk', 'cardio', 'power-walk')]);

function setup(checkedIds: string[]) {
  const progress: PersonProgress = { startDateISO: '2026-07-14', checked: { 1: checkedIds } };
  const onToggleTask = vi.fn();
  render(<DayView day={d} progress={progress} onToggleTask={onToggleTask} phaseName="Foundation" />);
  return { onToggleTask };
}

test('shows all tasks and the ring count', () => {
  setup([]);
  expect(screen.getByText('Core + Walk')).toBeInTheDocument();
  expect(screen.getByText('0/2')).toBeInTheDocument();
  expect(screen.getAllByRole('checkbox')).toHaveLength(2);
});

test('toggling a task calls back with its id', async () => {
  const { onToggleTask } = setup([]);
  await userEvent.click(screen.getByRole('checkbox', { name: /warm-up/i }));
  expect(onToggleTask).toHaveBeenCalledWith('d1-t1');
});

test('shows completion banner when all done', () => {
  setup(['d1-t1', 'd1-t2']);
  expect(screen.getByTestId('day-complete')).toBeInTheDocument();
  expect(screen.getByText('2/2')).toBeInTheDocument();
});

test('empty (unplanned) day shows coming-soon state', () => {
  const empty = day(31, 'Coming soon', []);
  render(<DayView day={empty} progress={{ startDateISO: null, checked: {} }} onToggleTask={() => {}} />);
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});
