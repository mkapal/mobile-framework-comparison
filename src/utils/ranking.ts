import {
  CriteriaCategories,
  CriterionData,
  FrameworkCriteriaData,
  FrameworkSimilarity,
  SimilarityFunction,
  Weights,
} from '../types';

import { getTotalWeights } from './criteria';

type CategorySimilarity = CriterionData<number>;

// TODO: Infer formData key types in similarityFunctions
export const getFrameworkRankings = (
  formData: CriteriaCategories,
  frameworkData: FrameworkCriteriaData,
  criteriaWeights: Weights,
  similarityFunctions: {
    [category in keyof typeof formData]: {
      [criterion in keyof typeof formData[category]]: SimilarityFunction<
        typeof formData[category][criterion]
      >;
    };
  },
): FrameworkSimilarity[] => {
  const totalWeights = getTotalWeights(criteriaWeights);

  return Object.keys(frameworkData)
    .map((framework) => {
      const criteriaCategories = Object.keys(formData);

      return criteriaCategories.reduce((categorySimilarities, category) => {
        const criteriaIds = Object.keys(formData[category]);

        const categorySimilarity: CategorySimilarity = criteriaIds.reduce(
          (criteriaSimilarities, criterion) => {
            const similarityFunction = similarityFunctions[category][criterion];
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
          {} as CategorySimilarity,
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
