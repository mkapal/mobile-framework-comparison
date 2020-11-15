import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import { CriteriaFormContext } from './context';
import './global.css';
import { Form, Results } from './pages';
import { theme } from './theme';
import { CriteriaCategories, Weights } from './types';
import { getInitialWeights, getRatedCriteriaInitialValues } from './utils';

const initialValues = getRatedCriteriaInitialValues();
const initialWeights = getInitialWeights(1);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [formData, setFormData] = useState<CriteriaCategories>(initialValues);
  const [weights, setWeights] = useState<Weights>(initialWeights);
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
        {isSubmitted ? <Results /> : <Form />}
      </CriteriaFormContext.Provider>
    </ThemeProvider>
  );
}

export default App;
