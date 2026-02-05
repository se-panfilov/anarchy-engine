import type { TAudioLoop } from '@hellpig/anarchy-engine/Audio';
import type { TCollisionsLoop } from '@hellpig/anarchy-engine/Collisions';
import type { TControlsLoop } from '@hellpig/anarchy-engine/Controls';
import type { TIntersectionsLoop } from '@hellpig/anarchy-engine/Intersections';
import type { TKinematicLoop } from '@hellpig/anarchy-engine/Kinematic';
import type { TMouseLoop } from '@hellpig/anarchy-engine/Mouse';
import type { TPhysicsLoop } from '@hellpig/anarchy-engine/Physics';
import type { TSpatialLoop } from '@hellpig/anarchy-engine/Spatial';
import type { TTextLoop } from '@hellpig/anarchy-engine/Text';
import type { TTransformLoop } from '@hellpig/anarchy-engine/TransformDrive';

import type { TRenderLoop } from './TRenderLoop';

export type TSpaceLoops = Readonly<{
  renderLoop: TRenderLoop;
  audioLoop: TAudioLoop;
  collisionsLoop: TCollisionsLoop;
  kinematicLoop: TKinematicLoop;
  physicsLoop: TPhysicsLoop;
  spatialLoop: TSpatialLoop;
  transformLoop: TTransformLoop;
  textLoop: TTextLoop;
  mouseLoop: TMouseLoop;
  intersectionsLoop: TIntersectionsLoop;
  controlsLoop: TControlsLoop;
}>;
