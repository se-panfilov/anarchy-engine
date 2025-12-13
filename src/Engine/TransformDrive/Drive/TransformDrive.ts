import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, ReplaySubject, sampleTime, switchMap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import { isEqualOrSimilar } from '@/Engine/Actor/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Facades';
import type { TAbstractTransformAgent, TProtectedTransformAgentFacade, TProtectedTransformAgents, TTransformAgents, TTransformDrive, TTransformDriveParams } from '@/Engine/TransformDrive/Models';
import { isNotDefined } from '@/Engine/Utils';

// TransformDrive is an entity to move/rotate/scale other entities
// TransformDrive could use different "agents" (modes) which can be switched in runtime:
// - Connected agent is expose mutable position/rotation/scale objects and follow the changes of them. Useful to work with 3rd party libs (e.g. animejs). But recommended to avoid.
// - Kinematic agent is a mode that moves actor by angular velocity and linear velocity (vectors). Useful when you need to know the direction (e.g. bullet, car) of the object. Recommended way for NPCs.
// - Default agent is providing almost nothing, just use position$.next() of transform drive. Recommended for static objects.
// - Also: with every mode you can do position$.next() to "teleport" the object to the new position
export function TransformDrive(params: TTransformDriveParams, agents: TTransformAgents): TTransformDrive | never {
  const activeAgent: TransformAgent = params.activeAgent ?? TransformAgent.Default;

  if (isNotDefined(agents[activeAgent])) throw new Error(`Agent "${activeAgent}" is not defined`);

  //We don't want to expose these BehaviorSubjects, because they're vulnerable to external changes without .next()
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(agents[activeAgent].position$.value);
  const positionRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(agents[activeAgent].rotation$.value);
  const rotationRep$: ReplaySubject<Euler> = new ReplaySubject<Euler>(1);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(agents[activeAgent].scale$.value);
  const scaleRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);

  position$.subscribe(positionRep$);
  rotation$.subscribe(rotationRep$);
  scale$.subscribe(scaleRep$);

  const agent$: BehaviorSubject<TransformAgent> = new BehaviorSubject<TransformAgent>(activeAgent);

  const destroyable: TDestroyable = destroyableMixin();

  // TODO ENV: limit is 60 fps, perhaps should be configurable
  const delay: number = params.updateDelay ?? 4; // 240 FPS (when 16 is 60 FPS)
  const threshold: number = params.noiseThreshold ?? 0.001;

  const positionSub$: Subscription = agent$
    .pipe(
      switchMap((drive: TransformAgent): Observable<Vector3> => agents[drive as keyof TTransformAgents].position$),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(position$);

  const rotationSub$: Subscription = agent$
    .pipe(
      switchMap((drive: TransformAgent): Observable<Euler> => agents[drive as keyof TTransformAgents].rotation$),
      distinctUntilChanged((prev: Euler, curr: Euler): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(rotation$);

  const scaleSub$: Subscription = agent$
    .pipe(
      switchMap((drive: TransformAgent): Observable<Vector3> => agents[drive as keyof TTransformAgents].scale$),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(scale$);

  const result: TTransformDrive = {
    ...destroyable,
    agent$,
    position$: positionRep$,
    getPosition: (): Vector3 => position$.value.clone(),
    rotation$: rotationRep$,
    getRotation: (): Euler => rotation$.value.clone(),
    scale$: scaleRep$,
    getScale: (): Vector3 => scale$.value.clone(),
    ...getDynamicAgents(agents)
  };

  destroyable.destroy$.subscribe(() => {
    // Stop subscriptions
    positionSub$.unsubscribe();
    rotationSub$.unsubscribe();
    scaleSub$.unsubscribe();

    //Stop subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    scale$.complete();
    scale$.unsubscribe();

    Object.values(agents).forEach((agent: TProtectedTransformAgentFacade<TAbstractTransformAgent>): void => agent.destroy$.next());
  });

  return result;
}

function getDynamicAgents(agents: TTransformAgents): TProtectedTransformAgents {
  return Object.fromEntries(Object.entries(agents).map((v) => [v[0], ProtectedTransformAgentFacade(v[1])])) as TProtectedTransformAgents;
}
