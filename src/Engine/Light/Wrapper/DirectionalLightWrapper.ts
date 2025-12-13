import { DirectionalLight } from 'three';

import type { IAbstractLightWrapper, IDirectionalLight, IDirectionalLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function DirectionalLightWrapper(params: IDirectionalLightParams): IAbstractLightWrapper {
  const entity: IDirectionalLight = new DirectionalLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params);
}
