import type { Quaternion, QuaternionLike, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TMeters, TMetersPerSecond, TRadiansPerSecond } from '@/Engine/Math';
import type { TKinematicSpeed } from '@/Engine/TransformDrive/Models';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  moveTo: (vector: Vector3, speed: TKinematicSpeed) => void | never;
  rotateTo: (quaternion: Quaternion, speed: TKinematicSpeed) => void | never;
  lookAt: (vector: Vector3, speed: TKinematicSpeed) => void | never;
  getRadius: () => TMeters;
  setRadius: (radius: TMeters) => void;
  getLinearSpeed: () => TMetersPerSecond;
  setLinearSpeed: (speed: TMetersPerSecond) => void;
  getLinearDirection: () => Vector3;
  setLinearDirection: (direction: Vector3Like) => void;
  resetLinear: (resetSpeed: boolean, resetDirection: boolean) => void;
  getAngularSpeed: () => TRadiansPerSecond;
  getAngularSpeedMps: () => TMetersPerSecond;
  setAngularSpeed: (speed: TRadiansPerSecond) => void;
  setAngularSpeedMps: (speed: TMetersPerSecond) => void;
  getAngularDirection: () => Quaternion;
  setAngularDirection: (direction: QuaternionLike) => void;
  resetAngular: (resetSpeed: boolean, resetDirection: boolean) => void;
}>;
