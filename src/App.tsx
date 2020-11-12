import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CriteriaFormContext } from './context';
import './global.css';
import { Form, Results } from './pages';
import { theme } from './theme';
import { CriteriaCategories, Weights } from './types';
import { getInitialWeights, getRatedCriteriaInitialValues } from './utils';

const initialRatedValues = getRatedCriteriaInitialValues();
const initialWeights = getInitialWeights();

function App() {
  const [weights, setWeights] = useState<Weights>(initialWeights);
  const [formData, setFormData] = useState<CriteriaCategories>(
    initialRatedValues,
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CriteriaFormContext.Provider
        value={{
          formData,
          setFormData,
          weights,
          setWeights,
          isSubmitted,
          setIsSubmitted,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Form />
            </Route>
            <Route exact path="/results">
              <Results />
            </Route>
          </Switch>
        </Router>
      </CriteriaFormContext.Provider>
    </ThemeProvider>
  );
}

export default App;
