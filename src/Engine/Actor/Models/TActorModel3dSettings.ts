import type { Quaternion, Vector3 } from 'three';

export type TActorModel3dSettings = Readonly<{
  positionOffset?: Vector3;
  rotationOffset?: Quaternion;
  scaleOffset?: Vector3;
}>;
