import { Box, Button, Step, StepButton, Stepper } from '@material-ui/core';
import { UiSchema, Widget, withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/material-ui';
import { JSONSchema7 } from 'json-schema';
import React, { useState } from 'react';

import schema from '../../schemas/frameworks.json';
import { PageLayout } from '../PageLayout';
import {
  CheckboxesWidget,
  CriteriaWeightsContext,
  FieldTemplate,
} from '../criteriaForm';
import { Weights } from '../criteriaForm/CriteriaWeightsContext';

const uiSchema: UiSchema = {
  platforms: {
    'ui:widget': 'checkboxes',
  },
  distribution: {
    'ui:widget': 'checkboxes',
  },
  test: {
    'ui:widget': 'checkboxes',
  },
};

const widgets: { [name: string]: Widget } = {
  CheckboxesWidget,
};

const MuiForm = withTheme(Theme);

const steps = ['infrastructure', 'development'];

export function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed] = useState(new Set());
  const [skipped] = useState(new Set());
  const [weights, setWeights] = useState<Weights>({});
  const [formData, setFormData] = useState<object>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const isStepSkipped = (step: number) => skipped.has(step);

  function isStepComplete(step: number) {
    return completed.has(step);
  }

  console.log('formData', formData);

  return (
    <PageLayout>
      <Box mb={4}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((id, index) => {
            const stepProps: {
              completed?: boolean;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={id} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                >
                  {/*// @ts-ignore*/}
                  {schema.properties[id].title}
                </StepButton>
              </Step>
            );
          })}
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
            // @ts-ignore
            schema={schema.properties[steps[activeStep]] as JSONSchema7}
            uiSchema={uiSchema}
            FieldTemplate={FieldTemplate}
            formData={formData}
            onSubmit={({ formData }) => {
              console.log('submit form', { formData, weights });
            }}
            onChange={(form) => {
              console.log('onChange', form.formData);
              setFormData(form.formData);
            }}
            onError={(e) => console.error('errors', e)}
            widgets={widgets}
          >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </MuiForm>
        </CriteriaWeightsContext.Provider>
      </Box>
    </PageLayout>
  );
}
