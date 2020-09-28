/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type WhichMobilePlatformsShouldBeSupported = [
  Android | IOS,
  ...(Android | IOS)[]
];
export type Android = 'android';
export type IOS = 'ios';
export type DistributionChannels = [AppStore | URL, ...(AppStore | URL)[]];
export type AppStore = 'app-store';
export type URL = 'url';
export type SoftwareLicenseType = boolean;
export type Performance = number;

export interface Frameworks {
  name: string;
  criteria: {
    infrastructure: Infrastructure;
    development: Development;
  };
}
export interface Infrastructure {
  platforms: WhichMobilePlatformsShouldBeSupported;
  distribution: DistributionChannels;
  freeLicense: SoftwareLicenseType;
}
export interface Development {
  performance: Performance;
}
