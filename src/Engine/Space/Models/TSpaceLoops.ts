import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TSpatialLoop } from '@/Engine/Spatial';

import type { TRenderLoop } from './TRenderLoop';

export type TSpaceLoops = Readonly<{
  renderLoop: TRenderLoop;
  collisionsLoop: TCollisionsLoop;
  kinematicLoop: TKinematicLoop;
  physicalLoop: TPhysicalLoop;
  spatialLoop: TSpatialLoop;
}>;
