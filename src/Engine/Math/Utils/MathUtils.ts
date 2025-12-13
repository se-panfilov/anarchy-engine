import Decimal from 'decimal.js';

import type { TWithCoordsXZ } from '@/Engine/Mixins';

export const degToRad = (degrees: number): Decimal => new Decimal(degrees).times(Math.PI).div(180);
export const cos = (value: Decimal): Decimal => new Decimal(Math.cos(value.toNumber()));
export const sin = (value: Decimal): Decimal => new Decimal(Math.sin(value.toNumber()));

export function getHorizontalAzimuth(center: TWithCoordsXZ, point: TWithCoordsXZ): number {
  const dx: Decimal = new Decimal(point.x).minus(new Decimal(center.x));
  const dz: Decimal = new Decimal(point.z).minus(new Decimal(center.z));

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(new Decimal(180).div(new Decimal(Math.PI)));

  if (azimuth.isNegative()) azimuth = azimuth.plus(new Decimal(360));

  return azimuth.toNumber();
}
