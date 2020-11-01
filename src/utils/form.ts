import { UiSchema, utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';

import {
  CriteriaCategories,
  CriteriaData,
  CriterionCategoryId,
  CriterionId,
} from '../types';

import { getCriteriaCategories, getCriteriaSchema } from './criteria';

export function getRatedCriteriaWidgets(): CriteriaData<UiSchema> {
  return generateUiWidgetSchema(
    (criterionSchema) => !!criterionSchema.readOnly,
    'hidden',
  );
}

export function getMultiSelectWidgets(): CriteriaData<UiSchema> {
  return generateUiWidgetSchema(
    (criterionSchema) => utils.isMultiSelect(criterionSchema),
    'checkboxes',
  );
}

export function getRatedCriteriaInitialValues(): CriteriaData<number> {
  return getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getRatedInitialValuesForCategory(categoryId),
    }),
    {} as CriteriaData<number>,
  );
}

export function getInitialWeights(): CriteriaData<number> {
  return getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getInitialWeightsForCategory(categoryId),
    }),
    {} as CriteriaData<number>,
  );
}

function getRatedInitialValuesForCategory(
  categoryId: CriterionCategoryId,
): {
  [a in keyof CriteriaCategories[typeof categoryId]]: number;
} {
  return filterCriteriaInCategory(
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
}

function getInitialWeightsForCategory(
  categoryId: CriterionCategoryId,
): {
  [a in keyof CriteriaCategories[typeof categoryId]]: number;
} {
  const criteriaIds = Object.keys(getCriteriaSchema()[categoryId].properties);

  return criteriaIds.reduce(
    (weights, criterionId) => ({
      ...weights,
      [criterionId]: 0,
    }),
    {},
  );
}

function filterCriteriaInCategory(
  categoryId: CriterionCategoryId,
  predicate: (criterionSchema: JSONSchema7) => boolean,
): string[] {
  const criteriaProperties = getCriteriaSchema()[categoryId].properties;
  const keys: CriterionId<CriterionCategoryId>[] = Object.keys(
    criteriaProperties,
  ) as CriterionId<CriterionCategoryId>[];

  return keys.filter((criterionId) =>
    predicate(criteriaProperties[criterionId]),
  );
}

function generateUiWidgetSchema(
  criteriaFilter: (criterionSchema: JSONSchema7) => boolean,
  widget: string,
): CriteriaData<UiSchema> {
  return getCriteriaCategories().reduce(
    (acc, category) => ({
      ...acc,
      [category]: filterCriteriaInCategory(category, criteriaFilter).reduce(
        (acc2, criterionId) => ({
          ...acc2,
          [criterionId]: {
            'ui:widget': widget,
          },
        }),
        {},
      ),
    }),
    {} as CriteriaData<UiSchema>,
  );
}
