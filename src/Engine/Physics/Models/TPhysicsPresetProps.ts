import type { RigidBodyType } from '@dimforge/rapier3d';

import type { CollisionShape } from '@/Engine/Physics/Constants';

export type TPhysicsPresetProps = Readonly<{
  type: RigidBodyType;
  collisionShape: CollisionShape;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
}>;
