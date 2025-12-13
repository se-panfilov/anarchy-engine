import type { TCreateEntityFactoryFn, TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParams, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { EnvMapWrapper } from '@/Engine/EnvMap/Wrappers';

const factory: TReactiveFactory<TEnvMapWrapper, TEnvMapParams> = {
  ...ReactiveFactory(FactoryType.EnvMap, EnvMapWrapper as TCreateEntityFactoryFn<TEnvMapWrapper, TEnvMapParams>)
};
export const EnvMapFactory = (): TEnvMapFactory => ({ ...factory, configToParams });
