import { Box, FormHelperText, FormLabel, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WidgetProps } from '@rjsf/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    display: 'block',
    marginBottom: theme.spacing(1),
  },
}));

export function HiddenWidget({ id, label, required, schema }: WidgetProps) {
  const classes = useStyles();

  return (
    <>
      <FormLabel className={classes.label} required={required} htmlFor={id}>
        {label || schema.title}
      </FormLabel>
      {schema.description && (
        <Box my={1}>
          <FormHelperText>{schema.description}</FormHelperText>
        </Box>
      )}
    </>
  );
}
