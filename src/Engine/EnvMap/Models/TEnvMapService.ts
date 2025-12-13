import type { TEnvMapConfig, TEnvMapFactory, TEnvMapParams, TEnvMapRegistry, TEnvMapTexture, TEnvMapTextureAsyncRegistry, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type {
  TWithActiveAccessorsService,
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesRegistryService,
  TWithSceneGetterService
} from '@/Engine/Space';

export type TEnvMapService = TWithCreateService<TEnvMapWrapper, TEnvMapParams> &
  TWithCreateFromConfigService<TEnvMapConfig> &
  TWithActiveAccessorsService<TEnvMapWrapper> &
  TWithFactoryService<TEnvMapFactory> &
  TWithRegistryService<TEnvMapRegistry> &
  TWithResourcesRegistryService<TEnvMapTextureAsyncRegistry> &
  TWithLoadResourcesAsyncService<TEnvMapTexture> &
  TWithSceneGetterService &
  TDestroyable;
