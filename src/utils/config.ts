import { UiSchema } from '@rjsf/core';

import {
  Criterion,
  CriterionCategoryId,
  CriterionId,
  SimilarityFunctions,
} from '../types';

import { DEFAULT_MAX_RATING } from './consts';

export function getFrameworkIds(): string[] {
  return ['react-native', 'cordova'];
}

export const uiSchema: {
  [Category in CriterionCategoryId]: {
    [Criterion in CriterionId<Category>]: UiSchema;
  };
} = {
  infrastructure: {
    ...getUiWidgetSchema('radio', ['free-license', 'pricing']),
  },
  development: {
    ...getUiWidgetSchema('radio', ['custom-ide']),
  },
  'application-usage': {
    ...getUiWidgetSchema('radio', ['free-license', 'pricing']),
  },
};

export const similarityFunctions: SimilarityFunctions = {
  infrastructure: {
    'mobile-os': jaccardSimilarity,
    'free-license': booleanSimilarity,
    pricing: (): number => 1,
    'development-platforms': (): number => 1,
    'long-term-feasibility': normalizedRating,
    ads: (): number => 1,
    internationalization: (): number => 1,
    microtransactions: (): number => 1,
  },
  development: {
    'configuration-management': normalizedRating,
    'continuous-deployment': normalizedRating,
    'custom-code-integration': booleanSimilarity,
    'custom-ide': (): number => 1,
    'initial-config': normalizedRating,
    'wysiwyg-editor': booleanSimilarity,
    documentation: normalizedRating,
    extensibility: normalizedRating,
    scalability: normalizedRating,
    technologies: jaccardSimilarity,
    testing: normalizedRating,
  },
  'application-usage': {
    'app-lifecycle': normalizedRating,
    'touch-gestures': normalizedRating,
    'user-interface': normalizedRating,
    hardware: jaccardSimilarity,
    software: jaccardSimilarity,
    offline: booleanSimilarity,
    performance: normalizedRating,
    security: normalizedRating,
  },
};

export function normalizedRating(
  criterionValue: number,
  frameworkValue: number,
): number {
  return frameworkValue / DEFAULT_MAX_RATING;
}

export function jaccardSimilarity(a: unknown[], b: unknown[]): number {
  if (a.length === 0 && b.length === 0) {
    return 1;
  }

  const intersection = a.filter((item) => b.includes(item));
  const bNotInA = b.filter((item) => !a.includes(item));

  const symmetricDifference = intersection.length + bNotInA.length;

  if (symmetricDifference === 0) {
    return 0;
  }

  return intersection.length / symmetricDifference;
}

export function booleanSimilarity(
  criterionValue: boolean,
  frameworkValue: boolean,
): number {
  return Math.abs(1 - Number(criterionValue) - Number(frameworkValue));
}

function getUiWidgetSchema(
  widget: string,
  criteria: Criterion[],
): {
  [k in Criterion]: UiSchema;
} {
  return criteria.reduce(
    (acc, criterion) => ({
      ...acc,
      [criterion]: {
        'ui:widget': widget,
      },
    }),
    {} as {
      [k in Criterion]: UiSchema;
    },
  );
}
