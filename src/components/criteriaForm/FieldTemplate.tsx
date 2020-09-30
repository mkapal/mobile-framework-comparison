import { Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { CriteriaWeightSlider } from './CriteriaWeightSlider';

export function FieldTemplate({ children, help, id }: FieldTemplateProps) {
  if (id === 'root') {
    return children;
  }

  const normalizedId = id.replace('root_', '') as keyof CriteriaFormData;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {children}
        {help}
      </Grid>
      <Grid item xs={6} />
    </Grid>
  );
}
