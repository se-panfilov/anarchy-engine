import type { Quaternion, Vector3 } from 'three';

import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';

export type TPhysicsBodyParams = Readonly<{
  type: RigidBodyTypesNames;
  collisionShape: CollisionShape;
  shapeParams: TPhysicsShapeParams;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
  position?: Vector3;
  rotation?: Quaternion;
  isSleep?: boolean;
}> &
  TWithName &
  TWithTags;
