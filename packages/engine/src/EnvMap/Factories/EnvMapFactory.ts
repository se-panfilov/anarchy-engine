import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParams, TEnvMapWrapper } from '@/EnvMap/Models';
import { EnvMapWrapper } from '@/EnvMap/Wrappers';

export function EnvMapFactory(): TEnvMapFactory {
  const factory: TReactiveFactory<TEnvMapWrapper, TEnvMapParams> = ReactiveFactory(FactoryType.EnvMap, EnvMapWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
