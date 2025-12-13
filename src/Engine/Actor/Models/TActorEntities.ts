import type { TWithCollisions } from '@/Engine/Collisions';
import type { TWithModel3d } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';

import type { TActorDriveMixin } from './TActorDriveMixin';

export type TActorEntities = Readonly<{
  drive: TActorDriveMixin;
}> &
  TWithModel3d &
  TWithOptionalPhysicsBody &
  TWithSpatial &
  TWithCollisions &
  TWithUpdateSpatialCell;
