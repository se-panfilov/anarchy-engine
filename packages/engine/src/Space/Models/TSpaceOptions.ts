import type { TLoopsSettings } from '@Engine/Loop/Models';

import type { TSpaceDebugFlags } from './TSpaceDebugFlags';

export type TSpaceOptions = Readonly<{
  loopsSettings: TLoopsSettings;
  debugFlags: TSpaceDebugFlags;
}>;
