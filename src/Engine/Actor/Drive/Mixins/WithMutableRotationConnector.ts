import type { BehaviorSubject } from 'rxjs';

import type { TWithMutablePositionConnector } from '@/Engine/Actor/Models';
import { getXyzUpdateProxy } from '@/Engine/Actor/Utils';
import type { TVector3OrEuler } from '@/Engine/ThreeLib';

export function withMutableRotationConnector<T extends TVector3OrEuler>(rotation$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(rotation$.value.clone(), rotation$) };
}
