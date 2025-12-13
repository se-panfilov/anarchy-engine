import type { TPlatformApiName, TShowcasesDesktopApi } from '@ShowcasesShared';

// Keep this line. Otherwise, the file will not be recognized as a script, not as a declaration file
export {};

export type TPlatformApiOnWindow = { [K in TPlatformApiName]: TShowcasesDesktopApi };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Window extends TPlatformApiOnWindow {}
}
