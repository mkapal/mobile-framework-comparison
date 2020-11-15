import { Box, Button, Typography } from '@material-ui/core';
import { ArrowBackIos, BubbleChart, List } from '@material-ui/icons';
import React, { useContext, useState } from 'react';

import { PageLayout } from '../components/layouts/PageLayout';
import {
  CriteriaSimilarityTable,
  FrameworkRankings,
} from '../components/organisms';
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
  const [showData, setShowData] = useState(true);
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
        <Button
          variant="outlined"
          size="small"
          onClick={() => setShowData(!showData)}
          startIcon={showData ? <BubbleChart /> : <List />}
        >
          {showData ? 'Show similarities' : 'Show data'}
        </Button>
      </Box>
      <CriteriaSimilarityTable
        displayStrings={displayStrings}
        formData={formData}
        frameworkData={frameworkData}
        rankings={rankings}
        weights={weights}
        showValues={showData}
      />
    </PageLayout>
  );
}
