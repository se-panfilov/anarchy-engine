import Decimal from 'decimal.js';
import { Euler, Quaternion, Vector3 } from 'three';

import type { TEuler } from '@/Engine/Euler';
import type { TDegrees, TRadians } from '@/Engine/Math';
import type { TWithCoordsXYZ, TWithCoordsXYZW, TWithCoordsXZ } from '@/Engine/Mixins';

// TODO (S.Panfilov) add unit tests
export const degToRad = (degrees: TDegrees): Decimal => new Decimal(degrees).times(Math.PI).div(180);
// TODO (S.Panfilov) add unit tests
export const cos = (value: Decimal): Decimal => Decimal.cos(value);
// TODO (S.Panfilov) add unit tests
export const sin = (value: Decimal): Decimal => Decimal.sin(value);
// TODO (S.Panfilov) add unit tests
export const radiansToDegrees = (radians: TRadians): Decimal => new Decimal(radians).times(180).div(Math.PI);

// TODO (S.Panfilov) add unit tests
export function getHorizontalAzimuthDeg(center: TWithCoordsXZ, point: TWithCoordsXZ): TDegrees {
  const dx: Decimal = new Decimal(point.x).minus(center.x);
  const dz: Decimal = new Decimal(point.z).minus(center.z);

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(180).div(Math.PI);

  if (azimuth.isNegative()) azimuth = azimuth.plus(360);

  return azimuth.toNumber();
}

// TODO (S.Panfilov) add unit tests
export const getAzimuthRadFromDirection = (direction: Vector3): TRadians => Math.atan2(direction.z, direction.x);
// TODO (S.Panfilov) add unit tests
export const getAzimuthDegFromDirection = (direction: Vector3): TDegrees => radiansToDegrees(getAzimuthRadFromDirection(direction)).toNumber();
// TODO (S.Panfilov) add unit tests
export const getElevationRadFromDirection = (direction: Vector3): TRadians => Math.atan2(direction.y, Math.sqrt(direction.x ** 2 + direction.z ** 2));
// TODO (S.Panfilov) add unit tests
export const getElevationDegFromDirection = (direction: Vector3): TDegrees => radiansToDegrees(getElevationRadFromDirection(direction)).toNumber();
// TODO (S.Panfilov) add unit tests
export const getDirectionFromLinearVelocity = (linearVelocity: Vector3): Vector3 => linearVelocity.clone().normalize();
// TODO (S.Panfilov) add unit tests
export const getSpeedFromLinearVelocity = (linearVelocity: Vector3): number => linearVelocity.length();
// TODO (S.Panfilov) add unit tests
export const getLinearVelocityByDeg = (speed: number, azimuth: TDegrees, elevation: TDegrees): Vector3 =>
  new Vector3(
    speed * Math.cos(degToRad(elevation).toNumber()) * Math.cos(degToRad(azimuth).toNumber()),
    speed * Math.sin(degToRad(elevation).toNumber()),
    speed * Math.cos(degToRad(elevation).toNumber()) * Math.sin(degToRad(azimuth).toNumber())
  );

// TODO (S.Panfilov) add unit tests
export const getLinearVelocityByRad = (speed: number, azimuth: TRadians, elevation: TRadians): Vector3 =>
  new Vector3(speed * Math.cos(elevation) * Math.cos(azimuth), speed * Math.sin(elevation), speed * Math.cos(elevation) * Math.sin(azimuth));

// TODO (S.Panfilov) add unit tests
export const getSpeedFromAngularVelocity = (angularVelocity: Vector3): number => angularVelocity.length();
// TODO (S.Panfilov) add unit tests
export const getDirectionFromAngularVelocity = (angularVelocity: Vector3): Vector3 => angularVelocity.clone().normalize();

// TODO (S.Panfilov) add unit tests
export function get3DAzimuthDeg(center: TWithCoordsXYZ, point: TWithCoordsXYZ): { azimuth: TDegrees; elevation: TDegrees } {
  const dx: Decimal = new Decimal(point.x).minus(center.x);
  const dy: Decimal = new Decimal(point.y).minus(center.y);
  const dz: Decimal = new Decimal(point.z).minus(center.z);

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(180).div(Math.PI);

  if (azimuth.isNegative()) azimuth = azimuth.plus(360);

  const horizontalDistance: Decimal = Decimal.sqrt(dx.pow(2).plus(dz.pow(2)));
  const elevation: Decimal = Decimal.atan2(dy, horizontalDistance).times(180).div(Math.PI);

  return {
    azimuth: azimuth.toNumber(),
    elevation: elevation.toNumber()
  };
}

// TODO (S.Panfilov) add unit tests
export function get3DAzimuthRad(center: TWithCoordsXYZ, point: TWithCoordsXYZ): { azimuth: TRadians; elevation: TRadians } {
  const dx: Decimal = new Decimal(point.x).minus(center.x);
  const dy: Decimal = new Decimal(point.y).minus(center.y);
  const dz: Decimal = new Decimal(point.z).minus(center.z);

  let azimuth: Decimal = Decimal.atan2(dz, dx);

  if (azimuth.isNegative()) azimuth = azimuth.plus(2 * Math.PI);

  const horizontalDistance: Decimal = Decimal.sqrt(dx.pow(2).plus(dz.pow(2)));
  const elevation: Decimal = Decimal.atan2(dy, horizontalDistance);

  return {
    azimuth: azimuth.toNumber(),
    elevation: elevation.toNumber()
  };
}

// TODO (S.Panfilov) add unit tests
export function degreesToEuler(degrees: TWithCoordsXYZ): TWithCoordsXYZ {
  const radians = {
    x: degToRad(degrees.x),
    y: degToRad(degrees.y),
    z: degToRad(degrees.z)
  };

  return {
    x: radians.x.toNumber(),
    y: radians.y.toNumber(),
    z: radians.z.toNumber()
  };
}

// TODO (S.Panfilov) add unit tests
export function degreesToQuaternion(degrees: TWithCoordsXYZ): TWithCoordsXYZW {
  const radians = {
    x: degToRad(degrees.x),
    y: degToRad(degrees.y),
    z: degToRad(degrees.z)
  };

  const euler: TEuler = new Euler(radians.x.toNumber(), radians.y.toNumber(), radians.z.toNumber());
  const quaternion: Quaternion = new Quaternion().setFromEuler(euler);

  return {
    w: quaternion.w,
    x: quaternion.x,
    y: quaternion.y,
    z: quaternion.z
  };
}

// TODO (S.Panfilov) add unit tests
export function quaternionToDegrees(quaternion: TWithCoordsXYZW): TWithCoordsXYZ {
  const q: Quaternion = new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  const euler: Euler = new Euler().setFromQuaternion(q, 'XYZ');

  return {
    x: radiansToDegrees(euler.x).toNumber(),
    y: radiansToDegrees(euler.y).toNumber(),
    z: radiansToDegrees(euler.z).toNumber()
  };
}
