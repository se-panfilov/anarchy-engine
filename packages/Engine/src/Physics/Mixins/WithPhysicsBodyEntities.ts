import type { TPhysicsBodyEntities, TWithPhysicsBodyEntities } from '@/Engine/Physics/Models';

export function withPhysicsBodyEntities({ rigidBody, rigidBodyDesc, colliderDesc, collider }: TPhysicsBodyEntities): TWithPhysicsBodyEntities {
  return {
    getRigidBody: () => rigidBody,
    getRigidBodyDesc: () => rigidBodyDesc,
    getColliderDesc: () => colliderDesc,
    getCollider: () => collider
  };
}
