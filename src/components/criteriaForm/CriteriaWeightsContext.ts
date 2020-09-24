import React from 'react';

export type Weights = { [id: string]: number };

export const CriteriaWeightsContext = React.createContext<{
  weights: Weights;
  setWeights: (weights: Weights) => void;
}>({
  weights: {},
  setWeights: () => {},
});
