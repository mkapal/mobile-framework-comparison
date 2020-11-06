import { UiSchema } from '@rjsf/core';

import {
  Criterion,
  CriterionCategoryId,
  CriterionId,
  SimilarityFunctions,
} from './types';
import {
  booleanSimilarity,
  jaccardSimilarity,
  normalizedRating,
} from './utils/similarity';

export const DEFAULT_MAX_RATING = 5;

export const getFrameworkIds = (): string[] => ['react-native', 'cordova'];

export const getUiWidgetSchema = (
  widget: string,
  criteria: Criterion[],
): {
  [k in Criterion]: UiSchema;
} =>
  criteria.reduce(
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
