import { FormControl, FormGroup, FormLabel } from '@material-ui/core';
import { Field, FieldValidator } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';

import { FieldTemplate } from '../FieldTemplate';

type Props = {
  label: string;
  id: string;
  options: { label: string; value: string }[];
  validate?: FieldValidator;
};

export function ArrayField({ id, label, options, validate }: Props) {
  return (
    <FieldTemplate id={id}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.map(({ label, value }) => (
            <Field
              key={value}
              component={CheckboxWithLabel}
              type="checkbox"
              name={id}
              value={value}
              Label={{
                label,
              }}
              validate={validate}
            />
          ))}
        </FormGroup>
      </FormControl>
    </FieldTemplate>
  );
}
