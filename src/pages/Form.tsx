import { Box, Button, Step, StepButton, Stepper } from '@material-ui/core';
import { IChangeEvent, Widget, withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/material-ui';
import Ajv, { AdditionalPropertiesParams } from 'ajv';
import { JSONSchema7 } from 'json-schema';
import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import {
  CheckboxesWidget,
  FieldTemplate,
  HiddenWidget,
} from '../components/criteriaForm';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import schema from '../schemas/frameworks.json';
import { CriteriaFormData } from '../types';
import { getCriteriaCategories, getRatedCriteria } from '../utils';

function validateSchema(schema: object, formData: object) {
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
  });
  const validator = ajv.compile(schema);

  validator(formData);

  const errors = validator.errors?.length ? validator.errors : [];

  const filteredErrors = errors.filter(
    (error) =>
      !getRatedCriteria('development').includes(
        (error.params as AdditionalPropertiesParams).additionalProperty,
      ),
  );

  return filteredErrors;
}

const MuiForm = withTheme<
  CriteriaFormData['development'] | CriteriaFormData['infrastructure']
>(Theme);

const uiSchema = {
  platforms: { 'ui:widget': 'checkboxes' },
  distribution: { 'ui:widget': 'checkboxes' },
  freeLicense: { 'ui:widget': 'radio' },
  performance: { 'ui:widget': 'hidden' },
};

const widgets: { [name: string]: Widget } = {
  CheckboxesWidget,
  HiddenWidget,
};

const criteriaCategories = getCriteriaCategories();
const schemaCriteria = schema.properties.criteria.properties;
const stepCount = criteriaCategories.length;

export function Form() {
  const {
    activeStep,
    formData,
    setActiveStep,
    setFormData,
    setIsSubmitted,
    weights,
  } = useContext(CriteriaFormContext);
  const h = useHistory();

  const activeCategory = useMemo(() => criteriaCategories[activeStep], [
    activeStep,
  ]);
  const handleStepChange = (step: number) => () => setActiveStep(step);

  const handleChange = (
    e: IChangeEvent<
      CriteriaFormData['development'] | CriteriaFormData['infrastructure']
    >,
  ) => {
    setFormData({
      ...formData,
      [activeCategory]: e.formData,
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    h.push('/results');
  };

  const activeSchema = useMemo(() => schemaCriteria[activeCategory], [
    activeCategory,
  ]);

  const activeFormData = useMemo(() => formData[activeCategory], [
    formData,
    activeCategory,
  ]);

  const activeStepWeights = useMemo(
    () =>
      Object.keys(weights).filter((criterionId) =>
        Object.keys(activeSchema.properties).includes(criterionId),
      ),
    [weights, activeSchema],
  );

  const errors = useMemo(() => validateSchema(activeSchema, activeFormData), [
    activeSchema,
    activeFormData,
  ]);

  const submitDisabled = useMemo(
    () =>
      Object.keys(activeStepWeights).length <
        Object.keys(activeSchema.properties).length || errors.length > 0,
    [activeStepWeights, activeSchema, errors],
  );

  return (
    <PageLayout>
      <Box mb={4}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {criteriaCategories.map((id, index) => (
            <Step key={id}>
              <StepButton onClick={handleStepChange(index)}>
                {schemaCriteria[id].title}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box mb={3}>
        <MuiForm
          schema={activeSchema as JSONSchema7}
          uiSchema={uiSchema}
          FieldTemplate={FieldTemplate}
          formData={activeFormData}
          showErrorList={false}
          onSubmit={handleSubmit}
          onChange={handleChange}
          widgets={widgets}
        >
          <Box display="flex" justifyContent="space-between">
            <div>
              {activeStep > 0 && activeStep <= stepCount && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Back
                </Button>
              )}
            </div>
            {activeStep < stepCount - 1 && (
              <Button
                disabled={false}
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </Button>
            )}
            {activeStep === stepCount - 1 && (
              <Button
                disabled={false}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            )}
          </Box>
        </MuiForm>
      </Box>
    </PageLayout>
  );
}
