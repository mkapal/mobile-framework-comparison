import { JSONSchema7 } from 'json-schema';

import { getFrameworkIds } from '../config';
import schema from '../schemas/frameworks.json';
import { FrameworkCriteriaData, FrameworkData, Weights } from '../types';

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
