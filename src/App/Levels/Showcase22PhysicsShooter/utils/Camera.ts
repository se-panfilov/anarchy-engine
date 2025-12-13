import { Vector3 } from 'three';

import type { TActor, TCameraWrapper } from '@/Engine';

export function cameraFollowingActor(cameraW: TCameraWrapper, actor: TActor): void {
  const actorCoords: Vector3 = actor.position$.value.clone();
  cameraW.setPosition(new Vector3(actorCoords.x, actorCoords.y + 15, actorCoords.z + 20));
  // cameraW.setPosition(new Vector3(actorCoords.x, actorCoords.y + 25, actorCoords.z));
  // cameraW.entity.up = new Vector3(1, 0, 0);
  cameraW.lookAt(actorCoords);
}
