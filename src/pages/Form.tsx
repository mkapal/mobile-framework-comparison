import { Box, Step, StepButton, Stepper } from '@material-ui/core';
import { JSONSchema7 } from 'json-schema';
import React, { ComponentType, useState } from 'react';

import { Development, Infrastructure } from '../components/criteriaForm/steps';
import { PageLayout } from '../layouts/PageLayout';
import schema from '../schemas/frameworks.json';
import { CriterionId, StepFormProps } from '../types';
import { getCriteriaCategories } from '../utils';

const steps = getCriteriaCategories();
const stepNames = schema.properties.criteria.properties;

export type FormValues = {
  infrastructure: {
    platforms: string[];
    distribution: string[];
    freeLicense: boolean;
  };
  development: {};
};

const initialValues: FormValues = {
  infrastructure: {
    platforms: [],
    distribution: [],
    freeLicense: false,
  },
  development: {},
};

export function Form() {
  const [formValues, setFormValues] = useState(initialValues);
  const [activeStep, setActiveStep] = useState<number>(0);

  console.log(formValues);

  const activeStepName = steps[activeStep];
  const totalSteps = steps.length;

  const nextStep = () => {
    setActiveStep(Math.min(totalSteps - 1, activeStep + 1));
  };

  const prevStep = () => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  const mergeFormValues = (values: any) =>
    setFormValues((prevState) => ({
      ...prevState,
      [activeStepName]: values,
    }));

  const renderStep: {
    [key in CriterionId]: ComponentType<StepFormProps>;
  } = {
    development: Development,
    infrastructure: Infrastructure,
  };

  const StepComponent = renderStep[activeStepName];

  return (
    <PageLayout>
      <Box mb={4}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((id) => (
            <Step key={id}>
              <StepButton>{stepNames[id].title}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <StepComponent
        setFormValues={mergeFormValues}
        nextStep={nextStep}
        prevStep={prevStep}
        formValues={formValues[activeStepName]}
        schema={
          schema.properties.criteria.properties[activeStepName] as JSONSchema7
        }
      />
    </PageLayout>
  );
}
