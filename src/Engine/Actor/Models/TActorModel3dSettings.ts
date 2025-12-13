import type { Euler, Vector3 } from 'three';

export type TActorModel3dSettings = Readonly<{
  positionOffset?: Vector3;
  rotationOffset?: Euler;
  scaleOffset?: Vector3;
}>;
