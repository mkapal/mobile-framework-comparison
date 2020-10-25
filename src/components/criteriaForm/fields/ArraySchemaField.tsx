import { utils } from '@rjsf/core';
import Ajv from 'ajv';
import { FieldValidator } from 'formik';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { ArrayField } from './ArrayField';

type Props = {
  label?: string;
  id: string;
  parentSchema: JSONSchema7;
  options?: { label: string; value: string }[];
  validate?: FieldValidator;
};

export function ArraySchemaField({
  id,
  label: labelProp,
  options,
  parentSchema,
  validate,
}: Props) {
  const schema = parentSchema!.properties![id] as JSONSchema7;

  if (!schema) {
    return null;
  }

  const label = labelProp || schema.title || id;

  const validateSchema = (value: string[]) => {
    const ajv = new Ajv({
      unknownFormats: 'ignore',
    });

    if (!schema) {
      return undefined;
    }

    ajv.validate(schema, value);

    return ajv.errors?.join(',');
  };

  const fieldOptions =
    options || utils.optionsList(schema.items as JSONSchema7);

  return (
    <ArrayField
      label={label}
      id={id}
      options={fieldOptions}
      validate={validate || validateSchema}
    />
  );
}
