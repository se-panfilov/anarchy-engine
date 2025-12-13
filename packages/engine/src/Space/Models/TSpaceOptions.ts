import type { TLoopsSettings } from '@Engine/Loop/Models';

import type { TSpaceDebugFlags } from './TSpaceDebugFlags';

// TODO 20-0-0: SPACE: make use of TSpaceOptions in a Space
// TODO 20-0-0: SPACE: Save/Load TSpaceOptions from config (serialization)
export type TSpaceOptions = Readonly<{
  loopsSettings: TLoopsSettings;
  debugFlags: TSpaceDebugFlags;
}>;
