import { Box, FormHelperText, FormLabel } from '@material-ui/core';
import { WidgetProps } from '@rjsf/core';
import React from 'react';

export function HiddenWidget({ id, label, required, schema }: WidgetProps) {
  return (
    <>
      <FormLabel required={required} htmlFor={id}>
        {label || schema.title}
      </FormLabel>
      <Box my={2}>
        <FormHelperText>{schema.description}</FormHelperText>
      </Box>
    </>
  );
}
