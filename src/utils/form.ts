import { UiSchema, utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';

import { getUiWidgetSchema } from '../config';
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
    (acc, category) => ({
      ...acc,
      [category]: getUiWidgetSchema(
        widget,
        filterCriteriaInCategory(category, criteriaFilter),
      ),
    }),
    {} as CriteriaCategoryData<UiSchema>,
  );

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
  ).reduce((acc, criterionId) => {
    const isBoolean =
      (getCriteriaSchema()[categoryId].properties?.[criterionId] as JSONSchema7)
        .type === 'boolean';

    return {
      ...acc,
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
