import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { CriteriaFormContext } from './context';
import './global.css';
import { FormPage, ResultsPage } from './pages';
import { theme } from './theme';
import { CriteriaData, Weights } from './types';
import { getInitialWeights, getRatedCriteriaInitialValues } from './utils';

const initialValues = getRatedCriteriaInitialValues();
const initialWeights = getInitialWeights(1);

function App() {
  const [formData, setFormData] = useState<CriteriaData>(initialValues);
  const [weights, setWeights] = useState<Weights>(initialWeights);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSubmitted]);

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
        {isSubmitted ? <ResultsPage /> : <FormPage />}
      </CriteriaFormContext.Provider>
    </ThemeProvider>
  );
}

export default App;
