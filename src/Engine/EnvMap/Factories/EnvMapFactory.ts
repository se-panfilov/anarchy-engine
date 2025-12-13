import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParams, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import { EnvMapWrapperAsync } from '@/Engine/EnvMap/Wrappers';

const factory: TAsyncReactiveFactory<TEnvMapWrapperAsync, TEnvMapParams> = {
  ...AsyncReactiveFactory(FactoryType.EnvMap, EnvMapWrapperAsync as TCreateAsyncEntityFactoryFn<TEnvMapWrapperAsync, TEnvMapParams>)
};
export const EnvMapFactory = (): TEnvMapFactory => ({ ...factory, configToParams });
