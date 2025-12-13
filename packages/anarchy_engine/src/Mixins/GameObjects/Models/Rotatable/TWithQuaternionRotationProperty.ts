import type { Quaternion } from 'three';

export type TWithQuaternionRotationProperty = Readonly<{
  rotation: Quaternion;
}>;
