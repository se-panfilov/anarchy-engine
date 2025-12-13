import type { RigidBodyType } from '@dimforge/rapier3d';

import type { TWithName } from '@/Engine/Mixins';
import type { CollisionShape } from '@/Engine/Physics/Constants';

import type { TObjectPhysicsParams } from './TObjectPhysicsParams';

export type TPhysicsPresetProps = Readonly<{
  type: RigidBodyType;
  collisionShape: CollisionShape;
  shapeParams: TObjectPhysicsParams;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
}> &
  TWithName;
