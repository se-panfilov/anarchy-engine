import type { TDirectionalLight, TDirectionalLightParams, TLight, TLightParams } from '@/Engine/Light/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

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
      applyDirectionalLightShadowParams(params, entity as TWriteable<TDirectionalLight>);
    }
  }
}

function applyDirectionalLightShadowParams(params: TDirectionalLightParams, entity: TWriteable<TDirectionalLight>): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.left)) entity.shadow.camera.left = params.shadow.camera.left;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.right)) entity.shadow.camera.right = params.shadow.camera.right;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.bottom)) entity.shadow.camera.bottom = params.shadow.camera.bottom;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.top)) entity.shadow.camera.top = params.shadow.camera.top;
}
