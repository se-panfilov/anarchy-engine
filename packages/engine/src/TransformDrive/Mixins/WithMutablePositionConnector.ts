import type { BehaviorSubject } from 'rxjs';

import type { TVector3OrEuler } from '@/ThreeLib';
import type { TWithMutablePositionConnector } from '@/TransformDrive/Models';
import { getXyzUpdateProxy } from '@/TransformDrive/Utils';

export function withMutablePositionConnector<T extends TVector3OrEuler>(position$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(position$.value.clone(), position$) };
}
