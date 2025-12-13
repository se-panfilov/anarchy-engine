import { PointLight } from 'three';

import type { TAbstractLightWrapper, TPointLight, TPointLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function PointLightWrapper(params: TPointLightParams): TAbstractLightWrapper<TPointLight> {
  const entity: TPointLight = new PointLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params);
}
