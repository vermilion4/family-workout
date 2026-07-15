import { render, screen } from '@testing-library/react';
import { TodayView } from './TodayView';
import { getPerson } from '../data/people';

const plan = getPerson('ady')!.plan;

test('shows today\'s workout when within range', () => {
  render(
    <TodayView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: {} }}
      todayISO="2026-07-14"
      onToggleTask={() => {}}
      onOpenCalendar={() => {}}
    />,
  );
  expect(screen.getByText('Core + Walk')).toBeInTheDocument(); // day 1 title
  // Hero now shows the full "Day N of 90" total (spec §6.3).
  expect(screen.getByText(/day 1 of 90 · foundation/i)).toBeInTheDocument();
});

test('before start shows upcoming message', () => {
  render(
    <TodayView
      plan={plan}
      progress={{ startDateISO: '2026-07-20', checked: {} }}
      todayISO="2026-07-14"
      onToggleTask={() => {}}
      onOpenCalendar={() => {}}
    />,
  );
  expect(screen.getByText(/plan starts/i)).toBeInTheDocument();
});

test('after day 90 shows finished message', () => {
  render(
    <TodayView
      plan={plan}
      progress={{ startDateISO: '2026-01-01', checked: {} }}
      todayISO="2026-12-31"
      onToggleTask={() => {}}
      onOpenCalendar={() => {}}
    />,
  );
  expect(screen.getByText(/plan complete/i)).toBeInTheDocument();
});
