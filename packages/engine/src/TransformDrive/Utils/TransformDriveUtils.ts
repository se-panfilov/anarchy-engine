import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Engine/ThreeLib';
import type { TransformAgent } from '@Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TTransformDriveCompatibleEntity, TWithTransformDrive } from '@Engine/TransformDrive/Models';
import { isDefined, isEqualOrSimilarByXyzCoords } from '@Engine/Utils';
import type { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, EMPTY, switchMap, tap } from 'rxjs';

export function getDynamicAgents<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(agents: T): T {
  return Object.fromEntries(Object.entries(agents).map((v) => [v[0], v[1]])) as T;
}

export function updateFromActiveAgent<T extends TReadonlyVector3 | TReadonlyQuaternion>(
  activeAgent$: BehaviorSubject<TAbstractTransformAgent>,
  agentProp: 'position$' | 'rotation$' | 'scale$',
  { threshold }: Readonly<{ threshold: number }>
): Observable<T> {
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);

  return activeAgent$.pipe(
    switchMap((agent: TAbstractTransformAgent): Subject<T> | Observable<never> => {
      return isDefined(agent) ? (agent[agentProp] as unknown as Subject<T>) : EMPTY;
    }),
    distinctUntilChanged((_prev: T, curr: T): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, threshold)),
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

export function hasTransformDrive<T extends TTransformDriveCompatibleEntity>(entity: unknown): entity is TWithTransformDrive<T> {
  return isDefined((entity as TWithTransformDrive<T>).drive) && isDefined((entity as TWithTransformDrive<T>).driveToTargetConnector);
}
