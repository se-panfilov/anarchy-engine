import type { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d';

export type TPhysicsBodyFacadeEntities = Readonly<{
  rigidBody: RigidBody;
  rigidBodyDesc: RigidBodyDesc;
  colliderDesc: ColliderDesc;
  collider: Collider;
}>;
