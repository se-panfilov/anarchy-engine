import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, pairwise, ReplaySubject, sampleTime, switchMap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Facades';
import type {
  TAbstractTransformAgent,
  TProtectedTransformAgentFacade,
  TTransformDrive,
  TTransformDriveMandatoryFields,
  TTransformDriveParams,
  TWithProtectedTransformAgents
} from '@/Engine/TransformDrive/Models';
import { isEqualOrSimilarVector3Like, isNotDefined } from '@/Engine/Utils';

// TransformDrive is an entity to move/rotate/scale other entities
// TransformDrive could use different "agents" (modes) which can be switched in runtime:
// - Connected agent is expose mutable position/rotation/scale objects and follow the changes of them. Useful to work with 3rd party libs (e.g. animejs). But recommended to avoid.
// - Kinematic agent is a mode that moves actor by angular velocity and linear velocity (vectors). Useful when you need to know the direction (e.g. bullet, car) of the object. Recommended way for NPCs.
// - Default agent is providing almost nothing, but setters. Recommended for static objects.
// - Also: with every mode you can do position$.next() to "teleport" the object to the new position
export function TransformDrive<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(params: TTransformDriveParams, agents: T): TTransformDrive<T> | never {
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

  // TODO 8.0.0. MODELS: check if pairwise works correctly here (prev value behaves as expected)
  const activeAgentSub$: Subscription = activeAgent$.pipe(pairwise()).subscribe(([prevAgent, newAgent]: [TAbstractTransformAgent, TAbstractTransformAgent]): void => {
    const position: Vector3 = position$.value;
    const rotation: Euler = rotation$.value;
    const scale: Vector3 = scale$.value;

    prevAgent.onDeactivated$.next({ position, rotation, scale });
    Object.values(agents).forEach((agent: TAbstractTransformAgent): void => {
      const isActiveAgent: boolean = agent.type === newAgent.type;
      agent.enabled$.next(isActiveAgent);

      //when we change the active agent, we need to update the values of the agent
      agent.position$.next(position);
      agent.rotation$.next(rotation);
      agent.scale$.next(scale);
    });
    newAgent.onActivated$.next({ position, rotation, scale });
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

  const result: TTransformDriveMandatoryFields = {
    ...destroyable,
    agent$,
    activeAgent$: activeAgentRep$,
    getActiveAgent: (): TProtectedTransformAgentFacade<TAbstractTransformAgent> => activeAgent$.value,
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

  return result as TTransformDrive<T>;
}

function getDynamicAgents<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(agents: T): TWithProtectedTransformAgents<T> {
  return Object.fromEntries(Object.entries(agents).map((v) => [v[0], ProtectedTransformAgentFacade(v[1])])) as TWithProtectedTransformAgents<T>;
}
