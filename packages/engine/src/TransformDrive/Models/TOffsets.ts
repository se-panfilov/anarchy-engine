import type { Quaternion, Vector3 } from 'three';

import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/ThreeLib';

export type TOffsets = Readonly<{
  positionOffset?: Vector3 | TReadonlyVector3;
  rotationOffset?: Quaternion | TReadonlyQuaternion;
  scaleOffset?: Vector3 | TReadonlyVector3;
}>;
