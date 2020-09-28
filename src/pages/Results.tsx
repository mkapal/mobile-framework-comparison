import { Box } from '@material-ui/core';
import isArray from 'lodash/isArray';
import React, { useContext } from 'react';

import { FrameworkRankingCard } from '../components/rankings';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import { CriteriaFormData, Weights } from '../types';
import {
  getFrameworkCriteriaData,
  getFrameworkData,
  getFrameworkIds,
  getFrameworkRankings,
} from '../utils';

const frameworks = getFrameworkIds();
const frameworkData = getFrameworkData();
const frameworkCriteriaData = getFrameworkCriteriaData();

export function Results() {
  const { formData, isSubmitted, weights } = useContext(CriteriaFormContext);
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
            {Object.entries(formData).map(([criterionId, value]) => (
              <tr key={criterionId}>
                <td>{criterionId}</td>
                <td>{weights[criterionId as keyof CriteriaFormData]}</td>
                <td>{isArray(value) ? value.join(', ') : value}</td>
                {frameworks.map((framework) => {
                  const frameworkValue =
                    frameworkCriteriaData[framework][
                      criterionId as keyof CriteriaFormData
                    ];

                  const criterionScore =
                    rankings.find((ranking) => ranking.framework === framework)
                      ?.criteria[criterionId as keyof CriteriaFormData] ?? 0;

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
            ))}
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
