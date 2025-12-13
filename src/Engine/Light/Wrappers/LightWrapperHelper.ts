import { Vector3 } from 'three';

import type { TDirectionalLight, TDirectionalLightParams, TLight, TLightParams } from '@/Engine/Light/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function applyShadowParams<T extends TLight, P extends TLightParams>(params: P, entity: TWriteable<T>): void {
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
      applyDirectionalLightShadowParams(params as TDirectionalLightParams, entity as TWriteable<TDirectionalLight>);
    }
  }
}

function applyDirectionalLightShadowParams({ shadow }: TDirectionalLightParams, entity: TWriteable<TDirectionalLight>): void {
  if (isNotDefined(shadow)) return;

  const { camera } = shadow;
  if (isNotDefined(camera)) return;

  const { left, right, top, bottom, up, zoom, layers } = camera;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(left)) entity.shadow.camera.left = left;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(right)) entity.shadow.camera.right = right;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(bottom)) entity.shadow.camera.bottom = bottom;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(top)) entity.shadow.camera.top = top;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(up)) entity.shadow.camera.up = new Vector3().copy(up);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(zoom)) entity.shadow.camera.zoom = zoom;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(layers) && isDefined(entity.shadow.camera.layers?.mask)) entity.shadow.camera.layers.mask = layers ?? 1;
}
