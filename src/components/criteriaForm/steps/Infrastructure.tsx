import { utils } from '@rjsf/core';
import React from 'react';

import { StepFormProps } from '../../../types';
import { StepForm } from '../StepForm';
import { ArraySchemaField, BooleanField } from '../fields';

export function Infrastructure({
  formValues,
  nextStep,
  schema,
  setFormValues,
}: StepFormProps) {
  console.log(utils.resolveSchema(schema));

  return (
    <StepForm
      formValues={formValues}
      nextStep={nextStep}
      setFormValues={setFormValues}
    >
      <BooleanField id="freeLicense" label="License type" />
    </StepForm>
  );
}
