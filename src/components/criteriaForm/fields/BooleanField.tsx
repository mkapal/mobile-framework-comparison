import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
} from '@material-ui/core';
import { Field } from 'formik';
import { Checkbox, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import React from 'react';

import { FieldTemplate } from '../FieldTemplate';

type Props = {
  id: string;
  label: string;
};

export function BooleanField({ id, label }: Props) {
  return (
    <FieldTemplate id={id}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          <Field component={RadioGroup} name={id}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </Field>
        </FormGroup>
      </FormControl>
    </FieldTemplate>
  );
}
