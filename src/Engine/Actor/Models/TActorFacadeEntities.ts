import type { TWithCollisions } from '@/Engine/Collisions';
import type { TWithKinematic } from '@/Engine/Kinematic';
import type { TWithModel3dFacade } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';

export type TActorFacadeEntities = TWithModel3dFacade & TWithOptionalPhysicsBody & TWithKinematic & TWithSpatial & TWithCollisions & TWithUpdateSpatialCell;
