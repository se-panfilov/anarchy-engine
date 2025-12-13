import type { RigidBody, Rotation } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import type { Subscription } from 'rxjs';
import { Vector3 } from 'three';

import type { TActor, TActorParams, TActorWithPhysics, TActorWithPhysicsDependencies } from '@/Engine/Actor/Models';
import type { TPhysicsBodyFacade, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { makeWrapperWithPhysicsBody, RigidBodyTypesNames } from '@/Engine/Physics';
import { isNotDefined } from '@/Engine/Utils';

import { Actor } from './Actor';

// TODO 8.0.0. MODELS: Should not be a wrapper!!
export function ActorWithPhysics(
  params: TActorParams,
  deps: TActorWithPhysicsDependencies,
  customCreatePhysicsBodyFn?: (physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService, additionalParams?: Record<string, any>) => TPhysicsBodyFacade,
  additionalParams?: Record<string, any>
): TActorWithPhysics | never {
  if (isNotDefined(params.physics)) throw new Error('Cannot create Actor with Physics: physics params are missing');
  const actorW: TActor = Actor(params, deps);
  const actorPhysicalW: TActorWithPhysics = makeWrapperWithPhysicsBody(actorW, params.physics, deps.physicsBodyService, customCreatePhysicsBodyFn, additionalParams);

  const sub$: Subscription = deps.physicsLoopService.tick$.subscribe((): void => {
    updateActorByPhysicalBody(actorPhysicalW);
    updateMovementInfo(actorPhysicalW, deps.physicsBodyService);
  });

  actorPhysicalW.destroyed$.subscribe(() => sub$.unsubscribe());

  return actorPhysicalW;
}

function updateActorByPhysicalBody(actorPhysicalW: TActorWithPhysics): void | never {
  if (actorPhysicalW.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
  const rigidBody: RigidBody | undefined = actorPhysicalW.physicsBody.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');

  const vector: Vector = rigidBody.translation();
  actorPhysicalW.setPosition(new Vector3(vector.x, vector.y, vector.z));
  const { x, y, z, w }: Rotation = rigidBody.rotation();
  actorPhysicalW.entity.getModel3d().quaternion.set(x, y, z, w);
}

function updateMovementInfo(actorPhysicalW: TActorWithPhysics, physicsBodyService: TPhysicsBodyService): void | never {
  if (!actorPhysicalW.physicsBody.shouldUpdateKinematic()) return;
  if (actorPhysicalW.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
  actorPhysicalW.kinematic.setData(physicsBodyService.getKinematicDataFromPhysics(actorPhysicalW.physicsBody));
}
