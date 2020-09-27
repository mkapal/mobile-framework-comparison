import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders copyright text', () => {
  const { getByText } = render(<App />);
  const copyrightElement = getByText(/Mobile Framework Recommendation System/i);
  expect(copyrightElement).toBeInTheDocument();
});
