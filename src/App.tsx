import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './global.css';
import { Home, Questions } from './components/pages';
import './icons';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/questions">
          <Questions />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
