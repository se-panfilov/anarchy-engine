import type { Vector } from '@dimforge/rapier3d/math';
import Decimal from 'decimal.js';
import { Euler, Quaternion } from 'three';

import type { TEuler } from '@/Engine/Euler';
import type { TWithCoordsXYZ, TWithCoordsXYZW, TWithCoordsXZ } from '@/Engine/Mixins';

// TODO (S.Panfilov) add unit tests
export const degToRad = (degrees: number): Decimal => new Decimal(degrees).times(Math.PI).div(180);
// TODO (S.Panfilov) add unit tests
export const cos = (value: Decimal): Decimal => new Decimal(Decimal.cos(value));
// TODO (S.Panfilov) add unit tests
export const sin = (value: Decimal): Decimal => new Decimal(Decimal.sin(value));
// TODO (S.Panfilov) add unit tests
export const radiansToDegrees = (radians: number): Decimal => new Decimal(radians).times(180).div(Math.PI);

// TODO (S.Panfilov) add unit tests
export function getHorizontalAzimuth(center: TWithCoordsXZ, point: TWithCoordsXZ): number {
  const dx: Decimal = new Decimal(point.x).minus(new Decimal(center.x));
  const dz: Decimal = new Decimal(point.z).minus(new Decimal(center.z));

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(new Decimal(180).div(new Decimal(Math.PI)));

  if (azimuth.isNegative()) azimuth = azimuth.plus(new Decimal(360));

  return azimuth.toNumber();
}

// TODO (S.Panfilov) add unit tests
export const getAzimuthByLinearVelocity = (linearVelocity: Vector): number => Math.atan2(linearVelocity.z, linearVelocity.x) * (180 / Math.PI);
// TODO (S.Panfilov) add unit tests
export const getElevationByLinearVelocity = (linearVelocity: Vector): number => Math.atan2(linearVelocity.y, Math.sqrt(linearVelocity.x ** 2 + linearVelocity.z ** 2)) * (180 / Math.PI);
// TODO (S.Panfilov) add unit tests
export const getSpeedByLinearVelocity = (linearVelocity: Vector): number => Math.sqrt(linearVelocity.x ** 2 + linearVelocity.y ** 2 + linearVelocity.z ** 2);
// TODO (S.Panfilov) add unit tests
export const getLinearVelocity = (speed: number, azimuth: number, elevation: number): Vector => ({
  x: speed * Math.cos(elevation) * Math.cos(azimuth),
  y: speed * Math.sin(elevation),
  z: speed * Math.cos(elevation) * Math.sin(azimuth)
});

// TODO (S.Panfilov) add unit tests
export function get3DAzimuth(center: TWithCoordsXYZ, point: TWithCoordsXYZ): { azimuth: number; elevation: number } {
  const dx: Decimal = new Decimal(point.x).minus(new Decimal(center.x));
  const dy: Decimal = new Decimal(point.y).minus(new Decimal(center.y));
  const dz: Decimal = new Decimal(point.z).minus(new Decimal(center.z));

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(new Decimal(180).div(new Decimal(Math.PI)));

  if (azimuth.isNegative()) azimuth = azimuth.plus(new Decimal(360));

  const horizontalDistance: Decimal = Decimal.sqrt(dx.pow(2).plus(dz.pow(2)));

  const elevation: Decimal = Decimal.atan2(dy, horizontalDistance).times(new Decimal(180).div(new Decimal(Math.PI)));

  return {
    azimuth: azimuth.toNumber(),
    elevation: elevation.toNumber()
  };
}

// TODO (S.Panfilov) add unit tests
export function degreesToEuler(degrees: TWithCoordsXYZ): TWithCoordsXYZ {
  // TODO (S.Panfilov) can I use "degToRad" here?
  const radians = {
    x: new Decimal(degrees.x).times(Decimal.acos(-1).div(180)),
    y: new Decimal(degrees.y).times(Decimal.acos(-1).div(180)),
    z: new Decimal(degrees.z).times(Decimal.acos(-1).div(180))
  };

  return {
    x: radians.x.toNumber(),
    y: radians.y.toNumber(),
    z: radians.z.toNumber()
  };
}

// TODO (S.Panfilov) add unit tests
export function degreesToQuaternion(degrees: TWithCoordsXYZ): TWithCoordsXYZW {
  // TODO (S.Panfilov) can I use "degToRad" here?
  const radians = {
    x: new Decimal(degrees.x).times(Decimal.acos(-1).div(180)),
    y: new Decimal(degrees.y).times(Decimal.acos(-1).div(180)),
    z: new Decimal(degrees.z).times(Decimal.acos(-1).div(180))
  };

  const euler: TEuler = new Euler(radians.x.toNumber(), radians.y.toNumber(), radians.z.toNumber());
  const quaternion: Quaternion = new Quaternion().setFromEuler(euler);

  return {
    w: new Decimal(quaternion.w).toNumber(),
    x: new Decimal(quaternion.x).toNumber(),
    y: new Decimal(quaternion.y).toNumber(),
    z: new Decimal(quaternion.z).toNumber()
  };
}

// TODO (S.Panfilov) add unit tests
export function quaternionToDegrees(quaternion: TWithCoordsXYZW): TWithCoordsXYZ {
  const q: Quaternion = new Quaternion(new Decimal(quaternion.x).toNumber(), new Decimal(quaternion.y).toNumber(), new Decimal(quaternion.z).toNumber(), new Decimal(quaternion.w).toNumber());

  const euler = new Euler().setFromQuaternion(q, 'XYZ');

  const degrees = {
    x: radiansToDegrees(euler.x).toNumber(),
    y: radiansToDegrees(euler.y).toNumber(),
    z: radiansToDegrees(euler.z).toNumber()
  };

  return degrees;
}
