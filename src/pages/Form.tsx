import { Box, Button } from '@material-ui/core';
import { IChangeEvent, utils, Widget } from '@rjsf/core';
import MuiForm from '@rjsf/material-ui';
import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { HiddenWidget } from '../components/molecules';
import { FieldTemplate } from '../components/organisms';
import { uiSchema } from '../config';
import { CriteriaFormContext } from '../context';
import { PageLayout } from '../layouts/PageLayout';
import schema from '../schemas/frameworks.json';
import { getMultiSelectWidgets, getRatedCriteriaWidgets } from '../utils';

function validateSchema(schema: object, formData: object) {
  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const validator = ajv.compile(schema);

  validator(formData);

  return validator.errors?.length ? validator.errors : [];
}

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
};

export function Form() {
  const { formData, setFormData, setIsSubmitted } = useContext(
    CriteriaFormContext,
  );
  const h = useHistory();

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

  const submitDisabled = useMemo(() => errors.length > 0, [errors.length]);

  const handleChange = (e: IChangeEvent) => {
    setFormData(e.formData);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    h.push('/results');
  };

  return (
    <PageLayout>
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
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            disabled={submitDisabled}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </MuiForm>
    </PageLayout>
  );
}
