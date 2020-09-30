import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { ArrayFormField } from '../ArrayFormField';
import { StepForm } from '../StepForm';

const validationSchema = Yup.object({
  distribution: Yup.array(Yup.string().oneOf(['appStore', 'url'])).required(),
});

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  formValues: any;
  setFormValues: (values: any) => void;
};
export function Development({
  formValues,
  nextStep,
  prevStep,
  setFormValues,
}: Props) {
  return (
    <StepForm
      formValues={formValues}
      validationSchema={validationSchema}
      prevStep={prevStep}
      nextStep={nextStep}
      setFormValues={setFormValues}
    >
      <ArrayFormField
        id="distribution"
        label="Distribution"
        options={{
          appStore: 'App Store',
          url: 'URL',
        }}
      />
    </StepForm>
  );
}
