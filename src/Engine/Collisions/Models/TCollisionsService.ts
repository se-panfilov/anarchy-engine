import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TSpatialGridWrapper } from '@/Engine/Spatial';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';

export type TCollisionsService = Readonly<{
  checkCollision: (actorW: TActorWrapperAsync, radius: number, spatialGrid: TSpatialGridWrapper) => TCollisionCheckResult | undefined;
  raycast: TRaycastBvhService;
}>;
