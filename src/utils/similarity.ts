import { DEFAULT_MAX_RATING } from '../config';
import { PricingPolicy, SimilarityFunction } from '../types';

export const jaccardSimilarity: SimilarityFunction<unknown[]> = (
  criterionValues: unknown[],
  frameworkValues: unknown[],
): number => {
  if (criterionValues.length === 0 && frameworkValues.length === 0) {
    return 1;
  }

  const supportedValues = criterionValues.filter((value) =>
    frameworkValues.includes(value),
  );
  const unsupportedValues = criterionValues.filter(
    (value) => !frameworkValues.includes(value),
  );

  if (supportedValues.length + unsupportedValues.length === 0) {
    return 0;
  }

  return (
    supportedValues.length / (supportedValues.length + unsupportedValues.length)
  );
};

export const booleanSimilarity: SimilarityFunction<boolean> = (
  criterionValue: boolean,
  frameworkValue: boolean,
): number => Number(frameworkValue);

export const booleanConverseSimilarity: SimilarityFunction<boolean> = (
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

export const pricingSimilarity: SimilarityFunction<PricingPolicy> = (
  criterionValue: PricingPolicy,
  frameworkValue: PricingPolicy,
): number => {
  const similarities: {
    [s in PricingPolicy]: number;
  } = {
    free: 1,
    paid: 0,
    'free-paid': 0.5,
  };

  return (
    1 - Math.abs(similarities[criterionValue] - similarities[frameworkValue])
  );
};
