import { UiSchema, utils } from '@rjsf/core';
import Ajv, { ErrorObject } from 'ajv';
import { JSONSchema7 } from 'json-schema';

import { getUiWidgetSchema } from '../config';
import schema from '../schemas/frameworks.json';
import {
  CriteriaCategoryData,
  CriterionData,
  RatedCriteriaCategoryData,
  RatedCriterionData,
} from '../types';

import { getCriteriaCategories, getCriteriaSchema } from './criteria';

const filterCriteriaInCategory = (
  category: string,
  predicate: (criterionSchema: JSONSchema7) => boolean,
): string[] => {
  const criteriaProperties = getCriteriaSchema()[category].properties!;
  const keys = Object.keys(criteriaProperties);

  return keys.filter((criterionId) =>
    predicate(criteriaProperties[criterionId] as JSONSchema7),
  );
};

const generateUiWidgetSchema = (
  criteriaFilter: (criterionSchema: JSONSchema7) => boolean,
  widget: string,
): CriteriaCategoryData<UiSchema> =>
  getCriteriaCategories().reduce(
    (uiSchema, category) => ({
      ...uiSchema,
      [category]: getUiWidgetSchema(
        widget,
        filterCriteriaInCategory(category, criteriaFilter),
      ),
    }),
    {} as CriteriaCategoryData<UiSchema>,
  );

export const getFormSchema = (): object => ({
  ...schema.properties.criteria,
  definitions: {
    ...schema.definitions,
  },
});

export const validateSchema = (
  schema: object,
  formData: object,
): ErrorObject[] => {
  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const validator = ajv.compile(schema);

  validator(formData);

  return validator.errors?.length ? validator.errors : [];
};

export const getRatedCriteriaWidgets = (): CriteriaCategoryData<UiSchema> =>
  generateUiWidgetSchema(
    (criterionSchema) => !!criterionSchema.readOnly,
    'hidden',
  );

export const getMultiSelectWidgets = (): CriteriaCategoryData<UiSchema> =>
  generateUiWidgetSchema(
    (criterionSchema) => utils.isMultiSelect(criterionSchema),
    'checkboxes',
  );

const getRatedInitialValuesForCategory = (
  categoryId: string,
): RatedCriterionData =>
  filterCriteriaInCategory(
    categoryId,
    (criterionSchema) => !!criterionSchema.readOnly,
  ).reduce((readOnlyCriteria, criterionId) => {
    const isBoolean =
      (getCriteriaSchema()[categoryId].properties?.[criterionId] as JSONSchema7)
        .type === 'boolean';

    return {
      ...readOnlyCriteria,
      [criterionId]: isBoolean ? false : 0,
    };
  }, {} as RatedCriterionData);

export const getRatedCriteriaInitialValues = (): RatedCriteriaCategoryData =>
  getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getRatedInitialValuesForCategory(categoryId),
    }),
    {} as RatedCriteriaCategoryData,
  );

const getInitialWeightsForCategory = (
  categoryId: string,
): CriterionData<number> => {
  const criteriaIds = Object.keys(getCriteriaSchema()[categoryId].properties!);

  return criteriaIds.reduce(
    (weights, criterionId) => ({
      ...weights,
      [criterionId]: 0,
    }),
    {},
  );
};

export const getInitialWeights = (): CriteriaCategoryData<number> =>
  getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getInitialWeightsForCategory(categoryId),
    }),
    {} as CriteriaCategoryData<number>,
  );
