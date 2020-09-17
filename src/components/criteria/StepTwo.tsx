import { Radio } from 'formik-antd';
import React from 'react';

import { Question } from '../molecules';

export function StepTwo() {
  return (
    <div>
      <Question fieldName="questionTwo" title="Question Two">
        <Radio.Group
          name="questionTwo"
          options={[
            { label: 'item 1', value: 1 },
            { label: 'item 2', value: 2 },
            { label: 'item 3', value: 3 },
          ]}
        />
      </Question>
    </div>
  );
}
