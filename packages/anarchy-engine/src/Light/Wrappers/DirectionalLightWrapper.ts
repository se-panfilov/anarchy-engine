import type { TAbstractLightWrapper, TDirectionalLight, TDirectionalLightParams, TLightServiceDependencies } from '@Anarchy/Engine/Light/Models';
import { DirectionalLight } from 'three';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function DirectionalLightWrapper(params: TDirectionalLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TDirectionalLight> {
  const entity: TDirectionalLight = new DirectionalLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params, dependencies);
}
