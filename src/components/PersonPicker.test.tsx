import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonPicker } from './PersonPicker';
import { PEOPLE } from '../data/people';

test('shows all three people and fires onPick', async () => {
  const onPick = vi.fn();
  render(<PersonPicker people={PEOPLE} onPick={onPick} />);
  expect(screen.getByRole('button', { name: /ady/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /mummy/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /grandma/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /grandma/i }));
  expect(onPick).toHaveBeenCalledWith('grandma');
});
