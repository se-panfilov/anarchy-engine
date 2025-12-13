import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';

export type TCollisionsService = Readonly<{
  // TODO (S.Panfilov) debug sceneW
  checkCollisions: (actorW: TActorWrapperAsync, radius: number, actorsToCheck: ReadonlyArray<TActorWrapperAsync>, sceneW: TSceneWrapper) => TCollisionCheckResult | undefined;
  raycast: TRaycastBvhService;
}>;
