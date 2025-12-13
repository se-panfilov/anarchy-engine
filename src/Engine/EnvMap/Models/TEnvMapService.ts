import type { TEnvMapAsyncRegistry, TEnvMapConfigPack, TEnvMapParams, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateAsyncService, TWithCreateFromConfigAsyncService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TEnvMapPropsPack } from './TEnvMapPropsPack';

export type TEnvMapService = TWithCreateAsyncService<TEnvMapWrapperAsync, ReadonlyArray<TEnvMapParams>> &
  TWithCreateFromConfigAsyncService<TEnvMapConfigPack, ReadonlyArray<TEnvMapWrapperAsync>> &
  TWithActiveAccessorsService<TEnvMapPropsPack> &
  TWithRegistryService<TEnvMapAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
