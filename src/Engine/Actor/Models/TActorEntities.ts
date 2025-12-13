import type { TWithCollisions } from '@/Engine/Collisions';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

export type TActorEntities = Readonly<{
  model3d: TModel3d;
}> &
  TWithTransformDrive &
  TWithOptionalPhysicsBody &
  TWithSpatial &
  TWithCollisions &
  TWithUpdateSpatialCell;
