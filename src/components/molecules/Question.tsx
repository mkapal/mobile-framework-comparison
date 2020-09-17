import { Col, Row } from 'antd';
import { Slider } from 'formik-antd';
import React, { ReactNode } from 'react';

import { QuestionTitle } from '../atoms';

type Props = {
  title: string;
  fieldName: string;
  children: ReactNode;
};

export function Question({ children, fieldName, title }: Props) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <QuestionTitle>{title}</QuestionTitle>
        {children}
      </Col>
      <Col span={12}>
        <div className="icon-wrapper">
          <Slider
            name={`${fieldName}Weight`}
            step={null}
            marks={{
              1: 'not important',
              2: 'ok',
              3: 'ok',
              4: 'ok',
              5: 'very important',
            }}
            min={1}
            max={5}
          />
        </div>
      </Col>
    </Row>
  );
}
