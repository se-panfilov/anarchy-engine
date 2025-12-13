import type { TActorWrapperAsync } from '@/Engine/Actor/Models';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';
import type { TSpatialGridService } from './TSpatialGridService';

export type TCollisionsService = Readonly<{
  checkCollision: (actorW: TActorWrapperAsync, radius: number) => TCollisionCheckResult | null;
  grid: TSpatialGridService;
  raycast: TRaycastBvhService;
}>;
