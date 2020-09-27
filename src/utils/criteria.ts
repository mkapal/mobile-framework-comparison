import schema from '../schemas/frameworks.json';
import { CriteriaFormData } from '../types';

export const ratedCriteria: (keyof CriteriaFormData)[] = ['performance'];

export const criteriaIds = Object.keys(schema.properties.criteria.properties);
