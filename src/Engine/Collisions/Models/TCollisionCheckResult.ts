import type { Vector3 } from 'three';

import type { TActor } from '@/Engine/Actor';

export type TCollisionCheckResult = Readonly<{
  object: TActor;
  distance: number;
  collisionPoint: Vector3;
  bulletPosition: Vector3;
}>;
