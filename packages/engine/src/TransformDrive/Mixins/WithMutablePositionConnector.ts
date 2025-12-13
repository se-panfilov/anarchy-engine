import type { BehaviorSubject } from 'rxjs';

import type { TVector3OrEuler } from '@/Engine/ThreeLib';
import type { TWithMutablePositionConnector } from '@/Engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@/Engine/TransformDrive/Utils';

export function withMutablePositionConnector<T extends TVector3OrEuler>(position$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(position$.value.clone(), position$) };
}
