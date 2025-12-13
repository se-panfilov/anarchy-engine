import { DirectionalLight } from 'three';

import type { TAbstractLightWrapper, TDirectionalLight, TDirectionalLightParams } from '@/Engine/Light/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function DirectionalLightWrapper(params: TDirectionalLightParams): TAbstractLightWrapper<TDirectionalLight> {
  const entity: TDirectionalLight = new DirectionalLight(params.color, params.intensity);

  applyShadowParams(params, entity);

  return AbstractLightWrapper(entity, params);
}

function applyShadowParams(params: TDirectionalLightParams, entity: TWriteable<TDirectionalLight>): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.castShadow)) entity.castShadow = params.castShadow;
  if (isDefined(params.shadow?.mapSize)) entity.shadow.mapSize.copy(params.shadow.mapSize);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.near)) entity.shadow.camera.near = params.shadow.camera.near;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.far)) entity.shadow.camera.far = params.shadow.camera.far;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.normalBias)) entity.shadow.normalBias = params.shadow.normalBias;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.left)) entity.shadow.camera.left = params.shadow.camera.left;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.right)) entity.shadow.camera.right = params.shadow.camera.right;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.bottom)) entity.shadow.camera.bottom = params.shadow.camera.bottom;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.shadow?.camera.top)) entity.shadow.camera.top = params.shadow.camera.top;
}
