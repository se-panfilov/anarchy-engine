import type { TKinematicParams } from '@/Kinematic';
import type { TPhysicsBody } from '@/Physics';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@/ThreeLib';
import type { TOptional } from '@/Utils';

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
