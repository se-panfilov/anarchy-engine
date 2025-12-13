import type { RigidBody } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import Decimal from 'decimal.js';
import { Vector3 } from 'three';

import type { TKinematicData } from '@/Engine/Kinematic';
import { cosPrecise, degToRadPrecise, getDirectionFromAngularVelocity, getDirectionFromLinearVelocity, getSpeedFromAngularVelocity, getSpeedFromLinearVelocity, sinPrecise } from '@/Engine/Math';
import { VelocityType } from '@/Engine/Physics/Constants';
import type { TPhysicsBodyFacade } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';

export function getPushCoordsFrom3dAzimuth(azimuthDeg: number, elevationDeg: number, force: number): Vector3 {
  const azimuthDecimal: Decimal = degToRadPrecise(azimuthDeg);
  const elevationDecimal: Decimal = degToRadPrecise(elevationDeg);
  const forceDecimal: Decimal = new Decimal(force);

  const x: Decimal = forceDecimal.times(cosPrecise(elevationDecimal)).times(cosPrecise(azimuthDecimal));
  const y: Decimal = forceDecimal.times(sinPrecise(elevationDecimal));
  const z: Decimal = forceDecimal.times(cosPrecise(elevationDecimal)).times(sinPrecise(azimuthDecimal));

  return new Vector3(x.toNumber(), y.toNumber(), z.toNumber());
}

export function movePhysicsDynamicObjectByVelocity(rigidBody: RigidBody, type: VelocityType, vector3: Vector3, shouldWakeUp: boolean = true): void | never {
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

export function getKinematicDataFromPhysics(facade: TPhysicsBodyFacade): TKinematicData {
  const rigidBody: RigidBody | undefined = facade.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot get movement info: rigid body is not defined');
  const linvel: Vector = rigidBody.linvel();
  const linearVelocity: Vector3 = new Vector3(linvel.x, linvel.y, linvel.z);

  const angvel: Vector = rigidBody.angvel();
  const angularVelocity: Vector3 = new Vector3(angvel.x, angvel.y, angvel.z);

  return {
    linearSpeed: getSpeedFromLinearVelocity(linearVelocity),
    linearDirection: getDirectionFromLinearVelocity(linearVelocity),
    angularSpeed: getSpeedFromAngularVelocity(angularVelocity),
    angularDirection: getDirectionFromAngularVelocity(angularVelocity)
  };
}
