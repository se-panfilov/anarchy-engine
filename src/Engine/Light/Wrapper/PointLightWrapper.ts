import { PointLight } from 'three';

import type { IAbstractLightWrapper, IPointLight, IPointLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function PointLightWrapper(params: IPointLightParams): IAbstractLightWrapper<IPointLight> {
  const entity: IPointLight = new PointLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params);
}
