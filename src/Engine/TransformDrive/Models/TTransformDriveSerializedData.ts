import type { QuaternionLike, Vector3Like } from 'three';

import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TTransformDriveSerializedData = Readonly<{
  agent: TransformAgent;
  position: Vector3Like;
  rotation: QuaternionLike;
  scale: Vector3Like;
}>;
