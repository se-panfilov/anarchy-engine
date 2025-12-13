import type { TAudioLoop } from '@Anarchy/Engine/Audio';
import type { TCollisionsLoop } from '@Anarchy/Engine/Collisions';
import type { TControlsLoop } from '@Anarchy/Engine/Controls';
import type { TIntersectionsLoop } from '@Anarchy/Engine/Intersections';
import type { TKinematicLoop } from '@Anarchy/Engine/Kinematic';
import type { TMouseLoop } from '@Anarchy/Engine/Mouse';
import type { TPhysicsLoop } from '@Anarchy/Engine/Physics';
import type { TSpatialLoop } from '@Anarchy/Engine/Spatial';
import type { TTextLoop } from '@Anarchy/Engine/Text';
import type { TTransformLoop } from '@Anarchy/Engine/TransformDrive';

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
