import type { TCollisionsDataParams } from '@/Engine/Collisions';
import type { TKinematicParams } from '@/Engine/Kinematic';
import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TModel3d } from '@/Engine/Models3d';
import type { TPhysicsBody } from '@/Engine/Physics';
import type { TSpatialDataParams } from '@/Engine/Spatial';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';
import type { TOptional } from '@/Engine/Utils';

import type { TActorModel3dSettings } from './TActorModel3dSettings';
import type { TActorStates } from './TActorStates';

export type TActorParams = Readonly<{
  collisions?: TCollisionsDataParams;
  kinematic?: TOptional<TKinematicParams>;
  model3dSettings?: TActorModel3dSettings;
  model3dSource: TModel3d;
  physicsBody?: TPhysicsBody;
  spatial: TSpatialDataParams;
  states?: TActorStates;
}> &
  Pick<TObject3DParams, 'position' | 'rotation' | 'scale'> &
  TWithTransformAgentParam &
  TWithName &
  TWithTags;
