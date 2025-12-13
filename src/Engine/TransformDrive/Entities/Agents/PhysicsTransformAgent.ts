import type { RigidBody } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, distinctUntilChanged, EMPTY, filter, map, switchMap, takeWhile, withLatestFrom } from 'rxjs';
import type { QuaternionLike, Vector3Like } from 'three';
import { Quaternion, Vector3 } from 'three';

import type { TMeters, TRadians } from '@/Engine/Math';
import { meters, radians } from '@/Engine/Measurements';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@/Engine/Physics';
import { RigidBodyTypesNames } from '@/Engine/Physics';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type {
  TAbstractTransformAgent,
  TPhysicsAgentDependencies,
  TPhysicsTransformAgent,
  TPhysicsTransformAgentInternalParams,
  TPhysicsTransformAgentParams,
  TReadonlyTransform,
  TRigidBodyTransformData
} from '@/Engine/TransformDrive/Models';
import { applyLatestTransform, createPhysicsBody, getPhysicalBodyTransform } from '@/Engine/TransformDrive/Utils';
import { isDefined, isEulerLike, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

// Physical bodies doesn't play well with manual set of position/rotation (e.g. position$.next(), rotation$.next() from any external sources).
// In principle, it's better to avoid manual setting of position/rotation for physics objects.
// But if you have to, first change active agent to "Default", then set position/rotation, and then switch back to "Physical" agent.
export function PhysicsTransformAgent(params: TPhysicsTransformAgentParams, { physicsBodyService, physicalLoop }: TPhysicsAgentDependencies): TPhysicsTransformAgent {
  const positionNoiseThreshold: TMeters = params.performance?.positionNoiseThreshold ?? meters(0.0000001);
  const rotationNoiseThreshold: TRadians = params.performance?.rotationNoiseThreshold ?? radians(0.0000001);

  const adaptedParams: TPhysicsTransformAgentInternalParams = {
    ...params,
    rotation: isEulerLike(params.rotation) ? new Quaternion().setFromEuler(params.rotation) : params.rotation
  };
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

  // eslint-disable-next-line functional/immutable-data
  const agent: TPhysicsTransformAgent = Object.assign(abstractTransformAgent, {
    physicsBody$,
    serialize: (): TPhysicsBodyConfig => {
      const body: TPhysicsBody | undefined = physicsBody$.value;
      if (isNotDefined(body)) throw new Error(`[Serialization] PhysicsTransformAgent: physics body is not defined for agent with name: "${params.name}", (id: "${agent.id}")`);

      return body.serialize();
    }
  });

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
  });

  let prevPosition: Vector3Like | undefined = undefined;
  let prevRotation: QuaternionLike | undefined = undefined;

  //Watching $ticks only when agent is enabled and physics loop is auto-updating
  physicsSub$ = combineLatest([agent.enabled$, physicalLoop.enabled$])
    .pipe(
      distinctUntilChanged(([a1, b1]: [boolean, boolean], [a2, b2]: [boolean, boolean]): boolean => a1 === a2 && b1 === b2),
      //If agent is enabled and physics loop is auto-updating, then we are switching to the physics loop ticks
      switchMap(([isEnabled, isLoopEnabled]: ReadonlyArray<boolean>) => {
        if (isEnabled && isLoopEnabled) return physicalLoop.tick$;
        return EMPTY;
      }),
      filter((): boolean => {
        const body: TPhysicsBody | undefined = physicsBody$.value;
        return isDefined(body) && body.getPhysicsBodyType() !== RigidBodyTypesNames.Fixed;
      }),
      //Get the latest transform data from the physics body every physical tick
      map((): TRigidBodyTransformData | undefined => getPhysicalBodyTransform(physicsBody$.value?.getRigidBody(), prevPosition, prevRotation, positionNoiseThreshold, rotationNoiseThreshold)),
      filter(isDefined)
    )
    .subscribe(({ position, rotation }: TRigidBodyTransformData): void => {
      if (position) {
        agent.position$.next(new Vector3(position.x, position.y, position.z));
        prevPosition = position;
      }
      if (rotation) {
        agent.rotation$.next(new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w));
        prevRotation = rotation;
      }
    });

  return agent;
}
