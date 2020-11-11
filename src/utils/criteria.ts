import { JSONSchema7 } from 'json-schema';

import { getFrameworkIds } from '../config';
import schema from '../schemas/frameworks.json';
import {
  DisplayStringMap,
  FrameworkCriteriaData,
  FrameworkData,
  Weights,
} from '../types';

type CriteriaSchema = {
  [category: string]: JSONSchema7;
};

export const getCriteriaSchema = (): CriteriaSchema =>
  (schema.properties.criteria.properties as unknown) as CriteriaSchema;

export const getCriteriaCategories = (): string[] =>
  Object.keys(getCriteriaSchema());

export const getTotalWeights = (criteriaWeights: Weights): number =>
  Object.values(criteriaWeights).reduce(
    (total, categoryWeights) =>
      total +
      Object.values(categoryWeights).reduce(
        (categoryTotal, weight) => categoryTotal + weight,
        0,
      ),
    0,
  );

export const getFrameworkData = (): FrameworkData =>
  getFrameworkIds().reduce(
    (frameworkData, frameworkId) => ({
      ...frameworkData,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );

export const getFrameworkCriteriaData = (): FrameworkCriteriaData =>
  Object.keys(getFrameworkData()).reduce(
    (criteriaData, frameworkId) => ({
      ...criteriaData,
      [frameworkId]: getFrameworkData()[frameworkId].criteria,
    }),
    {},
  );

export const getCategoryDisplayStrings = (
  schema: CriteriaSchema,
): DisplayStringMap =>
  Object.keys(schema).reduce(
    (acc, category) => ({
      ...acc,
      [category]: schema[category].title,
    }),
    {},
  );

export const getCriteriaDisplayStrings = (
  schema: CriteriaSchema,
): DisplayStringMap =>
  Object.keys(schema).reduce((categories, category) => {
    const criteria = schema[category].properties!;

    return {
      ...categories,
      ...Object.keys(criteria).reduce(
        (criteriaDisplayStrings, criterion) => ({
          ...criteriaDisplayStrings,
          [criterion]: (criteria[criterion] as JSONSchema7).title,
        }),
        {},
      ),
    };
  }, {});

export const getFrameworkDisplayStrings = (
  frameworkData: FrameworkData,
): DisplayStringMap =>
  Object.keys(frameworkData).reduce(
    (acc, framework) => ({
      ...acc,
      [framework]: getFrameworkData()[framework].name,
    }),
    {},
  );

export const getDisplayStrings = (
  schema: CriteriaSchema,
  frameworkData: FrameworkData,
): DisplayStringMap => ({
  ...getCategoryDisplayStrings(schema),
  ...getCriteriaDisplayStrings(schema),
  ...getFrameworkDisplayStrings(frameworkData),
});
