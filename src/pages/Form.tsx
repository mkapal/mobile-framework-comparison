import { Box, Button, Container, Typography } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import {
  Android,
  Apple,
  PhoneAndroidTwoTone,
  PhoneIphoneTwoTone,
} from '@material-ui/icons';
import { IChangeEvent, utils, Widget } from '@rjsf/core';
import MuiForm from '@rjsf/material-ui';
import { JSONSchema7 } from 'json-schema';
import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { PageLayout } from '../components/layouts/PageLayout';
import { CheckboxesWidget, HiddenWidget } from '../components/molecules';
import { FieldTemplate } from '../components/organisms';
import { uiSchema } from '../config';
import { CriteriaFormContext } from '../context';
import schema from '../schemas/frameworks.json';
import {
  getMultiSelectWidgets,
  getRatedCriteriaWidgets,
  getTotalWeights,
  validateSchema,
} from '../utils';

const uiSchemaWithRatedWidgets = utils.mergeObjects(
  uiSchema,
  getRatedCriteriaWidgets(),
);
const uiSchemaWithMultiSelectWidgets = utils.mergeObjects(
  uiSchemaWithRatedWidgets,
  getMultiSelectWidgets(),
);

const widgets: { [name: string]: Widget } = {
  HiddenWidget,
  CheckboxesWidget,
};

export function Form() {
  const { formData, setFormData, setIsSubmitted, weights } = useContext(
    CriteriaFormContext,
  );
  const h = useHistory();

  const totalWeights = getTotalWeights(weights);

  const formSchema = useMemo(
    () => ({
      ...schema.properties.criteria,
      definitions: {
        ...schema.definitions,
      },
    }),
    [],
  );

  const errors = useMemo(() => validateSchema(formSchema, formData), [
    formSchema,
    formData,
  ]);

  const submitDisabled = useMemo(
    () => errors.length > 0 || totalWeights === 0,
    [errors.length, totalWeights],
  );

  const handleChange = (e: IChangeEvent) => {
    setFormData(e.formData);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    h.push('/results');
  };

  return (
    <PageLayout>
      <Container maxWidth="md">
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box>
            <Apple
              style={{ color: grey[500], fontSize: 50, marginRight: -20 }}
            />
            <PhoneIphoneTwoTone
              style={{ color: grey[900], fontSize: 100, marginRight: -20 }}
            />
            <PhoneAndroidTwoTone
              style={{ color: grey[900], fontSize: 100, marginLeft: -20 }}
            />
            <Android
              style={{ color: green['A400'], fontSize: 40, marginLeft: -10 }}
            />
          </Box>
          <Typography variant="subtitle1">
            Mobile Framework Recommendation System
          </Typography>
          <Box mb={4}>
            <Typography variant="body1">
              Get a ranked list of recommended cross-platform mobile frameworks
            </Typography>
          </Box>
        </Box>
        <Container maxWidth="md">
          <MuiForm
            schema={formSchema as JSONSchema7}
            uiSchema={uiSchemaWithMultiSelectWidgets}
            FieldTemplate={FieldTemplate}
            widgets={widgets}
            showErrorList={false}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <Button
              disabled={submitDisabled}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </MuiForm>
        </Container>
      </Container>
    </PageLayout>
  );
}
