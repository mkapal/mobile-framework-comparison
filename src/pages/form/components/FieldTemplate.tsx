import { Box } from '@material-ui/core';
import { FieldTemplateProps } from '@rjsf/core';
import React from 'react';

import { CriterionWeightSelect } from './CriterionWeightSelect';

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
    <Box mb={4}>
      {children}
      {errors}
      {help}
      <CriterionWeightSelect category={categoryId} criterion={criterionId} />
    </Box>
  );
}
