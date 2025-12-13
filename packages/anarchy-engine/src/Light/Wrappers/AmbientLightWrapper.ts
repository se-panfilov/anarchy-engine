import type { TAbstractLightWrapper, TAmbientLight, TAmbientLightParams, TLightServiceDependencies } from '@Anarchy/Engine/Light/Models';
import { AmbientLight } from 'three';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function AmbientLightWrapper(params: TAmbientLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<TAmbientLight> {
  const entity: TAmbientLight = new AmbientLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params, dependencies);
}
