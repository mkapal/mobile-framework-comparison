/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { WidgetProps } from '@rjsf/core';
import React from 'react';

const selectValue = (value: any, selected: any, all: any) => {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));

  return updated.sort((a: any, b: any) => all.indexOf(a) > all.indexOf(b));
};

const deselectValue = (value: any, selected: any) =>
  selected.filter((v: any) => v !== value);

export const CheckboxesWidget = ({
  autofocus,
  disabled,
  id,
  label,
  onBlur,
  onChange,
  onFocus,
  options,
  readonly,
  required,
  schema,
  value,
}: WidgetProps) => {
  const { enumDisabled, enumOptions, inline } = options;

  const _onChange = (option: any) => ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const all = (enumOptions as any).map(({ value }: any) => value);

    if (checked) {
      onChange(selectValue(option.value, value, all));
    } else {
      onChange(deselectValue(option.value, value));
    }
  };

  const _onBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLButtonElement>) => onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLButtonElement>) => onFocus(id, value);

  return (
    <>
      <FormLabel required={required} htmlFor={id}>
        {label || schema.title}
      </FormLabel>
      <Box my={2}>
        <FormHelperText>{schema.description}</FormHelperText>
      </Box>
      <FormGroup row={!!inline}>
        {(enumOptions as any).map((option: any, index: number) => {
          const checked = value.indexOf(option.value) !== -1;
          const itemDisabled =
            enumDisabled && (enumDisabled as any).indexOf(option.value) !== -1;
          const checkbox = (
            <Checkbox
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && index === 0}
              onChange={_onChange(option)}
              onBlur={_onBlur}
              onFocus={_onFocus}
            />
          );

          return (
            <FormControlLabel
              control={checkbox}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              label={option.label}
            />
          );
        })}
      </FormGroup>
    </>
  );
};
