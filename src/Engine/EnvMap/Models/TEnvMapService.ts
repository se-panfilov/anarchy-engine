import type { TEnvMapAsyncRegistry, TEnvMapConfigPack, TEnvMapFactory, TEnvMapParamsPack, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateAsyncService, TWithCreateFromConfigAsyncService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

export type TEnvMapService = TWithCreateAsyncService<TEnvMapWrapperAsync, TEnvMapParamsPack> &
  TWithCreateFromConfigAsyncService<TEnvMapConfigPack, ReadonlyArray<TEnvMapWrapperAsync>> &
  TWithActiveAccessorsService<TEnvMapWrapperAsync> &
  TWithFactoryService<TEnvMapFactory> &
  TWithRegistryService<TEnvMapAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
