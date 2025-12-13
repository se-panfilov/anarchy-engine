import type { Collider, RigidBody } from '@dimforge/rapier3d';

import type { TPhysicsBody, TPhysicsBodyConfig } from '@/Engine/Physics/Models';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

export function physicsToConfig(entity: TPhysicsBody): TPhysicsBodyConfig {
  // TODO 15-0-0: Add adapters for Physics World, and Physics presets

  const rigidBody: RigidBody | undefined = entity.getRigidBody();
  const collider: Collider | undefined = rigidBody?.collider(0);

  let rigidBodySettings = {};
  if (isDefined(rigidBody)) {
    rigidBodySettings = {
      position: rigidBody.translation(),
      rotation: rigidBody.rotation(),
      linearVelocity: rigidBody.linvel(),
      angularVelocity: rigidBody.angvel(),
      type: entity.getPhysicsBodyType(),
      mass: rigidBody.mass(),
      gravityScale: rigidBody.gravityScale(),
      isSleep: rigidBody.isSleeping()
    };
  }

  let colliderSettings = {};
  if (isDefined(collider)) {
    colliderSettings = {
      restitution: collider.restitution(),
      friction: collider.friction(),
      collisionGroups: collider.collisionGroups(),
      solverGroups: collider.solverGroups(),
      isSensor: collider.isSensor(),
      shapeParams: entity.getShapeParams()
    };
  }

  return filterOutEmptyFields({
    collisionShape: entity.getPhysicsBodyShape(),
    ...rigidBodySettings,
    ...colliderSettings,
    presetName: entity.name
  });
}
