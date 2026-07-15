import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('starts on the person picker and enters a person', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /who's working out/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /ady/i }));
  // Task 16 wires the start-date gate in front of the person's views, so entering
  // a person with no saved start date now lands on the StartDatePicker rather than
  // a bare "Ady" heading.
  expect(screen.getByRole('heading', { name: /when did you start/i })).toBeInTheDocument();
  expect(localStorage.getItem('fw:v1:lastPerson')).toBe('ady');
});
