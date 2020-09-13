import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../atoms';

export function Home() {
  return (
    <div>
      <Link to="/questions">Go to questions</Link>
      <Button>Hello world</Button>
    </div>
  );
}
