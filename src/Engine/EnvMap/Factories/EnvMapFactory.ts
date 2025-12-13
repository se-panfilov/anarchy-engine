import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParamsAsync } from '@/Engine/EnvMap/Adapters';
import type { TEnvMapFactory, TEnvMapParamsPack, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import { EnvMapWrapperAsync } from '@/Engine/EnvMap/Wrappers';

const factory: TAsyncReactiveFactory<TEnvMapWrapperAsync, TEnvMapParamsPack> = {
  ...AsyncReactiveFactory(FactoryType.EnvMap, EnvMapWrapperAsync as TCreateAsyncEntityFactoryFn<TEnvMapWrapperAsync, TEnvMapParamsPack>)
};
export const EnvMapFactory = (): TEnvMapFactory => ({ ...factory, configToParamsAsync });
