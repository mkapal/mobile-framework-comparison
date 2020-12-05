export type CriteriaData = CriteriaCategoryData<unknown>;

export type CriteriaCategoryData<T> = {
  [category: string]: CriterionData<T>;
};

export type CriterionData<T> = {
  [criterion: string]: T;
};

export type DisplayStringMap = {
  [p: string]: string;
};

export type FrameworkSimilarity = {
  framework: string;
  criteria: CriteriaCategoryData<number>;
  totalSimilarity: number;
};

export type FrameworkData = {
  [framework: string]: {
    name: string;
    url: string;
    description: string;
    criteria: CriteriaData;
  };
};

export type FrameworkCriteriaData = {
  [framework: string]: CriteriaData;
};

export type RatedCriterionData = CriterionData<number | boolean>;

export type RatedCriteriaCategoryData = CriteriaCategoryData<number | boolean>;

export type SimilarityFunction<T> = (
  criterionValue: T,
  frameworkValue: T,
) => number;

export type SimilarityFunctions = {
  [category: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [criterion: string]: SimilarityFunction<any>;
  };
};

export type Weights = CriteriaCategoryData<number>;
