import type { RigidBody, Rotation, Vector } from '@dimforge/rapier3d';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, filter, map, switchMap } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';

import type { TPhysicsBody } from '@/Engine/Physics';
import { createPhysicsBodyObject, RigidBodyTypesNames } from '@/Engine/Physics';
import type { TReadonlyEuler, TReadonlyQuaternion } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TPhysicsAgentDependencies, TPhysicsTransformAgent, TPhysicsTransformAgentInternalParams, TPhysicsTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function PhysicsTransformAgent(params: TPhysicsTransformAgentParams, { physicsBodyService, physicsLoopService }: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const adaptedParams: TPhysicsTransformAgentInternalParams = { ...params, rotation: new Quaternion().setFromEuler(params.rotation) };
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Physical);

  const rotationQuaternion$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(
    new Quaternion(adaptedParams.rotation.x, adaptedParams.rotation.y, adaptedParams.rotation.z, adaptedParams.rotation.w)
  );
  const rotationQuaternionSub$: Subscription = rotationQuaternion$.pipe(map((q: TReadonlyQuaternion): TReadonlyEuler => new Euler().setFromQuaternion(q))).subscribe(abstractTransformAgent.rotation$);

  let physicsSub$: Subscription | undefined = undefined;

  // TODO 8.0.0. MODELS: PhysicsTransformAgent should do nothing if actor has no "physics" field.
  // TODO 8.0.0. MODELS: Make sure we can work with presets
  // TODO 8.0.0. MODELS: Add physics config to text (and to adapter)

  const agent: TPhysicsTransformAgent = {
    ...abstractTransformAgent,
    rotationQuaternion$,
    physicsBody: createPhysicsBodyObject(adaptedParams, physicsBodyService)
  };

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    rotationQuaternionSub$.unsubscribe();
    physicsSub$?.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  physicsSub$ = combineLatest([agent.enabled$, physicsLoopService.autoUpdate$])
    .pipe(
      filter(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): boolean => isEnabled && isAutoUpdate),
      switchMap((): Observable<void> => physicsLoopService.tick$)
    )
    .subscribe((): void => {
      const { position, rotation } = getPhysicalBodyTransform(agent);
      if (isDefined(position)) abstractTransformAgent.position$.next(new Vector3(position.x, position.y, position.z));
      if (isDefined(rotation)) rotationQuaternion$.next(new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w));
    });

  return agent;
}

function getPhysicalBodyTransform<T extends { physicsBody: TPhysicsBody }>(obj: T): { position?: Vector; rotation?: Rotation } | never {
  if (obj.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return {};
  const rigidBody: RigidBody | undefined = obj.physicsBody.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');

  return { position: rigidBody.translation(), rotation: rigidBody.rotation() };
}

// TODO 8.0.0. MODELS: remove?
// function updateMovementInfo<T extends { physicsBody: TPhysicsBody }>(obj: T, physicsBodyService: TPhysicsBodyService): void | never {
//   if (obj.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
//   obj.drive.kinematic.setData(physicsBodyService.getKinematicDataFromPhysics(obj.physicsBody));
// }
