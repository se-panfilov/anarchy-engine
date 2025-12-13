import { RectAreaLight } from 'three';

import type { TAbstractLightWrapper, TLightServiceDependencies, TRectAreaLight, TRectAreaLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function RectAreaLightWrapper(params: TRectAreaLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TRectAreaLight> {
  const entity: TRectAreaLight = new RectAreaLight(params.color, params.intensity, params.height, params.width);
  return AbstractLightWrapper(entity, params, dependencies);
}
