import type { Vector3Like } from 'three';

import type { TEulerLike } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TTransformDriveSerializedData = Readonly<{
  agent: TransformAgent;
  position: Vector3Like;
  rotation: TEulerLike;
  scale: Vector3Like;
}>;
