import type { TActorWrapperAsync } from '@/Engine/Actor/Models';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';

export type TCollisionsService = Readonly<{
  checkCollision: (actorW: TActorWrapperAsync, radius: number) => TCollisionCheckResult | null;
  raycast: TRaycastBvhService;
}>;
