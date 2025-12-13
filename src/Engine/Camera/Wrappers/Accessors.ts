import type { AudioListener, Vector3 } from 'three';

import type { TCameraAccessors, TPerspectiveCamera } from '@/Engine/Camera/Models';
import type { TWriteable } from '@/Engine/Utils';

export function getAccessors(entity: TWriteable<TPerspectiveCamera>): TCameraAccessors {
  const setControls = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);
  const lookAt = (vector3: Vector3): void => entity.lookAt(vector3);

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

  function addListener(listener: AudioListener): void {
    entity.add(listener);
  }

  return { setControls, lookAt, setFov, setNear, setFar, setAspect, addListener };
}
