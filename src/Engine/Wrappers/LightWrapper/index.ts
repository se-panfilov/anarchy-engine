import { AbstractWrapper } from '@Engine/Wrappers';
import { AmbientLight, DirectionalLight } from 'three';
import { getAccessors } from './Accessors';
import { getLight } from './utils';
import type { LightParams } from '@Engine/Models';

export type ILightWrapper = ReturnType<typeof AbstractWrapper<AmbientLight | DirectionalLight>> &
  ReturnType<typeof getAccessors>;

export function LightWrapper(params: LightParams): ILightWrapper {
  const entity: AmbientLight | DirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
