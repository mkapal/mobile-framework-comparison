import { Box, Button, Typography } from '@material-ui/core';
import { BubbleChart, List } from '@material-ui/icons';
import React, { useContext, useState } from 'react';

import { PageLayout } from '../components/layouts/PageLayout';
import { FrameworkRankings } from '../components/molecules';
import { CriteriaSimilarityTable } from '../components/organisms';
import { similarityFunctions } from '../config';
import { CriteriaFormContext } from '../context';
import {
  getCriteriaSchema,
  getDisplayStrings,
  getFrameworkCriteriaData,
  getFrameworkData,
  getFrameworkRankings,
} from '../utils';

export function Results() {
  const [showValues, setShowValues] = useState(false);
  const { formData, isSubmitted, weights } = useContext(CriteriaFormContext);
  const pageTitle = 'Framework rankings';

  if (!isSubmitted) {
    return <PageLayout title={pageTitle}>Form not submitted</PageLayout>;
  }

  const frameworkData = getFrameworkData();
  const frameworkCriteriaData = getFrameworkCriteriaData();
  const criteriaSchema = getCriteriaSchema();
  const displayStrings = getDisplayStrings(criteriaSchema, frameworkData);

  const rankings = getFrameworkRankings(
    formData,
    frameworkCriteriaData,
    weights,
    similarityFunctions,
  );

  return (
    <PageLayout
      title={pageTitle}
      description="Frameworks are ranked based on your filled in criteria and weights."
      backButton={{
        label: 'Show form',
        to: '/',
      }}
    >
      <Box mb={4}>
        <FrameworkRankings frameworkData={frameworkData} rankings={rankings} />
      </Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h2">Criteria comparison</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setShowValues(!showValues)}
          startIcon={showValues ? <BubbleChart /> : <List />}
        >
          {showValues ? 'Show similarities' : 'Show data'}
        </Button>
      </Box>
      <CriteriaSimilarityTable
        displayStrings={displayStrings}
        formData={formData}
        frameworkData={frameworkData}
        rankings={rankings}
        weights={weights}
        showValues={showValues}
      />
    </PageLayout>
  );
}
