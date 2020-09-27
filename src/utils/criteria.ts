import schema from '../schemas/frameworks.json';
import { CriteriaFormData } from '../types';

import { getFrameworkIds } from './ranking';

export const ratedCriteria: (keyof CriteriaFormData)[] = ['performance'];

export const criteriaIds = Object.keys(schema.properties.criteria.properties);

export const criteriaSimilarityFunctions: {
  [k in keyof CriteriaFormData]: (
    criterionValue: CriteriaFormData[k],
    frameworkValue: CriteriaFormData[k],
  ) => number;
} = {
  distribution: jaccardSimilarity,
  test: jaccardSimilarity,
  performance: (_, frameworkValue) =>
    normalizeRatedCriterion(frameworkValue, 3),
  platforms: jaccardSimilarity,
};

export function normalizeRatedCriterion(value: number, max: number): number {
  return value / max;
}

export function jaccardSimilarity(a: unknown[], b: unknown[]): number {
  if (a.length === 0 && b.length === 0) {
    return 1;
  }

  const intersection = a.filter((item) => b.includes(item));
  const bNotInA = b.filter((item) => !a.includes(item));

  const symmetricDifference = intersection.length + bNotInA.length;

  if (symmetricDifference === 0) {
    return 0;
  }

  return intersection.length / symmetricDifference;
}

export const frameworkData: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
} = getFrameworkIds().reduce(
  (acc, frameworkId) => ({
    ...acc,
    [frameworkId]: require(`../data/${frameworkId}.json`),
  }),
  {},
);

export const frameworkCriteriaData: {
  [k: string]: CriteriaFormData;
} = getFrameworkIds().reduce(
  (acc, frameworkId) => ({
    ...acc,
    [frameworkId]: criteriaIds.reduce(
      (acc, criterionId) => ({
        ...acc,
        // @ts-ignore
        ...frameworkData[frameworkId].criteria[criterionId],
      }),
      {} as CriteriaFormData,
    ),
  }),
  {},
);
