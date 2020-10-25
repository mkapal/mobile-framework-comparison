import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { ReactNode } from 'react';

type Props = {
  prevStep?: () => void;
  nextStep: () => void;
  formValues: any;
  setFormValues: (values: any) => void;
  children: ReactNode;
};

export function StepForm({
  children,
  formValues,
  nextStep,
  prevStep,
  setFormValues,
}: Props) {
  return (
    <Formik
      initialValues={formValues}
      onSubmit={(values) => {
        setFormValues(values);
        nextStep();
      }}
      validateOnMount
    >
      {({ isValid, values }) => (
        <Form>
          {children}
          <Box display="flex" justifyContent="space-between">
            <div>
              {prevStep && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFormValues(values);
                    prevStep();
                  }}
                >
                  Back
                </Button>
              )}
            </div>
            <Button
              disabled={!isValid}
              variant="contained"
              color="primary"
              type="submit"
            >
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
