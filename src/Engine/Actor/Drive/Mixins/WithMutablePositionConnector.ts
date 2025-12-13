import type { BehaviorSubject } from 'rxjs';

import type { TWithMutablePositionConnector } from '@/Engine/Actor/Models';
import { getXyzUpdateProxy } from '@/Engine/Actor/Utils';
import type { TVector3OrEuler } from '@/Engine/ThreeLib';

export function withMutablePositionConnector<T extends TVector3OrEuler>(position$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(position$.value.clone(), position$) };
}
