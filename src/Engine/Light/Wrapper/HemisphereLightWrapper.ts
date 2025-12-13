import { HemisphereLight } from 'three';

import type { IAbstractLightWrapper, IHemisphereLight, IHemisphereLightParams } from '@/Engine/Light/Models';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function HemisphereLightWrapper(params: IHemisphereLightParams): IAbstractLightWrapper<IHemisphereLight> {
  const entity: IHemisphereLight = new HemisphereLight(params.color, params.intensity);
  return AbstractLightWrapper(entity, params);
}
