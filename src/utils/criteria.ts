import schema from '../schemas/frameworks.json';
import { CriteriaFormData } from '../types';

import { getFrameworkIds } from './ranking';

export const DEFAULT_MAX_RATING = 5;

export function getCriteriaCategories(): string[] {
  return Object.keys(schema.properties.criteria.properties);
}

export function getRatedCriteria(): string[] {
  return getCriteriaCategories().reduce((acc, categoryId) => {
    const categoryCriteria =
      // @ts-ignore
      schema.properties.criteria.properties[categoryId].properties;
    const hiddenCriteria = Object.keys(categoryCriteria).filter(
      (criterionId) => categoryCriteria[criterionId].readOnly,
    );

    return [...acc, ...hiddenCriteria];
  }, [] as string[]);
}

export const criteriaSimilarityFunctions: {
  [k in keyof CriteriaFormData]: (
    criterionValue: CriteriaFormData[k],
    frameworkValue: CriteriaFormData[k],
  ) => number;
} = {
  distribution: jaccardSimilarity,
  test: jaccardSimilarity,
  performance: normalizedRating,
  platforms: jaccardSimilarity,
};

export function normalizedRating(
  criterionValue: number,
  frameworkValue: number,
  max = DEFAULT_MAX_RATING,
): number {
  return frameworkValue / max;
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

export function getFrameworkData(): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
} {
  return getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );
}

export function getFrameworkCriteriaData(): {
  [k: string]: CriteriaFormData;
} {
  return getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: getCriteriaCategories().reduce(
        (acc, criterionId) => ({
          ...acc,
          ...getFrameworkData()[frameworkId].criteria[criterionId],
        }),
        {} as CriteriaFormData,
      ),
    }),
    {},
  );
}
