import type { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, EMPTY, sampleTime, switchMap, tap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Facades';
import type { TAbstractTransformAgent, TWithProtectedTransformAgents } from '@/Engine/TransformDrive/Models';
import { isDefined, isEqualOrSimilarVector3Like } from '@/Engine/Utils';

export function getDynamicAgents<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(agents: T): TWithProtectedTransformAgents<T> {
  return Object.fromEntries(Object.entries(agents).map((v) => [v[0], ProtectedTransformAgentFacade(v[1])])) as TWithProtectedTransformAgents<T>;
}

export function updateFromActiveAgent<T extends Vector3 | Euler>(
  activeAgent$: BehaviorSubject<TAbstractTransformAgent>,
  agentProp: 'position$' | 'rotation$' | 'scale$',
  { delay, threshold }: Readonly<{ delay: number; threshold: number }>
): Observable<T> {
  //should not be Vector3 or Euler due to performance. Also, we need to re-create this object to prevent comparing the same reference
  let prevValue: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

  return activeAgent$.pipe(
    switchMap((agent: TAbstractTransformAgent): Subject<T> | Observable<never> => {
      return isDefined(agent) ? (agent[agentProp] as unknown as Subject<T>) : EMPTY;
    }),
    distinctUntilChanged((_prev: T, curr: T): boolean => isEqualOrSimilarVector3Like(prevValue, curr, threshold)),
    sampleTime(delay),
    tap((value: T): void => {
      //assign like that to avoid sharing the same reference
      prevValue = { x: value.x, y: value.y, z: value.z };
    })
  );
}
