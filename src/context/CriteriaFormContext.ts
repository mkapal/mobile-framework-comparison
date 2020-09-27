import { createContext } from 'react';

import { CriteriaFormData, Weights } from '../types/criteria';

export const CriteriaFormContext = createContext<{
  activeStep: number;
  formData: CriteriaFormData;
  isSubmitted: boolean;
  weights: Weights;
  setFormData: (formData: CriteriaFormData) => void;
  setActiveStep: (step: number) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Weights) => void;
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
