import type { TWithCollisions } from '@/Collisions';
import type { TWithModel3d } from '@/Models3d';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Spatial/Models';
import type { TWithTransformDrive } from '@/TransformDrive';

import type { TActorTransformAgents } from './TActorTransformAgents';
import type { TWithActorStates } from './TWithActorStates';

export type TActorEntities = TWithModel3d & TWithActorStates & TWithTransformDrive<TActorTransformAgents> & TWithSpatial & TWithCollisions & TWithUpdateSpatialCell;
