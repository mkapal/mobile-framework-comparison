import { Col, Row } from 'antd';
import React, { ReactNode } from 'react';

import { CriteriaWeight, QuestionTitle } from '../atoms';
import { ErrorMessage } from '../criteria';

type Props = {
  title: string;
  name: string;
  children: ReactNode;
};

export function Question({ children, name, title }: Props) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <QuestionTitle>{title}</QuestionTitle>
        {children}
        <ErrorMessage name={`${name}.value`} />
      </Col>
      <Col span={12}>
        <CriteriaWeight name={`${name}.weight`} />
      </Col>
    </Row>
  );
}
