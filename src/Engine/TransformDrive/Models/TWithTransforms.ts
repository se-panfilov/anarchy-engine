import type { Euler, Vector3 } from 'three';

export type TWithTransforms = Readonly<{
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}>;
