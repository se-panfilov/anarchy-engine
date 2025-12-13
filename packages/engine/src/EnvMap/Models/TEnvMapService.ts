import type { TSerializableEntitiesService, TSerializableResourceService } from '@/Abstract';
import type { TEnvMapConfig, TEnvMapFactory, TEnvMapParams, TEnvMapRegistry, TEnvMapResourceConfig, TEnvMapTexture, TEnvMapTextureAsyncRegistry, TEnvMapWrapper } from '@/EnvMap/Models';
import type {
  TWithActiveAccessorsService,
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesMetaInfoRegistryService,
  TWithResourcesRegistryService,
  TWithSceneGetterService
} from '@/Mixins';

export type TEnvMapServiceWithCreate = TWithCreateService<TEnvMapWrapper, TEnvMapParams>;
export type TEnvMapServiceWithCreateFromConfig = TWithCreateFromConfigService<TEnvMapConfig, TEnvMapWrapper>;
export type TEnvMapServiceWithFactory = TWithFactoryService<TEnvMapWrapper, TEnvMapParams, undefined, TEnvMapFactory>;
export type TEnvMapServiceWithRegistry = TWithRegistryService<TEnvMapRegistry>;

export type TEnvMapService = TEnvMapServiceWithCreate &
  TEnvMapServiceWithCreateFromConfig &
  TEnvMapServiceWithFactory &
  TEnvMapServiceWithRegistry &
  TSerializableEntitiesService<TEnvMapWrapper, TEnvMapConfig> &
  TSerializableResourceService<TEnvMapResourceConfig> &
  TWithActiveAccessorsService<TEnvMapWrapper> &
  TWithLoadResourcesAsyncService<TEnvMapResourceConfig, TEnvMapTexture> &
  TWithResourcesMetaInfoRegistryService<TEnvMapResourceConfig> &
  TWithResourcesRegistryService<TEnvMapTextureAsyncRegistry> &
  TWithSceneGetterService;
