import type { TSpaceDebugFlags } from './TSpaceDebugFlags';
import type { TSpaceLoopsOptions } from './TSpaceLoopsOptions';

export type TSpaceOptions = Readonly<{
  loops: TSpaceLoopsOptions;
  debugFlags: TSpaceDebugFlags;
}>;
