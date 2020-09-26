import { createContext } from 'react';

import { Weights } from '../../types/criteria';

export const CriteriaWeightsContext = createContext<{
  weights: Weights;
  setWeights: (weights: Weights) => void;
}>({
  weights: {},
  setWeights: () => {},
});
