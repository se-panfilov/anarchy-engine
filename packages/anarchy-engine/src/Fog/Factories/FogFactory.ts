import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Fog/Adapters';
import type { TFogFactory, TFogParams, TFogWrapper } from '@Anarchy/Engine/Fog/Models';
import { FogWrapper } from '@Anarchy/Engine/Fog/Wrappers';

export function FogFactory(): TFogFactory {
  const factory: TReactiveFactory<TFogWrapper, TFogParams> = ReactiveFactory(FactoryType.Fog, FogWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
