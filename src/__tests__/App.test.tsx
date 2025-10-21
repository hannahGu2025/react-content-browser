import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app and checks for essential components', () => {
  render(<App />);
  
  const homeElement = screen.getByText(/home/i);
  expect(homeElement).toBeInTheDocument();

  const searchBarElement = screen.getByPlaceholderText(/search/i);
  expect(searchBarElement).toBeInTheDocument();

  const filterButtonElement = screen.getByRole('button', { name: /filter/i });
  expect(filterButtonElement).toBeInTheDocument();
});