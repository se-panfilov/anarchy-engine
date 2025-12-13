import type { TCollisionsLoop } from './TCollisionsLoop';
import type { TKinematicLoop } from './TKinematicLoop';
import type { TPhysicalLoop } from './TPhysicalLoop';
import type { TRenderLoop } from './TRenderLoop';
import type { TSpatialLoop } from './TSpatialLoop';

export type TSpaceLoops = Readonly<{
  renderLoop: TRenderLoop;
  collisionsLoop: TCollisionsLoop;
  kinematicLoop: TKinematicLoop;
  physicalLoop: TPhysicalLoop;
  spatialLoop: TSpatialLoop;
}>;
