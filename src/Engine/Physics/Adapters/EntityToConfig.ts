import type { Collider, RigidBody } from '@dimforge/rapier3d';

import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@/Engine/Physics/Models';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function physicsToConfig(entity: TPhysicsBody): TPhysicsBodyConfig {
  console.log('XXX entity', entity);
  // TODO 15-0-0: Add adapters for Physics World, and Physics presets

  const rigidBody: RigidBody | undefined = entity.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error(`[Serialization] TPhysicsBody: rigid body is not defined for agent with name: "${entity.name}", (id: "${entity.id}")`);
  const collider: Collider = rigidBody.collider(0);

  return filterOutEmptyFields({
    position: rigidBody.translation(),
    rotation: rigidBody.rotation(),
    linearVelocity: rigidBody.linvel(),
    angularVelocity: rigidBody.angvel(),
    type: entity.getPhysicsBodyType(),
    collisionShape: entity.getPhysicsBodyShape(),
    mass: rigidBody.mass(),
    restitution: collider.restitution(),
    friction: collider.friction(),
    collisionGroups: collider.collisionGroups(),
    solverGroups: collider.solverGroups(),
    isSensor: collider.isSensor(),
    // TODO 15-0-0: implement
    shapeParams: getShapeParams(collider),
    gravityScale: rigidBody.gravityScale(),
    isSleep: rigidBody.isSleeping(),
    ...extractSerializableRegistrableFields(entity)
  });
}

function getShapeParams(collider: Collider) {
  // TODO 15-0-0: implement

  //a, b, c, borderRadius, nrows, ncols, heights, scale, halfHeight, flags, radius, hx, hy, hz, vertices, indices.
  return {};
}
