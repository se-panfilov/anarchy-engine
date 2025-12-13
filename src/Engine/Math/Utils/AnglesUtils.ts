import Decimal from 'decimal.js';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

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
export function getHorizontalAzimuthDeg(center: TWithCoordsXZ, point: TWithCoordsXZ): TDegrees {
  const dx: Decimal = new Decimal(point.x).minus(center.x);
  const dz: Decimal = new Decimal(point.z).minus(center.z);

  let azimuth: Decimal = Decimal.atan2(dz, dx).times(180).div(Math.PI);

  if (azimuth.isNegative()) azimuth = azimuth.plus(360);

  return azimuth.toNumber();
}

// TODO add unit tests
export const getAzimuthRadFromDirection = (direction: Vector3): TRadians => {
  let azimuth: TRadians = Math.atan2(direction.z, direction.x);
  if (azimuth < 0) azimuth += 2 * Math.PI;
  return azimuth;
};
// TODO add unit tests
export const getAzimuthDegFromDirection = (direction: Vector3): TDegrees => radToDeg(getAzimuthRadFromDirection(direction));
// TODO add unit tests
export const getElevationRadFromDirection = (direction: Vector3): TRadians => Math.atan2(direction.y, Math.sqrt(direction.x ** 2 + direction.z ** 2));
// TODO add unit tests
export const getElevationDegFromDirection = (direction: Vector3): TDegrees => radToDeg(getElevationRadFromDirection(direction));
// TODO add unit tests
export const getDirectionFromLinearVelocity = (linearVelocity: Vector3): Vector3 => linearVelocity.clone().normalize();
// TODO add unit tests
export const getSpeedFromLinearVelocity = (linearVelocity: Vector3): number => linearVelocity.length();
// TODO add unit tests
export const getLinearVelocityByDeg = (speed: number, azimuth: TDegrees, elevation: TDegrees): Vector3 => {
  const azimuthRad: TRadians = degToRad(azimuth);
  const elevationRad: TRadians = degToRad(elevation);
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

// TODO add unit tests
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

// TODO add unit tests
export function degreesToEuler(degrees: TWithCoordsXYZ): TWithCoordsXYZ {
  const radians = {
    x: degToRad(degrees.x),
    y: degToRad(degrees.y),
    z: degToRad(degrees.z)
  };

  return {
    x: radians.x,
    y: radians.y,
    z: radians.z
  };
}

// TODO add unit tests
export function degreesToQuaternion(degrees: TWithCoordsXYZ): TWithCoordsXYZW {
  const radians = {
    x: degToRad(degrees.x),
    y: degToRad(degrees.y),
    z: degToRad(degrees.z)
  };

  const euler: Euler = new Euler(radians.x, radians.y, radians.z);
  const quaternion: Quaternion = new Quaternion().setFromEuler(euler);

  return {
    w: quaternion.w,
    x: quaternion.x,
    y: quaternion.y,
    z: quaternion.z
  };
}

// TODO add unit tests
export function quaternionToDegrees(quaternion: TWithCoordsXYZW): TWithCoordsXYZ {
  const q: Quaternion = new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  const euler: Euler = new Euler().setFromQuaternion(q, 'XYZ');

  return {
    x: radToDeg(euler.x),
    y: radToDeg(euler.y),
    z: radToDeg(euler.z)
  };
}
