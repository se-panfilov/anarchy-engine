import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParams, TEnvMapWrapper } from '@Anarchy/Engine/EnvMap/Models';
import { EnvMapWrapper } from '@Anarchy/Engine/EnvMap/Wrappers';

export function EnvMapFactory(): TEnvMapFactory {
  const factory: TReactiveFactory<TEnvMapWrapper, TEnvMapParams> = ReactiveFactory(FactoryType.EnvMap, EnvMapWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
