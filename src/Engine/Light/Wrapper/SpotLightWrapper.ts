import { SpotLight } from 'three';

import type { IAbstractLightWrapper, ISpotLight, ISpotLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function SpotLightWrapper(params: ISpotLightParams): IAbstractLightWrapper<ISpotLight> {
  const entity: ISpotLight = new SpotLight(params.color, params.intensity, params.distance, params.angle, params.penumbra, params.decay);
  return AbstractLightWrapper(entity, params);
}
