import type { TSpaceSettings } from '@Engine';

export type TAppSettings = Readonly<{
  loopsDebugInfo: boolean;
  spaceSettings: TSpaceSettings;
}>;
