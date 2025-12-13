import type { Vector3Like } from 'three';

import type { TKinematicConfig } from '@/Engine/Kinematic';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TEulerLike } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TTransformDriveSerializedData = Readonly<{
  physics?: TWithPresetNamePhysicsBodyConfig;
  kinematic?: TKinematicConfig;
  agent: TransformAgent;
  position: Vector3Like;
  rotation: TEulerLike;
  scale: Vector3Like;
}>;
