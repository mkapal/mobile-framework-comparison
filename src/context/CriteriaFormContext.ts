import { createContext } from 'react';

import { CriteriaCategory, Weights } from '../types';

export const CriteriaFormContext = createContext<{
  activeStep: number;
  formData: CriteriaCategory;
  isSubmitted: boolean;
  weights: Partial<Weights>;
  setFormData: (formData: CriteriaCategory) => void;
  setActiveStep: (step: number) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Partial<Weights>) => void;
}>({
  activeStep: 0,
  formData: {} as CriteriaCategory,
  isSubmitted: false,
  weights: {},
  setActiveStep: () => {},
  setFormData: () => {},
  setIsSubmitted: () => {},
  setWeights: () => {},
});
