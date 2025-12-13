import type { RigidBody, Rotation } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import type { Subscription } from 'rxjs';
import { Vector3 } from 'three';

import type { TActorParams, TActorWithPhysicsDependencies, TActorWrapper, TActorWrapperWithPhysics } from '@/Engine/Actor/Models';
import type { TPhysicsBodyFacade, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { makeWrapperWithPhysicsBody, RigidBodyTypesNames } from '@/Engine/Physics';
import { isNotDefined } from '@/Engine/Utils';

import { ActorWrapper } from './ActorWrapper';

export function ActorWrapperWithPhysics(
  params: TActorParams,
  deps: TActorWithPhysicsDependencies,
  customCreatePhysicsBodyFn?: (physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService, additionalParams?: Record<string, any>) => TPhysicsBodyFacade,
  additionalParams?: Record<string, any>
): TActorWrapperWithPhysics | never {
  if (isNotDefined(params.physics)) throw new Error('Cannot create Actor with Physics: physics params are missing');
  const actorW: TActorWrapper = ActorWrapper(params, deps);
  const actorPhysicalW: TActorWrapperWithPhysics = makeWrapperWithPhysicsBody(actorW, params.physics, deps.physicsBodyService, customCreatePhysicsBodyFn, additionalParams);

  const sub$: Subscription = deps.physicsLoopService.tick$.subscribe((): void => {
    updateActorByPhysicalBody(actorPhysicalW);
    updateMovementInfo(actorPhysicalW, deps.physicsBodyService);
  });

  actorPhysicalW.destroyed$.subscribe(() => sub$.unsubscribe());

  return actorPhysicalW;
}

function updateActorByPhysicalBody(actorPhysicalW: TActorWrapperWithPhysics): void | never {
  if (actorPhysicalW.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
  const rigidBody: RigidBody | undefined = actorPhysicalW.physicsBody.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');

  const vector: Vector = rigidBody.translation();
  actorPhysicalW.setPosition(new Vector3(vector.x, vector.y, vector.z));
  const { x, y, z, w }: Rotation = rigidBody.rotation();
  actorPhysicalW.entity.quaternion.set(x, y, z, w);
}

function updateMovementInfo(actorPhysicalW: TActorWrapperWithPhysics, physicsBodyService: TPhysicsBodyService): void | never {
  if (!actorPhysicalW.physicsBody.shouldUpdateKinematic()) return;
  if (actorPhysicalW.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
  actorPhysicalW.kinematic.setData(physicsBodyService.getKinematicDataFromPhysics(actorPhysicalW.physicsBody));
}
