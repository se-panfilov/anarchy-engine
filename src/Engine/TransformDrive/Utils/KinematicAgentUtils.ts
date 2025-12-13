import { Quaternion, Vector3 } from 'three';

import type { TKinematicState, TKinematicTarget } from '@/Engine/Kinematic';
import { KinematicSpeed } from '@/Engine/Kinematic';
import type { TMeters, TRadians } from '@/Engine/Math';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TKinematicSpeed, TKinematicTransformAgent } from '@/Engine/TransformDrive/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function getStepRotation(agent: TKinematicTransformAgent, rotationStep: TRadians, infinite: boolean): Quaternion | undefined {
  if (!infinite && isNotDefined(agent.data.target?.rotation)) return undefined;

  // Retrieve the target rotation (for infinite mode, it's used as a descriptor).
  const targetRotation: Quaternion = agent.data.target?.rotation ?? new Quaternion();
  const targetNormalized: Quaternion = targetRotation.clone().normalize();

  // Clamp w-component to prevent floating-point errors.
  const clamped: number = Math.min(Math.max(targetNormalized.w, -1), 1);
  let angle: number = 2 * Math.acos(clamped);

  // Correct angle to take the shortest rotation path.
  if (angle > Math.PI) angle -= 2 * Math.PI;

  const sinHalfAngle: number = Math.sqrt(1 - clamped * clamped);

  // Extract rotation axis; use a default axis if sinHalfAngle is too small.
  const axis: Vector3 = sinHalfAngle > 1e-6 ? new Vector3(targetNormalized.x, targetNormalized.y, targetNormalized.z).divideScalar(sinHalfAngle).normalize() : new Vector3(0, 1, 0);

  // Infinite Rotation Mode
  if (infinite) {
    // Use the computed sign (after correction) to determine a rotation direction.
    const stepAngle: number = Math.sign(angle) * rotationStep;
    return new Quaternion().setFromAxisAngle(axis, stepAngle);
  }

  // Finite Rotation Mode
  const currentRotation: Quaternion = agent.rotation$.value.clone().normalize();
  const qRelative: Quaternion = currentRotation.clone().invert().multiply(targetNormalized);

  // Clamp w-component for relative rotation.
  const relativeClampedW: number = Math.min(Math.max(qRelative.w, -1), 1);
  let relativeAngle: number = 2 * Math.acos(relativeClampedW);

  // Correct relative angle for the shortest path.
  if (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;

  const relativeSinHalfAngle: number = Math.sqrt(1 - relativeClampedW * relativeClampedW);

  // Extract the relative rotation axis.
  const relativeAxis: Vector3 = relativeSinHalfAngle > 1e-6 ? new Vector3(qRelative.x, qRelative.y, qRelative.z).divideScalar(relativeSinHalfAngle).normalize() : new Vector3(0, 1, 0);

  // Compute the rotation step with the shortest path correction.
  const stepAngle: number = Math.sign(relativeAngle) * Math.min(Math.abs(relativeAngle), rotationStep);

  return stepAngle !== 0 ? new Quaternion().setFromAxisAngle(relativeAxis, stepAngle) : undefined;
}

export function isPointReached(target: TKinematicTarget | undefined, position: TReadonlyVector3, state: TKinematicState): boolean {
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

export function isRotationReached(target: TKinematicTarget | undefined, rotation: TReadonlyQuaternion, state: TKinematicState): boolean {
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

export function rotateInstantly(agent: TWriteable<TKinematicTransformAgent>, targetRotation: TReadonlyQuaternion): void {
  agent.setAngularSpeed(0);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(agent.data.target?.rotation)) (agent.data.target as TWriteable<TKinematicTarget>).rotation = undefined;
  // eslint-disable-next-line functional/immutable-data
  (agent.data.state as TWriteable<TKinematicState>).angularDirection = targetRotation.clone().normalize();
  agent.rotation$.next(agent.data.state.angularDirection);
  return;
}

export function moveInstantly(agent: TWriteable<TKinematicTransformAgent>, targetPosition: TReadonlyVector3): void {
  agent.setLinearSpeed(0);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(agent.data.target?.position)) (agent.data.target as TWriteable<TKinematicTarget>).position = undefined;
  agent.position$.next(targetPosition);
  return;
}

export function isInstant(speed: TKinematicSpeed): speed is KinematicSpeed.Instant {
  return speed === KinematicSpeed.Instant;
}
