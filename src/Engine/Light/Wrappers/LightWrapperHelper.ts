import type { DirectionalLightShadow, PointLightShadow, SpotLightShadow } from 'three';
import { Vector3 } from 'three';

import { isOrthographicCameraParams, isPerspectiveCameraParams } from '@/Engine/Camera';
import type { TAbstractLightParams, TAnyLight, TLightParams } from '@/Engine/Light/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function applyShadowParams<T extends TAnyLight, P extends TLightParams>(params: P, entity: TWriteable<T>): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.castShadow)) entity.castShadow = params.castShadow;

  if (isDefined(params.shadow)) {
    if (isDefined(params.shadow.mapSize)) entity.shadow?.mapSize.copy(params.shadow.mapSize);

    //camera params
    if (isDefined(params.shadow.camera)) {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(params.shadow.camera.near) && entity.shadow) entity.shadow.camera.near = params.shadow.camera.near;
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(params.shadow.camera.far) && entity.shadow) entity.shadow.camera.far = params.shadow.camera.far;
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(params.shadow.normalBias) && entity.shadow) entity.shadow.normalBias = params.shadow.normalBias;
      applyShadowCameraParams(params, entity);
    }
  }
}

function applyShadowCameraParams({ shadow }: TAbstractLightParams, entity: TWriteable<TAnyLight>): void {
  if (isNotDefined(shadow)) return;
  // eslint-disable-next-line functional/immutable-data
  if (isNotDefined(entity.shadow)) entity.shadow = {} as unknown as DirectionalLightShadow | PointLightShadow | SpotLightShadow | undefined;

  const { camera } = shadow;
  if (isNotDefined(camera)) return;

  const { far, near, lookAt, up, layers, zoom } = camera;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(far)) entity.shadow.camera.far = far;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(near)) entity.shadow.camera.near = near;

  if (isDefined(lookAt)) entity.shadow.camera.lookAt(lookAt);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(up)) entity.shadow.camera.up = new Vector3().copy(camera.up ?? { x: 0, y: 1, z: 0 });

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(layers) && isDefined(entity.shadow.camera.layers?.mask)) entity.shadow.camera.layers.mask = layers ?? 1;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(zoom)) entity.shadow.camera.zoom = zoom;

  if (isOrthographicCameraParams(camera)) {
    const { left, right, top, bottom } = camera;

    // eslint-disable-next-line functional/immutable-data
    if (isDefined(left)) entity.shadow.camera.left = left;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(right)) entity.shadow.camera.right = right;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(bottom)) entity.shadow.camera.bottom = bottom;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(top)) entity.shadow.camera.top = top;
  }

  if (isPerspectiveCameraParams(camera)) {
    const { filmGauge, filmOffset, focus, fov } = camera;

    // eslint-disable-next-line functional/immutable-data
    if (isDefined(filmGauge)) entity.shadow.camera.filmGauge = filmGauge;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(filmOffset)) entity.shadow.camera.filmOffset = filmOffset;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(focus)) entity.shadow.camera.focus = focus;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(fov)) entity.shadow.camera.fov = fov;
  }
}
