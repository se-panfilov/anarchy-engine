import type { Vector3 } from 'three';

import type { TMetersPerSecond, TRadians } from '@/Engine/Math';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  adjustDataByLinearVelocity: (linearVelocity: Vector3) => void;
  adjustDataFromAngularVelocity: (angularVelocity: Vector3) => void;
  getLinearSpeed: () => TMetersPerSecond;
  setLinearSpeed: (speed: TMetersPerSecond) => void;
  getLinearDirection: () => Vector3;
  setLinearDirection: (direction: Vector3) => void;
  setLinearDirectionFromParamsRad: (azimuthRad: TRadians, elevationRad: TRadians) => void;
  getLinearAzimuthRad: () => TRadians;
  setLinearAzimuthRad: (rad: TRadians) => void;
  getLinearElevationRad: () => TRadians;
  setLinearElevationRad: (rad: TRadians) => void;
  getAngularSpeed: () => TMetersPerSecond;
  setAngularSpeed: (speed: TMetersPerSecond) => void;
  getAngularDirection: () => Vector3;
  setAngularDirection: (direction: Vector3) => void;
  setAngularDirectionFromParamsRad: (azimuthRad: TRadians, elevationRad: TRadians) => void;
  getAngularAzimuthRad: () => TRadians;
  setAngularAzimuthRad: (rad: TRadians) => void;
  getAngularElevationRad: () => TRadians;
  setAngularElevationRad: (rad: TRadians) => void;
  setAngularVelocityFromParamsRad: (speed: TMetersPerSecond, azimuthRad: TRadians, elevationRad: TRadians) => void;
}>;
