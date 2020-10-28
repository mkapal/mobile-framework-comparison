import { Grid } from '@material-ui/core';
import { FieldTemplateProps } from '@rjsf/core';
import React from 'react';

import { CriteriaCategories, CriterionCategoryId } from '../../types';

import { CriteriaWeightSlider } from './CriteriaWeightSlider';

export function FieldTemplate({
  children,
  errors,
  help,
  id,
}: FieldTemplateProps) {
  if (id === 'root') {
    return children;
  }

  const normalizedId = id.substring(5);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {children}
        {errors}
        {help}
      </Grid>
      <Grid item xs={6}>
        <CriteriaWeightSlider
          id={normalizedId as keyof CriteriaCategories[CriterionCategoryId]}
        />
      </Grid>
    </Grid>
  );
}
