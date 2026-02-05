import type { TActor } from '@hellpig/anarchy-engine/Actor';
import type { Vector3 } from 'three';

export type TCollisionCheckResult = Readonly<{
  object: TActor;
  distance: number;
  collisionPoint: Vector3;
  bulletPosition: Vector3;
}>;
