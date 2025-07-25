import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

test('renders Navbar with app name', () => {
  render(<Navbar />);
  expect(screen.getByText(/Kenya Civic Hub/i)).toBeInTheDocument();
}); 