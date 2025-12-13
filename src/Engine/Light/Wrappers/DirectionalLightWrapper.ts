import { DirectionalLight } from 'three';

import type { TAbstractLightWrapper, TDirectionalLight, TDirectionalLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';
import { applyShadowParams } from './LightWrapperHelper';

export function DirectionalLightWrapper(params: TDirectionalLightParams): TAbstractLightWrapper<TDirectionalLight> {
  const entity: TDirectionalLight = new DirectionalLight(params.color, params.intensity);

  applyShadowParams(params, entity);

  return AbstractLightWrapper(entity, params);
}
