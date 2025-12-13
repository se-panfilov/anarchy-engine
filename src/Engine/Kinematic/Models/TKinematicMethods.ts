import type { Quaternion, QuaternionLike, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TMeters, TMetersPerSecond } from '@/Engine/Math';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  moveTo: (vector: Vector3, speed: TMetersPerSecond) => void | never;
  rotateTo: (quaternion: Quaternion, speed: TMetersPerSecond, radius: TMeters) => void | never;
  lookAt: (vector: Vector3, speed: TMetersPerSecond, radius: TMeters) => void | never;
  getLinearSpeed: () => TMetersPerSecond;
  setLinearSpeed: (speed: TMetersPerSecond) => void;
  getLinearDirection: () => Vector3;
  setLinearDirection: (direction: Vector3Like) => void;
  resetLinear: (resetSpeed: boolean, resetDirection: boolean) => void;
  getAngularSpeed: () => TMetersPerSecond;
  setAngularSpeed: (speed: TMetersPerSecond) => void;
  getAngularDirection: () => Quaternion;
  setAngularDirection: (direction: QuaternionLike) => void;
  resetAngular: (resetSpeed: boolean, resetDirection: boolean) => void;
}>;
