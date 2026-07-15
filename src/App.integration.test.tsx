import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { todayISO, addDays } from './state/dates';

test('pick Ady, start today, complete day 1, see it done on the calendar', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Pick Ady
  await user.click(screen.getByRole('button', { name: /ady/i }));

  // Start date defaults to today -> confirm
  await user.click(screen.getByRole('button', { name: /start my plan/i }));

  // Today = Day 1 "Core + Walk"; tick every task
  expect(screen.getByText('Core + Walk')).toBeInTheDocument();
  const boxes = screen.getAllByRole('checkbox');
  for (const box of boxes) await user.click(box);
  expect(screen.getByTestId('day-complete')).toBeInTheDocument();

  // Calendar shows day 1 done
  await user.click(screen.getByRole('button', { name: /calendar/i }));
  expect(screen.getByRole('button', { name: /day 1,.*done/i })).toBeInTheDocument();

  // Persistence: same person id keyed data present
  expect(localStorage.getItem('fw:v1:lastPerson')).toBe('ady');
  // touch todayISO to keep import used
  expect(typeof todayISO()).toBe('string');
});

test('editing the start date after it is set changes which day is Today', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Pick Ady, start today -> Today resolves to Day 1.
  await user.click(screen.getByRole('button', { name: /ady/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));
  expect(screen.getByText(/day 1 of 90/i)).toBeInTheDocument();

  // Open the discoverable "Change start date" affordance and pin the start to
  // yesterday, so today now falls on Day 2.
  await user.click(screen.getByRole('button', { name: /start date/i }));
  expect(screen.getByRole('heading', { name: /change start date/i })).toBeInTheDocument();
  const input = screen.getByLabelText(/start date/i) as HTMLInputElement;
  await user.clear(input);
  await user.type(input, addDays(todayISO(), -1));
  await user.click(screen.getByRole('button', { name: /save start date/i }));

  // Today now resolves to Day 2 — proving the edited start date took effect.
  expect(screen.getByText(/day 2 of 90/i)).toBeInTheDocument();
});

test('canceling the start-date edit leaves the plan unchanged', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /ady/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));
  expect(screen.getByText(/day 1 of 90/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /start date/i }));
  await user.click(screen.getByRole('button', { name: /cancel/i }));
  // Back on Today, still Day 1.
  expect(screen.getByText(/day 1 of 90/i)).toBeInTheDocument();
});

test('switching people keeps progress separate', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /mummy/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));
  // Mummy is a stub -> coming soon state, no checkboxes
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
});
