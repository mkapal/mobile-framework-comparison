import { JSONSchema7 } from 'json-schema';

import { Frameworks } from './frameworks';

export type CriteriaCategory = Frameworks['criteria'];

export type CriterionId = keyof CriteriaCategory;

export type StepFormProps = {
  prevStep: () => void;
  nextStep: () => void;
  formValues: any;
  setFormValues: (values: any) => void;
  schema: JSONSchema7;
};

export type FrameworkSimilarity = {
  framework: string;
  criteria: {
    [id in CriterionId]: {
      [a in keyof CriteriaCategory[id]]: number;
    };
  };
  totalSimilarity: number;
};

export type Weights = {
  [id in CriterionId]: {
    [a in keyof CriteriaCategory[id]]: number;
  };
};
