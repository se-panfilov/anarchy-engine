import type { TCameraAccessors, TPerspectiveCamera } from '@/Engine/Camera/Models';
import type { TWriteable } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper } from '@/Engine/Vector';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: TWriteable<TPerspectiveCamera>): TCameraAccessors {
  const setControls = (x: number, y: number, z: number): TVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));
  const lookAt = (vector3: TVector3Wrapper): void => entity.lookAt(vector3.entity);

  function setFov(fov: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.fov = fov;
    entity.updateProjectionMatrix();
  }

  function setNear(near: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.near = near;
    entity.updateProjectionMatrix();
  }

  function setFar(far: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.far = far;
    entity.updateProjectionMatrix();
  }

  function setAspect(aspect: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.aspect = aspect;
    entity.updateProjectionMatrix();
  }

  return { setControls, lookAt, setFov, setNear, setFar, setAspect };
}
