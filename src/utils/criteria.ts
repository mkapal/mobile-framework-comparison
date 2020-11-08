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
    (acc, categoryWeights) =>
      acc + Object.values(categoryWeights).reduce((acc2, w) => acc2 + w, 0),
    0,
  );

export const getFrameworkData = (): FrameworkData =>
  getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );

export const getFrameworkCriteriaData = (): FrameworkCriteriaData =>
  Object.keys(getFrameworkData()).reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: getFrameworkData()[frameworkId].criteria,
    }),
    {},
  );
