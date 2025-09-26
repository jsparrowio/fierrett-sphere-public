import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fierrett Sphere landing page', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /Fierrett Sphere/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders landing page message', () => {
  render(<App />);
  const messageElement = screen.getByText(/Hi, you've reached the landing page for the Fierrett Sphere!/i);
  expect(messageElement).toBeInTheDocument();
});

test('renders access portal button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Access Portal/i);
  expect(buttonElement).toBeInTheDocument();
});
