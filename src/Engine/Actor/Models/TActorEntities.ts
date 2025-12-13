import type { TWithCollisions } from '@/Engine/Collisions';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';
import type { TTransformDrive } from '@/Engine/TransformDrive';

export type TActorEntities = Readonly<{
  drive: TTransformDrive;
  model3d: TModel3d;
}> &
  TWithOptionalPhysicsBody &
  TWithSpatial &
  TWithCollisions &
  TWithUpdateSpatialCell;
