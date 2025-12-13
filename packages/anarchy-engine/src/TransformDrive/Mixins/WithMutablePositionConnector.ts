import type { TVector3OrEuler } from '@Anarchy/Engine/ThreeLib';
import type { TWithMutablePositionConnector } from '@Anarchy/Engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@Anarchy/Engine/TransformDrive/Utils/ActorDriveUtils';
import type { BehaviorSubject } from 'rxjs';

export function withMutablePositionConnector<T extends TVector3OrEuler>(position$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(position$.value.clone(), position$) };
}
