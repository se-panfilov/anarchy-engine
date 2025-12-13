import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TRaycastBvhService } from './TRaycastBvhService';

export type TCollisionsService = Readonly<{
  // TODO (S.Panfilov) debug sceneW
  createCollisionsWatcher: (actorW: TActorWrapperAsync, radius: number, sceneW: TSceneWrapper) => Readonly<{ checkCollisions: () => TCollisionCheckResult | undefined; stop: () => void }>;
  raycast: TRaycastBvhService;
}>;
