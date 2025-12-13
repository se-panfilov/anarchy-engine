import type { TReadonlyQuaternion, TReadonlyVector3, TWithTransformDrive } from '@Anarchy/Engine';
import type { Observable, Subject, Subscription } from 'rxjs';
import type { Vector3Like } from 'three';

export function attachConnectorPositionToSubj(
  connected: TWithTransformDrive<any>,
  subj: Subject<TReadonlyVector3> | Observable<TReadonlyVector3>,
  offset: Readonly<Vector3Like> = {
    x: 0,
    y: 0,
    z: 0
  }
): Subscription {
  return subj.subscribe((position: TReadonlyVector3): void => {
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.positionConnector.x = position.x + offset.x;
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.positionConnector.y = position.y + offset.y;
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.positionConnector.z = position.z + offset.z;
  });
}

export function attachConnectorRotationToSubj(connected: TWithTransformDrive<any>, subj: Subject<TReadonlyQuaternion> | Observable<TReadonlyQuaternion>): Subscription {
  return subj.subscribe((rotation: TReadonlyQuaternion): void => {
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.rotationQuaternionConnector.x = rotation.x;
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.rotationQuaternionConnector.y = rotation.y;
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.rotationQuaternionConnector.z = rotation.z;
    // eslint-disable-next-line functional/immutable-data
    connected.drive.connected.rotationQuaternionConnector.w = rotation.w;
  });
}
