import type { TActor } from '@/Engine/Actor/Models';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';

export type TCollisionsService = Readonly<{
  checkCollisions: (actor: TActor, actorsToCheck: ReadonlyArray<TActor>, interpolationLengthMultiplier: number, delta: number) => TCollisionCheckResult | undefined;
  bvh: TBvhService;
}>;
