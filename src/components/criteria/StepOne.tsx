import { Checkbox } from 'formik-antd';
import React from 'react';

import { Question } from '../molecules';

export function StepOne() {
  return (
    <>
      <Question name="os" title="Platform support">
        <Checkbox.Group
          name="os.value"
          options={[
            { label: 'iOS', value: 'ios' },
            { label: 'Android', value: 'android' },
          ]}
        />
      </Question>
      <Question name="lang" title="Programming language">
        <Checkbox.Group
          name="lang.value"
          options={[
            { label: 'C#', value: 'csharp' },
            { label: 'JavaScript', value: 'js' },
          ]}
        />
      </Question>
    </>
  );
}
