import type { TLoopsSettings } from '@Engine/Loop/Models';
import type { TOptional } from '@Engine/Utils';

// TODO 20-0-0: SPACE: make use of TSpaceSettings in a Space
// TODO 20-0-0: SPACE: Save/Load TSpaceSettings from config (serialization)
export type TSpaceSettings = Readonly<{
  loopsSettings: TOptional<TLoopsSettings>;
}>;
