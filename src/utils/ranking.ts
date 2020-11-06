import {
  CriteriaCategories,
  CriterionCategoryId,
  FrameworkCriteriaData,
  FrameworkSimilarity,
  SimilarityFunctions,
  Weights,
} from '../types';

import { getCriteriaIds, getTotalWeights } from './criteria';

type SimilarityFunction = (
  criterionValue: unknown,
  frameworkValue: unknown,
) => number;

export const getFrameworkRankings = (
  formData: CriteriaCategories,
  frameworkData: FrameworkCriteriaData,
  criteriaWeights: Weights,
  similarityFunctions: SimilarityFunctions,
): FrameworkSimilarity[] => {
  const totalWeights = getTotalWeights(criteriaWeights);

  return Object.keys(frameworkData)
    .map((framework) => {
      const criteriaCategories = Object.keys(formData) as CriterionCategoryId[];

      return criteriaCategories.reduce((categorySimilarities, category) => {
        const criteriaIds = getCriteriaIds(formData, category);

        const categorySimilarity = criteriaIds.reduce(
          (criteriaSimilarities, criterion) => {
            const similarityFunction: SimilarityFunction =
              similarityFunctions[category][criterion];
            const criterionWeight = criteriaWeights[category][criterion];

            const criterionSimilarity =
              similarityFunction(
                formData[category][criterion],
                frameworkData[framework][category][criterion],
              ) * criterionWeight;

            return {
              ...criteriaSimilarities,
              [criterion]: criterionSimilarity,
            };
          },
          {},
        );

        return {
          framework,
          criteria: {
            ...categorySimilarities.criteria,
            [category]: categorySimilarity,
          },
          totalSimilarity:
            (categorySimilarities.totalSimilarity ?? 0) +
            Object.values<number>(categorySimilarity).reduce(
              (acc, value) => acc + value,
              0,
            ),
        };
      }, {} as FrameworkSimilarity);
    })
    .map((ranking) => ({
      ...ranking,
      totalSimilarity:
        totalWeights === 0 ? 0 : ranking.totalSimilarity / totalWeights,
    }))
    .sort(
      (frameworkA, frameworkB) =>
        frameworkB.totalSimilarity - frameworkA.totalSimilarity,
    );
};
