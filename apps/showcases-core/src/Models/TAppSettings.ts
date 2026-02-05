import type { TSpaceSettings } from '@hellpig/anarchy-engine';

export type TAppSettings = Readonly<{
  loopsDebugInfo: boolean;
  spaceSettings: TSpaceSettings;
}>;
