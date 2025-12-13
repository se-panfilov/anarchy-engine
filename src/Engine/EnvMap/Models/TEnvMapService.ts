import type { TEnvMapAsyncRegistry, TEnvMapConfig, TEnvMapFactory, TEnvMapParams, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateAsyncService, TWithCreateFromConfigAsyncService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

export type TEnvMapService = TWithCreateAsyncService<TEnvMapWrapperAsync, TEnvMapParams> &
  TWithCreateFromConfigAsyncService<TEnvMapConfig, ReadonlyArray<TEnvMapWrapperAsync>> &
  TWithActiveAccessorsService<TEnvMapWrapperAsync> &
  TWithFactoryService<TEnvMapFactory> &
  TWithRegistryService<TEnvMapAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
