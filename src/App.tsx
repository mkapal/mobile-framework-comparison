import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CriteriaFormContext } from './context';
import './global.css';
import { Form, Home, Results } from './pages';
import { theme } from './theme';
import {
  CriteriaFormData,
  Weights,
  WhichMobilePlatformsShouldBeSupported,
} from './types';
import { getInitialWeights, getRatedCriteriaInitialValues } from './utils';

function App() {
  const initialRatedValues = getRatedCriteriaInitialValues();

  const initialFormValues = {
    ...initialRatedValues,
    infrastructure: {
      ...initialRatedValues.infrastructure,
      platforms: ([] as unknown) as WhichMobilePlatformsShouldBeSupported,
      freeLicense: true,
    },
    development: {
      ...initialRatedValues.development,
    },
  };

  const [activeStep, setActiveStep] = useState<number>(0);
  const [weights, setWeights] = useState<Weights>(getInitialWeights());
  const [formData, setFormData] = useState<CriteriaFormData>(initialFormValues);
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
