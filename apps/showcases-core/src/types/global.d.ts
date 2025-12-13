import type { TPlatformApiName, TShowcasesDesktopApi } from '@Showcases/Shared';

// Keep this line. Otherwise, the file will not be recognized as a script, not as a declaration file
export {};

export type TPlatformApiOnWindow = { [K in TPlatformApiName]: TShowcasesDesktopApi };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Window extends TPlatformApiOnWindow {}

  //Constants from vite's define
  const __BUILD_META_INFO__: Record<string, string>;
}
