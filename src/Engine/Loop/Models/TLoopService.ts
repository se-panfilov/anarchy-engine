import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TLoop } from './TLoop';

export type TLoopService = Readonly<{
  createRenderLoop: (fn?: (cb: FrameRequestCallback) => number, showDebugInfo?: boolean) => TLoop;
  createIntervalLoop: (interval: TMilliseconds) => TLoop;
}> &
  TDestroyable;
