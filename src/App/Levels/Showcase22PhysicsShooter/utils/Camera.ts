import { Vector3 } from 'three';

import type { TActor, TCameraWrapper, TReadonlyVector3 } from '@/Engine';

export function cameraFollowingActor(cameraW: TCameraWrapper, actor: TActor): void {
  actor.drive.position$.subscribe((position: TReadonlyVector3): void => {
    cameraW.drive.position$.next(position.clone().add(new Vector3(0, 15, 20)));
    cameraW.lookAt(position as Vector3);
  });
}
