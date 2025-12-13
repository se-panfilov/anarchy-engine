import type { Object3D, Vector3 } from 'three';

export type TCollisionCheckResult = Readonly<{
  object: Object3D;
  distance: number;
  collisionPoint: Vector3;
  bulletPosition: Vector3;
}>;
