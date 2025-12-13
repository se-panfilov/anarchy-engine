import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, ReplaySubject, sampleTime, switchMap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Facades';
import type { TAbstractTransformAgent, TProtectedTransformAgentFacade, TProtectedTransformAgents, TTransformDrive, TTransformDriveParams } from '@/Engine/TransformDrive/Models';
import { isEqualOrSimilarVector3Like, isNotDefined } from '@/Engine/Utils';

// TransformDrive is an entity to move/rotate/scale other entities
// TransformDrive could use different "agents" (modes) which can be switched in runtime:
// - Connected agent is expose mutable position/rotation/scale objects and follow the changes of them. Useful to work with 3rd party libs (e.g. animejs). But recommended to avoid.
// - Kinematic agent is a mode that moves actor by angular velocity and linear velocity (vectors). Useful when you need to know the direction (e.g. bullet, car) of the object. Recommended way for NPCs.
// - Default agent is providing almost nothing, but setters. Recommended for static objects.
// - Also: with every mode you can do position$.next() to "teleport" the object to the new position
export function TransformDrive(params: TTransformDriveParams, agents: Partial<Record<TransformAgent, TAbstractTransformAgent>>): TTransformDrive | never {
  const agent$: BehaviorSubject<TransformAgent> = new BehaviorSubject<TransformAgent>(params.activeAgent ?? TransformAgent.Default);

  const activeAgent: TAbstractTransformAgent | undefined = agents[agent$.value];
  if (isNotDefined(activeAgent)) throw new Error(`TransformDrive: Can't set an active agent. Agent "${agent$.value}" is not defined`);
  const activeAgent$: BehaviorSubject<TAbstractTransformAgent> = new BehaviorSubject(activeAgent);

  if (isNotDefined(activeAgent$.value)) throw new Error(`TransformDrive: Active agent ("${activeAgent$.value}") is not defined`);

  const agentSub$: Subscription = agent$.subscribe((agent: TransformAgent): void => {
    const newAgent: TAbstractTransformAgent | undefined = agents[agent];
    if (isNotDefined(newAgent)) throw new Error(`TransformDrive: Can't change an active agent for "${agent}": not defined`);
    activeAgent$.next(newAgent);
  });

  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(activeAgent$.value.position$.value);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(activeAgent$.value.rotation$.value);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(activeAgent$.value.scale$.value);

  const activeAgentSub$: Subscription = activeAgent$.subscribe((activeAgent: TAbstractTransformAgent): void => {
    Object.values(agents).forEach((agent: TAbstractTransformAgent): void => {
      agent.enabled$.next(agent.type === activeAgent.type);

      agent.position$.next(position$.value);
      agent.rotation$.next(rotation$.value);
      agent.scale$.next(scale$.value);
    });
  });

  //We don't expose these BehaviorSubjects, because they're vulnerable to external changes without .next() (e.g. "position.value = ...")
  const positionRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);
  const rotationRep$: ReplaySubject<Euler> = new ReplaySubject<Euler>(1);
  const scaleRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);
  const activeAgentRep$: ReplaySubject<TProtectedTransformAgentFacade<TAbstractTransformAgent>> = new ReplaySubject(1);

  position$.subscribe(positionRep$);
  rotation$.subscribe(rotationRep$);
  scale$.subscribe(scaleRep$);
  activeAgent$.subscribe((agent: TAbstractTransformAgent): void => activeAgentRep$.next(ProtectedTransformAgentFacade(agent)));

  // Update values of the active agent when drive.position$.next() is called from an external code
  positionRep$.subscribe(activeAgent$.value.position$);
  rotationRep$.subscribe(activeAgent$.value.rotation$);
  scaleRep$.subscribe(activeAgent$.value.scale$);

  const destroyable: TDestroyable = destroyableMixin();

  // TODO ENV: limited fps, perhaps should be configurable
  const positionDelay: number = params.performance?.updatePositionDelay ?? 4; // 240 FPS (when 16 is 60 FPS)
  const rotationDelay: number = params.performance?.updateRotationDelay ?? 4; // 240 FPS (when 16 is 60 FPS)
  const scaleDelay: number = params.performance?.updateScaleDelay ?? 4; // 240 FPS (when 16 is 60 FPS)
  const positionThreshold: number = params.performance?.positionNoiseThreshold ?? 0.001;
  const rotationThreshold: number = params.performance?.positionNoiseThreshold ?? 0.001;
  const scaleThreshold: number = params.performance?.positionNoiseThreshold ?? 0.001;

  const positionSub$: Subscription = activeAgent$
    .pipe(
      switchMap((agent: TAbstractTransformAgent): BehaviorSubject<TReadonlyVector3> => agent.position$),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilarVector3Like(prev, curr, positionThreshold)),
      sampleTime(positionDelay)
    )
    .subscribe(position$);

  const rotationSub$: Subscription = activeAgent$
    .pipe(
      switchMap((agent: TAbstractTransformAgent): BehaviorSubject<TReadonlyEuler> => agent.rotation$),
      distinctUntilChanged((prev: Euler, curr: Euler): boolean => isEqualOrSimilarVector3Like(prev, curr, rotationThreshold)),
      sampleTime(rotationDelay)
    )
    .subscribe(rotation$);

  const scaleSub$: Subscription = activeAgent$
    .pipe(
      switchMap((agent: TAbstractTransformAgent): BehaviorSubject<TReadonlyVector3> => agent.scale$),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilarVector3Like(prev, curr, scaleThreshold)),
      sampleTime(scaleDelay)
    )
    .subscribe(scale$);

  const result: TTransformDrive = {
    ...destroyable,
    agent$,
    activeAgent$: activeAgentRep$,
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
    agentSub$.unsubscribe();
    activeAgentSub$.unsubscribe();

    //Stop subjects
    agent$.complete();
    agent$.unsubscribe();
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    scale$.complete();
    scale$.unsubscribe();
    positionRep$.complete();
    positionRep$.unsubscribe();
    rotationRep$.complete();
    rotationRep$.unsubscribe();
    scaleRep$.complete();
    scaleRep$.unsubscribe();

    Object.values(agents).forEach((agent: TProtectedTransformAgentFacade<TAbstractTransformAgent>): void => agent.destroy$.next());
  });

  return result;
}

function getDynamicAgents(agents: Partial<Record<TransformAgent, TAbstractTransformAgent>>): TProtectedTransformAgents {
  return Object.fromEntries(Object.entries(agents).map((v) => [v[0], ProtectedTransformAgentFacade(v[1])])) as TProtectedTransformAgents;
}
