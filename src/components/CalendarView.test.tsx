import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarView } from './CalendarView';
import { getPerson } from '../data/people';

const plan = getPerson('ady')!.plan;

test('renders 90 day cells grouped by phase and reports summary', () => {
  render(
    <CalendarView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: { 1: ['d1-t1','d1-t2','d1-t3','d1-t4','d1-t5'] } }}
      todayISO="2026-07-15"
      onPickDay={() => {}}
    />,
  );
  // Phase headings
  expect(screen.getByText('Foundation')).toBeInTheDocument();
  expect(screen.getByText('Momentum')).toBeInTheDocument();
  expect(screen.getByText('Peak')).toBeInTheDocument();
  // Day 1 fully checked => a done cell exists
  expect(screen.getByRole('button', { name: /day 1,.*done/i })).toBeInTheDocument();
  // Summary shows 1 day done
  expect(screen.getByText(/1 day.* done/i)).toBeInTheDocument();
});

test('lays out real calendar months with real dates', () => {
  render(
    <CalendarView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: {} }}
      todayISO="2026-07-14"
      onPickDay={() => {}}
    />,
  );
  // Month labels carry the real year, so the plan reads as an actual calendar.
  expect(screen.getAllByText(/2026/).length).toBeGreaterThanOrEqual(2);
  // Day 1 (program day) sits on the real date July 14 -> shows day-of-month 14, not "1".
  expect(screen.getByRole('button', { name: /day 1,/i })).toHaveTextContent('14');
});

test('picking a day fires onPickDay', async () => {
  const onPickDay = vi.fn();
  render(
    <CalendarView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: {} }}
      todayISO="2026-07-14"
      onPickDay={onPickDay}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: /day 5,/i }));
  expect(onPickDay).toHaveBeenCalledWith(5);
});
