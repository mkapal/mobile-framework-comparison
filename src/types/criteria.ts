export type CriteriaFormData = {
  distribution: 'app-store' | 'url';
  platforms: 'ios' | 'android';
  test: 'app-store' | 'url';
  performance: 1 | 2 | 3;
};

export type Weights = { [id in keyof CriteriaFormData]?: number };
