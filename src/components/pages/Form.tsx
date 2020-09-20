import { Steps } from 'antd';
import { Formik } from 'formik';
import { Form as FormikAntdForm, SubmitButton } from 'formik-antd';
import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';

import { PageLayout } from '../PageLayout';
import { Box } from '../atoms';
import { StepOne, StepTwo } from '../criteria';
import { Question } from '../molecules';

const { Step } = Steps;

type Question<Value> = {
  value: Value;
  weight: 0 | 1 | 2 | 3 | 4 | 5;
};

export type FormValues = {
  os: Question<('ios' | 'android')[]>;
  lang: Question<('csharp' | 'js' | 'dotnet')[]>;
  questionTwo: Question<'one' | 'two' | 'three'>;
};

const initialValues: FormValues = {
  os: {
    value: [],
    weight: 0,
  },
  lang: {
    value: [],
    weight: 0,
  },
  questionTwo: {
    value: 'one',
    weight: 0,
  },
};

const steps: { title: string; component: ReactElement }[] = [
  {
    title: 'Step One',
    component: <StepOne />,
  },
  {
    title: 'Step Two',
    component: <StepTwo />,
  },
];

const validationSchema = Yup.object().shape({
  os: Yup.object().shape({
    value: Yup.array()
      .of(Yup.string().oneOf(['ios', 'android'], 'Select a valid platform.'))
      .required('Select an option.'),
    weight: Yup.number().required('Select a weight for this criterion.'),
  }),
  questionTwo: Yup.object().shape({
    value: Yup.string().required('Select an option.'),
    weight: Yup.number().required('Select a weight for this criterion.'),
  }),
});

export function Form() {
  const [step, setStep] = useState(0);

  return (
    <PageLayout>
      <Box mb={4}>
        <Steps current={step} onChange={setStep} size="small">
          {steps.map(({ title }) => (
            <Step key={title} title={title} />
          ))}
        </Steps>
      </Box>
      <Box mb={3}>
        <Formik<FormValues>
          initialValues={initialValues as FormValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          validationSchema={validationSchema}
        >
          <FormikAntdForm>
            <Box mb={3}>{steps[step].component}</Box>
            <Box>
              <SubmitButton>Submit</SubmitButton>
            </Box>
          </FormikAntdForm>
        </Formik>
      </Box>
    </PageLayout>
  );
}
