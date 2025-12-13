import type { RigidBody, Rotation, Vector } from '@dimforge/rapier3d';
import type { QuaternionLike, Vector3Like } from 'three';

import type { TPhysicsBody, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TRigidBodyTransformData } from '@/Engine/TransformDrive/Models';
import { isDefined, isEqualOrSimilarVector3Like, isEqualOrSimilarVector4Like, isNotDefined } from '@/Engine/Utils';

export function getPhysicalBodyTransform(
  body: RigidBody | undefined,
  prevPosition: Vector3Like | undefined,
  prevRotation: QuaternionLike | undefined,
  thresholdPosition: number,
  thresholdRotation: number
): TRigidBodyTransformData | undefined {
  if (isNotDefined(body)) return undefined;

  const position: Vector = body.translation();
  const rotation: Rotation = body.rotation();

  const changedPosition: boolean = !isDefined(prevPosition) || !isEqualOrSimilarVector3Like(position, prevPosition, thresholdPosition);
  const changedRotation: boolean = !isDefined(prevRotation) || !isEqualOrSimilarVector4Like(rotation, prevRotation, thresholdRotation);

  if (!changedPosition && !changedRotation) return undefined;

  return {
    position: changedPosition ? position : undefined,
    rotation: changedRotation ? rotation : undefined
  };
}

export function createPhysicsBody(physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService): TPhysicsBody | undefined {
  const { presetName, ...rest } = physics;
  if (isDefined(presetName)) return physicsBodyService.createWithPresetName(physics, presetName);
  if (!isPhysicsBodyParamsComplete(rest)) return undefined;
  return physicsBodyService.create(rest);
}

export function applyLatestTransform(rigidBody: RigidBody | undefined, position: TReadonlyVector3, rotation: TReadonlyQuaternion): void {
  if (isNotDefined(rigidBody)) return;
  rigidBody.setTranslation(position, false);
  rigidBody.setRotation(rotation, false);
}
