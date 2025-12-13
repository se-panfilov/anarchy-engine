import type { TActorWrapperAsync } from '@/Engine/Actor/Models';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';

export type TCollisionsService = Readonly<{
  checkCollisions: (actorW: TActorWrapperAsync, actorsToCheck: ReadonlyArray<TActorWrapperAsync>, interpolationLengthMultiplier: number, delta: number) => TCollisionCheckResult | undefined;
  bvh: TBvhService;
}>;
