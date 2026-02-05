import type { TKinematicParams } from '@hellpig/anarchy-engine/Kinematic';
import type { TPhysicsBody } from '@hellpig/anarchy-engine/Physics';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';

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
