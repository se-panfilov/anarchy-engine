import type { Vector3 } from 'three';

export function getDistance(pointA: Vector3, pointB: Vector3): number {
  const dx: number = pointB.x - pointA.x;
  const dy: number = pointB.y - pointA.y;
  const dz: number = pointB.z - pointA.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
