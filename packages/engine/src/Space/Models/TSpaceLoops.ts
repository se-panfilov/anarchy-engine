import type { TAudioLoop } from '@/Audio';
import type { TCollisionsLoop } from '@/Collisions';
import type { TControlsLoop } from '@/Controls';
import type { TIntersectionsLoop } from '@/Intersections';
import type { TKeyboardLoop } from '@/Keyboard';
import type { TKinematicLoop } from '@/Kinematic';
import type { TMouseLoop } from '@/Mouse';
import type { TPhysicsLoop } from '@/Physics';
import type { TSpatialLoop } from '@/Spatial';
import type { TTextLoop } from '@/Text';
import type { TTransformLoop } from '@/TransformDrive';

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
  keyboardLoop: TKeyboardLoop;
  mouseLoop: TMouseLoop;
  intersectionsLoop: TIntersectionsLoop;
  controlsLoop: TControlsLoop;
}>;
