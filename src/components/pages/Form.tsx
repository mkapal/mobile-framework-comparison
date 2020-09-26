import { Box, Button, Step, StepButton, Stepper } from '@material-ui/core';
import {
  IChangeEvent,
  ISubmitEvent,
  UiSchema,
  Widget,
  withTheme,
} from '@rjsf/core';
import { Theme } from '@rjsf/material-ui';
import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import React, { useMemo, useState } from 'react';

import schema from '../../schemas/frameworks.json';
import { CriteriaFormData } from '../../types';
import { PageLayout } from '../PageLayout';
import {
  CheckboxesWidget,
  CriteriaWeightsContext,
  FieldTemplate,
  HiddenWidget,
} from '../criteriaForm';
import { Weights } from '../criteriaForm/CriteriaWeightsContext';

function validateSchema(schema: object, formData: object) {
  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const validator = ajv.compile(schema);

  validator(formData);

  return validator.errors?.length ? validator.errors : [];
}

const uiSchema: UiSchema = {
  platforms: { 'ui:widget': 'checkboxes' },
  distribution: { 'ui:widget': 'checkboxes' },
  test: { 'ui:widget': 'checkboxes' },
  performance: { 'ui:widget': 'hidden' },
};

const widgets: { [name: string]: Widget } = {
  CheckboxesWidget,
  HiddenWidget,
};

const MuiForm = withTheme<CriteriaFormData>(Theme);

const steps = ['infrastructure', 'development'];
const stepCount = steps.length;

export function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const [weights, setWeights] = useState<Weights>({});
  const [formData, setCriteriaFormData] = useState<CriteriaFormData>(({
    performance: 1,
  } as unknown) as CriteriaFormData);

  const handleStepChange = (step: number) => () => setActiveStep(step);

  const handleSubmit = (e: ISubmitEvent<CriteriaFormData>) =>
    console.log('form submitted', e.formData, weights);

  // @ts-ignore
  const activeSchema = useMemo(() => schema.properties[steps[activeStep]], [
    activeStep,
  ]);

  const handleChange = ({ formData }: IChangeEvent<CriteriaFormData>) => {
    setCriteriaFormData(formData);
  };

  const activeStepWeights = useMemo(
    () =>
      Object.keys(weights).filter((criterionId) =>
        Object.keys(activeSchema.properties).includes(criterionId),
      ),
    [weights, activeSchema],
  );

  const errors = useMemo(() => validateSchema(activeSchema, formData), [
    activeSchema,
    formData,
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
          {steps.map((id, index) => (
            <Step key={id}>
              <StepButton onClick={handleStepChange(index)}>
                {/*// @ts-ignore*/}
                {schema.properties[id].title}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box mb={3}>
        <CriteriaWeightsContext.Provider
          value={{
            weights,
            setWeights,
          }}
        >
          <MuiForm
            schema={activeSchema as JSONSchema7}
            uiSchema={uiSchema}
            FieldTemplate={FieldTemplate}
            formData={formData}
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
                    Previous step
                  </Button>
                )}
              </div>
              {activeStep < stepCount - 1 && (
                <Button
                  disabled={submitDisabled}
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveStep(activeStep + 1)}
                >
                  Next step
                </Button>
              )}
              {activeStep === stepCount - 1 && (
                <Button
                  disabled={submitDisabled}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Show results
                </Button>
              )}
            </Box>
          </MuiForm>
        </CriteriaWeightsContext.Provider>
      </Box>
    </PageLayout>
  );
}
