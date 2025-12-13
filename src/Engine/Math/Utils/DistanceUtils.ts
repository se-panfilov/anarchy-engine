import Decimal from 'decimal.js';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export function getDistancePrecisely(pointA: TWithCoordsXYZ, pointB: TWithCoordsXYZ): Decimal {
  const dx: Decimal = new Decimal(pointB.x).minus(pointA.x);
  const dy: Decimal = new Decimal(pointB.y).minus(pointA.y);
  const dz: Decimal = new Decimal(pointB.z).minus(pointA.z);
  return Decimal.sqrt(dx.pow(2).plus(dy.pow(2)).plus(dz.pow(2)));
}
