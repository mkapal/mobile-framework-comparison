import React from 'react';

import { StepFormProps } from '../../../types';
import { StepForm } from '../StepForm';

export function Development({
  formValues,
  nextStep,
  prevStep,
  schema,
  setFormValues,
}: StepFormProps) {
  return (
    <StepForm
      formValues={formValues}
      prevStep={prevStep}
      nextStep={nextStep}
      setFormValues={setFormValues}
    >
      h
    </StepForm>
  );
}
