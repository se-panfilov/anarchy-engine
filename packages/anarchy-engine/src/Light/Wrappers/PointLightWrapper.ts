import type { TAbstractLightWrapper, TLightServiceDependencies, TPointLight, TPointLightParams } from '@Anarchy/Engine/Light/Models';
import { PointLight } from 'three';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function PointLightWrapper(params: TPointLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TPointLight> {
  const entity: TPointLight = new PointLight(params.color, params.intensity, params.distance, params.decay);
  return AbstractLightWrapper(entity, params, dependencies);
}
