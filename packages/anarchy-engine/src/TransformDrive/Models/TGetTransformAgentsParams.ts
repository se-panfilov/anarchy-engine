import type { TKinematicParams } from '@Anarchy/Engine/Kinematic';
import type { TPhysicsBody } from '@Anarchy/Engine/Physics';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import type { TOptional } from '@Anarchy/Shared/Utils';

export type TGetTransformAgentsParams = Readonly<{
  position: TReadonlyVector3;
  rotation?: TReadonlyEuler | TReadonlyQuaternion;
  scale?: TReadonlyVector3;
  physicsBody?: TPhysicsBody;
  kinematic?: TOptional<TKinematicParams>;
}>;

export type TGetTransformAgentsOptions = Readonly<{
  hasKinematic?: boolean;
  hasPhysics?: boolean;
  hasConnected?: boolean;
}>;
