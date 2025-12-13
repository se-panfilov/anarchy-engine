import type { Vector3 } from 'three';

import type { TMetersPerSecond, TRadians } from '@/Engine/Math';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  moveTo: (vector: Vector3, speed: TMetersPerSecond) => void;
  adjustDataByLinearVelocity: (linearVelocity: Vector3) => void;
  adjustDataFromAngularVelocity: (angularVelocity: Vector3) => void;
  getLinearSpeed: () => TMetersPerSecond;
  setLinearSpeed: (speed: TMetersPerSecond) => void;
  getLinearDirection: () => Vector3;
  setLinearDirection: (direction: Vector3) => void;
  setLinearDirectionFromParams: (azimuthRad: TRadians, elevationRad: TRadians) => void;
  getLinearAzimuth: () => TRadians;
  setLinearAzimuth: (rad: TRadians) => void;
  getLinearElevation: () => TRadians;
  setLinearElevation: (rad: TRadians) => void;
  getAngularSpeed: () => TMetersPerSecond;
  setAngularSpeed: (speed: TMetersPerSecond) => void;
  getAngularDirection: () => Vector3;
  setAngularDirection: (direction: Vector3) => void;
  setAngularDirectionFromParams: (azimuthRad: TRadians, elevationRad: TRadians) => void;
  getAngularAzimuth: () => TRadians;
  setAngularAzimuth: (rad: TRadians) => void;
  getAngularElevation: () => TRadians;
  setAngularElevation: (rad: TRadians) => void;
  setAngularVelocityFromParams: (speed: TMetersPerSecond, azimuthRad: TRadians, elevationRad: TRadians) => void;
}>;
