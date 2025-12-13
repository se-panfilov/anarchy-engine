import { CameraType } from '@/Engine/Camera/Constants';
import type { TOrthographicCamera, TOrthographicCameraParams, TOrthographicCameraWrapper, TPerspectiveCamera, TPerspectiveCameraParams, TPerspectiveCameraWrapper } from '@/Engine/Camera/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export const isPerspectiveCamera = (camera: TOrthographicCamera | TPerspectiveCamera): camera is TPerspectiveCamera => camera.type === CameraType.Perspective;
export const isPerspectiveCameraWrapper = (camera: TOrthographicCameraWrapper | TPerspectiveCameraWrapper): camera is TPerspectiveCameraWrapper => isPerspectiveCamera(camera.entity);
export const isOrthographicCamera = (camera: TOrthographicCamera | TPerspectiveCamera): camera is TOrthographicCamera => camera.type === CameraType.Orthographic;
export const isOrthographicCameraWrapper = (camera: TOrthographicCameraWrapper | TPerspectiveCameraWrapper): camera is TOrthographicCameraWrapper => isOrthographicCamera(camera.entity);

export function applyPerspectiveCameraParams(camera: TWriteable<TPerspectiveCamera>, params: TPerspectiveCameraParams): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.fov)) camera.fov = params.fov;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.focus)) camera.focus = params.focus;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.filmGauge)) camera.filmGauge = params.filmGauge;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.filmOffset)) camera.filmOffset = params.filmOffset;
}

export function applyOrthographicCameraParams(camera: TWriteable<TOrthographicCamera>, params: TOrthographicCameraParams): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.left)) camera.left = params.left;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.right)) camera.right = params.right;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.top)) camera.top = params.top;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.bottom)) camera.bottom = params.bottom;
}
