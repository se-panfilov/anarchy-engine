import type { TKinematicConfig } from '@Anarchy/Engine/Kinematic';
import type { TEulerLike } from '@Anarchy/Engine/ThreeLib';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import type { Vector3Like } from 'three';

export type TTransformDriveSerializedData = Readonly<{
  physicsBodyName?: string;
  kinematic?: TKinematicConfig;
  agent: TransformAgent;
  position: Vector3Like;
  rotation: TEulerLike;
  scale: Vector3Like;
}>;
