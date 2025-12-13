import { nanoid } from 'nanoid';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, map, merge, ReplaySubject } from 'rxjs';
import type { Quaternion, Vector3 } from 'three';

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
  const id: string = 'transform_drive_' + nanoid();

  //All agent instances must be used only with this drive
  const relatedDriveIdSub$: Subscription = merge(
    ...Object.values(agents).map((agent: TAbstractTransformAgent): Observable<Readonly<{ value: string | undefined; agent: TAbstractTransformAgent }>> => {
      agent.relatedDriveId$.next(id);
      return agent.relatedDriveId$.pipe(map((value: string | undefined): Readonly<{ value: string | undefined; agent: TAbstractTransformAgent }> => ({ value, agent })));
    })
  ).subscribe(({ value, agent }: Readonly<{ value: string | undefined; agent: TAbstractTransformAgent }>): void => {
    if (value !== id) throw new Error(`TransformDrive: Agent "${agent.type}" (${agent.id}) initialized in TransformDrive (${id}), but attempted to use in another TransformDrive (${value})`);
  });

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
  const rotation$: BehaviorSubject<Quaternion> = new BehaviorSubject<Quaternion>(activeAgent$.value.rotation$.value);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(activeAgent$.value.scale$.value);

  let prevAgent: TAbstractTransformAgent | undefined;
  const activeAgentSub$: Subscription = activeAgent$
    .pipe(distinctUntilChanged((prev: TAbstractTransformAgent, curr: TAbstractTransformAgent): boolean => prev.type === curr.type))
    .subscribe((newAgent: TAbstractTransformAgent): void => {
      const position: Vector3 = position$.value;
      const rotation: Quaternion = rotation$.value;
      const scale: Vector3 = scale$.value;

      prevAgent?.onDeactivated$.next({ position, rotation, scale });
      Object.values(agents).forEach((agent: TAbstractTransformAgent): void => {
        const isActiveAgent: boolean = agent.type === newAgent.type;
        agent.enabled$.next(isActiveAgent);

        //when we change the active agent, we need to update the values of the agent
        agent.position$.next(position);
        agent.rotation$.next(rotation);
        agent.scale$.next(scale);
      });
      newAgent.onActivated$.next({ position, rotation, scale });
      prevAgent = newAgent;
    });

  //We don't expose these BehaviorSubjects, because they're vulnerable to external changes without .next() (e.g. "position.value = ...")
  const positionRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);
  const rotationRep$: ReplaySubject<Quaternion> = new ReplaySubject<Quaternion>(1);
  const scaleRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);
  const activeAgentRep$: ReplaySubject<TProtectedTransformAgentFacade<TAbstractTransformAgent>> = new ReplaySubject(1);

  position$.subscribe((p: Vector3): void => positionRep$.next(p));
  rotation$.subscribe((r: Quaternion): void => rotationRep$.next(r));
  scale$.subscribe((s: Vector3): void => scaleRep$.next(s));
  activeAgent$.subscribe((agent: TAbstractTransformAgent): void => activeAgentRep$.next(ProtectedTransformAgentFacade(agent)));

  // TODO 8.0.0. MODELS: Make sure we have no performance issue here, cause "filter" might be really highloaded
  // Update values of the active agent when drive.position$.next() is called from an external code
  // TODO CWP: Looks like "physics agent" is doesn't work like this. Have to fix. Maybe disable->setPosition->enable?
  positionRep$.pipe(filter((value: Vector3): boolean => value !== activeAgent$.value.position$.value)).subscribe((value: Vector3): void => activeAgent$.value.position$.next(value));
  rotationRep$.pipe(filter((value: Quaternion): boolean => value !== activeAgent$.value.rotation$.value)).subscribe((value: Quaternion): void => activeAgent$.value.rotation$.next(value));
  scaleRep$.pipe(filter((value: Vector3): boolean => value !== activeAgent$.value.scale$.value)).subscribe((value: Vector3): void => activeAgent$.value.scale$.next(value));

  const destroyable: TDestroyable = destroyableMixin();

  const performance: Required<TTransformDrivePerformanceOptions> = {
    positionNoiseThreshold: params.performance?.positionNoiseThreshold ?? 0.0000001,
    rotationNoiseThreshold: params.performance?.rotationNoiseThreshold ?? 0.0000001,
    scaleNoiseThreshold: params.performance?.scaleNoiseThreshold ?? 0.0000001
  };

  // TODO 10.0.0. LOOPS: TransformDrive should have an Transform loop independent from frame rate (driven by time)
  const positionSub$: Subscription = updateFromActiveAgent<Vector3>(activeAgent$, 'position$', { threshold: performance.positionNoiseThreshold }).subscribe((v: Vector3): void => position$.next(v));
  const rotationSub$: Subscription = updateFromActiveAgent<Quaternion>(activeAgent$, 'rotation$', { threshold: performance.rotationNoiseThreshold }).subscribe((r: Quaternion): void =>
    rotation$.next(r)
  );
  const scaleSub$: Subscription = updateFromActiveAgent<Vector3>(activeAgent$, 'scale$', { threshold: performance.scaleNoiseThreshold }).subscribe((s: Vector3): void => scale$.next(s));

  const result: TTransformDriveMandatoryFields = {
    ...destroyable,
    id,
    agent$,
    activeAgent$: activeAgentRep$,
    getActiveAgent: (): TProtectedTransformAgentFacade<TAbstractTransformAgent> => activeAgent$.value,
    position$: positionRep$,
    getPosition: (): Vector3 => position$.value.clone(),
    rotation$: rotationRep$,
    getRotation: (): Quaternion => rotation$.value.clone(),
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
    relatedDriveIdSub$.unsubscribe();

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
