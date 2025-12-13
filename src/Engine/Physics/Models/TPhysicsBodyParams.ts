import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';

export type TPhysicsBodyParams = Readonly<{
  angularVelocity?: TReadonlyVector3;
  collisionGroups?: number;
  collisionShape: CollisionShape;
  friction?: number;
  gravityScale?: number;
  isSensor?: boolean;
  isSleep?: boolean;
  linearVelocity?: TReadonlyVector3;
  mass?: number;
  position: TReadonlyVector3;
  restitution?: number;
  rotation: TReadonlyQuaternion;
  shapeParams: TPhysicsShapeParams;
  solverGroups?: number;
  type: RigidBodyTypesNames;
}> &
  TWithName &
  TWithTags;
