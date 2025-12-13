import { Quaternion, Vector3 } from 'three';

import type { TKinematicState, TKinematicTarget } from '@/Engine/Kinematic/Models';
import type { TMeters, TRadians } from '@/Engine/Math';
import { KinematicSpeed } from '@/Engine/TransformDrive/Constants';
import type { TKinematicSpeed, TKinematicTransformAgent } from '@/Engine/TransformDrive/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function getStepRotationToTarget(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion | undefined {
  if (isNotDefined(agent.data.target?.rotation)) return undefined;

  const currentRotation: Quaternion = agent.rotation$.value.clone().normalize();
  const targetNormalized: Quaternion = agent.data.target.rotation.clone().normalize();

  // Compute relative rotation
  const qRelative: Quaternion = currentRotation.clone().invert().multiply(targetNormalized);

  // Clamp w to avoid floating-point errors outside [-1,1]
  const clampedW: number = Math.min(Math.max(qRelative.w, -1), 1);
  const angle: TRadians = (2 * Math.acos(clampedW)) as TRadians;

  // Compute rotation axis
  const sinHalfAngle: number = Math.sqrt(1 - clampedW * clampedW);
  const axis: Vector3 = sinHalfAngle > 1e-6 ? new Vector3(qRelative.x, qRelative.y, qRelative.z).divideScalar(sinHalfAngle).normalize() : new Vector3(0, 1, 0);

  // Fix for shortest rotation path
  const correctedAngle: number = angle > Math.PI ? angle - 2 * Math.PI : angle;
  const stepAngle: number = Math.sign(correctedAngle) * Math.min(Math.abs(correctedAngle), rotationStep);

  return stepAngle !== 0 ? new Quaternion().setFromAxisAngle(axis, stepAngle) : undefined;
}

// Fallback implementation for getStepRotation based on Euler angles
// export function getStepRotationToTarget(agent: TKinematicTransformAgent, rotationStep: number): Quaternion | undefined {
//   if (!agent.data.target?.rotation) return undefined;
//
//   const currentEuler = new Euler().setFromQuaternion(agent.rotation$.value, 'YXZ');
//   const targetEuler = new Euler().setFromQuaternion(agent.data.target.rotation, 'YXZ');
//
//   const deltaX = targetEuler.x - currentEuler.x;
//   const deltaY = targetEuler.y - currentEuler.y;
//   const deltaZ = targetEuler.z - currentEuler.z;
//
//   const stepEuler = new Euler(
//     Math.sign(deltaX) * Math.min(rotationStep, Math.abs(deltaX)),
//     Math.sign(deltaY) * Math.min(rotationStep, Math.abs(deltaY)),
//     Math.sign(deltaZ) * Math.min(rotationStep, Math.abs(deltaZ)),
//     'YXZ'
//   );
//
//   return new Quaternion().setFromEuler(stepEuler);
// }

// export function getStepRotationInfinite(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion {
//   const angularDirection: Quaternion = agent.data.state.angularDirection;
//   const axis = new Vector3(angularDirection.x, angularDirection.y, angularDirection.z);
//   if (axis.lengthSq() < 1e-6) axis.set(0, 1, 0);
//
//   axis.normalize();
//
//   return new Quaternion().setFromAxisAngle(axis, rotationStep);
// }

// export function getStepRotationInfinite(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion {
//   const currentRotation: Quaternion = agent.rotation$.value.clone();
//   const axis: Vector3 = new Vector3(0, 1, 0).applyQuaternion(currentRotation).normalize(); // Y axis
//
//   return new Quaternion().setFromAxisAngle(axis, rotationStep);
// }

// export function getStepRotationInfinite(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion {
//   const { angularDirection, forwardAxis } = agent.data.state;
//
//   const forward = new Vector3();
//   if (forwardAxis === 'Z') {
//     forward.set(0, 0, 1);
//   } else {
//     forward.set(1, 0, 0);
//   }
//   forward.applyQuaternion(angularDirection).normalize();
//
//   const rotationAxis = new Vector3(0, 1, 0); // По умолчанию вращаем вокруг Y (азимут)
//
//   // if (agent.data.state.isElevationChanging) {
//   // rotationAxis.crossVectors(forward, new Vector3(0, 1, 0)).normalize();
//   // }
//
//   if (rotationAxis.lengthSq() < 1e-6) {
//     rotationAxis.set(0, 1, 0);
//   }
//
//   return new Quaternion().setFromAxisAngle(rotationAxis, rotationStep);
// }

