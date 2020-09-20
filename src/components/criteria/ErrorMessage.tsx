import styled from '@emotion/styled';
import { Typography } from 'antd';
import { getIn, useFormikContext } from 'formik';
import React from 'react';

import { FormValues } from '../pages/Form';

type Props = {
  name: string;
};

const ErrorText = styled(Typography.Paragraph)`
  min-height: 22px;
`;

export function ErrorMessage({ name }: Props) {
  const { errors, touched } = useFormikContext<FormValues>();

  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  return (
    <ErrorText type="danger">
      {fieldError && fieldTouched ? fieldError : null}
    </ErrorText>
  );
}
