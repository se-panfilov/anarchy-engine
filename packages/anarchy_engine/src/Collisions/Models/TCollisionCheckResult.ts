import type { TActor } from '@Engine/Actor';
import type { Vector3 } from 'three';

export type TCollisionCheckResult = Readonly<{
  object: TActor;
  distance: number;
  collisionPoint: Vector3;
  bulletPosition: Vector3;
}>;
