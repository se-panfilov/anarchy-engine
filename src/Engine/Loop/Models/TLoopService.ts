import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { LoopType } from '@/Engine/Loop/Constants';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop } from '@/Engine/Space';
import type { TSpatialLoop } from '@/Engine/Spatial';

import type { TLoop } from './TLoop';

export type TLoopService = Readonly<{
  createRenderLoop: (name: string, type: LoopType, fn?: (cb: FrameRequestCallback) => number, showDebugInfo?: boolean) => TLoop;
  createIntervalLoop: (name: string, type: LoopType, interval: TMilliseconds) => TLoop;
  getCollisionsLoop: (name?: string) => TCollisionsLoop | never;
  getKinematicLoop: (name?: string) => TKinematicLoop | never;
  getPhysicalLoop: (name?: string) => TPhysicalLoop | never;
  getRenderLoop: (name?: string) => TRenderLoop | never;
  getSpatialLoop: (name?: string) => TSpatialLoop | never;
  getLoop: (name: string | undefined, type: LoopType) => TLoop | never;
}> &
  TDestroyable;
