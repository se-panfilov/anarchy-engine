import Decimal from 'decimal.js';
import type { EulerOrder, QuaternionLike } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad, euclideanModulo, radToDeg } from 'three/src/math/MathUtils';
import type { Vector3Like } from 'three/src/math/Vector3';

import { metersPerSecond } from '@/Engine/Distance';
import type { TDegrees, TMetersPerSecond, TRadians } from '@/Engine/Math';
import type { TEulerLike } from '@/Engine/ThreeLib';
import { isEulerLike, isQuaternionLike } from '@/Engine/Utils';

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
  return radToDeg(getHorizontalAzimuth(x, z, point)) as TDegrees;
}

export function getHorizontalAzimuth(x: number, z: number, point: Vector3Like): TRadians {
  const dx: number = point.x - x;
  const dz: number = point.z - z;

  let azimuthRad: number = Math.atan2(dz, dx);
  azimuthRad = -azimuthRad + Math.PI / 2;
  azimuthRad = euclideanModulo(azimuthRad, Math.PI * 2);

  return azimuthRad as TRadians;
}

// TODO add unit tests
export const getAzimuthFromDirection = (direction: Vector3Like): TRadians => {
  let azimuth: TRadians = Math.atan2(direction.z, direction.x) as TRadians;
  if (azimuth < 0) (azimuth as number) += 2 * Math.PI;
  return azimuth;
};

// TODO add unit tests
export const getAzimutFromQuaternionDirection = (quaternion: QuaternionLike): TRadians => {
  const { x, y, z, w } = quaternion;

  // Calculate azimuth using the quaternion components
  const sinY: number = 2 * (w * y + z * x);
  const cosY: number = 1 - 2 * (x * x + y * y);

  let azimuth: TRadians = Math.atan2(sinY, cosY) as TRadians;

  // Normalize azimuth to range [0, 2π]
  if (azimuth < 0) (azimuth as number) += 2 * Math.PI;

  return azimuth;
};

// TODO add unit tests
export const getAzimuthDegFromDirection = (direction: Vector3Like): TDegrees => radToDeg(getAzimuthFromDirection(direction)) as TDegrees;
// TODO add unit tests
export const getElevationFromDirection = (direction: Vector3Like): TRadians => Math.atan2(direction.y, Math.sqrt(direction.x ** 2 + direction.z ** 2)) as TRadians;
// TODO add unit tests
export const getElevationFromQuaternionDirection = (quaternion: QuaternionLike): TRadians => {
  const { x, y, z, w } = quaternion;
  return Math.asin(2 * (w * x - y * z)) as TRadians;
};

// TODO add unit tests
export const getDirectionFromLinearVelocity = (linearVelocity: Vector3): Vector3 => linearVelocity.clone().normalize();
// TODO add unit tests
export const getSpeedFromLinearVelocity = (linearVelocity: Vector3): TMetersPerSecond => metersPerSecond(linearVelocity.length());
// TODO add unit tests
export const getLinearVelocityByDeg = (speed: TMetersPerSecond, azimuth: TDegrees, elevation: TDegrees): Vector3 => {
  const azimuthRad: TRadians = degToRad(azimuth) as TRadians;
  const elevationRad: TRadians = degToRad(elevation) as TRadians;
  return new Vector3(speed * Math.cos(elevationRad) * Math.cos(azimuthRad), speed * Math.sin(elevationRad), speed * Math.cos(elevationRad) * Math.sin(azimuthRad));
};

// TODO add unit tests
export const getLinearVelocity = (speed: TMetersPerSecond, azimuth: TRadians, elevation: TRadians): Vector3 =>
  new Vector3(speed * Math.cos(elevation) * Math.cos(azimuth), speed * Math.sin(elevation), speed * Math.cos(elevation) * Math.sin(azimuth));

// TODO add unit tests
export const getSpeedFromAngularVelocity = (angularVelocity: Quaternion): TMetersPerSecond => metersPerSecond(angularVelocity.length());

// TODO add unit tests
export const getDirectionFromAngularVelocity = (angularVelocity: Quaternion): Quaternion => angularVelocity.clone().normalize();

// TODO add unit tests
export function get3DAzimuth(center: Vector3Like, point: Vector3Like): { azimuth: TRadians; elevation: TRadians } {
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

export function toQuaternion(quaternionOrEuler: QuaternionLike | TEulerLike): Quaternion | never {
  if (isQuaternionLike(quaternionOrEuler)) return new Quaternion(quaternionOrEuler.x, quaternionOrEuler.y, quaternionOrEuler.z, quaternionOrEuler.w);
  if (isEulerLike(quaternionOrEuler)) return new Quaternion().setFromEuler(new Euler(quaternionOrEuler.x, quaternionOrEuler.y, quaternionOrEuler.z));
  throw new Error('Entity must be Quaternion or Euler, but it is something else');
}
