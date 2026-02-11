import type { ForwardAxis } from '@Anarchy/Engine/Kinematic/Constants';
import type { TMeters, TMetersPerSecond, TRadians, TRadiansPerSecond } from '@Anarchy/Engine/Math';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import type { TKinematicSpeed } from '@Anarchy/Engine/TransformDrive/Models';
import type { QuaternionLike, Vector3Like } from 'three';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  moveTo: (vector: TReadonlyVector3, speed: TKinematicSpeed) => void | never;
  rotateTo: (quaternion: TReadonlyQuaternion, speed: TKinematicSpeed, infinite?: boolean) => void | never;
  lookAt: (vector: TReadonlyVector3, speed: TKinematicSpeed) => void | never;
  getRadius: () => TMeters;
  setRadius: (radius: TMeters) => void;
  getLinearSpeed: () => TMetersPerSecond;
  setLinearSpeed: (speed: TMetersPerSecond) => void;
  getLinearDirection: () => TReadonlyVector3;
  getForwardAxis: () => ForwardAxis;
  setForwardAxis: (forwardAxis: ForwardAxis) => void;
  setLinearDirection: (direction: Vector3Like) => void;
  getLinearAzimuth: () => TRadians;
  setLinearAzimuth: (azimuth: TRadians) => void;
  getLinearElevation: () => TRadians;
  setLinearElevation: (elevation: TRadians) => void;
  resetLinear: (resetSpeed: boolean, resetDirection: boolean) => void;
  getAngularSpeed: () => TRadiansPerSecond;
  getAngularSpeedMps: () => TMetersPerSecond | never;
  setAngularSpeed: (speed: TRadiansPerSecond) => void;
  setAngularSpeedMps: (speed: TMetersPerSecond) => void | never;
  getAngularDirection: () => TReadonlyQuaternion;
  setAngularDirection: (direction: QuaternionLike) => void;
  resetAngular: (resetSpeed: boolean, resetDirection: boolean) => void;
}>;
