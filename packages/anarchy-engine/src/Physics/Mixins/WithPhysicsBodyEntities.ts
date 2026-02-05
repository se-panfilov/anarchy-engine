import type { TPhysicsBodyEntities, TWithPhysicsBodyEntities } from '@hellpig/anarchy-engine/Physics/Models';

export function withPhysicsBodyEntities({ rigidBody, rigidBodyDesc, colliderDesc, collider }: TPhysicsBodyEntities): TWithPhysicsBodyEntities {
  return {
    getRigidBody: () => rigidBody,
    getRigidBodyDesc: () => rigidBodyDesc,
    getColliderDesc: () => colliderDesc,
    getCollider: () => collider
  };
}
