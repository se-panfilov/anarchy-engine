import { RectAreaLight } from 'three';

import type { IAbstractLightWrapper, IRectAreaLight, IRectAreaLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function RectAreaLightWrapper(params: IRectAreaLightParams): IAbstractLightWrapper<IRectAreaLight> {
  const entity: IRectAreaLight = new RectAreaLight(params.color, params.intensity, params.height, params.width);
  return AbstractLightWrapper(entity, params);
}
