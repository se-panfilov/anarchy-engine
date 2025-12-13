import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Fog/Adapters';
import type { TFogFactory, TFogParams, TFogWrapper } from '@/Fog/Models';
import { FogWrapper } from '@/Fog/Wrappers';

export function FogFactory(): TFogFactory {
  const factory: TReactiveFactory<TFogWrapper, TFogParams> = ReactiveFactory(FactoryType.Fog, FogWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
