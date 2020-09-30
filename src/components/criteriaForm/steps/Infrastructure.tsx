import React from 'react';
import * as Yup from 'yup';

import { ArrayFormField } from '../ArrayFormField';
import { StepForm } from '../StepForm';

export const validationSchema = Yup.object({
  platforms: Yup.array(Yup.string().oneOf(['android', 'ios'])).required(),
});

type Props = {
  nextStep: () => void;
  formValues: any;
  setFormValues: (values: any) => void;
};

export function Infrastructure({ formValues, nextStep, setFormValues }: Props) {
  return (
    <StepForm
      formValues={formValues}
      validationSchema={validationSchema}
      nextStep={nextStep}
      setFormValues={setFormValues}
    >
      <ArrayFormField
        id="platforms"
        label="Which mobile platforms should be supported?"
        options={{
          android: 'Android',
          ios: 'iOS',
        }}
      />
    </StepForm>
  );
}
