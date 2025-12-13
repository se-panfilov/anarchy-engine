import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';

export type TPhysicsBodyParams = Readonly<{
  collisionGroups?: number;
  collisionShape: CollisionShape;
  friction?: number;
  isSleep?: boolean;
  mass?: number;
  position: TReadonlyVector3;
  restitution?: number;
  rotation: TReadonlyQuaternion;
  shapeParams: TPhysicsShapeParams;
  type: RigidBodyTypesNames;
}> &
  TWithName &
  TWithTags;
