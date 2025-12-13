import type { TActorWrapperAsync } from '@/Engine/Actor/Models';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';

export type TCollisionsService = Readonly<{
  checkCollisions: (actorW: TActorWrapperAsync, radius: number, actorsToCheck: ReadonlyArray<TActorWrapperAsync>) => TCollisionCheckResult | undefined;
  raycast: TRaycastBvhService;
}>;
