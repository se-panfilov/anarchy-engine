import type { TCollisionsDataParams } from '@/Collisions';
import type { TKinematicParams } from '@/Kinematic';
import type { TWithName, TWithTags } from '@/Mixins';
import type { TModel3d } from '@/Models3d';
import type { TPhysicsBody } from '@/Physics';
import type { TSpatialDataParams } from '@/Spatial';
import type { TObject3DParams } from '@/ThreeLib';
import type { TWithTransformAgentParam } from '@/TransformDrive';
import type { TOptional } from '@/Utils';

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
