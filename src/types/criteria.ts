export type CriteriaCategories = CriteriaCategoryData<unknown>;

export type CriterionData<T> = {
  [criterion: string]: T;
};

export type CriteriaCategoryData<T> = {
  [category: string]: CriterionData<T>;
};

export type FrameworkSimilarity = {
  framework: string;
  criteria: CriteriaCategoryData<number>;
  totalSimilarity: number;
};

export type FrameworkData = {
  [framework: string]: {
    name: string; // TODO: Use frameworks.ts types
    criteria: CriteriaCategories; // TODO: Use frameworks.ts types
  };
};

export type FrameworkCriteriaData = {
  [framework: string]: CriteriaCategories;
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
