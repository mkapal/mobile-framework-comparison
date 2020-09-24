// import { definitions } from '../schemas/frameworks.json';

type Option<Value> = {
  label: string;
  value: Value;
};

export type Criterion<Value> = {
  value: Value;
  weight: 0 | 1 | 2 | 3 | 4 | 5;
};

export type ProgrammingLanguage = 'csharp' | 'js' | 'dotnet';
export const programmingLanguageOptions: Option<ProgrammingLanguage>[] = [
  { label: 'C#', value: 'csharp' },
  { label: 'JavaScript', value: 'js' },
  { label: '.NET', value: 'dotnet' },
];
export const programmingLanguages: ProgrammingLanguage[] = programmingLanguageOptions.map(
  (option) => option.value,
);

export type OperatingSystem = 'ios' | 'android';

// export const operatingSystemOptions: Option<OperatingSystem>[] = definitions[
//   'operating-system'
// ].anyOf.map((os) => ({
//   label: os.title,
//   value: os.enum[0] as OperatingSystem,
// }));
