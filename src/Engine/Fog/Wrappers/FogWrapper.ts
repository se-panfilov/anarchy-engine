import { Fog } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TFog, TFogParams, TFogWrapper } from '@/Engine/Fog/Models';

export function FogWrapper(params: TFogParams): TFogWrapper {
  const entity: TFog = new Fog(params.color, params.near, params.far);

  const wrapper: TWrapper<TFog> = AbstractWrapper(entity, WrapperType.Fog, params);

  function destroy(): void {
    // TODO DESTROY: implement destroy
    throw new Error('Fog destroy not implemented');
  }

  return { ...wrapper, entity, destroy };
}
