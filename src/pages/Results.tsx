import { Box } from '@material-ui/core';
import { JSONSchema7 } from 'json-schema';
import isArray from 'lodash/isArray';
import React, { useContext } from 'react';

import { FrameworkRankingCard } from '../components/rankings';
import { getFrameworkIds, similarityFunctions } from '../config';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import { CriteriaCategories, CriterionCategoryId, CriterionId } from '../types';
import {
  getCriteriaSchema,
  getFrameworkCriteriaData,
  getFrameworkData,
  getFrameworkRankings,
} from '../utils';

const frameworks = getFrameworkIds();
const frameworkData = getFrameworkData();
const frameworkCriteriaData = getFrameworkCriteriaData();
const criteriaSchema = getCriteriaSchema();

export function Results() {
  const { formData, isSubmitted, weights } = useContext(CriteriaFormContext);

  if (!isSubmitted) {
    return <PageLayout>Form not submitted</PageLayout>;
  }

  const rankings = getFrameworkRankings(
    formData,
    frameworkCriteriaData,
    weights,
    similarityFunctions,
  );

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
              {rankings.map(({ framework }) => (
                <th key={framework}>{frameworkData[framework].name}</th>
              ))}
            </tr>
            {(Object.keys(formData) as CriterionCategoryId[]).map(
              (category) => {
                const criteriaIds = Object.keys(
                  formData[category],
                ) as CriterionId<typeof category>[];

                return (
                  <React.Fragment key={category}>
                    <tr>
                      <td colSpan={5}>
                        <strong>{getCriteriaSchema()[category].title}</strong>
                      </td>
                    </tr>
                    {criteriaIds.map((criterionId) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const value: any =
                        formData[category][
                          criterionId as keyof CriteriaCategories[typeof category]
                        ];

                      const weight = weights[category][criterionId] ?? 0;

                      return (
                        <tr key={criterionId}>
                          <td>
                            {
                              (criteriaSchema[category].properties[
                                criterionId
                              ] as JSONSchema7).title
                            }
                          </td>
                          <td>{weight}</td>
                          <td>
                            {isArray(value)
                              ? value.join(', ')
                              : value.toString()}
                          </td>
                          {frameworks.map((framework) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const frameworkValue: any =
                              frameworkData[framework].criteria[category][
                                criterionId
                              ];

                            const criterionScore =
                              rankings.find(
                                (ranking) => ranking.framework === framework,
                              )?.criteria[category][criterionId] ?? 0;

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
