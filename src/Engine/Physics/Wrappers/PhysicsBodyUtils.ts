import type { RigidBody, World } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';

import { meters } from '@/Engine/Measurements/Utils';
import { CollisionShape } from '@/Engine/Physics/Constants';
import { TPhysicsBodyBallParams, TPhysicsBodyCuboidParams, TPhysicsBodyParams, TPhysicsBodyRoundCuboidParams, TPhysicsPresetParams } from '@/Engine/Physics/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function createPhysicsBody(world: World, params: TPhysicsPresetParams): RigidBody {
  const rigidBodyDesc: RigidBodyDesc = RigidBodyDesc[params.type]();
  if (isDefined(params.position)) rigidBodyDesc.setTranslation(params.position.x, params.position.y, params.position.z);
  const rigidBody: RigidBody = world.createRigidBody(rigidBodyDesc);
  // const colliderDesc: ColliderDesc = ColliderDesc.ball(meters(size));
  world.createCollider(colliderDesc, rigidBody);

  return rigidBody;
}

export function getColliderDesc(params: TPhysicsPresetParams): ColliderDesc {
  const colliderDesc: ColliderDesc = ColliderDesc[params.type]();
  if (isDefined(params.size)) colliderDesc.setHalfExtents(params.size.x, params.size.y, params.size.z);
  return colliderDesc;
}

export function getParamsByColliderType(params: TPhysicsPresetParams): TPhysicsBodyParams | never {
  const { collisionShape, shapeParams } = params;
  const { borderRadius, radius, hx, hy, hz } = shapeParams;
  switch (collisionShape) {
    case CollisionShape.Ball:
      if (isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "radius" is not defined`);
      return { radius } satisfies TPhysicsBodyBallParams;
    case CollisionShape.Cuboid:
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz)) throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), or "hz"(${hz}) are not defined`);
      return { hx, hy, hz } satisfies TPhysicsBodyCuboidParams;
    case CollisionShape.RoundCuboid:
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz) || isNotDefined(radius))
        throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), "hz"(${hz}), or "radius"(${radius}) are not defined`);
      return { hx, hy, hz, borderRadius } satisfies TPhysicsBodyRoundCuboidParams;

    default:
      throw new Error(`Unknown collider type: ${type}`);
  }
}
