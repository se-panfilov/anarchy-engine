import type { Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, distinctUntilChanged, EMPTY, map, scan, switchMap, takeWhile, withLatestFrom } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TPhysicsBody } from '@/Engine/Physics';
import { RigidBodyTypesNames } from '@/Engine/Physics';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type {
  TAbstractTransformAgent,
  TAccumulatedRigidBodyTransformData,
  TPhysicsAgentDependencies,
  TPhysicsTransformAgent,
  TPhysicsTransformAgentInternalParams,
  TPhysicsTransformAgentParams,
  TReadonlyTransform,
  TRigidBodyTransformData
} from '@/Engine/TransformDrive/Models';
import { applyLatestTransform, createPhysicsBody, getPhysicalBodyTransform } from '@/Engine/TransformDrive/Utils';
import { isDefined, isEqualOrSimilarVector3Like, isEqualOrSimilarVector4Like, isEulerLike, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

// Physical bodies doesn't play well with manual set of position/rotation (e.g. position$.next(), rotation$.next() from any external sources).
// In principle, it's better to avoid manual setting of position/rotation for physics objects.
// But if you have to, first change active agent to "Default", then set position/rotation, and then switch back to "Physical" agent.
export function PhysicsTransformAgent(params: TPhysicsTransformAgentParams, { physicsBodyService, physicalLoop }: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const noiseThreshold: number = params.performance?.noiseThreshold ?? 0.0000001;

  const adaptedParams: TPhysicsTransformAgentInternalParams = { ...params, rotation: isEulerLike(params.rotation) ? new Quaternion().setFromEuler(params.rotation) : params.rotation };
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Physical);

  const onDeactivated$Sub: Subscription = abstractTransformAgent.onDeactivated$.pipe(takeWhile((): boolean => isNotDefined(params.onDeactivated))).subscribe((): void => {
    if (isNotDefined(params.onDeactivated)) {
      console.warn(
        'PhysicsTransformAgent: onDeactivated is not defined. The physics body remains at the position it was the moment of deactivation. Please handle this (remove, move to a safe place), cause if left it as is could produce unexpected behavior.'
      );
    }
  });

  //apply the latest position/rotation to the physics body on activation
  const onActivated$Sub: Subscription = abstractTransformAgent.onActivated$.subscribe(({ position, rotation }: TReadonlyTransform): void => {
    if (isNotDefined(physicsBody$.value)) physicsBody$.next(createPhysicsBody(adaptedParams, physicsBodyService));
    applyLatestTransform(physicsBody$.value?.getRigidBody(), position, rotation);
  });

  let physicsSub$: Subscription | undefined = undefined;

  const physicsBody$: BehaviorSubject<TPhysicsBody | undefined> = new BehaviorSubject<TPhysicsBody | undefined>(undefined);

  const agent: TPhysicsTransformAgent = {
    ...abstractTransformAgent,
    physicsBody$
  };

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
    physicsSub$?.unsubscribe();
    enabledSub$.unsubscribe();
    prevBodyTypeSub.unsubscribe();
    onDeactivated$Sub?.unsubscribe();
    onActivated$Sub?.unsubscribe();

    abstractTransformAgent.destroy$.next();
    physicsBody$.complete();
    physicsBody$.unsubscribe();
  });

  //Watching $ticks only when agent is enabled and physics loop is auto-updating
  physicsSub$ = combineLatest([agent.enabled$, physicalLoop.enabled$])
    .pipe(
      //If agent is enabled and physics loop is auto-updating, then we are switching to the physics loop ticks
      switchMap(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>) => {
        if (isEnabled && isAutoUpdate) return physicalLoop.tick$;
        return EMPTY;
      }),
      //Get the latest transform data from the physics body every physical tick
      map((): TRigidBodyTransformData => getPhysicalBodyTransform(agent)),
      //Collect previous and current transform data to compare values later do nothing on the same data (distinctUntilChanged is not working great here)
      scan(
        (prev: TAccumulatedRigidBodyTransformData, curr: TRigidBodyTransformData): TAccumulatedRigidBodyTransformData => {
          return {
            prevPosition: prev.currPosition,
            currPosition: curr.position,
            prevRotation: prev.currRotation,
            currRotation: curr.rotation
          };
        },
        {
          prevPosition: undefined,
          currPosition: undefined,
          prevRotation: undefined,
          currRotation: undefined
        } satisfies TAccumulatedRigidBodyTransformData
      )
    )
    .subscribe(({ prevPosition, currPosition, prevRotation, currRotation }: TAccumulatedRigidBodyTransformData): void => {
      if (shouldUpdatePosition(prevPosition, currPosition, noiseThreshold)) agent.position$.next(new Vector3(currPosition.x, currPosition.y, currPosition.z));
      if (shouldUpdateRotation(prevRotation, currRotation, noiseThreshold)) agent.rotation$.next(new Quaternion(currRotation.x, currRotation.y, currRotation.z, currRotation.w));
    });

  return agent;
}

function shouldUpdatePosition(prevPosition: Vector3Like | undefined, currPosition: Vector3Like | undefined, threshold: number): currPosition is Vector3Like {
  if (isNotDefined(currPosition)) return false;
  return isDefined(prevPosition) ? !isEqualOrSimilarVector3Like(currPosition, prevPosition, threshold) : true;
}

function shouldUpdateRotation(prevRotation: QuaternionLike | undefined, currRotation: QuaternionLike | undefined, threshold: number): currRotation is QuaternionLike {
  if (isNotDefined(currRotation)) return false;
  return isDefined(prevRotation) ? !isEqualOrSimilarVector4Like(currRotation, prevRotation, threshold) : true;
}
