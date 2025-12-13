import type { Quaternion, QuaternionLike, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TMeters, TMetersPerSecond, TRadians } from '@/Engine/Math';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  moveTo: (vector: Vector3, speed: TMetersPerSecond) => void;
  rotateTo: (vector: Quaternion, speed: TMetersPerSecond, radius: TMeters) => void;
  adjustDataByLinearVelocity: (linearVelocity: Quaternion) => void;
  adjustDataFromAngularVelocity: (angularVelocity: Quaternion) => void;
  getLinearSpeed: () => TMetersPerSecond;
  setLinearSpeed: (speed: TMetersPerSecond) => void;
  getLinearDirection: () => Vector3;
  setLinearDirection: (direction: Vector3Like) => void;
  setLinearDirectionFromParams: (azimuth: TRadians, elevation: TRadians) => void;
  getLinearAzimuth: () => TRadians;
  setLinearAzimuth: (azimuth: TRadians) => void;
  getLinearElevation: () => TRadians;
  setLinearElevation: (elevation: TRadians) => void;
  getAngularSpeed: () => TMetersPerSecond;
  setAngularSpeed: (speed: TMetersPerSecond) => void;
  getAngularDirection: () => Quaternion;
  setAngularDirection: (direction: QuaternionLike) => void;
  setAngularDirectionFromParams: (azimuth: TRadians, elevation: TRadians) => void;
  getAngularAzimuth: () => TRadians;
  setAngularAzimuth: (azimuth: TRadians) => void;
  getAngularElevation: () => TRadians;
  setAngularElevation: (elevation: TRadians) => void;
  setAngularVelocityFromParams: (speed: TMetersPerSecond, azimuth: TRadians, elevation: TRadians) => void;
}>;
