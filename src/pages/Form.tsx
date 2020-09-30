import { Box, Step, StepButton, Stepper } from '@material-ui/core';
import React, { useState } from 'react';

import { Development, Infrastructure } from '../components/criteriaForm/steps';
import { PageLayout } from '../layouts/PageLayout';
import schema from '../schemas/frameworks.json';
import { getCriteriaCategories } from '../utils';

const steps = getCriteriaCategories();
const stepNames = schema.properties.criteria.properties;

export type FormValues = {
  infrastructure: {
    platforms: string[];
  };
  development: {
    distribution: string[];
  };
};

const initialValues: FormValues = {
  infrastructure: {
    platforms: [],
  },
  development: {
    distribution: [],
  },
};

export function Form() {
  const [formValues, setFormValues] = useState(initialValues);
  const [activeStep, setActiveStep] = useState<number>(0);

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

  const renderStep = () => {
    switch (activeStepName) {
      case 'infrastructure':
        return (
          <Infrastructure
            formValues={formValues[activeStepName]}
            setFormValues={mergeFormValues}
            nextStep={nextStep}
          />
        );
      case 'development':
        return (
          <Development
            formValues={formValues[activeStepName]}
            setFormValues={mergeFormValues}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

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
      {renderStep()}
    </PageLayout>
  );
}
