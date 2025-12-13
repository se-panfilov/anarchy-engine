import type { Collider, RigidBody, World } from '@dimforge/rapier3d';

import type { TPhysicsBody, TPhysicsBodyConfig, TPhysicsWorldConfig } from '@/Engine/Physics/Models';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

export function physicBodyToConfig(entity: TPhysicsBody): TPhysicsBodyConfig {
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
    name: entity.name,
    type: entity.getPhysicsBodyType(),
    shapeParams: entity.getShapeParams()
  });
}

export function physicWorldToConfig(world: World): TPhysicsWorldConfig {
  return {
    gravity: world.gravity,
    rawIntegrationParameters: world.integrationParameters.raw,
    rawIslands: world.islands.raw,
    rawBroadPhase: world.broadPhase.raw,
    rawNarrowPhase: world.narrowPhase.raw,
    rawBodies: world.bodies.raw,
    rawColliders: world.colliders.raw,
    rawImpulseJoints: world.impulseJoints.raw,
    rawMultibodyJoints: world.multibodyJoints.raw,
    // eslint-disable-next-line spellcheck/spell-checker
    rawCCDSolver: world.ccdSolver.raw,
    rawQueryPipeline: world.queryPipeline.raw,
    rawPhysicsPipeline: world.physicsPipeline.raw,
    rawSerializationPipeline: world.serializationPipeline.raw,
    rawDebugRenderPipeline: world.debugRenderPipeline.raw
  };
}
