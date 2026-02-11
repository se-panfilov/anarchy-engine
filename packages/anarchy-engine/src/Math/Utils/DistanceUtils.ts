import type { TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';

export function getDistance(pointA: TReadonlyVector3, pointB: TReadonlyVector3): number {
  const dx: number = pointB.x - pointA.x;
  const dy: number = pointB.y - pointA.y;
  const dz: number = pointB.z - pointA.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
