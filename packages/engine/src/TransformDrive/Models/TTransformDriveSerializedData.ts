import type { Vector3Like } from 'three';

import type { TKinematicConfig } from '@/Kinematic';
import type { TEulerLike } from '@/ThreeLib';
import type { TransformAgent } from '@/TransformDrive/Constants';

export type TTransformDriveSerializedData = Readonly<{
  physicsBodyName?: string;
  kinematic?: TKinematicConfig;
  agent: TransformAgent;
  position: Vector3Like;
  rotation: TEulerLike;
  scale: Vector3Like;
}>;
