import type { TWithCollisions } from '@/Engine/Collisions';
import type { TWithKinematic } from '@/Engine/Kinematic';
import type { TWithModel3d } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';

export type TActorEntities = TWithModel3d & TWithOptionalPhysicsBody & TWithKinematic & TWithSpatial & TWithCollisions & TWithUpdateSpatialCell;
