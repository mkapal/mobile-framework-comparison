import { Radio } from 'formik-antd';
import React from 'react';

import { Question } from '../molecules';

export function StepThree() {
  return (
    <Question fieldName="three" title="Question Three">
      <Radio.Group
        name="three"
        options={[
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ]}
      />
    </Question>
  );
}
