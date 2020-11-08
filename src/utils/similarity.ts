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
): number => Number(frameworkValue);

export const booleanConverseSimilarity = (
  criterionValue: boolean,
  frameworkValue: boolean,
): number => Number(criterionValue || !frameworkValue);

export const normalizedRating = (
  criterionValue: number,
  frameworkValue: number,
  maxRating: number = DEFAULT_MAX_RATING,
): number => {
  if (maxRating === 0) {
    return 0;
  }

  return frameworkValue / maxRating;
};
