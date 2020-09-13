import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../atoms';

export function Home() {
  return (
    <div>
      <Link to="/questions">Go to questions</Link>
      <Button>Hello world</Button>
      <Button variant="secondary">Hello world</Button>
      <Button variant="success">Hello world</Button>
      <Button variant="danger">Hello world</Button>
    </div>
  );
}
