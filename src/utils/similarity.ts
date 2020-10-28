import { CriteriaCategories, CriterionCategoryId } from '../types';

import { DEFAULT_MAX_RATING } from './consts';

export const criteriaSimilarityFunctions: {
  [category in CriterionCategoryId]: {
    [criterion in keyof CriteriaCategories[category]]: (
      criterionValue: CriteriaCategories[category][criterion],
      frameworkValue: CriteriaCategories[category][criterion],
    ) => number;
  };
} = {
  infrastructure: {
    platforms: jaccardSimilarity,
    freeLicense: (criterionValue: boolean, frameworkValue: boolean): number =>
      Math.abs(1 - Number(criterionValue) - Number(frameworkValue)),
  },
  development: {
    performance: normalizedRating,
  },
};

export function normalizedRating(
  criterionValue: number,
  frameworkValue: number,
): number {
  return frameworkValue / DEFAULT_MAX_RATING;
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
