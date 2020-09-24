import { Grid, Slider } from '@material-ui/core';
import { FieldTemplateProps } from '@rjsf/core';
import React, { useContext } from 'react';

import { CriteriaWeightsContext } from './CriteriaWeightsContext';

export function FieldTemplate({
  children,
  errors,
  help,
  id,
}: FieldTemplateProps) {
  const { setWeights, weights } = useContext(CriteriaWeightsContext);

  if (id === 'root') {
    return children;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {children}
        {errors}
        {help}
      </Grid>
      <Grid item xs={6}>
        <Slider
          value={weights[id] || 0}
          step={1}
          min={0}
          max={3}
          marks
          onChangeCommitted={(_, value) =>
            setWeights({
              ...weights,
              [id]: value as number,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
