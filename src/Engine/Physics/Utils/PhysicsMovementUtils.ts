import type { RigidBody } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import { Vector3 } from 'three';

import type { TKinematicData } from '@/Engine/Kinematic';
import type { TRadians } from '@/Engine/Math';
import { getDirectionFromAngularVelocity, getDirectionFromLinearVelocity, getSpeedFromAngularVelocity, getSpeedFromLinearVelocity } from '@/Engine/Math';
import { VelocityType } from '@/Engine/Physics/Constants';
import type { TPhysicsBody } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';

export function getPushCoordsFrom3dAzimuthDeg(azimuth: TRadians, elevation: TRadians, force: number): Vector {
  const z: number = force * Math.cos(elevation) * Math.cos(azimuth);
  const y: number = force * Math.sin(elevation);
  const x: number = force * Math.cos(elevation) * Math.sin(azimuth);

  return { x, y, z };
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

export function getKinematicDataFromPhysics(body: TPhysicsBody): TKinematicData {
  const rigidBody: RigidBody | undefined = body.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot get movement info: rigid body is not defined');
  const linVel: Vector = rigidBody.linvel();
  const linearVelocity: Vector3 = new Vector3(linVel.x, linVel.y, linVel.z);

  const angVel: Vector = rigidBody.angvel();
  const angularVelocity: Vector3 = new Vector3(angVel.x, angVel.y, angVel.z);

  return {
    linearSpeed: getSpeedFromLinearVelocity(linearVelocity),
    linearDirection: getDirectionFromLinearVelocity(linearVelocity),
    angularSpeed: getSpeedFromAngularVelocity(angularVelocity),
    angularDirection: getDirectionFromAngularVelocity(angularVelocity)
  };
}
