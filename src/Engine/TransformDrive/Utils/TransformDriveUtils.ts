import type { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, EMPTY, sampleTime, switchMap, tap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

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
    sampleTime(delay),
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
