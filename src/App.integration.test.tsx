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

  // Pick Mummy, confirm start date, tick her first checkbox.
  await user.click(screen.getByRole('button', { name: /mummy/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));
  const mummyBoxes = screen.getAllByRole('checkbox');
  expect(mummyBoxes.length).toBeGreaterThan(0);
  await user.click(mummyBoxes[0]);
  expect(mummyBoxes[0]).toHaveAttribute('aria-checked', 'true');

  // Use the header person switcher (the "Mummy ▾" button, aria-label "Switch
  // person", which calls clearPerson) to go back to the picker.
  await user.click(screen.getByRole('button', { name: /switch person/i }));

  // Pick Grandma, confirm start date.
  await user.click(screen.getByRole('button', { name: /grandma/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));

  // Grandma is now fully authored -> a real Today workout, no "coming soon",
  // and none of her checkboxes are checked yet.
  expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  const grandmaBoxes = screen.getAllByRole('checkbox');
  expect(grandmaBoxes.length).toBeGreaterThan(0);
  expect(screen.queryByTestId('day-complete')).not.toBeInTheDocument();
  expect(grandmaBoxes[0]).toHaveAttribute('aria-checked', 'false');

  // Progress is stored under separate per-person localStorage keys, and only
  // Mummy's has a checked task.
  const mummyRaw = localStorage.getItem('fw:v1:progress:mummy');
  const grandmaRaw = localStorage.getItem('fw:v1:progress:grandma');
  expect(mummyRaw).not.toBeNull();
  expect(grandmaRaw).not.toBeNull();
  const mummyProgress = JSON.parse(mummyRaw!);
  const grandmaProgress = JSON.parse(grandmaRaw!);
  expect(Object.keys(mummyProgress.checked).length).toBeGreaterThan(0);
  expect(Object.keys(grandmaProgress.checked).length).toBe(0);
});

test("Mummy's plan is authored: picking Mummy shows a real workout with checkboxes", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /mummy/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));
  // Mummy is now authored -> a real Day 1 workout, not the "coming soon" stub
  expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
});
