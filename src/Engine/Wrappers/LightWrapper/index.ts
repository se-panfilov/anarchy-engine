import { AmbientLight, DirectionalLight } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { LightParams } from '@Engine/Models';
import { getLight } from '@Engine/Wrappers/LightWrapper/utils';
import { getAccessors } from './Accessors';

type ILightWrapper = ReturnType<typeof AbstractWrapper<AmbientLight | DirectionalLight>> &
  ReturnType<typeof getAccessors>;

export function LightWrapper(params: LightParams): ILightWrapper {
  const entity: AmbientLight | DirectionalLight = getLight(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
