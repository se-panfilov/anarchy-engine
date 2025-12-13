import type { IWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IFog, IFogParams, IFogWrapper } from '@/Engine/Fog/Models';
import { Fog } from 'three';

export function FogWrapper(params: IFogParams): IFogWrapper {
  const entity: IFog = new Fog(params.color, params.density, params.far);

  const wrapper: IWrapper<IFog> = AbstractWrapper(entity, WrapperType.Fog, params);

  function destroy(): void {
    // TODO (S.Panfilov)
  }

  return { ...wrapper, entity, destroy };
}
