import type {
  TAbstractLightParams,
  TAnyLight,
  TDirectionalLight,
  TLightParams,
  TPointLight,
  TShadowCameraParams,
  TShadowOrthographicCameraParams,
  TShadowPerspectiveCameraParams,
  TSpotLight
} from '@Engine/Light/Models';
import { isDirectionalLight, isPointLight, isSpotLight } from '@Engine/Light/Utils';
import type { TWriteable } from '@Engine/Utils';
import { isDefined, isNotDefined } from '@Shared/Utils';
import { Vector3 } from 'three';

export function applyShadowParams<T extends TAnyLight, P extends TLightParams>(params: P, entity: TWriteable<T>): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.castShadow)) entity.castShadow = params.castShadow;

  if (isDefined(params.shadow)) {
    if (isDefined(params.shadow.mapSize)) entity.shadow?.mapSize.copy(params.shadow.mapSize);

    // eslint-disable-next-line functional/immutable-data
    if (isDefined(params.shadow.normalBias) && entity.shadow) entity.shadow.normalBias = params.shadow.normalBias;
    if (isDefined(params.shadow?.camera)) applyShadowCameraParams(params, entity);
  }
}

function applyShadowCameraParams(params: TAbstractLightParams, entity: TWriteable<TAnyLight>): void {
  const { shadow } = params;
  if (isNotDefined(shadow?.camera)) return;

  if (isDirectionalLight(entity)) applyDirectionalLightShadowCameraParams(params, entity);
  if (isPointLight(entity)) applyPointLightShadowCameraParams(params, entity);
  if (isSpotLight(entity)) applySpotLightShadowCameraParams(params, entity);
}

function applyCommonCameraParams(params: TShadowCameraParams, entity: TWriteable<TDirectionalLight | TPointLight | TSpotLight>): void {
  if (isNotDefined(params)) return;

  const { far, near, lookAt, up, layers, zoom } = params;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(far)) entity.shadow.camera.far = far;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(near)) entity.shadow.camera.near = near;

  if (isDefined(lookAt)) entity.shadow.camera.lookAt(lookAt);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(up)) entity.shadow.camera.up = new Vector3().copy(params.up ?? { x: 0, y: 1, z: 0 });

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(layers) && isDefined(entity.shadow.camera.layers?.mask)) entity.shadow.camera.layers.mask = layers ?? 1;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(zoom)) entity.shadow.camera.zoom = zoom;
}

function applyOrthographicCameraParams(params: TShadowOrthographicCameraParams, entity: TWriteable<TDirectionalLight>): void {
  const { left, right, top, bottom } = params;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(left)) entity.shadow.camera.left = left;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(right)) entity.shadow.camera.right = right;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(bottom)) entity.shadow.camera.bottom = bottom;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(top)) entity.shadow.camera.top = top;
}

function applyPerspectiveCameraParams(params: TShadowPerspectiveCameraParams, entity: TWriteable<TPointLight | TSpotLight>): void {
  const { filmGauge, filmOffset, focus, fov } = params;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(filmGauge)) entity.shadow.camera.filmGauge = filmGauge;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(filmOffset)) entity.shadow.camera.filmOffset = filmOffset;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(focus)) entity.shadow.camera.focus = focus;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(fov)) entity.shadow.camera.fov = fov;
}

function applyDirectionalLightShadowCameraParams({ shadow }: TAbstractLightParams, entity: TWriteable<TDirectionalLight>): void {
  if (isNotDefined(shadow?.camera)) return;

  applyCommonCameraParams(shadow.camera, entity);
  applyOrthographicCameraParams(shadow.camera, entity);
}

function applyPointLightShadowCameraParams({ shadow }: TAbstractLightParams, entity: TWriteable<TPointLight>): void {
  if (isNotDefined(shadow?.camera)) return;

  applyCommonCameraParams(shadow.camera, entity);
  applyPerspectiveCameraParams(shadow.camera, entity);
}

function applySpotLightShadowCameraParams({ shadow }: TAbstractLightParams, entity: TWriteable<TSpotLight>): void {
  if (isNotDefined(shadow?.camera)) return;

  applyCommonCameraParams(shadow.camera, entity);
  applyPerspectiveCameraParams(shadow.camera, entity);
}
