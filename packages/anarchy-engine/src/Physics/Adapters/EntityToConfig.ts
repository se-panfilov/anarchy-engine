import type { TPhysicsBody, TPhysicsBodyConfig, TPhysicsWorldConfig } from '@Anarchy/Engine/Physics/Models';
import type { TEulerLike } from '@Anarchy/Engine/ThreeLib';
import { eulerToXyz, vector3ToXyz } from '@Anarchy/Engine/Utils';
import { filterOutEmptyFields, isDefined } from '@Anarchy/Shared/Utils';
import type { Collider, RigidBody, Rotation, World } from '@dimforge/rapier3d';
import type { Vector3Like } from 'three';
import { Euler, Quaternion } from 'three';

export function physicsBodyToConfig(entity: TPhysicsBody): TPhysicsBodyConfig {
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
      isSleep: rigidBody.isSleeping(),
      ccdEnabled: rigidBody.isCcdEnabled(),
      dominanceGroup: rigidBody.dominanceGroup()
      // enabledRotations: rigidBody.enabledRotations,
      // enabledTranslations: rigidBody.enabledTranslations,
    };
  }

  let colliderSettings = {};
  if (isDefined(collider)) {
    colliderSettings = {
      restitution: collider.restitution(),
      friction: collider.friction(),
      collisionGroups: collider.collisionGroups(),
      isSensor: collider.isSensor(),
      shapeParams: entity.getShapeParams()
    };
  }

  const body: RigidBody | Collider | undefined = entity.getRigidBody() ?? entity.getCollider();
  let position: Vector3Like = { x: 0, y: 0, z: 0 };
  let rotation: TEulerLike = { x: 0, y: 0, z: 0 };

  if (isDefined(body)) {
    position = vector3ToXyz(body.translation());
    const bodyRotation: Rotation = body.rotation();
    rotation = eulerToXyz(new Euler().setFromQuaternion(new Quaternion(bodyRotation.x, bodyRotation.y, bodyRotation.z, bodyRotation.w)));
  }

  return filterOutEmptyFields({
    collisionShape: entity.getPhysicsBodyShape(),
    ...rigidBodySettings,
    ...colliderSettings,
    name: entity.name,
    type: entity.getPhysicsBodyType(),
    shapeParams: entity.getShapeParams(),
    position,
    rotation
  });
}

export function physicWorldToConfig(world: World): TPhysicsWorldConfig {
  return {
    gravity: world.gravity,
    integrationParameters: {
      dt: world.integrationParameters.dt,
      lengthUnit: world.integrationParameters.lengthUnit,
      normalizedAllowedLinearError: world.integrationParameters.normalizedAllowedLinearError,
      normalizedPredictionDistance: world.integrationParameters.normalizedPredictionDistance,
      numSolverIterations: world.integrationParameters.numSolverIterations,
      // eslint-disable-next-line spellcheck/spell-checker
      numInternalPgsIterations: world.integrationParameters.numInternalPgsIterations,
      minIslandSize: world.integrationParameters.minIslandSize,
      // eslint-disable-next-line spellcheck/spell-checker
      maxCcdSubsteps: world.integrationParameters.maxCcdSubsteps
    }
  };
}
