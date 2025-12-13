import type { RigidBody } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import Decimal from 'decimal.js';

import type { TKinematicInfo } from '@/Engine/Kinematic';
import { cos, degToRad, sin } from '@/Engine/Math';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import { VelocityType } from '@/Engine/Physics/Constants';
import type { TPhysicsBodyFacade } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export function getPushCoordsFrom3dAzimuth(azimuthDeg: number, elevationDeg: number, force: number): TWithCoordsXYZ {
  const azimuthDecimal: Decimal = degToRad(azimuthDeg);
  const elevationDecimal: Decimal = degToRad(elevationDeg);
  const forceDecimal: Decimal = new Decimal(force);

  const x: Decimal = forceDecimal.times(cos(elevationDecimal)).times(cos(azimuthDecimal));
  const y: Decimal = forceDecimal.times(sin(elevationDecimal));
  const z: Decimal = forceDecimal.times(cos(elevationDecimal)).times(sin(azimuthDecimal));

  return { x: x.toNumber(), y: y.toNumber(), z: z.toNumber() };
}

export function movePhysicsDynamicObjectByVelocity(rigidBody: RigidBody, type: VelocityType, vector3W: TVector3Wrapper, shouldWakeUp: boolean = true): void | never {
  if (!rigidBody.isDynamic()) throw new Error(`Cannot move physics object with velocity: rigid body is not dynamic`);

  const coords: TWithCoordsXYZ = vector3W.getCoords();
  switch (type) {
    case VelocityType.Linear:
      return rigidBody.setLinvel(coords, shouldWakeUp);
    case VelocityType.Angular:
      return rigidBody.setAngvel(coords, shouldWakeUp);
    default:
      throw new Error(`Cannot move physics object with velocity: velocity type is invalid: ${type}`);
  }
}

export function getKinematicInfoFromPhysics(facade: TPhysicsBodyFacade): TKinematicInfo {
  const rigidBody: RigidBody | undefined = facade.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot get movement info: rigid body is not defined');
  const linearVelocity: Vector = rigidBody.linvel();

  return {
    linearVelocity,
    angularVelocity: rigidBody.angvel(),
    principalInertia: rigidBody.principalInertia()
  };
}
