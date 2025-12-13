import type { TActorWrapperAsync } from '@/Engine/Actor/Models';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TSpatialGridService } from './TSpatialGridService';

export type TCollisionsService = Readonly<{
  checkCollision: (actorW: TActorWrapperAsync, radius: number) => TCollisionCheckResult | null;
}> &
  TSpatialGridService &
  TBvhService;
