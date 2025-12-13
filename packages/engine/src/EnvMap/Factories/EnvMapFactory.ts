import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParams, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { EnvMapWrapper } from '@/Engine/EnvMap/Wrappers';

export function EnvMapFactory(): TEnvMapFactory {
  const factory: TReactiveFactory<TEnvMapWrapper, TEnvMapParams> = ReactiveFactory(FactoryType.EnvMap, EnvMapWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
