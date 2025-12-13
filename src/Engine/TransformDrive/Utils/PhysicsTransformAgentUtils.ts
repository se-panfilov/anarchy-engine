import type { RigidBody } from '@dimforge/rapier3d';
import type { BehaviorSubject } from 'rxjs';

import type { TPhysicsBody, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { isPhysicsBodyParamsComplete, RigidBodyTypesNames } from '@/Engine/Physics';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TRigidBodyTransformData } from '@/Engine/TransformDrive/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function getPhysicalBodyTransform<T extends { physicsBody$: BehaviorSubject<TPhysicsBody | undefined> }>(obj: T): TRigidBodyTransformData | never {
  if (isNotDefined(obj.physicsBody$.value)) return {};
  if (obj.physicsBody$.value.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return {};
  const rigidBody: RigidBody | undefined = obj.physicsBody$.value.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');

  return { position: rigidBody.translation(), rotation: rigidBody.rotation() };
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
