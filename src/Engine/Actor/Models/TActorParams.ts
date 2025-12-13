import type { TCollisionsDataParams } from '@/Engine/Collisions';
import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TSpatialDataParams } from '@/Engine/Spatial';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TActorModel3dSettings } from './TActorModel3dSettings';
import type { TActorStates } from './TActorStates';

export type TActorParams = Readonly<{
  model3dSettings?: TActorModel3dSettings;
  model3dSource: TModel3d;
  physics?: TWithPresetNamePhysicsBodyParams;
  spatial: TSpatialDataParams;
  collisions?: TCollisionsDataParams;
  states?: TActorStates;
}> &
  Pick<TObject3DParams, 'position' | 'rotation' | 'scale'> &
  TWithTransformAgentParam &
  TWithName &
  TWithTags;
