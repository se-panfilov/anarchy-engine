import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dFacade, TModel3dPack, TModel3dParams, TModel3dRegistry, TModel3dResourceAsyncRegistry, TModel3dResourceConfig, TModels3dFactory } from '@/Engine/Models3d/Models';
import type {
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesRegistryService,
  TWithSceneGetterService
} from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

export type TModels3dService = Readonly<{
  // createFromPack: (pack: TModel3dPack) => TModel3dFacade;
  getAnimationService: () => TAnimationsService;
  clone: (model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dPack>) => TModel3dFacade;
}> &
  TWithCreateService<TModel3dFacade, TModel3dParams> &
  TWithCreateFromConfigService<TModel3dConfig> &
  TWithFactoryService<TModels3dFactory> &
  TWithRegistryService<TModel3dRegistry> &
  TWithResourcesRegistryService<TModel3dResourceAsyncRegistry> &
  TWithLoadResourcesAsyncService<TModel3dResourceConfig, GLTF> &
  TWithSceneGetterService &
  TDestroyable;
