import { Checkbox } from 'formik-antd';
import React from 'react';

import { Question } from '../molecules';

export function StepOne() {
  return (
    <div>
      <Question fieldName="os" title="Platform support">
        <Checkbox.Group
          name="os"
          options={[
            { label: 'iOS', value: 'ios' },
            { label: 'Android', value: 'android' },
          ]}
        />
      </Question>
      <Question fieldName="lang" title="Programming language">
        <Checkbox.Group
          name="lang"
          options={[
            { label: 'C#', value: 'csharp' },
            { label: 'JavaScript', value: 'js' },
          ]}
        />
      </Question>
    </div>
  );
}
