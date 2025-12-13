import { DirectionalLight } from 'three';

import type { TAbstractLightWrapper, TDirectionalLight, TDirectionalLightParams, TLightServiceDependencies } from '@/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function DirectionalLightWrapper(params: TDirectionalLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TDirectionalLight> {
  const entity: TDirectionalLight = new DirectionalLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params, dependencies);
}
