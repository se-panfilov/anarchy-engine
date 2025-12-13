import type { Collider, RigidBody, Shape } from '@dimforge/rapier3d';
import { Ball, Capsule, Cuboid, Cylinder } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import type { TKinematicState } from '@Engine/Kinematic';
import { ForwardAxis } from '@Engine/Kinematic';
import type { TMeters, TRadians } from '@Engine/Math';
import { getDirectionFromAngularVelocity, getDirectionFromLinearVelocity, getSpeedFromAngularVelocity, getSpeedFromLinearVelocity } from '@Engine/Math';
import { VelocityType } from '@Engine/Physics/Constants';
import type { TPhysicsBody } from '@Engine/Physics/Models';
import { isNotDefined } from '@Engine/Utils';
import { Euler, Quaternion, Vector3 } from 'three';

export function getPushCoordsFrom3dAzimuth(azimuth: TRadians, elevation: TRadians, force: number, forwardAxis: ForwardAxis): Vector3 | never {
  const horizontalForce: number = force * Math.cos(elevation);
  const y: number = force * Math.sin(elevation);

  let x: number, z: number;

  if (forwardAxis === ForwardAxis.X) {
    x = horizontalForce * Math.sin(azimuth);
    z = horizontalForce * Math.cos(azimuth);
  } else if (forwardAxis === ForwardAxis.Z) {
    x = horizontalForce * Math.cos(azimuth);
    z = horizontalForce * Math.sin(azimuth);
  } else {
    throw new Error(`Cannot get push coordinates from 3d azimuth: forward axis is invalid: ${forwardAxis}`);
  }

  return new Vector3(x, y, z);
}

export function movePhysicsDynamicObjectByVelocity(rigidBody: RigidBody, type: VelocityType, vector3: Vector3 | Vector, shouldWakeUp: boolean = true): void | never {
  if (!rigidBody.isDynamic()) throw new Error(`Cannot move physical object with velocity: rigid body is not dynamic`);

  const { x, y, z } = vector3;
  switch (type) {
    case VelocityType.Linear:
      return rigidBody.setLinvel({ x, y, z }, shouldWakeUp);
    case VelocityType.Angular:
      return rigidBody.setAngvel({ x, y, z }, shouldWakeUp);
    default:
      throw new Error(`Cannot move physical object with velocity: velocity type is invalid: ${type}`);
  }
}

function getColliderSize(collider: Collider): number {
  const shape: Shape = collider.shape;

  if (shape instanceof Ball) {
    return shape.radius;
  } else if (shape instanceof Cuboid) {
    return Math.max(shape.halfExtents.x, shape.halfExtents.y, shape.halfExtents.z);
  } else if (shape instanceof Capsule) {
    return shape.radius + shape.halfHeight;
  } else if (shape instanceof Cylinder) {
    return shape.radius + shape.halfHeight;
  } else {
    console.warn('Physics: Unknown collider type:', collider);
    return 1;
  }
}

export function getKinematicDataFromPhysics(body: TPhysicsBody): TKinematicState {
  const rigidBody: RigidBody | undefined = body.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot get movement info: rigid body is not defined');
  const linVel: Vector = rigidBody.linvel();
  const linearVelocity: Vector3 = new Vector3(linVel.x, linVel.y, linVel.z);

  const angVel: Vector = rigidBody.angvel();
  const angularVelocity: Quaternion = new Quaternion().setFromEuler(new Euler(angVel.x, angVel.y, angVel.z));

  return {
    linearSpeed: getSpeedFromLinearVelocity(linearVelocity),
    linearDirection: getDirectionFromLinearVelocity(linearVelocity),
    angularSpeed: getSpeedFromAngularVelocity(angularVelocity),
    angularDirection: getDirectionFromAngularVelocity(angularVelocity),
    radius: getColliderSize(rigidBody.collider(0)) as TMeters,
    forwardAxis: ForwardAxis.X,
    isInfiniteRotation: false
  };
}
