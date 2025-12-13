import { SpotLight } from 'three';

import type { TAbstractLightWrapper, TLightServiceDependencies, TSpotLight, TSpotLightParams } from '@/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function SpotLightWrapper(params: TSpotLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TSpotLight> {
  const entity: TSpotLight = new SpotLight(params.color, params.intensity, params.distance, params.angle, params.penumbra, params.decay);
  return AbstractLightWrapper(entity, params, dependencies);
}
