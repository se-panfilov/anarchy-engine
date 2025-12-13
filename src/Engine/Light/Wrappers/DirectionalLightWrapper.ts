import { DirectionalLight } from 'three';

import type { TAbstractLightWrapper, TDirectionalLight, TDirectionalLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function DirectionalLightWrapper(params: TDirectionalLightParams): TAbstractLightWrapper<TDirectionalLight> {
  const entity: TDirectionalLight = new DirectionalLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params);
}
