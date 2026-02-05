import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { envMapConfigToParams } from '@hellpig/anarchy-engine/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParams, TEnvMapWrapper } from '@hellpig/anarchy-engine/EnvMap/Models';
import { EnvMapWrapper } from '@hellpig/anarchy-engine/EnvMap/Wrappers';

export function EnvMapFactory(): TEnvMapFactory {
  const factory: TReactiveFactory<TEnvMapWrapper, TEnvMapParams> = ReactiveFactory(FactoryType.EnvMap, EnvMapWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: envMapConfigToParams });
}
