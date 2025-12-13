import type { RigidBody, Rotation, Vector } from '@dimforge/rapier3d';

import type { TMeters, TRadians } from '@/Engine/Math';
import type { TPhysicsBody, TPhysicsBodyParams, TPhysicsBodyService } from '@/Engine/Physics';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TRigidBodyTransformData } from '@/Engine/TransformDrive/Models';
import { isNotDefined } from '@/Engine/Utils';

export function getPhysicsBodyTransform(
  body: RigidBody | undefined,
  prevPosition: Float32Array,
  prevRotation: Float32Array,
  tmpPosition: Float32Array,
  tmpRotation: Float32Array,
  positionNoiseThreshold: TMeters,
  rotationNoiseThreshold: TRadians
): TRigidBodyTransformData | undefined {
  if (isNotDefined(body)) return undefined;

  const translation: Vector = body.translation();
  // eslint-disable-next-line functional/immutable-data
  tmpPosition[0] = translation.x;
  // eslint-disable-next-line functional/immutable-data
  tmpPosition[1] = translation.y;
  // eslint-disable-next-line functional/immutable-data
  tmpPosition[2] = translation.z;

  const rotation: Rotation = body.rotation();
  // eslint-disable-next-line functional/immutable-data
  tmpRotation[0] = rotation.x;
  // eslint-disable-next-line functional/immutable-data
  tmpRotation[1] = rotation.y;
  // eslint-disable-next-line functional/immutable-data
  tmpRotation[2] = rotation.z;
  // eslint-disable-next-line functional/immutable-data
  tmpRotation[3] = rotation.w;

  const changedPosition: boolean =
    Math.abs(tmpPosition[0] - prevPosition[0]) > positionNoiseThreshold ||
    Math.abs(tmpPosition[1] - prevPosition[1]) > positionNoiseThreshold ||
    Math.abs(tmpPosition[2] - prevPosition[2]) > positionNoiseThreshold;

  const changedRotation: boolean =
    Math.abs(tmpRotation[0] - prevRotation[0]) > rotationNoiseThreshold ||
    Math.abs(tmpRotation[1] - prevRotation[1]) > rotationNoiseThreshold ||
    Math.abs(tmpRotation[2] - prevRotation[2]) > rotationNoiseThreshold ||
    Math.abs(tmpRotation[3] - prevRotation[3]) > rotationNoiseThreshold;

  if (!changedPosition && !changedRotation) return undefined;

  if (changedPosition) prevPosition.set(tmpPosition);
  if (changedRotation) prevRotation.set(tmpRotation);

  return {
    position: changedPosition ? new Float32Array(prevPosition) : undefined,
    rotation: changedRotation ? new Float32Array(prevRotation) : undefined
  };
}

export function createPhysicsBody(physicsBodyParams: TPhysicsBodyParams, physicsBodyService: TPhysicsBodyService): TPhysicsBody | undefined {
  if (!isPhysicsBodyParamsComplete(physicsBodyParams)) return undefined;
  return physicsBodyService.create(physicsBodyParams);
}

export function applyLatestTransform(rigidBody: RigidBody | undefined, position: TReadonlyVector3, rotation: TReadonlyQuaternion): void {
  if (isNotDefined(rigidBody)) return;
  rigidBody.setTranslation(position, false);
  rigidBody.setRotation(rotation, false);
}
