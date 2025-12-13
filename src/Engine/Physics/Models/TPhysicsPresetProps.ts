import type { TWithName } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsPresetProps = Readonly<{
  type: RigidBodyTypesNames;
  collisionShape: CollisionShape;
  shapeParams: TPhysicsBodyParams;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
}> &
  TWithName;
