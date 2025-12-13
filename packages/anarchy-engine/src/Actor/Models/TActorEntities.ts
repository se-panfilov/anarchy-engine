import type { TWithCollisions } from '@Anarchy/Engine/Collisions';
import type { TWithModel3d } from '@Anarchy/Engine/Models3d';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@Anarchy/Engine/Spatial/Models';
import type { TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';

import type { TActorTransformAgents } from './TActorTransformAgents';
import type { TWithActorStates } from './TWithActorStates';

export type TActorEntities = TWithModel3d & TWithActorStates & TWithTransformDrive<TActorTransformAgents> & TWithSpatial & TWithCollisions & TWithUpdateSpatialCell;
