import { Box, Button, Step, StepButton, Stepper } from '@material-ui/core';
import { ISubmitEvent, UiSchema, Widget } from '@rjsf/core';
import MuiForm from '@rjsf/material-ui';
import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { FieldTemplate, HiddenWidget } from '../components/criteriaForm';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import schema from '../schemas/frameworks.json';
import { CriteriaCategories, CriterionCategoryId } from '../types';
import {
  getCriteriaCategories,
  getCriteriaSchema,
  getRatedCriteria,
} from '../utils';

const stepNames = getCriteriaCategories();
const steps = getCriteriaSchema();

function validateSchema(schema: object, formData: object) {
  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const validator = ajv.compile(schema);

  validator(formData);

  return validator.errors?.length ? validator.errors : [];
}

const uiSchema: UiSchema = {
  platforms: {
    'ui:widget': 'checkboxes',
  },
  freeLicense: {
    'ui:widget': 'radio',
  },
  ...getRatedCriteria().reduce(
    (acc, criterionId) => ({
      ...acc,
      [criterionId]: {
        'ui:widget': 'hidden',
      },
    }),
    {},
  ),
};

const widgets: { [name: string]: Widget } = {
  HiddenWidget,
};

export function Form() {
  const {
    activeStep,
    formData,
    setActiveStep,
    setFormData,
    setIsSubmitted,
  } = useContext(CriteriaFormContext);
  const h = useHistory();

  const activeStepName = stepNames[activeStep];
  const totalSteps = stepNames.length;

  const activeSchema = useMemo(
    () => schema.properties.criteria.properties[stepNames[activeStep]],
    [activeStep],
  );

  const errors = useMemo(
    () => validateSchema(activeSchema, formData[activeStepName]),
    [activeSchema, activeStepName, formData],
  );

  const submitDisabled = useMemo(() => errors.length > 0, [errors.length]);

  const nextStep = () => {
    setActiveStep(Math.min(totalSteps - 1, activeStep + 1));
  };

  const prevStep = () => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  const mergeFormValues = (values: CriteriaCategories[CriterionCategoryId]) => {
    setFormData((prevState: CriteriaCategories) => ({
      ...prevState,
      [activeStepName]: values,
    }));
  };

  const handleSubmit = (
    e: ISubmitEvent<CriteriaCategories[CriterionCategoryId]>,
  ) => {
    mergeFormValues(e.formData);

    if (activeStep === totalSteps - 1) {
      setIsSubmitted(true);
      h.push('/results');

      return;
    }

    nextStep();
  };

  return (
    <PageLayout>
      <Box mb={4}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {stepNames.map((id) => (
            <Step key={id}>
              <StepButton disabled>{steps[id].title}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <MuiForm
        schema={activeSchema as JSONSchema7}
        uiSchema={uiSchema}
        FieldTemplate={FieldTemplate}
        widgets={widgets}
        showErrorList={false}
        formData={formData[activeStepName]}
        onChange={(e) => mergeFormValues(e.formData)}
        onSubmit={handleSubmit}
      >
        <Box display="flex" justifyContent="space-between">
          <div>
            {activeStep > 0 && activeStep <= totalSteps && (
              <Button variant="contained" color="primary" onClick={prevStep}>
                Back
              </Button>
            )}
          </div>
          {activeStep < totalSteps - 1 && (
            <Button
              disabled={submitDisabled}
              variant="contained"
              color="primary"
              onClick={nextStep}
            >
              Next
            </Button>
          )}
          {activeStep === totalSteps - 1 && (
            <Button
              disabled={submitDisabled}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          )}
        </Box>
      </MuiForm>
    </PageLayout>
  );
}
