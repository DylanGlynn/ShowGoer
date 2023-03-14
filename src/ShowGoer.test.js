import { render, screen } from '@testing-library/react';
import ShowGoer from './ShowGoer';

test('renders learn react link', () => {
  render(<ShowGoer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
