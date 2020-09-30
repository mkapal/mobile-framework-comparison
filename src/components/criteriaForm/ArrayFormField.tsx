import { FormControl, FormGroup, FormLabel } from '@material-ui/core';
import { Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';

import { FieldTemplate } from './FieldTemplate';

type Props = {
  label: string;
  id: string;
  options: { [value: string]: string };
};

export function ArrayFormField({ id, label, options }: Props) {
  return (
    <FieldTemplate id={id}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {Object.entries(options).map(([value, label]) => (
            <Field
              key={value}
              component={CheckboxWithLabel}
              type="checkbox"
              name={id}
              value={value}
              Label={{
                label,
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </FieldTemplate>
  );
}
