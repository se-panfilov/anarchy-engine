import type { Vector3 } from 'three';

import type { TActorWrapper } from '@/Engine/Actor';

export type TCollisionCheckResult = Readonly<{
  object: TActorWrapper;
  distance: number;
  collisionPoint: Vector3;
  bulletPosition: Vector3;
}>;
