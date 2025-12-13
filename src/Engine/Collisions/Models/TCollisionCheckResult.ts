import type { Vector3 } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';

export type TCollisionCheckResult = Readonly<{
  object: TActorWrapperAsync;
  distance: number;
  collisionPoint: Vector3;
  bulletPosition: Vector3;
}>;
