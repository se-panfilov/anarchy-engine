import type { TActorWrapperAsync, TCameraWrapper, TWithCoordsXYZ } from '@/Engine';
import { Vector3Wrapper } from '@/Engine';

export function cameraFollowingActor(cameraW: TCameraWrapper, actorW: TActorWrapperAsync): void {
  const actorCoords: TWithCoordsXYZ = actorW.getPosition().getCoords();
  // const cameraCoords: TWithCoordsXYZ = cameraW.getPosition().getCoords();
  cameraW.setPosition(Vector3Wrapper({ x: actorCoords.x, y: actorCoords.y + 45, z: actorCoords.z + 10 }));
  cameraW.lookAt(Vector3Wrapper(actorCoords));
}
