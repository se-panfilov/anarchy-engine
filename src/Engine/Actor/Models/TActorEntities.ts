import type { TWithCollisions } from '@/Engine/Collisions';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TActorTransformAgents } from './TActorTransformAgents';

export type TActorEntities = Readonly<{
  model3d: TModel3d;
  states: Record<string, any>;
}> &
  TWithTransformDrive<TActorTransformAgents> &
  TWithSpatial &
  TWithCollisions &
  TWithUpdateSpatialCell;
