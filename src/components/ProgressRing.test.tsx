import { render, screen } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

test('announces progress accessibly', () => {
  render(<ProgressRing done={3} total={5} />);
  expect(screen.getByRole('img', { name: /3 of 5/i })).toBeInTheDocument();
  expect(screen.getByText('3/5')).toBeInTheDocument();
});
