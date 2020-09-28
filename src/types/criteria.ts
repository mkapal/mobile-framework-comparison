// TODO: Automatic type generation from JSON
export type CriteriaFormData = {
  distribution: ('app-store' | 'url')[];
  platforms: ('ios' | 'android')[];
  test: ('app-store' | 'url')[];
  performance: 1 | 2 | 3 | 4 | 5;
  freeLicense: boolean;
};

export type Weights = { [id in keyof CriteriaFormData]: number };

export type FrameworkSimilarity = {
  framework: string;
  criteria: {
    [k in keyof CriteriaFormData]: number;
  };
  totalSimilarity: number;
};
