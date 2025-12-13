import { AbstractWrapper, WrapperType } from '@Engine/Domains/Abstract';

import type { IAmbientLight, IDirectionalLight, ILightParams, ILightWrapper } from '../Models';
import { getAccessors } from './Accessors';
import { getLight } from './utils';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity, WrapperType.Light, params), ...getAccessors(entity), entity };
}
