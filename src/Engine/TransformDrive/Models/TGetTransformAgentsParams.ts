import type { TKinematicParams } from '@/Engine/Kinematic';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

export type TGetTransformAgentsParams = Readonly<{
  position: TReadonlyVector3;
  rotation?: TReadonlyEuler | TReadonlyQuaternion;
  scale?: TReadonlyVector3;
  physics?: TWithPresetNamePhysicsBodyParams;
  kinematic?: TOptional<TKinematicParams>;
}>;

export type TGetTransformAgentsOptions = Readonly<{
  hasKinematic?: boolean;
  hasPhysics?: boolean;
  hasConnected?: boolean;
}>;
