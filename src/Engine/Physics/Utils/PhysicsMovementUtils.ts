import type { RigidBody } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import { Euler, Quaternion, Vector3 } from 'three';

import type { TKinematicState } from '@/Engine/Kinematic';
import type { TRadians } from '@/Engine/Math';
import { getDirectionFromAngularVelocity, getDirectionFromLinearVelocity, getSpeedFromAngularVelocity, getSpeedFromLinearVelocity } from '@/Engine/Math';
import { VelocityType } from '@/Engine/Physics/Constants';
import type { TPhysicsBody } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';

export function getPushCoordsFrom3dAzimuth(azimuth: TRadians, elevation: TRadians, force: number): Vector3 {
  const x: number = force * Math.cos(elevation) * Math.sin(azimuth);
  const y: number = force * Math.sin(elevation);
  const z: number = force * Math.cos(elevation) * Math.cos(azimuth);

  return new Vector3(x, y, z);
}

export function movePhysicsDynamicObjectByVelocity(rigidBody: RigidBody, type: VelocityType, vector3: Vector3 | Vector, shouldWakeUp: boolean = true): void | never {
  if (!rigidBody.isDynamic()) throw new Error(`Cannot move physics object with velocity: rigid body is not dynamic`);

  const { x, y, z } = vector3;
  switch (type) {
    case VelocityType.Linear:
      return rigidBody.setLinvel({ x, y, z }, shouldWakeUp);
    case VelocityType.Angular:
      return rigidBody.setAngvel({ x, y, z }, shouldWakeUp);
    default:
      throw new Error(`Cannot move physics object with velocity: velocity type is invalid: ${type}`);
  }
}

export function getKinematicDataFromPhysics(body: TPhysicsBody): TKinematicState {
  const rigidBody: RigidBody | undefined = body.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot get movement info: rigid body is not defined');
  const linVel: Vector = rigidBody.linvel();
  const linearVelocity: Vector3 = new Vector3(linVel.x, linVel.y, linVel.z);

  const angVel: Vector = rigidBody.angvel();
  // TODO 8.0.0. MODELS: check if this still working after replacing Euler with Quaternion
  const angularVelocity: Quaternion = new Quaternion().setFromEuler(new Euler(angVel.x, angVel.y, angVel.z));

  return {
    linearSpeed: getSpeedFromLinearVelocity(linearVelocity),
    linearDirection: getDirectionFromLinearVelocity(linearVelocity),
    angularSpeed: getSpeedFromAngularVelocity(angularVelocity),
    angularDirection: getDirectionFromAngularVelocity(angularVelocity)
  };
}
