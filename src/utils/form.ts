import { UiSchema, utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';

import { getUiWidgetSchema } from '../config';
import {
  CriteriaCategories,
  CriteriaData,
  Criterion,
  CriterionCategoryId,
  CriterionId,
} from '../types';

import { getCriteriaCategories, getCriteriaSchema } from './criteria';

const filterCriteriaInCategory = (
  categoryId: CriterionCategoryId,
  predicate: (criterionSchema: JSONSchema7) => boolean,
): Criterion[] => {
  const criteriaProperties = getCriteriaSchema()[categoryId].properties;
  const keys: CriterionId<CriterionCategoryId>[] = Object.keys(
    criteriaProperties,
  ) as CriterionId<CriterionCategoryId>[];

  return keys.filter((criterionId) =>
    predicate(criteriaProperties[criterionId]),
  );
};

const generateUiWidgetSchema = (
  criteriaFilter: (criterionSchema: JSONSchema7) => boolean,
  widget: string,
): CriteriaData<UiSchema> =>
  getCriteriaCategories().reduce(
    (acc, category) => ({
      ...acc,
      [category]: getUiWidgetSchema(
        widget,
        filterCriteriaInCategory(category, criteriaFilter),
      ),
    }),
    {} as CriteriaData<UiSchema>,
  );

export const getRatedCriteriaWidgets = (): CriteriaData<UiSchema> =>
  generateUiWidgetSchema(
    (criterionSchema) => !!criterionSchema.readOnly,
    'hidden',
  );

export const getMultiSelectWidgets = (): CriteriaData<UiSchema> =>
  generateUiWidgetSchema(
    (criterionSchema) => utils.isMultiSelect(criterionSchema),
    'checkboxes',
  );

const getRatedInitialValuesForCategory = (
  categoryId: CriterionCategoryId,
): {
  [a in keyof CriteriaCategories[typeof categoryId]]: number;
} =>
  filterCriteriaInCategory(
    categoryId,
    (criterionSchema) => !!criterionSchema.readOnly,
  ).reduce((acc, criterionId) => {
    const isBoolean =
      (getCriteriaSchema()[categoryId].properties[
        criterionId as keyof CriteriaCategories[typeof categoryId]
      ] as JSONSchema7).type === 'boolean';

    return {
      ...acc,
      [(criterionId as unknown) as string]: isBoolean ? false : 0,
    };
  }, {});

export const getRatedCriteriaInitialValues = (): CriteriaData<number> =>
  getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getRatedInitialValuesForCategory(categoryId),
    }),
    {} as CriteriaData<number>,
  );

const getInitialWeightsForCategory = (
  categoryId: CriterionCategoryId,
): {
  [a in keyof CriteriaCategories[typeof categoryId]]: number;
} => {
  const criteriaIds = Object.keys(getCriteriaSchema()[categoryId].properties);

  return criteriaIds.reduce(
    (weights, criterionId) => ({
      ...weights,
      [criterionId]: 0,
    }),
    {},
  );
};

export const getInitialWeights = (): CriteriaData<number> =>
  getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getInitialWeightsForCategory(categoryId),
    }),
    {} as CriteriaData<number>,
  );
