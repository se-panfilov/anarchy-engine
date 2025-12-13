import type { TAbstractLightWrapper, TLightServiceDependencies, TRectAreaLight, TRectAreaLightParams } from '@Anarchy/Engine/Light/Models';
import { RectAreaLight } from 'three';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function RectAreaLightWrapper(params: TRectAreaLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TRectAreaLight> {
  const entity: TRectAreaLight = new RectAreaLight(params.color, params.intensity, params.height, params.width);
  return AbstractLightWrapper(entity, params, dependencies);
}
