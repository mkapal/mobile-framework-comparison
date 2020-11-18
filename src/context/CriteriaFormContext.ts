import { createContext, Dispatch, SetStateAction } from 'react';

import { CriteriaData, Weights } from '../types';
import { getInitialWeights } from '../utils';

export const CriteriaFormContext = createContext<{
  formData: CriteriaData;
  isSubmitted: boolean;
  weights: Weights;
  setFormData: Dispatch<SetStateAction<CriteriaData>>;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Weights) => void;
}>({
  formData: {} as CriteriaData,
  isSubmitted: false,
  weights: getInitialWeights(1),
  setFormData: () => {},
  setIsSubmitted: () => {},
  setWeights: () => {},
});
