import { UiSchema } from '@rjsf/core';

import { CriteriaCategoryData, SimilarityFunctions } from './types';
import {
  booleanConverseSimilarity,
  booleanSimilarity,
  jaccardSimilarity,
  normalizedRating,
  pricingSimilarity,
} from './utils/similarity';

export const DEFAULT_MAX_RATING = 3;
export const DEFAULT_MAX_WEIGHT = 2;

export const getFrameworkIds = (): string[] => [
  'cordova',
  'flutter',
  'ionic',
  'nativescript',
  'react-native',
];

type UiWidgetSchema = {
  [k: string]: UiSchema;
};

export const getUiWidgetSchema = (
  widget: string,
  criteria: string[],
  options?: UiSchema['ui:options'],
): UiWidgetSchema =>
  criteria.reduce(
    (uiSchema, criterion) => ({
      ...uiSchema,
      [criterion]: {
        'ui:widget': widget,
        'ui:options': options ?? {},
      },
    }),
    {} as UiWidgetSchema,
  );

export const uiSchema: CriteriaCategoryData<UiSchema> = {
  infrastructure: {
    ...getUiWidgetSchema('radio', ['pricing']),
  },
  development: {
    ...getUiWidgetSchema('radio', ['custom-ide']),
  },
  'application-usage': {
    ...getUiWidgetSchema('checkboxes', ['hardware'], {
      inline: true,
    }),
  },
};

export const similarityFunctions: SimilarityFunctions = {
  infrastructure: {
    'mobile-os': jaccardSimilarity,
    'free-license': booleanSimilarity,
    pricing: pricingSimilarity,
    'development-platforms': jaccardSimilarity,
    'long-term-feasibility': normalizedRating,
    internationalization: normalizedRating,
    microtransactions: booleanSimilarity,
  },
  development: {
    'configuration-management': normalizedRating,
    'continuous-deployment': normalizedRating,
    'custom-code-integration': booleanSimilarity,
    'custom-ide': booleanConverseSimilarity,
    'initial-config': normalizedRating,
    'wysiwyg-editor': booleanSimilarity,
    documentation: normalizedRating,
    extensibility: normalizedRating,
    maintainability: normalizedRating,
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
