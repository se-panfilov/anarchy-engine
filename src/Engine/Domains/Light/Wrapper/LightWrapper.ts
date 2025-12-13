import type { IAmbientLight, IDirectionalLight, ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import { getAccessors } from './Accessors';
import { getLight } from './utils';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity };
}
