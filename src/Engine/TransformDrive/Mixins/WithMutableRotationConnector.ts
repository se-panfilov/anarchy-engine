import type { BehaviorSubject } from 'rxjs';

import type { TVector3OrEuler } from '@/Engine/ThreeLib';
import type { TWithMutableRotationConnector } from '@/Engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@/Engine/TransformDrive/Utils';

export function withMutableRotationConnector<T extends TVector3OrEuler>(rotation$: BehaviorSubject<T>): TWithMutableRotationConnector {
  return { rotationConnector: getXyzUpdateProxy(rotation$.value.clone(), rotation$) };
}
