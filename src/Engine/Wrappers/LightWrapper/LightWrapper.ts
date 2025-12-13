import { AbstractWrapper } from '@Engine/Wrappers';
import { getAccessors } from './Accessors';
import { getLight } from './utils';
import type { IAmbientLight, IDirectionalLight, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from './Models';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
