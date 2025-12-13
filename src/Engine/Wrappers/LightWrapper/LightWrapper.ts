import { AbstractWrapper } from '@Engine/Wrappers';
import type { AmbientLight, DirectionalLight } from 'three';
import { getAccessors } from './Accessors';
import { getLight } from './utils';
import type { ILightParams } from '@Engine/Models';
import type { ILightWrapper } from './Models';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: AmbientLight | DirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
