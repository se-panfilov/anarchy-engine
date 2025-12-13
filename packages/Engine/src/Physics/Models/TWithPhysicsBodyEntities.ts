import type { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d';

export type TWithPhysicsBodyEntities = Readonly<{
  getRigidBody: () => RigidBody | undefined;
  getRigidBodyDesc: () => RigidBodyDesc | undefined;
  getColliderDesc: () => ColliderDesc;
  getCollider: () => Collider;
}>;
