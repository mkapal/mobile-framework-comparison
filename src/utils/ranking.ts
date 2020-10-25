import { CriteriaCategory, FrameworkSimilarity, Weights } from '../types';

import { getFrameworkData } from './criteria';

import { getFrameworkIds } from './index';

export function getFrameworkRankings(
  formData: CriteriaCategory,
  criteriaWeights: Weights,
): FrameworkSimilarity[] {
  const frameworkRankings: FrameworkSimilarity[] = [];

  getFrameworkIds().forEach((framework) => {
    const criteriaCategories = Object.keys(
      formData,
    ) as (keyof CriteriaCategory)[];

    const frameworkSimilarity = criteriaCategories.reduce(
      (acc, criterionCategory) => {
        const criteriaIds = Object.keys(
          formData[criterionCategory],
        ) as (keyof CriteriaCategory[typeof criterionCategory])[];

        const categorySimilarity = criteriaIds.reduce((acc2, criterionId) => {
          // const similarityFunction =
          //   criteriaSimilarityFunctions[criterionCategory][criterionId];
          const criteriaWeight =
            criteriaWeights[criterionCategory]?.[criterionId] ?? 0;

          const frameworkData = getFrameworkData();

          const criterionSimilarity =
            // @ts-ignore
            similarityFunction(
              formData[criterionCategory][criterionId] as never,
              // @ts-ignore
              frameworkData[framework].criteria[criterionCategory][
                criterionId
              ] as never,
            ) * criteriaWeight;

          return {
            ...acc2,
            [criterionId]: criterionSimilarity,
          };
        }, {});

        return {
          framework,
          criteria: {
            ...acc.criteria,
            [criterionCategory]: categorySimilarity,
          },
          totalSimilarity:
            (acc.totalSimilarity ?? 0) +
            Object.values<number>(categorySimilarity).reduce(
              (acc, value) => acc + value,
              0,
            ),
        };
      },
      {} as FrameworkSimilarity,
    );

    frameworkRankings.push(frameworkSimilarity);
  });

  const totalWeights = Object.values(criteriaWeights).reduce(
    (acc, weight) => acc + Object.values(weight).reduce((acc2, w) => acc2 + w),
    0,
  );

  const rankingsWithPercentageWeights = frameworkRankings.map((ranking) => ({
    ...ranking,
    totalSimilarity: ranking.totalSimilarity / totalWeights,
  }));

  const sortedRankings = rankingsWithPercentageWeights.sort(
    (frameworkA, frameworkB) =>
      frameworkB.totalSimilarity - frameworkA.totalSimilarity,
  );

  return sortedRankings;
}
