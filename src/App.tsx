import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './global.css';
import { CriteriaFormContext } from './context';
import { Home, Form, Results } from './pages';
import { theme } from './theme';
import { CriteriaFormData, Frameworks, Weights } from './types';
import { getRatedCriteria } from './utils';

function App() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [weights, setWeights] = useState<Partial<Weights>>({});
  // TODO: Resolve with forced additionalProperties = false in JSON schema
  // const [formData, setFormData] = useState<CriteriaFormData>(
  //   {} as CriteriaFormData,
  // );
  const [formData, setFormData] = useState<CriteriaFormData>(({
    development: getRatedCriteria('development').reduce(
      (acc, criterionId) => ({
        ...acc,
        [criterionId]: 0,
      }),
      {},
    ),
  } as unknown) as CriteriaFormData);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CriteriaFormContext.Provider
        value={{
          activeStep,
          setActiveStep,
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
              <Home />
            </Route>
            <Route exact path="/questions">
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
