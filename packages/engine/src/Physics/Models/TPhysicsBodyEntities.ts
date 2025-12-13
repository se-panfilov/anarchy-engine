import type { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d';

export type TPhysicsBodyEntities = Readonly<{
  rigidBody: RigidBody | undefined;
  rigidBodyDesc: RigidBodyDesc | undefined;
  colliderDesc: ColliderDesc;
  collider: Collider;
}>;
