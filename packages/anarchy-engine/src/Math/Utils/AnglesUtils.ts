import { metersPerSecond, radiansPerSecond } from '@Anarchy/Engine/Distance';
import { ForwardAxis } from '@Anarchy/Engine/Kinematic/Constants';
import type { TDegrees, TMetersPerSecond, TRadians, TRadiansPerSecond } from '@Anarchy/Engine/Math';
import type { TEulerLike } from '@Anarchy/Engine/ThreeLib';
import { isEulerLike, isQuaternionLike } from '@Anarchy/Engine/Utils/CheckUtils';
import type { EulerOrder, QuaternionLike, Vector3Like } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad, euclideanModulo, radToDeg } from 'three/src/math/MathUtils';

export function getHorizontalAzimuth(x: number, z: number, point: Vector3Like, forwardAxis: ForwardAxis): TRadians {
  const dx: number = point.x - x;
  const dz: number = point.z - z;

  let azimuthRad: number = Math.atan2(dz, dx);
  if (forwardAxis.toLocaleLowerCase() === 'Z'.toLocaleLowerCase()) azimuthRad = -azimuthRad + Math.PI / 2;
  azimuthRad = euclideanModulo(azimuthRad, Math.PI * 2);

  return azimuthRad as TRadians;
}

// TODO add unit tests
export function getElevation(x: number, y: number, z: number, point: Vector3Like): TRadians {
  const dx: number = point.x - x;
  const dy: number = point.y - y;
  const dz: number = point.z - z;

  const horizontalDistance: number = Math.sqrt(dx ** 2 + dz ** 2);

  return Math.atan2(dy, horizontalDistance) as TRadians;
}

// TODO add unit tests
export function getAzimuthElevationFromQuaternion(q: Quaternion): { azimuth: TRadians; elevation: TRadians } {
  const { x, y, z, w } = q;

  const azimuth: TRadians = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z)) as TRadians;
  const elevation: TRadians = Math.asin(2 * (w * y - z * x)) as TRadians;

  return { azimuth, elevation };
}

export function getAzimuthElevationFromVector(v: Vector3Like, forwardAxis: ForwardAxis): { azimuth: TRadians; elevation: TRadians } {
  let azimuth: TRadians;

  if (forwardAxis === ForwardAxis.Z) {
    azimuth = Math.atan2(v.x, v.z) as TRadians;
  } else {
    azimuth = Math.atan2(v.z, v.x) as TRadians;
  }

  const elevation: TRadians = Math.atan2(v.y, Math.sqrt(v.x * v.x + v.z * v.z)) as TRadians;

  return { azimuth: euclideanModulo(azimuth, Math.PI * 2) as TRadians, elevation };
}

// TODO add unit tests
export const getAzimuthFromDirection = (direction: Vector3Like): TRadians => {
  let azimuth: TRadians = Math.atan2(direction.z, direction.x) as TRadians;
  if (azimuth < 0) (azimuth as number) += 2 * Math.PI;
  return azimuth;
};

// TODO add unit tests
export const getAzimuthFromQuaternionDirection = (quaternion: QuaternionLike): TRadians => {
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
export const getSpeedFromAngularVelocity = (angularVelocity: Quaternion): TRadiansPerSecond => radiansPerSecond(angularVelocity.length());

// TODO add unit tests
export const getDirectionFromAngularVelocity = (angularVelocity: Quaternion): Quaternion => angularVelocity.clone().normalize();

// TODO add unit tests
export function get3DAzimuth(center: Vector3Like, point: Vector3Like): { azimuth: TRadians; elevation: TRadians } {
  const dx: number = point.x - center.x;
  const dy: number = point.y - center.y;
  const dz: number = point.z - center.z;

  let azimuth: number = Math.atan2(dz, dx);

  // Ensure azimuth is in range [0, 2π]
  if (azimuth < 0) azimuth += 2 * Math.PI;

  const horizontalDistance: number = Math.sqrt(dx * dx + dz * dz);
  const elevation: number = Math.atan2(dy, horizontalDistance);

  return {
    azimuth: azimuth as TRadians,
    elevation: elevation as TRadians
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
