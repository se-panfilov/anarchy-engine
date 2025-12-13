import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, pairwise, ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Facades';
import type {
  TAbstractTransformAgent,
  TProtectedTransformAgentFacade,
  TTransformDrive,
  TTransformDriveMandatoryFields,
  TTransformDriveParams,
  TTransformDrivePerformanceOptions
} from '@/Engine/TransformDrive/Models';
import { getDynamicAgents, updateFromActiveAgent } from '@/Engine/TransformDrive/Utils';
import { isNotDefined } from '@/Engine/Utils';

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

  const activeAgentSub$: Subscription = activeAgent$
    .pipe(
      distinctUntilChanged((prev: TAbstractTransformAgent, curr: TAbstractTransformAgent): boolean => prev.type === curr.type),
      pairwise()
    )
    .subscribe(([prevAgent, newAgent]: [TAbstractTransformAgent, TAbstractTransformAgent]): void => {
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
  // TODO CWP
  // TODO 8.0.0. MODELS: when we push this value, max call stack exceeded (all agents). Maybe we don't need this, but use onActivated hook?
  // positionRep$.subscribe(activeAgent$.value.position$);
  // rotationRep$.subscribe(activeAgent$.value.rotation$);
  // scaleRep$.subscribe(activeAgent$.value.scale$);

  const destroyable: TDestroyable = destroyableMixin();

  // TODO ENV: limited fps, perhaps should be configurable
  const performance: Required<TTransformDrivePerformanceOptions> = {
    updatePositionDelay: params.performance?.updatePositionDelay ?? 2,
    updateRotationDelay: params.performance?.updateRotationDelay ?? 2,
    updateScaleDelay: params.performance?.updateScaleDelay ?? 2,
    positionNoiseThreshold: params.performance?.positionNoiseThreshold ?? 0.0000001,
    rotationNoiseThreshold: params.performance?.rotationNoiseThreshold ?? 0.0000001,
    scaleNoiseThreshold: params.performance?.scaleNoiseThreshold ?? 0.0000001
  };

  const positionSub$: Subscription = updateFromActiveAgent<Vector3>(activeAgent$, 'position$', { delay: performance.updatePositionDelay, threshold: performance.positionNoiseThreshold }).subscribe(
    position$
  );
  const rotationSub$: Subscription = updateFromActiveAgent<Euler>(activeAgent$, 'rotation$', { delay: performance.updateRotationDelay, threshold: performance.rotationNoiseThreshold }).subscribe(
    rotation$
  );
  const scaleSub$: Subscription = updateFromActiveAgent<Vector3>(activeAgent$, 'scale$', { delay: performance.updateScaleDelay, threshold: performance.scaleNoiseThreshold }).subscribe(scale$);

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
