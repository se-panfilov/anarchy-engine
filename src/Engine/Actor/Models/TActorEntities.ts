import type { TWithCollisions } from '@/Engine/Collisions';
import type { TWithModel3d } from '@/Engine/Models3d';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TActorTransformAgents } from './TActorTransformAgents';
import type { TWithActorStates } from './TWithActorStates';

export type TActorEntities = TWithModel3d & TWithActorStates & TWithTransformDrive<TActorTransformAgents> & TWithSpatial & TWithCollisions & TWithUpdateSpatialCell;
