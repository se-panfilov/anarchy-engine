import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TSerializableEntitiesService, TSerializableResourceService } from '@/Engine/Abstract';
import type { TAnimationsService } from '@/Engine/Animations';
import type { TMaterialService } from '@/Engine/Material';
import type {
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesMetaInfoRegistryService,
  TWithResourcesRegistryService,
  TWithSerializeEntity
} from '@/Engine/Mixins';
import type {
  TModel3d,
  TModel3dConfig,
  TModel3dConfigToParamsDependencies,
  TModel3dParams,
  TModel3dResourceConfig,
  TModels3dFactory,
  TModels3dRegistry,
  TModels3dResourceAsyncRegistry,
  TModels3dServiceDependencies
} from '@/Engine/Models3d/Models';
import type { TOptional } from '@/Engine/Utils';

export type TModel3dServiceWithCreate = TWithCreateService<TModel3d, TModel3dParams>;
export type TModel3dServiceWithCreateFromConfig = TWithCreateFromConfigService<TModel3dConfig, TModel3d>;
export type TModel3dServiceWithFactory = TWithFactoryService<
  TModel3d,
  TModel3dParams,
  Pick<TModels3dServiceDependencies, 'animationsService' | 'model3dRawToModel3dConnectionRegistry'>,
  TModels3dFactory
>;
export type TModel3dServiceWithRegistry = TWithRegistryService<TModels3dRegistry>;

export type TModels3dService = TModel3dServiceWithCreate &
  TModel3dServiceWithCreateFromConfig &
  TModel3dServiceWithFactory &
  TModel3dServiceWithRegistry &
  TSerializableEntitiesService<TModel3dConfig> &
  TSerializableResourceService<TModel3dResourceConfig> &
  TWithLoadResourcesAsyncService<TModel3dResourceConfig, GLTF> &
  TWithResourcesMetaInfoRegistryService<TModel3dResourceConfig> &
  TWithResourcesRegistryService<TModels3dResourceAsyncRegistry> &
  TWithSerializeEntity<TModel3d, TModel3dConfigToParamsDependencies> &
  Readonly<{
    getAnimationsService: () => TAnimationsService;
    getMaterialService: () => TMaterialService;
    clone: (model3d: TModel3d, overrides?: TOptional<TModel3dParams>) => TModel3d;
  }>;
