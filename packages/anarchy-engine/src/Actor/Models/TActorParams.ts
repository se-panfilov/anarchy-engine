import type { TCollisionsDataParams } from '@Anarchy/Engine/Collisions';
import type { TKinematicParams } from '@Anarchy/Engine/Kinematic';
import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TModel3d } from '@Anarchy/Engine/Models3d';
import type { TPhysicsBody } from '@Anarchy/Engine/Physics';
import type { TSpatialDataParams } from '@Anarchy/Engine/Spatial';
import type { TObject3DParams } from '@Anarchy/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Anarchy/Engine/TransformDrive';
import type { TOptional } from '@Anarchy/Shared/Utils';

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
