import type { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d';

export type TWithPhysicsBodyFacadeEntities = Readonly<{
  getRigidBody: () => RigidBody;
  getRigidBodyDesc: () => RigidBodyDesc;
  getColliderDesc: () => ColliderDesc;
  getCollider: () => Collider;
}>;
