import type { TKinematicConfig } from '@hellpig/anarchy-engine/Kinematic';
import type { TEulerLike } from '@hellpig/anarchy-engine/ThreeLib';
import type { TransformAgent } from '@hellpig/anarchy-engine/TransformDrive/Constants';
import type { Vector3Like } from 'three';

export type TTransformDriveSerializedData = Readonly<{
  physicsBodyName?: string;
  kinematic?: TKinematicConfig;
  agent: TransformAgent;
  position: Vector3Like;
  rotation: TEulerLike;
  scale: Vector3Like;
}>;
