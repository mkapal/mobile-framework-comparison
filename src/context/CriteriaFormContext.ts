import { createContext, Dispatch, SetStateAction } from 'react';

import { CriteriaFormData, Weights } from '../types';
import { getInitialWeights } from '../utils';

export const CriteriaFormContext = createContext<{
  activeStep: number;
  formData: CriteriaFormData;
  isSubmitted: boolean;
  weights: Weights;
  setFormData: Dispatch<SetStateAction<CriteriaFormData>>;
  setActiveStep: (step: number) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Weights) => void;
}>({
  activeStep: 0,
  formData: {} as CriteriaFormData,
  isSubmitted: false,
  weights: getInitialWeights(),
  setActiveStep: () => {},
  setFormData: () => {},
  setIsSubmitted: () => {},
  setWeights: () => {},
});
