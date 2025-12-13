import { AmbientLight } from 'three';

import type { IAbstractLightWrapper, IAmbientLight, IAmbientLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function AmbientLightWrapper(params: IAmbientLightParams): IAbstractLightWrapper<IAmbientLight> {
  const entity: IAmbientLight = new AmbientLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params);
}
