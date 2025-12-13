import type { BehaviorSubject, Observable, Subject } from 'rxjs';
import { animationFrame, asapScheduler, auditTime, bufferTime, debounceTime, distinctUntilChanged, EMPTY, sampleTime, switchMap, tap, throttle, throttleTime, timer } from 'rxjs';
import { animationFrameScheduler } from 'rxjs/src/internal/scheduler/animationFrame';
import { queueScheduler } from 'rxjs/src/internal/scheduler/queue';
import type { Euler, Vector3 } from 'three';

import type { TSpace } from '@/Engine';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Facades';
import type { TAbstractTransformAgent, TWithProtectedTransformAgents } from '@/Engine/TransformDrive/Models';
import { isDefined, isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

export function getDynamicAgents<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(agents: T): TWithProtectedTransformAgents<T> {
  return Object.fromEntries(Object.entries(agents).map((v) => [v[0], ProtectedTransformAgentFacade(v[1])])) as TWithProtectedTransformAgents<T>;
}

export function updateFromActiveAgent<T extends Vector3 | Euler>(
  activeAgent$: BehaviorSubject<TAbstractTransformAgent>,
  agentProp: 'position$' | 'rotation$' | 'scale$',
  { delay, threshold }: Readonly<{ delay: number; threshold: number }>
): Observable<T> {
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);

  return activeAgent$.pipe(
    switchMap((agent: TAbstractTransformAgent): Subject<T> | Observable<never> => {
      return isDefined(agent) ? (agent[agentProp] as unknown as Subject<T>) : EMPTY;
    }),
    distinctUntilChanged((_prev: T, curr: T): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, threshold)),
    // TODO 8.0.0. MODELS: These performance tweaks actually make performance even worse. Fix or remove (check all th other places with suc optimisations, e.g. intersections or mouse)
    // throttleTime(delay)
    tap((value: T): void => {
      // eslint-disable-next-line functional/immutable-data
      prevValue[0] = value.x;
      // eslint-disable-next-line functional/immutable-data
      prevValue[1] = value.y;
      // eslint-disable-next-line functional/immutable-data
      prevValue[2] = value.z;
    })
  );
}
