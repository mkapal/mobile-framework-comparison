import React from 'react';
import { Button } from '@material-ui/core';
import Form from '@rjsf/material-ui';
import { UiSchema } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';

import schema from '../../schemas/frameworks.json';
import native from '../../data/react-native.json';

const uiSchema: UiSchema = {
  platforms: {
    'ui:widget': 'checkboxes',
  },
};

function getDistance<SelectedValue extends string[]>(
  question: string,
  selectedValue: SelectedValue,
) {
  switch (question) {
    case 'platforms':
      const frameworkPlatforms = native.features.platforms as string[];
      const selectedPlatforms: string[] = selectedValue;

      const supportedPlatforms = frameworkPlatforms.filter((platform) =>
        selectedPlatforms.includes(platform),
      );
      const unsupportedPlatforms = selectedPlatforms.filter(
        (platform) => !frameworkPlatforms.includes(platform),
      );

      return (
        1 -
        supportedPlatforms.length /
          (supportedPlatforms.length + unsupportedPlatforms.length)
      );

    default:
      return 0;
  }
}

export function Questions() {
  return (
    <Form
      schema={schema.properties.features as JSONSchema7}
      uiSchema={uiSchema}
      onSubmit={(e) => {
        console.log('submit', e.formData);

        const selectedPlatforms: string[] = e.formData.platforms;
        console.log(getDistance('platforms', selectedPlatforms));
      }}
      onError={(e) => console.log('errors', e)}
    >
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Form>
  );
}
