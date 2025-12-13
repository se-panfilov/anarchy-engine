import type { RigidBody, Rotation, Vector } from '@dimforge/rapier3d';
import type { Subject, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, switchMap, withLatestFrom } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';

import type { TPhysicsBody, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { isPhysicsBodyParamsComplete, RigidBodyTypesNames } from '@/Engine/Physics';
import type { TReadonlyEuler, TReadonlyQuaternion } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TPhysicsAgentDependencies, TPhysicsTransformAgent, TPhysicsTransformAgentInternalParams, TPhysicsTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function PhysicsTransformAgent(params: TPhysicsTransformAgentParams, { physicsBodyService, physicsLoopService }: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const adaptedParams: TPhysicsTransformAgentInternalParams = { ...params, rotation: new Quaternion().setFromEuler(params.rotation) };
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Physical);

  const onDeactivated$Sub: Subscription = abstractTransformAgent.onDeactivated$.subscribe((): void => {
    isDefined(params.onDeactivated)
      ? params.onDeactivated()
      : console.warn(
          'PhysicsTransformAgent: onDeactivated is not defined. The physics body remains at the position it was the moment of deactivation. Please handle this (remove, move to a safe place), cause if left it as is could produce unexpected behavior.'
        );
  });

  const rotationQuaternion$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(
    new Quaternion(adaptedParams.rotation.x, adaptedParams.rotation.y, adaptedParams.rotation.z, adaptedParams.rotation.w)
  );
  const rotationQuaternionSub$: Subscription = rotationQuaternion$.pipe(map((q: TReadonlyQuaternion): TReadonlyEuler => new Euler().setFromQuaternion(q))).subscribe(abstractTransformAgent.rotation$);

  let physicsSub$: Subscription | undefined = undefined;

  const physicsBody$: BehaviorSubject<TPhysicsBody | undefined> = new BehaviorSubject<TPhysicsBody | undefined>(undefined);

  // TODO 8.0.0. MODELS: apply position from an external source

  const agent: TPhysicsTransformAgent = {
    ...abstractTransformAgent,
    rotationQuaternion$,
    physicsBody$
  };

  physicsBody$.next(createPhysicsBody(adaptedParams, physicsBodyService));

  let previousPhysicsBodyType: RigidBodyTypesNames = physicsBody$.value?.getPhysicsBodyType() ?? RigidBodyTypesNames.Fixed;

  const prevBodyTypeSub: Subscription = physicsBody$.subscribe((physicsBody: TPhysicsBody | undefined): void => {
    if (isNotDefined(physicsBody)) return;
    previousPhysicsBodyType = physicsBody.getPhysicsBodyType();
  });

  const enabledSub$: Subscription = agent.enabled$
    .pipe(
      withLatestFrom(physicsBody$),
      distinctUntilChanged(
        ([prevEnabled, prevPhysicsBody]: [boolean, TPhysicsBody | undefined], [enabled, physicsBody]: [boolean, TPhysicsBody | undefined]): boolean =>
          prevEnabled === enabled && prevPhysicsBody === physicsBody
      )
    )
    .subscribe(([isEnabled, physicsBody]: [boolean, TPhysicsBody | undefined]): void | never => {
      if (isNotDefined(physicsBody?.getRigidBody())) return;
      if (!isEnabled) physicsBody.setPhysicsBodyType(RigidBodyTypesNames.KinematicPositionBased, false);
      else physicsBody?.setPhysicsBodyType(previousPhysicsBodyType, false);
    });

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    rotationQuaternionSub$.unsubscribe();
    physicsSub$?.unsubscribe();
    enabledSub$.unsubscribe();
    prevBodyTypeSub.unsubscribe();
    onDeactivated$Sub.unsubscribe();

    abstractTransformAgent.destroy$.next();
    physicsBody$.complete();
    physicsBody$.unsubscribe();
  });

  physicsSub$ = combineLatest([agent.enabled$, physicsLoopService.autoUpdate$])
    .pipe(
      // TODO 8.0.0. MODELS: does this pipe turn on and turn off watching tick$? Check everywhere (cause looks like it's turn it on, but not off)
      filter(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): boolean => isEnabled && isAutoUpdate),
      switchMap((): Subject<void> => physicsLoopService.tick$)
      // TODO 8.0.0. MODELS: perhaps distinctUntilChanged is needed here
    )
    .subscribe((): void => {
      const { position, rotation } = getPhysicalBodyTransform(agent);
      if (isDefined(position)) agent.position$.next(new Vector3(position.x, position.y, position.z));
      if (isDefined(rotation)) rotationQuaternion$.next(new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w));
    });

  return agent;
}

function getPhysicalBodyTransform<T extends { physicsBody$: BehaviorSubject<TPhysicsBody | undefined> }>(obj: T): { position?: Vector; rotation?: Rotation } | never {
  if (isNotDefined(obj.physicsBody$.value)) return {};
  if (obj.physicsBody$.value.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return {};
  const rigidBody: RigidBody | undefined = obj.physicsBody$.value.getRigidBody();
  if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');

  return { position: rigidBody.translation(), rotation: rigidBody.rotation() };
}

function createPhysicsBody(physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService): TPhysicsBody | undefined {
  const { presetName, ...rest } = physics;
  if (isDefined(presetName)) return physicsBodyService.createWithPresetName(physics, presetName);
  if (!isPhysicsBodyParamsComplete(rest)) return undefined;
  return physicsBodyService.create(rest);
}
