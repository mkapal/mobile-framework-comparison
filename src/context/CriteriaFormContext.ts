import { createContext, Dispatch, SetStateAction } from 'react';

import { CriteriaCategories, Weights } from '../types';
import { getInitialWeights } from '../utils';

export const CriteriaFormContext = createContext<{
  activeStep: number;
  formData: CriteriaCategories;
  isSubmitted: boolean;
  weights: Weights;
  setFormData: Dispatch<SetStateAction<CriteriaCategories>>;
  setActiveStep: (step: number) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Weights) => void;
}>({
  activeStep: 0,
  formData: {} as CriteriaCategories,
  isSubmitted: false,
  weights: getInitialWeights(),
  setActiveStep: () => {},
  setFormData: () => {},
  setIsSubmitted: () => {},
  setWeights: () => {},
});
