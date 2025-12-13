import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractService } from '@/Engine/Abstract';
import type { TAnimationsService } from '@/Engine/Animations';
import type { TMaterialService } from '@/Engine/Material';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithLoadResourcesAsyncService, TWithRegistryService, TWithResourcesRegistryService } from '@/Engine/Mixins';
import type { TModel3d, TModel3dConfig, TModel3dParams, TModel3dResourceConfig, TModels3dFactory, TModels3dRegistry, TModels3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';
import type { TOptional } from '@/Engine/Utils';

export type TModels3dService = TAbstractService &
  Readonly<{
    getAnimationsService: () => TAnimationsService;
    getMaterialService: () => TMaterialService;
    clone: (model3d: TModel3d, overrides?: TOptional<TModel3dParams>) => TModel3d;
  }> &
  TWithCreateService<TModel3d, TModel3dParams> &
  TWithCreateFromConfigService<TModel3dConfig, TModel3d> &
  TWithFactoryService<TModels3dFactory> &
  TWithRegistryService<TModels3dRegistry> &
  TWithResourcesRegistryService<TModels3dResourceAsyncRegistry> &
  TWithLoadResourcesAsyncService<TModel3dResourceConfig, GLTF>;
