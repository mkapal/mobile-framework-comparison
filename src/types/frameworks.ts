/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type WhichMobilePlatformsShouldBeSupported = [Android | IOS, ...(Android | IOS)[]];
export type Android = "android";
export type IOS = "ios";
export type WhichPlatformsWillBeUsedForDevelopment = [Linux | MacOS | Windows, ...(Linux | MacOS | Windows)[]];
export type Linux = "linux";
export type MacOS = "macos";
export type Windows = "windows";
export type FreeLicense = boolean;
export type PricingPolicy = "free" | "free-paid" | "paid";
export type SupportForInAppPurchases = boolean;
export type SupportForInternationalization = number;
export type LongTermFeasibility = number;
export type CustomIntegratedDevelopmentEnvironmentIDE = boolean;
export type WhichTechnologiesShouldItUse = [
  CSS | Dart | HTML | JavaScript | TypeScript | XML,
  ...(CSS | Dart | HTML | JavaScript | TypeScript | XML)[]
];
export type CSS = "css";
export type Dart = "dart";
export type HTML = "html";
export type JavaScript = "javascript";
export type TypeScript = "typescript";
export type XML = "xml";
export type WYSIWYGEditorForGUIDesign = boolean;
export type CustomCodeIntegration = boolean;
export type Documentation = number;
export type Scalability = number;
export type InitialProjectConfiguration = number;
export type Testing = number;
export type Extensibility = number;
export type Maintainability = number;
export type SupportForContinuousIntegrationDeployment = number;
export type Accelerometer = "accelerometer";
export type Gyroscope = "gyro";
export type Pedometer = "pedometer";
export type Geolocation = "geolocation";
export type MagneticField = "magnet";
export type ProximitySensor = "proximity";
export type LightIntensity = "light";
export type AtmosphericPressure = "pressure";
export type Camera = "camera";
export type Microphone = "microphone";
export type NFC = "nfc";
export type Bluetooth = "bluetooth";
export type WiFi = "wifi";
export type BiometricAuthentication = "biometrics";
export type Vibrations = "vibration";
export type WhichHardwareFeaturesShouldItHaveAccessTo = (
  | Accelerometer
  | Gyroscope
  | Pedometer
  | Geolocation
  | MagneticField
  | ProximitySensor
  | LightIntensity
  | AtmosphericPressure
  | Camera
  | Microphone
  | NFC
  | Bluetooth
  | WiFi
  | BiometricAuthentication
  | Vibrations
)[];
export type LocalStorage = "local-storage";
export type FileSystem = "file-system";
export type Contacts = "contacts";
export type CallHistory = "call-history";
export type PushNotifications = "push-notifications";
export type InAppBrowser = "browser";
export type WhichSoftwareFeaturesShouldItHaveAccessTo = (
  | LocalStorage
  | FileSystem
  | Contacts
  | CallHistory
  | PushNotifications
  | InAppBrowser
)[];
export type OfflineModeSupport = boolean;
export type SupportForTouchGestures = number;
export type SupportForApplicationLifecycle = number;
export type Security = number;
export type UserInterface = number;

export interface Frameworks {
  name: string;
  url: string;
  description: string;
  criteria: {
    infrastructure: Infrastructure;
    development: Development;
    "application-usage": ApplicationUsage;
  };
}
export interface Infrastructure {
  "mobile-os": WhichMobilePlatformsShouldBeSupported;
  "development-platforms": WhichPlatformsWillBeUsedForDevelopment;
  "free-license": FreeLicense;
  pricing: PricingPolicy;
  microtransactions: SupportForInAppPurchases;
  internationalization: SupportForInternationalization;
  "long-term-feasibility": LongTermFeasibility;
}
export interface Development {
  "custom-ide": CustomIntegratedDevelopmentEnvironmentIDE;
  technologies: WhichTechnologiesShouldItUse;
  "wysiwyg-editor": WYSIWYGEditorForGUIDesign;
  "custom-code-integration": CustomCodeIntegration;
  documentation: Documentation;
  scalability: Scalability;
  "initial-config": InitialProjectConfiguration;
  testing: Testing;
  extensibility: Extensibility;
  maintainability: Maintainability;
  "continuous-deployment": SupportForContinuousIntegrationDeployment;
}
export interface ApplicationUsage {
  hardware: WhichHardwareFeaturesShouldItHaveAccessTo;
  software: WhichSoftwareFeaturesShouldItHaveAccessTo;
  offline: OfflineModeSupport;
  "touch-gestures": SupportForTouchGestures;
  "app-lifecycle": SupportForApplicationLifecycle;
  security: Security;
  "user-interface": UserInterface;
}
