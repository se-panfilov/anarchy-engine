import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';

export type TPhysicsBodyParams = Readonly<{
  type: RigidBodyTypesNames;
  collisionShape: CollisionShape;
  shapeParams: TPhysicsShapeParams;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
  position?: TReadonlyVector3;
  rotation?: TReadonlyQuaternion;
  isSleep?: boolean;
}> &
  TWithName &
  TWithTags;
