import { Box } from '@material-ui/core';
import isArray from 'lodash/isArray';
import React, { useContext } from 'react';

import { FrameworkRankingCard } from '../components/rankings';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import { CriteriaCategories, Weights } from '../types';
import {
  getFrameworkData,
  getFrameworkIds,
  getFrameworkRankings,
} from '../utils';

const frameworks = getFrameworkIds();
const frameworkData = getFrameworkData();

export function Results() {
  const { formData, isSubmitted, weights } = useContext(CriteriaFormContext);

  // const formData: CriteriaFormData = {
  //   infrastructure: {
  //     freeLicense: true,
  //     platforms: ['ios', 'android'],
  //   },
  //   development: {
  //     performance: 1,
  //   },
  // };
  //
  // const isSubmitted = true;
  // const weights: Weights = {
  //   infrastructure: {
  //     platforms: 5,
  //     freeLicense: 5,
  //   },
  //   development: {
  //     performance: 5,
  //   },
  // };

  const rankings = getFrameworkRankings(formData, weights as Weights);

  if (!isSubmitted) {
    return <PageLayout>Form not submitted</PageLayout>;
  }

  return (
    <PageLayout>
      <Box mb={4}>
        <Box mb={2}>
          {rankings.map(({ framework, totalSimilarity }) => (
            <Box mb={2} key={framework}>
              <FrameworkRankingCard
                name={frameworkData[framework].name}
                score={totalSimilarity}
              />
            </Box>
          ))}
        </Box>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th>Criterion</th>
              <th>Weight</th>
              <th>Submitted value</th>
              {frameworks.map((framework) => (
                <th key={framework}>{framework}</th>
              ))}
            </tr>
            {(Object.keys(formData) as (keyof CriteriaCategories)[]).map(
              (criterionCategory) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const criteriaIds: any[] = Object.keys(
                  formData[criterionCategory],
                );

                return (
                  <React.Fragment key={criterionCategory}>
                    <tr>
                      <td colSpan={5}>
                        <strong>{criterionCategory}</strong>
                      </td>
                    </tr>
                    {criteriaIds.map((criterionId) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const value: any =
                        formData[criterionCategory][
                          criterionId as keyof CriteriaCategories[typeof criterionCategory]
                        ];

                      const weight =
                        // @ts-ignore
                        weights[criterionCategory]?.[criterionId] ?? 0;

                      return (
                        <tr key={criterionId}>
                          <td>{criterionId}</td>
                          <td>{weight}</td>
                          <td>{isArray(value) ? value.join(', ') : value}</td>
                          {frameworks.map((framework) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const frameworkValue: any =
                              frameworkData[framework].criteria[
                                criterionCategory
                              ][
                                criterionId as keyof CriteriaCategories[typeof criterionCategory]
                              ];

                            const criterionScore =
                              // @ts-ignore
                              rankings.find(
                                (ranking) => ranking.framework === framework,
                              )?.criteria[criterionCategory][
                                criterionId as keyof CriteriaCategories
                              ] ?? 0;

                            return (
                              <td key={framework}>
                                ({criterionScore.toFixed(2)}){' '}
                                {isArray(frameworkValue)
                                  ? frameworkValue.join(', ')
                                  : frameworkValue}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              },
            )}
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              {rankings.map(({ framework, totalSimilarity }) => (
                <td key={framework}>{totalSimilarity.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Box>
    </PageLayout>
  );
}
