import type { TWithName } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';

export type TPhysicsBodyProps = Readonly<{
  type: RigidBodyTypesNames;
  collisionShape: CollisionShape;
  shapeParams: TPhysicsShapeParams;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
}> &
  Required<TWithName>;
