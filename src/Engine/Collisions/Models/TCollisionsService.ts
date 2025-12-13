import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridWrapper } from '@/Engine/Spatial';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';

export type TCollisionsService = Readonly<{
  // TODO (S.Panfilov) debug sceneW
  checkCollision: (actorW: TActorWrapperAsync, radius: number, spatialGrid: TSpatialGridWrapper, sceneW: TSceneWrapper) => TCollisionCheckResult | undefined;
  raycast: TRaycastBvhService;
}>;
