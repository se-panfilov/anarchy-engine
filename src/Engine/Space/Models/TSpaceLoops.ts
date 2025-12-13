import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';

import type { TRenderLoop } from './TRenderLoop';

export type TSpaceLoops = Readonly<{
  renderLoop: TRenderLoop;
  collisionsLoop: TCollisionsLoop;
  kinematicLoop: TKinematicLoop;
  physicalLoop: TPhysicalLoop;
  spatialLoop: TSpatialLoop;
  transformLoop: TTransformLoop;
  textLoop: TTextLoop;
  keyboardLoop: TKeyboardLoop;
  mouseLoop: TMouseLoop;
  intersectionsLoop: TIntersectionsLoop;
  controlsLoop: TControlsLoop;
}>;
