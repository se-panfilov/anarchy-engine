import type { TActor, TAnyCameraWrapper, TReadonlyVector3 } from '@hellpig/anarchy-engine';
import { Vector3 } from 'three';

export function cameraFollowingActor(cameraW: TAnyCameraWrapper, actor: TActor): void {
  actor.drive.position$.subscribe((position: TReadonlyVector3): void => {
    cameraW.drive.position$.next(position.clone().add(new Vector3(0, 15, 20)));
    cameraW.lookAt(position as Vector3);
  });
}
