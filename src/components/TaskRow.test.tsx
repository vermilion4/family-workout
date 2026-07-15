import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskRow } from './TaskRow';

const task = { id: 'd1-t2', label: '3×15s plank', kind: 'floor' as const, moveRef: 'plank' };

test('renders label + kind tag and toggles', async () => {
  const onToggle = vi.fn();
  render(<TaskRow task={task} checked={false} onToggle={onToggle} />);
  const box = screen.getByRole('checkbox', { name: /3×15s plank/i });
  expect(box).toHaveAttribute('aria-checked', 'false');
  await userEvent.click(box);
  expect(onToggle).toHaveBeenCalled();
});

test('opens exercise info when a move exists', async () => {
  render(<TaskRow task={task} checked={false} onToggle={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: /how to do plank/i }));
  expect(screen.getByText(/forearms & toes/i)).toBeInTheDocument();
});
