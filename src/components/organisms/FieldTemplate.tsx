import { Grid } from '@material-ui/core';
import { FieldTemplateProps } from '@rjsf/core';
import React from 'react';

import { CriterionWeightSlider } from '../atoms/CriterionWeightSlider';

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

  const [, categoryId, criterionId] = idParts;

  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        {children}
        {errors}
        {help}
      </Grid>
      <Grid item xs={5}>
        <CriterionWeightSlider category={categoryId} criterion={criterionId} />
      </Grid>
    </Grid>
  );
}
