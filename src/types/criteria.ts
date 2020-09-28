// TODO: Automatic type generation from JSON
export type CriteriaFormData = {
  distribution: ('app-store' | 'url')[];
  platforms: ('ios' | 'android')[];
  test: ('app-store' | 'url')[];
  performance: 1 | 2 | 3 | 4 | 5;
};

export type Weights = { [id in keyof CriteriaFormData]: number };
