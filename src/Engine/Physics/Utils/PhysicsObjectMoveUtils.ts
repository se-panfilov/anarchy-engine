import type { RigidBody } from '@dimforge/rapier3d';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import { VelocityType } from '@/Engine/Physics/Constants';
import type { TVector3Wrapper } from '@/Engine/Vector';

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

// export function movePhysicsKinematicObjectByPosition(rigidBody, translation) {
//   rigidBody.setNextKinematicRotation(translation)
//   rigidBody.setNextKinematicTranslation(translation)
// }
//
// export function movePhysicsKinematicObjectByVelocity(rigidBody, translation) {
//   // TODO (S.Panfilov) how to do this?
// }
