import type { IAmbientLight, IDirectionalLight, ILightParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import { getAccessors } from './Accessors';
import type { ILightWrapper } from './Models';
import { getLight } from './utils';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
