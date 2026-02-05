import type { TAbstractWrapper } from '@hellpig/anarchy-engine/Abstract';
import { AbstractWrapper, WrapperType } from '@hellpig/anarchy-engine/Abstract';
import { fogEntityToConfig } from '@hellpig/anarchy-engine/Fog/Adapters';
import type { TFog, TFogConfig, TFogParams, TFogWrapper } from '@hellpig/anarchy-engine/Fog/Models';
import { Fog } from 'three';

export function FogWrapper(params: TFogParams): TFogWrapper {
  const entity: TFog = new Fog(params.color, params.near, params.far);

  const wrapper: TAbstractWrapper<TFog> = AbstractWrapper(entity, WrapperType.Fog, params);

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    entity,
    serialize: (): TFogConfig => fogEntityToConfig(result)
  });

  return result;
}
