import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartDatePicker } from './StartDatePicker';

test('confirms the chosen start date', async () => {
  const onConfirm = vi.fn();
  render(<StartDatePicker defaultISO="2026-07-14" onConfirm={onConfirm} />);
  const input = screen.getByLabelText(/start date/i) as HTMLInputElement;
  expect(input.value).toBe('2026-07-14');
  await userEvent.clear(input);
  await userEvent.type(input, '2026-07-20');
  await userEvent.click(screen.getByRole('button', { name: /start my plan/i }));
  expect(onConfirm).toHaveBeenCalledWith('2026-07-20');
});
