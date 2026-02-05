import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { fogConfigToParams } from '@hellpig/anarchy-engine/Fog/Adapters';
import type { TFogFactory, TFogParams, TFogWrapper } from '@hellpig/anarchy-engine/Fog/Models';
import { FogWrapper } from '@hellpig/anarchy-engine/Fog/Wrappers';

export function FogFactory(): TFogFactory {
  const factory: TReactiveFactory<TFogWrapper, TFogParams> = ReactiveFactory(FactoryType.Fog, FogWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: fogConfigToParams });
}
