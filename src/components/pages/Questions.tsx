import { Steps } from 'antd';
import { Formik } from 'formik';
import { Form, SubmitButton } from 'formik-antd';
import React, { ReactElement, useState } from 'react';

import { PageLayout } from '../PageLayout';
import { Box } from '../atoms';
import { StepOne, StepThree, StepTwo } from '../criteria';

const { Step } = Steps;

type Values = {
  os?: 'ios' | 'android';
  lang?: 'csharp' | 'js';
  langWeight: number;
  questionTwo?: number;
  three?: boolean;
};

const initialValues: Values = {
  langWeight: 3,
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
  {
    title: 'Step Three',
    component: <StepThree />,
  },
];

export function Questions() {
  const [step, setStep] = useState(0);

  return (
    <PageLayout>
      <Box mb={4}>
        <Steps current={step} onChange={setStep} size="small">
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Steps>
      </Box>
      <Box mb={3}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {() => (
            <Form>
              <Box mb={3}>{steps[step].component}</Box>
              <Box>
                <SubmitButton>Submit</SubmitButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </PageLayout>
  );
}
