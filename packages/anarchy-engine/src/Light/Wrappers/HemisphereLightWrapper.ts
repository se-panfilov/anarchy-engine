import type { TAbstractLightWrapper, THemisphereLight, THemisphereLightParams, TLightServiceDependencies } from '@Anarchy/Engine/Light/Models';
import { HemisphereLight } from 'three';

import { AbstractLightWrapper } from './AbstractLightWrapper';

export function HemisphereLightWrapper(params: THemisphereLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<THemisphereLight> {
  const entity: THemisphereLight = new HemisphereLight(params.color, params.groundColor, params.intensity);
  return AbstractLightWrapper(entity, params, dependencies);
}
