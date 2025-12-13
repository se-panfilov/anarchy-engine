import type { TSpaceSettings } from '@Anarchy/Engine';

export type TAppSettings = Readonly<{
  loopsDebugInfo: boolean;
  spaceSettings: TSpaceSettings;
}>;
