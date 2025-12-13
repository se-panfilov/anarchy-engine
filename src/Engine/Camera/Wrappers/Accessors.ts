import type { AudioListener, Vector3 } from 'three';

import type { TCommonCameraAccessors, TOrthographicCamera, TOrthographicCameraAccessors, TPerspectiveCamera, TPerspectiveCameraAccessors } from '@/Engine/Camera/Models';
import type { TWriteable } from '@/Engine/Utils';

export function getCommonCameraAccessors(entity: TWriteable<TOrthographicCamera | TPerspectiveCamera>): TCommonCameraAccessors {
  const lookAt = (vector3: Vector3): void => entity.lookAt(vector3);
  const setControls = (x: number, y: number, z: number): Vector3 => entity.position.set(x, y, z);

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

  function setZoom(zoom: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.zoom = zoom;
    entity.updateProjectionMatrix();
  }

  function setUp(x: number, y: number, z: number): void {
    entity.up.set(x, y, z);
    entity.updateProjectionMatrix();
  }

  function addListener(listener: AudioListener): void {
    entity.add(listener);
  }

  return { lookAt, setControls, setNear, setFar, setZoom, setUp, addListener };
}

export function getPerspectiveCameraAccessors(entity: TWriteable<TPerspectiveCamera>): TPerspectiveCameraAccessors {
  function setFov(fov: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.fov = fov;
    entity.updateProjectionMatrix();
  }

  function setAspect(aspect: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.aspect = aspect;
    entity.updateProjectionMatrix();
  }

  function setFocus(focus: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.focus = focus;
    entity.updateProjectionMatrix();
  }

  function setFilmGauge(filmGauge: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.filmGauge = filmGauge;
    entity.updateProjectionMatrix();
  }

  function setFilmOffset(filmOffset: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.filmOffset = filmOffset;
    entity.updateProjectionMatrix();
  }

  return { setFov, setAspect, setFocus, setFilmGauge, setFilmOffset };
}

export function getOrthographicCameraAccessors(entity: TWriteable<TOrthographicCamera>): TOrthographicCameraAccessors {
  function setLeft(left: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.left = left;
    entity.updateProjectionMatrix();
  }

  function setRight(right: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.right = right;
    entity.updateProjectionMatrix();
  }

  function setTop(top: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.top = top;
    entity.updateProjectionMatrix();
  }

  function setBottom(bottom: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.bottom = bottom;
    entity.updateProjectionMatrix();
  }

  return { setLeft, setRight, setTop, setBottom };
}
