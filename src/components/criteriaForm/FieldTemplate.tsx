import { Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { CriteriaWeightSlider } from './CriteriaWeightSlider';

type Props = {
  children: ReactNode;
  id: string;
};

export function FieldTemplate({ children, id }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={6}>
        <CriteriaWeightSlider id={id} />
      </Grid>
    </Grid>
  );
}
