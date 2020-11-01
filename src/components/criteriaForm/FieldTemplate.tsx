import { Grid } from '@material-ui/core';
import { FieldTemplateProps } from '@rjsf/core';
import React from 'react';

import { CriteriaCategories, CriterionCategoryId } from '../../types';

import { CriteriaWeightSlider } from './CriteriaWeightSlider';

type FieldIdParts = [
  string,
  CriterionCategoryId,
  keyof CriteriaCategories[CriterionCategoryId],
];

export function FieldTemplate({
  children,
  errors,
  help,
  id,
}: FieldTemplateProps) {
  const idParts = id.split('_');

  if (idParts.length < 3) {
    return children;
  }

  const [, categoryId, criterionId] = idParts as FieldIdParts;

  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        {children}
        {errors}
        {help}
      </Grid>
      <Grid item xs={5}>
        <CriteriaWeightSlider
          categoryId={categoryId}
          criterionId={criterionId}
        />
      </Grid>
    </Grid>
  );
}
