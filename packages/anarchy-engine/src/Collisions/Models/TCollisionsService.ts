import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TActor } from '@Anarchy/Engine/Actor/Models';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';

export type TCollisionsService = TAbstractService &
  Readonly<{
    checkCollisions: (actor: TActor, actorsToCheck: ReadonlyArray<TActor>, interpolationLengthMultiplier: number, delta: number) => TCollisionCheckResult | undefined;
    bvh: TBvhService;
  }>;
