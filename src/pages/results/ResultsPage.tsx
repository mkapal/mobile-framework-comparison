import { Box, Button, Typography } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import React, { useContext } from 'react';

import { similarityFunctions } from '../../config';
import { CriteriaFormContext } from '../../context';
import {
  getCriteriaSchema,
  getDisplayStrings,
  getFrameworkCriteriaData,
  getFrameworkData,
  getFrameworkRankings,
} from '../../utils';
import { PageLayout } from '../PageLayout';

import { CriteriaSimilarityTable } from './components/CriteriaSimilarityTable';
import { FrameworkRankings } from './components/FrameworkRankings';

export function ResultsPage() {
  const { formData, isSubmitted, setIsSubmitted, weights } = useContext(
    CriteriaFormContext,
  );
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
      header={
        <Button
          color="primary"
          startIcon={<ArrowBackIos />}
          onClick={() => setIsSubmitted(false)}
        >
          Show form
        </Button>
      }
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
      </Box>
      <CriteriaSimilarityTable
        displayStrings={displayStrings}
        formData={formData}
        frameworkData={frameworkData}
        rankings={rankings}
        weights={weights}
      />
    </PageLayout>
  );
}
