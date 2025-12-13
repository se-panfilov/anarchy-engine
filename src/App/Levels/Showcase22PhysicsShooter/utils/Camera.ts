import type { TActorWrapperAsync, TCameraWrapper, TWithCoordsXYZ } from '@/Engine';
import { Vector3Wrapper } from '@/Engine';

export function cameraFollowingActor(cameraW: TCameraWrapper, actorW: TActorWrapperAsync): void {
  const actorCoords: TWithCoordsXYZ = actorW.getPosition().getCoords();
  cameraW.setPosition(Vector3Wrapper({ x: actorCoords.x, y: actorCoords.y + 25, z: actorCoords.z + 10 }));
  // cameraW.setPosition(Vector3Wrapper({ x: actorCoords.x, y: actorCoords.y + 15, z: actorCoords.z }));
  // cameraW.entity.up = new Vector3(1, 0, 0);
  cameraW.lookAt(Vector3Wrapper(actorCoords));
}