// export function getStepRotationInfinite(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion | undefined {
//   const { angularDirection, forwardAxis } = agent.data.state;
//
//   // Determine rotation axis based on movement type
//   let axis: Vector3;
//   const currentEuler = new Euler().setFromQuaternion(angularDirection, 'YXZ');
//
//   if (Math.abs(currentEuler.x) > 0.001) {
//     // Elevation change
//     axis = new Vector3(1, 0, 0); // X-axis for elevation
//   } else {
//     axis =
//       forwardAxis === 'Z'
//         ? new Vector3(0, 1, 0) // Y-axis for Z-forward azimuth
//         : new Vector3(0, 0, 1); // Z-axis for X-forward azimuth
//   }
//
//   // Create rotation quaternion
//   return new Quaternion().setFromAxisAngle(axis.normalize(), rotationStep).normalize();
// }

export function getStepRotationInfinite(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion {
  const { angularDirection, forwardAxis } = agent.data.state;
  if (angularDirection.equals(new Quaternion(0, 0, 0, 1))) return new Quaternion();
  const axis = forwardAxis === 'Z' ? new Vector3(0, 1, 0) : new Vector3(0, 0, 1);
  const sign = Math.sign(rotationStep) || 1;
  return new Quaternion().setFromAxisAngle(axis, sign * Math.abs(rotationStep)).normalize();
}

export function isPointReached(target: TKinematicTarget | undefined, position: Vector3, state: TKinematicState): boolean {
  if (isNotDefined(target)) return false;
  const { position: targetPosition, positionThreshold } = target;
  if (isNotDefined(targetPosition)) return false;

  const { linearSpeed, linearDirection } = state;

  // If the agent is already at the target, do not move
  if (linearSpeed === 0) return true;

  const vectorToTarget: Vector3 = targetPosition.clone().sub(position);
  const distanceSquared: TMeters = vectorToTarget.lengthSq() as TMeters;

  // If the agent is close enough to the target, stop
  if (distanceSquared < positionThreshold * positionThreshold) return true;

  const crossedTarget: boolean = vectorToTarget.dot(linearDirection) < 0;
  // If the agent has passed the target, stop
  if (crossedTarget) return true;

  return false;
}

export function isRotationReached(target: TKinematicTarget | undefined, rotation: Quaternion, state: TKinematicState): boolean {
  if (isNotDefined(target)) return false;
  const { rotation: targetRotation, rotationThreshold } = target;

  if (isNotDefined(targetRotation)) return false;

  const { angularSpeed } = state;

  // If the speed is 0, do nothing
  if (angularSpeed === 0) return true;

  // Calculate the current angle to the target
  const angleToTarget: TRadians = rotation.angleTo(targetRotation) as TRadians;

  // If the agent is close enough to the target, stop
  if (angleToTarget < rotationThreshold) return true;

  return false;
}

export function rotateInstantly(agent: TWriteable<TKinematicTransformAgent>, targetRotation: Quaternion): void {
  agent.setAngularSpeed(0);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(agent.data.target?.rotation)) (agent.data.target as TWriteable<TKinematicTarget>).rotation = undefined;
  // eslint-disable-next-line functional/immutable-data
  (agent.data.state as TWriteable<TKinematicState>).angularDirection = targetRotation.clone().normalize();
  agent.rotation$.next(agent.data.state.angularDirection);
  return;
}

export function moveInstantly(agent: TWriteable<TKinematicTransformAgent>, targetPosition: Vector3): void {
  agent.setLinearSpeed(0);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(agent.data.target?.position)) (agent.data.target as TWriteable<TKinematicTarget>).position = undefined;
  agent.position$.next(targetPosition);
  return;
}

export function isInstant(speed: TKinematicSpeed): speed is KinematicSpeed.Instant {
  return speed === KinematicSpeed.Instant;
}
