import type { TAbstractLightWrapper, TLightServiceDependencies, TSpotLight, TSpotLightParams } from '@Anarchy/Engine/Light/Models';
import { SpotLight } from 'three';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function SpotLightWrapper(params: TSpotLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TSpotLight> {
  const entity: TSpotLight = new SpotLight(params.color, params.intensity, params.distance, params.angle, params.penumbra, params.decay);
  return AbstractLightWrapper(entity, params, dependencies);
}
