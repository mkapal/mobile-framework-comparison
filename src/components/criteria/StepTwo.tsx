import { Radio } from 'formik-antd';
import React from 'react';

import { Question } from '../molecules';

export function StepTwo() {
  return (
    <Question name="questionTwo" title="Question Two">
      <Radio.Group
        name="questionTwo.value"
        options={[
          { label: 'item 1', value: 'one' },
          { label: 'item 2', value: 'two' },
          { label: 'item 3', value: 'three' },
        ]}
      />
    </Question>
  );
}
