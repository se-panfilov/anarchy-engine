import type { TActorWrapperAsync } from '@/Engine/Actor/Models';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';

export type TCollisionsService = Readonly<{
  checkCollisions: (actorW: TActorWrapperAsync, radius: number, actorsToCheck: ReadonlyArray<TActorWrapperAsync>) => TCollisionCheckResult | undefined;
  bvh: TBvhService;
}>;
