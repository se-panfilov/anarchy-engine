import type { TSerializableEntitiesService, TSerializableResourceService } from '@hellpig/anarchy-engine/Abstract';
import type { TAnimationsService } from '@hellpig/anarchy-engine/Animations';
import type { TMaterialService } from '@hellpig/anarchy-engine/Material';
import type {
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesMetaInfoRegistryService,
  TWithResourcesRegistryService
} from '@hellpig/anarchy-engine/Mixins';
import type {
  TModel3d,
  TModel3dConfig,
  TModel3dParams,
  TModel3dRawToModel3dConnectionRegistry,
  TModel3dResourceConfig,
  TModels3dFactory,
  TModels3dRegistry,
  TModels3dResourceAsyncRegistry,
  TModels3dServiceDependencies
} from '@hellpig/anarchy-engine/Models3d/Models';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

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
  TSerializableEntitiesService<TModel3d, TModel3dConfig> &
  TSerializableResourceService<TModel3dResourceConfig> &
  TWithLoadResourcesAsyncService<TModel3dResourceConfig, GLTF> &
  TWithResourcesMetaInfoRegistryService<TModel3dResourceConfig> &
  TWithResourcesRegistryService<TModels3dResourceAsyncRegistry> &
  Readonly<{
    getAnimationsService: () => TAnimationsService;
    getMaterialService: () => TMaterialService;
    getModel3dRawToModel3dConnectionRegistry: () => TModel3dRawToModel3dConnectionRegistry;
    clone: (model3d: TModel3d, overrides?: TOptional<TModel3dParams>) => TModel3d;
  }>;
