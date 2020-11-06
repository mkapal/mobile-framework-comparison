import { DEFAULT_MAX_RATING } from '../config';

export const jaccardSimilarity = (a: unknown[], b: unknown[]): number => {
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
};

export const booleanSimilarity = (
  criterionValue: boolean,
  frameworkValue: boolean,
): number => Math.abs(1 - Number(criterionValue) - Number(frameworkValue));

export const normalizedRating = (
  criterionValue: number,
  frameworkValue: number,
): number => frameworkValue / DEFAULT_MAX_RATING;
