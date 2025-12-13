import type { TPhysicsBodyFacadeEntities, TWithPhysicsBodyFacadeEntities } from '@/Engine/Physics/Models';

export function withPhysicsBodyFacadeEntities({ rigidBody, rigidBodyDesc, colliderDesc, collider }: TPhysicsBodyFacadeEntities): TWithPhysicsBodyFacadeEntities {
  return {
    getRigidBody: () => rigidBody,
    getRigidBodyDesc: () => rigidBodyDesc,
    getColliderDesc: () => colliderDesc,
    getCollider: () => collider
  };
}
