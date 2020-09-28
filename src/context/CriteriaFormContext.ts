import { createContext } from 'react';

import { CriteriaFormData, Weights } from '../types';

export const CriteriaFormContext = createContext<{
  activeStep: number;
  formData: CriteriaFormData;
  isSubmitted: boolean;
  weights: Partial<Weights>;
  setFormData: (formData: CriteriaFormData) => void;
  setActiveStep: (step: number) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Partial<Weights>) => void;
}>({
  activeStep: 0,
  formData: {} as CriteriaFormData,
  isSubmitted: false,
  weights: {},
  setActiveStep: () => {},
  setFormData: () => {},
  setIsSubmitted: () => {},
  setWeights: () => {},
});
