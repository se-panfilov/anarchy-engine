import { SpotLight } from 'three';

import type { TAbstractLightWrapper, TSpotLight, TSpotLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function SpotLightWrapper(params: TSpotLightParams): TAbstractLightWrapper<TSpotLight> {
  const entity: TSpotLight = new SpotLight(params.color, params.intensity, params.distance, params.angle, params.penumbra, params.decay);
  return AbstractLightWrapper(entity, params);
}
