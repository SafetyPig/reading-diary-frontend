import React from 'react';
import { render, screen } from '@testing-library/react';
import ReadingDiary from '../ReadingDiary';

test('renders learn react link', () => {
  render(<ReadingDiary />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
