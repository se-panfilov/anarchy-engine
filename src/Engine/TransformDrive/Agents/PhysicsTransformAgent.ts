import type { RigidBody, Rotation, Vector } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import { Vector3 } from 'three';

import type { TPhysicsBody, TPhysicsBodyService } from '@/Engine/Physics';
import { makeWrapperWithPhysicsBody, RigidBodyTypesNames } from '@/Engine/Physics';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TPhysicsAgentDependencies, TPhysicsTransformAgent, TPhysicsTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function PhysicsTransformAgent(params: TPhysicsTransformAgentParams, { physicsBodyService, physicsLoopService }: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Physical);

  // TODO 8.0.0. MODELS: cwp
  const obj = { physics: undefined };
  // TODO 8.0.0. MODELS: any
  const some: any = makeWrapperWithPhysicsBody(obj, params, physicsBodyService);

  // TODO 8.0.0. MODELS: could we add some performance tweaks here?
  const sub$: Subscription = physicsLoopService.tick$.subscribe((): void => {
    // updateActorByPhysicalBody(obj);
    // updateMovementInfo(obj, physicsBodyService);
  });

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  return {
    ...abstractTransformAgent
  };
}

function updateActorByPhysicalBody<T extends { physicsBody: TPhysicsBody }>(obj: T): void | never {
  if (obj.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
  const rigidBody: RigidBody | undefined = obj.physicsBody.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');

  const vector: Vector = rigidBody.translation();
  obj.setPosition(new Vector3(vector.x, vector.y, vector.z));
  const { x, y, z, w }: Rotation = rigidBody.rotation();
  obj.model3d.getRawModel3d().quaternion.set(x, y, z, w);
}

function updateMovementInfo<T extends { physicsBody: TPhysicsBody }>(obj: T, physicsBodyService: TPhysicsBodyService): void | never {
  if (obj.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
  obj.drive.kinematic.setData(physicsBodyService.getKinematicDataFromPhysics(obj.physicsBody));
}
