import type { TVector3OrEuler } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithMutablePositionConnector } from '@hellpig/anarchy-engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@hellpig/anarchy-engine/TransformDrive/Utils/ActorDriveUtils';
import type { BehaviorSubject } from 'rxjs';

export function withMutablePositionConnector<T extends TVector3OrEuler>(position$: BehaviorSubject<T>): TWithMutablePositionConnector {
  return { positionConnector: getXyzUpdateProxy(position$.value.clone(), position$) };
}
