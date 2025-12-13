import { Vector3 } from 'three';

import type { TActorWrapper, TCameraWrapper } from '@/Engine';

export function cameraFollowingActor(cameraW: TCameraWrapper, actorW: TActorWrapper): void {
  const actorCoords: Vector3 = actorW.getPosition();
  cameraW.setPosition(new Vector3(actorCoords.x, actorCoords.y + 15, actorCoords.z + 20));
  // cameraW.setPosition(new Vector3(actorCoords.x, actorCoords.y + 25, actorCoords.z));
  // cameraW.entity.up = new Vector3(1, 0, 0);
  cameraW.lookAt(actorCoords);
}
