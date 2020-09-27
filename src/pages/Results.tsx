import { Box, Paper, Typography } from '@material-ui/core';
import isArray from 'lodash/isArray';
import React from 'react';

import { PageLayout } from '../layouts/PageLayout';
import schema from '../schemas/frameworks.json';
import { CriteriaFormData } from '../types';
import { Weights } from '../types/criteria';
import { getFrameworkIds, getFrameworkRankings } from '../utils/ranking';

export function Results() {
  // const { formData, isSubmitted, weights } = useContext(CriteriaFormContext);
  const formData: CriteriaFormData = {
    distribution: ['url'],
    performance: 1,
    test: ['app-store'],
    platforms: ['ios', 'android'],
  };

  const weights: Weights = {
    distribution: 1,
    performance: 2,
    test: 3,
    platforms: 1,
  };

  const frameworks = getFrameworkIds();
  const rankings = getFrameworkRankings(formData, weights);
  const criteriaCategories = Object.keys(schema.properties.criteria.properties);

  const frameworkData: {
    [k: string]: CriteriaFormData;
  } = frameworks.reduce(
    (acc, frameworkId) => {
      const rawData = require(`../data/${frameworkId}.json`);
      const data: CriteriaFormData = {
        ...criteriaCategories.reduce(
          (acc, stepId) => ({
            ...acc,
            ...rawData.criteria[stepId],
          }),
          {} as CriteriaFormData,
        ),
      };

      return {
        ...acc,
        [frameworkId]: data,
      };
    },
    {} as {
      [k in keyof typeof frameworks]: CriteriaFormData;
    },
  );
  const frameworkRawData: object = frameworks.reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );

  return (
    <PageLayout>
      <Box mb={4}>
        <Box mb={2}>
          {rankings.map(({ frameworkId, totalSimilarity }) => (
              <Box mb={2} key={frameworkId}>
                <Paper>
                  <Box p={4}>
                    <Typography variant="h5" component="h2">
                      {/*// @ts-ignore*/}
                      {frameworkRawData[frameworkId].name}
                    </Typography>
                    <Typography variant="body1">
                      Total score: {totalSimilarity.toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
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
                    frameworkData[framework][
                      criterionId as keyof CriteriaFormData
                    ];

                  const criterionScore =
                    rankings.find(
                      (ranking) => ranking.frameworkId === framework,
                    )?.criteria[criterionId as keyof CriteriaFormData] ?? 0;

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
              {Object.entries(rankings).map(([frameworkId, scores]) => (
                <td key={frameworkId}>{scores.totalSimilarity.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Box>
    </PageLayout>
  );
}
