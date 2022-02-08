import { render, screen } from '@testing-library/react';
import App from "./App";

test('Header and Content renders correctly', () => {
  render(<App />);
  const headerEl = screen.getByText()
  expect(headerEl).toBeInTheDocument();

});
