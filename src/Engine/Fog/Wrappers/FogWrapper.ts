import { Fog } from 'three';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { fogToConfig } from '@/Engine/Fog/Adapters';
import type { TFog, TFogConfig, TFogParams, TFogWrapper } from '@/Engine/Fog/Models';

export function FogWrapper(params: TFogParams): TFogWrapper {
  const entity: TFog = new Fog(params.color, params.near, params.far);

  const wrapper: TAbstractWrapper<TFog> = AbstractWrapper(entity, WrapperType.Fog, params);

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    entity,
    serialize: (): TFogConfig => fogToConfig(result)
  });

  return result;
}
