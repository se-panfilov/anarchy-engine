import type { TWithCollisions } from '@hellpig/anarchy-engine/Collisions';
import type { TWithModel3d } from '@hellpig/anarchy-engine/Models3d';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@hellpig/anarchy-engine/Spatial/Models';
import type { TWithTransformDrive } from '@hellpig/anarchy-engine/TransformDrive';

import type { TActorTransformAgents } from './TActorTransformAgents';
import type { TWithActorStates } from './TWithActorStates';

export type TActorEntities = TWithModel3d & TWithActorStates & TWithTransformDrive<TActorTransformAgents> & TWithSpatial & TWithCollisions & TWithUpdateSpatialCell;
