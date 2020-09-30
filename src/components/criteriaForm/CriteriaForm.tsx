import { Box, Button, Step, StepButton, Stepper } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, {
  FunctionComponentElement,
  ReactComponentElement,
  ReactNode,
  useState,
} from 'react';

import { FormValues } from '../../pages/Form';
import schema from '../../schemas/frameworks.json';
import { getCriteriaCategories } from '../../utils';

type WizardProps = {
  children: ReactComponentElement<'div', StepProps>[];
  initialValues: FormValues;
  onSubmit: (values: FormValues, bag: FormikHelpers<FormValues>) => void;
};

type StepProps = {
  children: ReactNode;
  validationSchema: any;
};

const criteriaCategories = getCriteriaCategories();
const schemaCriteria = schema.properties.criteria.properties;

export function CriteriaForm({
  children,
  initialValues,
  onSubmit,
}: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps: FunctionComponentElement<StepProps>[] = React.Children.toArray(
    children,
  ) as FunctionComponentElement<StepProps>[];
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  const step = steps[currentStep];
  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const next = (values: FormValues) => {
    setFormValues(values);
    setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
  };

  const previous = (values: FormValues) => {
    setFormValues(values);
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleSubmit = async (
    values: FormValues,
    bag: FormikHelpers<FormValues>,
  ) => {
    if (isLastStep) {
      onSubmit(values, bag);
    }
    bag.setTouched({});
    bag.setSubmitting(false);
    await bag.validateForm();
    next(values);
  };

  console.log('formValues', formValues);

  return (
    <>
      <Box mb={4}>
        <Stepper alternativeLabel activeStep={currentStep}>
          {criteriaCategories.map((id, index) => (
            <Step key={id}>
              <StepButton onClick={() => setCurrentStep(index)}>
                {schemaCriteria[id].title}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box mb={3}>
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit}
          validationSchema={step.props.validationSchema}
          validateOnMount
          validateOnChange
        >
          {(formik) => (
            <Form>
              {step}
              <Box display="flex" justifyContent="space-between">
                <div>
                  {currentStep > 0 && (
                    <Button
                      onClick={async () => {
                        previous(formik.values);
                        await formik.validateForm().then((a) => console.log(a));
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Back
                    </Button>
                  )}
                </div>
                <Button
                  disabled={formik.isSubmitting || !formik.isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isLastStep ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export function CriteriaFormStep({ children }: StepProps) {
  return <>{children}</>;
}
