import type { Observable, Subject, Subscription } from 'rxjs';
import type { Vector3Like } from 'three';

import type { TActor, TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine';

export function attachConnectorPositionToSubj(
  connectedActor: TActor,
  subj: Subject<TReadonlyVector3> | Observable<TReadonlyVector3>,
  offset: Readonly<Vector3Like> = {
    x: 0,
    y: 0,
    z: 0
  }
): Subscription {
  return subj.subscribe((position: TReadonlyVector3): void => {
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.positionConnector.x = position.x + offset.x;
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.positionConnector.y = position.y + offset.y;
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.positionConnector.z = position.z + offset.z;
  });
}

export function attachConnectorRotationToSubj(connectedActor: TActor, subj: Subject<TReadonlyQuaternion> | Observable<TReadonlyQuaternion>): Subscription {
  return subj.subscribe((rotation: TReadonlyQuaternion): void => {
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.rotationQuaternionConnector.x = rotation.x;
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.rotationQuaternionConnector.y = rotation.y;
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.rotationQuaternionConnector.z = rotation.z;
    // eslint-disable-next-line functional/immutable-data
    connectedActor.drive.connected.rotationQuaternionConnector.w = rotation.w;
  });
}
