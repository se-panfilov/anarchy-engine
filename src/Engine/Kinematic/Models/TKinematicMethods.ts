import type { Vector3 } from 'three';

import type { TDegrees, TMetersPerSecond, TRadians } from '@/Engine/Math';

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
  setLinearDirectionFromParamsDeg: (azimuthDeg: TDegrees, elevationDeg: TDegrees) => void;
  setLinearDirectionFromParamsRad: (azimuthRad: TRadians, elevationRad: TRadians) => void;
  getLinearAzimuthDeg: () => TDegrees;
  getLinearAzimuthRad: () => TRadians;
  setLinearAzimuthDeg: (deg: TDegrees) => void;
  setLinearAzimuthRad: (rad: TRadians) => void;
  getLinearElevationDeg: () => TDegrees;
  getLinearElevationRad: () => TRadians;
  setLinearElevationDeg: (deg: TDegrees) => void;
  setLinearElevationRad: (rad: TRadians) => void;
  getAngularSpeed: () => TMetersPerSecond;
  setAngularSpeed: (speed: TMetersPerSecond) => void;
  getAngularDirection: () => Vector3;
  setAngularDirection: (direction: Vector3) => void;
  setAngularDirectionFromParamsDeg: (azimuthDeg: TDegrees, elevationDeg: TDegrees) => void;
  setAngularDirectionFromParamsRad: (azimuthRad: TRadians, elevationRad: TRadians) => void;
  getAngularAzimuthDeg: () => TDegrees;
  getAngularAzimuthRad: () => TRadians;
  setAngularAzimuthDeg: (deg: TDegrees) => void;
  setAngularAzimuthRad: (rad: TRadians) => void;
  getAngularElevationDeg: () => TDegrees;
  getAngularElevationRad: () => TRadians;
  setAngularElevationDeg: (deg: TDegrees) => void;
  setAngularElevationRad: (rad: TRadians) => void;
  setAngularVelocityFromParamsDeg: (speed: TMetersPerSecond, azimuthDeg: TDegrees, elevationDeg: TDegrees) => void;
  setAngularVelocityFromParamsRad: (speed: TMetersPerSecond, azimuthRad: TRadians, elevationRad: TRadians) => void;
}>;
