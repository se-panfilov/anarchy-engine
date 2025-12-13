import type { Vector3 } from 'three';

export type TKinematicData = Readonly<{
  linearSpeed: number;
  linearDirection: Vector3;
  angularSpeed: number;
  angularDirection: Vector3;
}>;
