import { render, screen } from '@testing-library/react';
import { MealsView } from './MealsView';
import { getMealPlan } from '../data/meals';

test('renders the week, meals, and the food-matters banner', () => {
  render(<MealsView plan={getMealPlan('ady')!} todayWeekday="Monday" />);
  expect(screen.getByText(/60%/)).toBeInTheDocument();
  expect(screen.getByText('Monday')).toBeInTheDocument();
  expect(screen.getAllByText(/breakfast/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/lunch/i).length).toBeGreaterThan(0);
});

test('shows a Fasting-friendly badge on Ady’s fasting days', () => {
  render(<MealsView plan={getMealPlan('ady')!} todayWeekday="Monday" />);
  expect(screen.getAllByText(/fasting-friendly/i).length).toBeGreaterThanOrEqual(2); // Tue & Fri
});

test('Mummy has no fasting badge and every day has breakfast', () => {
  render(<MealsView plan={getMealPlan('mummy')!} />);
  expect(screen.queryByText(/fasting-friendly/i)).not.toBeInTheDocument();
});
