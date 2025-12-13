import { Fog } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IFog, IFogParams, IFogWrapper } from '@/Engine/Fog/Models';

export function FogWrapper(params: IFogParams): IFogWrapper {
  const entity: IFog = new Fog(params.color, params.near, params.far);

  const wrapper: TWrapper<IFog> = AbstractWrapper(entity, WrapperType.Fog, params);

  function destroy(): void {
    // TODO (S.Panfilov) implement destroy
    throw new Error('Fog destroy not implemented');
  }

  return { ...wrapper, entity, destroy };
}
