import type { TCollisionsDataParams } from '@hellpig/anarchy-engine/Collisions';
import type { TKinematicParams } from '@hellpig/anarchy-engine/Kinematic';
import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TModel3d } from '@hellpig/anarchy-engine/Models3d';
import type { TPhysicsBody } from '@hellpig/anarchy-engine/Physics';
import type { TSpatialDataParams } from '@hellpig/anarchy-engine/Spatial';
import type { TObject3DParams } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithTransformAgentParam } from '@hellpig/anarchy-engine/TransformDrive';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';

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
