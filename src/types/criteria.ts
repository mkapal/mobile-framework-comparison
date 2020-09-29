import { Frameworks } from './frameworks';

export type CriteriaFormData = Frameworks['criteria'];

export type CriterionId = keyof CriteriaFormData;

export type FrameworkSimilarity = {
  framework: string;
  criteria: {
    [id in CriterionId]: {
      [a in keyof CriteriaFormData[id]]: number;
    };
  };
  totalSimilarity: number;
};

export type Weights = {
  [id in CriterionId]: {
    [a in keyof CriteriaFormData[id]]: number;
  };
};
