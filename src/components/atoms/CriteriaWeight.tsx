import { Slider } from 'formik-antd';
import React from 'react';

import { ErrorMessage } from '../criteria';

type Props = {
  name: string;
};

const tooltips: { [k: number]: string } = {
  0: 'not important',
  1: 'less important',
  2: 'important',
  3: 'very important',
};

export function CriteriaWeight({ name }: Props) {
  return (
    <div className="icon-wrapper">
      <Slider
        tipFormatter={(value: number) => tooltips[value]}
        name={name}
        step={null}
        marks={{
          0: '0',
          1: '1',
          2: '2',
          3: '3',
        }}
        min={0}
        max={3}
      />
      <ErrorMessage name={name} />
    </div>
  );
}
