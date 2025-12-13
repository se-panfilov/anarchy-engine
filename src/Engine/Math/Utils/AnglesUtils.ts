import Decimal from 'decimal.js';
import type { EulerOrder, QuaternionLike } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad, euclideanModulo, radToDeg } from 'three/src/math/MathUtils';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TDegrees, TRadians } from '@/Engine/Math';

// TODO add unit tests
export const degToRadPrecise = (degrees: TDegrees): Decimal => new Decimal(degrees).times(Math.PI).div(180);
// TODO add unit tests
export const cosPrecise = (value: Decimal): Decimal => Decimal.cos(value);
// TODO add unit tests
export const sinPrecise = (value: Decimal): Decimal => Decimal.sin(value);
// TODO add unit tests
export const radiansToDegreesPrecise = (radians: TRadians): Decimal => new Decimal(radians).times(180).div(Math.PI);

// TODO add unit tests
export function getHorizontalAzimuthDeg(x: number, z: number, point: Vector3Like): TDegrees {
  const dx: Decimal = new Decimal(point.x).minus(x);
  const dz: Decimal = new Decimal(point.z).minus(z);

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(180).div(Math.PI);

  azimuth = azimuth.plus(90).neg().plus(180);

  if (azimuth.isNegative()) azimuth = azimuth.plus(360);
  if (azimuth.gte(360)) azimuth = azimuth.minus(360);

  return azimuth.toNumber() as TDegrees;
}

// TODO add unit tests
export const getAzimuthRadFromDirection = (direction: Vector3Like): TRadians => {
  let azimuth: TRadians = Math.atan2(direction.z, direction.x) as TRadians;
  if (azimuth < 0) (azimuth as number) += 2 * Math.PI;
  return azimuth;
};
// TODO add unit tests
export const getAzimuthDegFromDirection = (direction: Vector3Like): TDegrees => radToDeg(getAzimuthRadFromDirection(direction)) as TDegrees;
// TODO add unit tests
export const getElevationRadFromDirection = (direction: Vector3Like): TRadians => Math.atan2(direction.y, Math.sqrt(direction.x ** 2 + direction.z ** 2)) as TRadians;
// TODO add unit tests
export const getElevationDegFromDirection = (direction: Vector3Like): TDegrees => radToDeg(getElevationRadFromDirection(direction)) as TDegrees;
// TODO add unit tests
export const getDirectionFromLinearVelocity = (linearVelocity: Vector3): Vector3 => linearVelocity.clone().normalize();
// TODO add unit tests
export const getSpeedFromLinearVelocity = (linearVelocity: Vector3): number => linearVelocity.length();
// TODO add unit tests
export const getLinearVelocityByDeg = (speed: number, azimuth: TDegrees, elevation: TDegrees): Vector3 => {
  const azimuthRad: TRadians = degToRad(azimuth) as TRadians;
  const elevationRad: TRadians = degToRad(elevation) as TRadians;
  return new Vector3(speed * Math.cos(elevationRad) * Math.cos(azimuthRad), speed * Math.sin(elevationRad), speed * Math.cos(elevationRad) * Math.sin(azimuthRad));
};

// TODO add unit tests
export const getLinearVelocityByRad = (speed: number, azimuth: TRadians, elevation: TRadians): Vector3 =>
  new Vector3(speed * Math.cos(elevation) * Math.cos(azimuth), speed * Math.sin(elevation), speed * Math.cos(elevation) * Math.sin(azimuth));

// TODO add unit tests
export const getSpeedFromAngularVelocity = (angularVelocity: Vector3): number => angularVelocity.length();

// TODO add unit tests
export const getDirectionFromAngularVelocity = (angularVelocity: Vector3): Vector3 => angularVelocity.clone().normalize();

// TODO add unit tests
export function get3DAzimuthDeg(center: Vector3Like, point: Vector3Like): { azimuth: TDegrees; elevation: TDegrees } {
  const dx: Decimal = new Decimal(point.x).minus(center.x);
  const dy: Decimal = new Decimal(point.y).minus(center.y);
  const dz: Decimal = new Decimal(point.z).minus(center.z);

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(180).div(Math.PI);

  if (azimuth.isNegative()) azimuth = azimuth.plus(360);

  const horizontalDistance: Decimal = Decimal.sqrt(dx.pow(2).plus(dz.pow(2)));
  const elevation: Decimal = Decimal.atan2(dy, horizontalDistance).times(180).div(Math.PI);

  return {
    azimuth: azimuth.toNumber() as TDegrees,
    elevation: elevation.toNumber() as TDegrees
  };
}

// TODO add unit tests
export function get3DAzimuthRad(center: Vector3Like, point: Vector3Like): { azimuth: TRadians; elevation: TRadians } {
  const dx: Decimal = new Decimal(point.x).minus(center.x);
  const dy: Decimal = new Decimal(point.y).minus(center.y);
  const dz: Decimal = new Decimal(point.z).minus(center.z);

  let azimuth: Decimal = Decimal.atan2(dz, dx);

  if (azimuth.isNegative()) azimuth = azimuth.plus(2 * Math.PI);

  const horizontalDistance: Decimal = Decimal.sqrt(dx.pow(2).plus(dz.pow(2)));
  const elevation: Decimal = Decimal.atan2(dy, horizontalDistance);

  return {
    azimuth: azimuth.toNumber() as TRadians,
    elevation: elevation.toNumber() as TRadians
  };
}

// TODO add unit tests
export function degreesToEuler(degrees: Vector3Like): Vector3 {
  const radians = {
    x: degToRad(degrees.x),
    y: degToRad(degrees.y),
    z: degToRad(degrees.z)
  };

  return new Vector3(radians.x, radians.y, radians.z);
}

// TODO add unit tests
export function degreesToQuaternion(degrees: Vector3Like): Quaternion {
  const radians = {
    x: degToRad(degrees.x),
    y: degToRad(degrees.y),
    z: degToRad(degrees.z)
  };

  const euler: Euler = new Euler(radians.x, radians.y, radians.z);
  return new Quaternion().setFromEuler(euler);
}

// TODO add unit tests
export function quaternionToDegrees(quaternion: QuaternionLike): Vector3 {
  const q: Quaternion = new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  const euler: Euler = new Euler().setFromQuaternion(q, 'XYZ');

  return new Vector3(radToDeg(euler.x), radToDeg(euler.y), radToDeg(euler.z));
}

export function applyRotationOffsetWithReorder(target: Euler, source: Euler, offset: Euler, order: EulerOrder = 'XYZ'): void {
  source.reorder(order);

  target.set(source.x + offset.x, source.y + offset.y, source.z + offset.z, order);

  target.set(euclideanModulo(target.x + Math.PI, Math.PI * 2) - Math.PI, euclideanModulo(target.y + Math.PI, Math.PI * 2) - Math.PI, euclideanModulo(target.z + Math.PI, Math.PI * 2) - Math.PI);
}
