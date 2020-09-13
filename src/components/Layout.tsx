import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Questions } from './pages';

export function Layout() {
  return (
    <div>
      <h1>Mobile Framework Comparison</h1>
      <div>
        <Switch>
          <Route path="/questions">
            <Questions />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
