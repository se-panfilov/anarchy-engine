import type { TCollisionsDataParams } from '@/Engine/Collisions';
import type { TKinematicParams } from '@/Engine/Kinematic';
import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TSpatialDataParams } from '@/Engine/Spatial';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';
import type { TOptional } from '@/Engine/Utils';

import type { TActorModel3dSettings } from './TActorModel3dSettings';
import type { TActorStates } from './TActorStates';

export type TActorParams = Readonly<{
  driveUpdateDelay?: number;
  driveCoordsThreshold?: number;
  model3dSettings?: TActorModel3dSettings;
  model3dSource: TModel3d;
  physics?: TWithPresetNamePhysicsBodyParams;
  kinematic?: TOptional<TKinematicParams>;
  spatial: TSpatialDataParams;
  collisions?: TCollisionsDataParams;
  states?: TActorStates;
}> &
  Pick<TObject3DParams, 'position' | 'rotation' | 'scale'> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TWithTags;
