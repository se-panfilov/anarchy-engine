import type { TLoopsSettings } from '@Engine/Loop/Models';
import type { TOptional } from '@Engine/Utils';

import type { TSpaceDebugFlags } from './TSpaceDebugFlags';

// TODO 20-0-0: SPACE: make use of TSpaceOptions in a Space
// TODO 20-0-0: SPACE: Save/Load TSpaceOptions from config (serialization)
export type TSpaceOptions = Readonly<{
  loopsSettings: TOptional<TLoopsSettings>;
  debugFlags: TSpaceDebugFlags;
}>;
