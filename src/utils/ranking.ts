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

      return criteriaCategories.reduce(
        ({ criteria, totalSimilarity }, category) => {
          const criteriaIds = Object.keys(formData[category]);

          const categorySimilarity: CategorySimilarity = criteriaIds.reduce(
            (criteriaSimilarities, criterion) => {
              const similarityFunction =
                similarityFunctions[category][criterion];
              const criterionWeight = criteriaWeights[category][criterion];
              const userValue = formData[category][criterion];
              const frameworkValue =
                frameworkData[framework][category][criterion];

              const criterionSimilarity =
                similarityFunction(userValue, frameworkValue) * criterionWeight;

              return {
                ...criteriaSimilarities,
                [criterion]: criterionSimilarity,
              };
            },
            {} as CategorySimilarity,
          );

          const newTotalSimilarity =
            (totalSimilarity ?? 0) +
            Object.values(categorySimilarity).reduce(
              (total, value) => total + value,
              0,
            );

          return {
            framework,
            criteria: {
              ...criteria,
              [category]: categorySimilarity,
            },
            totalSimilarity: newTotalSimilarity,
          };
        },
        {} as FrameworkSimilarity,
      );
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
