import type { TSerializableEntitiesService, TSerializableResourceService } from '@/Engine/Abstract';
import type { TEnvMapConfig, TEnvMapFactory, TEnvMapParams, TEnvMapRegistry, TEnvMapResourceConfig, TEnvMapTexture, TEnvMapTextureAsyncRegistry, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import type {
  TWithActiveAccessorsService,
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesRegistryService,
  TWithSceneGetterService
} from '@/Engine/Mixins';

export type TEnvMapServiceWithCreate = TWithCreateService<TEnvMapWrapper, TEnvMapParams>;
export type TEnvMapServiceWithCreateFromConfig = TWithCreateFromConfigService<TEnvMapConfig, TEnvMapWrapper>;
export type TEnvMapServiceWithFactory = TWithFactoryService<TEnvMapWrapper, TEnvMapParams, undefined, TEnvMapFactory>;
export type TEnvMapServiceWithRegistry = TWithRegistryService<TEnvMapRegistry>;

export type TEnvMapService = TSerializableEntitiesService<TEnvMapConfig> &
  TSerializableResourceService<TEnvMapResourceConfig> &
  TEnvMapServiceWithCreate &
  TEnvMapServiceWithCreateFromConfig &
  TWithActiveAccessorsService<TEnvMapWrapper> &
  TEnvMapServiceWithFactory &
  TEnvMapServiceWithRegistry &
  TWithResourcesRegistryService<TEnvMapTextureAsyncRegistry> &
  TWithLoadResourcesAsyncService<TEnvMapResourceConfig, TEnvMapTexture> &
  TWithSceneGetterService;
