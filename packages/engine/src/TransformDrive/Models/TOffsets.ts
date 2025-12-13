import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Engine/ThreeLib';
import type { Quaternion, Vector3 } from 'three';

export type TOffsets = Readonly<{
  positionOffset?: Vector3 | TReadonlyVector3;
  rotationOffset?: Quaternion | TReadonlyQuaternion;
  scaleOffset?: Vector3 | TReadonlyVector3;
}>;
