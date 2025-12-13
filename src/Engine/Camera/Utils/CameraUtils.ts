import { PerspectiveCamera } from 'three';
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';

import { CameraType } from '@/Engine/Camera/Constants';
import type { TCameraParams, TOrthographicCamera, TPerspectiveCamera } from '@/Engine/Camera/Models';
import type { TContainerDecorator } from '@/Engine/Global';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function isPerspectiveCamera(camera: TWriteable<TOrthographicCamera | TPerspectiveCamera>): camera is TPerspectiveCamera {
  return camera.type === CameraType.Perspective;
}

export function isOrthographicCamera(camera: TWriteable<TOrthographicCamera | TPerspectiveCamera>): camera is TOrthographicCamera {
  return camera.type === CameraType.Orthographic;
}

export function createCamera(params: TCameraParams, container: TContainerDecorator): TPerspectiveCamera | TOrthographicCamera | never {
  switch (params.type) {
    case CameraType.Perspective:
      return new PerspectiveCamera(params.fov ?? 45, container.getRatio(), params.near ?? 1, params.far);
    case CameraType.Orthographic:
      return new OrthographicCamera(params.left, params.right, params.top, params.bottom, params.near, params.far);
    default:
      throw new Error(`Unsupported camera type: ${params.type}`);
  }
}

export function applyPerspectiveCameraParams(camera: TWriteable<TPerspectiveCamera>, params: TCameraParams): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.fov)) camera.fov = params.fov;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.focus)) camera.focus = params.focus;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.filmGauge)) camera.filmGauge = params.filmGauge;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.filmOffset)) camera.filmOffset = params.filmOffset;
}

export function applyOrthographicCameraParams(camera: TWriteable<TOrthographicCamera>, params: TCameraParams): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.left)) camera.left = params.left;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.right)) camera.right = params.right;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.top)) camera.top = params.top;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.bottom)) camera.bottom = params.bottom;
}
