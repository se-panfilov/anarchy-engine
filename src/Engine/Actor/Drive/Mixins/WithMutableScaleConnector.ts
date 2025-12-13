import type { BehaviorSubject } from 'rxjs';

import type { TWithMutablePositionConnector } from '@/Engine/Actor/Models';
import { getXyzUpdateProxy } from '@/Engine/Actor/Utils';
import type { TVector3OrEuler } from '@/Engine/ThreeLib';

export function withMutableScaleConnector<T extends TVector3OrEuler>(scale$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(scale$.value?.clone(), scale$) };
}
