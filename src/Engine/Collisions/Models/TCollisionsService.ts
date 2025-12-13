import type { TActorWrapper } from '@/Engine/Actor/Models';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';

export type TCollisionsService = Readonly<{
  checkCollisions: (actorW: TActorWrapper, actorsToCheck: ReadonlyArray<TActorWrapper>, interpolationLengthMultiplier: number, delta: number) => TCollisionCheckResult | undefined;
  bvh: TBvhService;
}>;
