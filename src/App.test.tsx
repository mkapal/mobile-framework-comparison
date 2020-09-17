import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders copyright text', () => {
  const { getByText } = render(<App />);
  const copyrightElement = getByText(/Created by Martin Kapal/i);
  expect(copyrightElement).toBeInTheDocument();
});
