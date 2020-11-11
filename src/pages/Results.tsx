import { Box } from '@material-ui/core';
import React, { useContext } from 'react';

import { FrameworkRankings } from '../components/molecules';
import { CriteriaSimilarityTable } from '../components/organisms';
import { similarityFunctions } from '../config';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import {
  getCriteriaSchema,
  getDisplayStrings,
  getFrameworkCriteriaData,
  getFrameworkData,
  getFrameworkRankings,
} from '../utils';

export function Results() {
  const { formData, isSubmitted, weights } = useContext(CriteriaFormContext);

  if (!isSubmitted) {
    return <PageLayout>Form not submitted</PageLayout>;
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
    <PageLayout>
      <Box mb={4}>
        <Box mb={2}>
          <FrameworkRankings
            frameworkData={frameworkData}
            rankings={rankings}
          />
        </Box>
        <CriteriaSimilarityTable
          displayStrings={displayStrings}
          formData={formData}
          frameworkData={frameworkData}
          rankings={rankings}
          weights={weights}
        />
      </Box>
    </PageLayout>
  );
}
