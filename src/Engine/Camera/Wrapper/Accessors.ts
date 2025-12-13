import type { ICameraAccessors, IPerspectiveCamera } from '@/Engine/Camera/Models';
import type { IWriteable } from '@/Engine/Utils';
import type { IVector3Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper } from '@/Engine/Vector';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<IPerspectiveCamera>): ICameraAccessors {
  const setControls = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));
  const lookAt = (vector3: IVector3Wrapper): void => entity.lookAt(vector3.entity);

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
