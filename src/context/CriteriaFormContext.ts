import { createContext, Dispatch, SetStateAction } from 'react';

import { CriteriaCategories, Weights } from '../types';
import { getInitialWeights } from '../utils';

export const CriteriaFormContext = createContext<{
  formData: CriteriaCategories;
  isSubmitted: boolean;
  weights: Weights;
  setFormData: Dispatch<SetStateAction<CriteriaCategories>>;
  setIsSubmitted: (submitted: boolean) => void;
  setWeights: (weights: Weights) => void;
}>({
  formData: {} as CriteriaCategories,
  isSubmitted: false,
  weights: getInitialWeights(),
  setFormData: () => {},
  setIsSubmitted: () => {},
  setWeights: () => {},
});
