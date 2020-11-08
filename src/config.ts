import { UiSchema } from '@rjsf/core';

import { CriteriaCategoryData, SimilarityFunctions } from './types';
import {
  booleanConverseSimilarity,
  booleanSimilarity,
  jaccardSimilarity,
  normalizedRating,
  pricingSimilarity,
} from './utils/similarity';

export const DEFAULT_MAX_RATING = 5;

export const getFrameworkIds = (): string[] => ['react-native', 'cordova'];

type UiWidgetSchema = {
  [k: string]: UiSchema;
};

export const getUiWidgetSchema = (
  widget: string,
  criteria: string[],
): UiWidgetSchema =>
  criteria.reduce(
    (uiSchema, criterion) => ({
      ...uiSchema,
      [criterion]: {
        'ui:widget': widget,
      },
    }),
    {} as UiWidgetSchema,
  );

export const uiSchema: CriteriaCategoryData<UiSchema> = {
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
    pricing: pricingSimilarity,
    'development-platforms': jaccardSimilarity,
    'long-term-feasibility': normalizedRating,
    ads: normalizedRating,
    internationalization: booleanSimilarity,
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
