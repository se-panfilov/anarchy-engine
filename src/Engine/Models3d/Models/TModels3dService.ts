import type { Group, Mesh, Object3D } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dFacade, TModel3dParams, TModel3dRegistry, TModel3dResourceAsyncRegistry, TModel3dResourceConfig, TModels3dFactory } from '@/Engine/Models3d/Models';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithLoadResourcesAsyncService, TWithRegistryService, TWithResourcesRegistryService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

export type TModels3dService = Readonly<{
  // TODO 9.0.0. RESOURCES: remove?
  // getAnimationService: () => TAnimationsService;
  clone: (model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dParams>) => TModel3dFacade;
}> &
  TWithCreateService<TModel3dFacade, TModel3dParams> &
  TWithCreateFromConfigService<TModel3dConfig, TModel3dFacade> &
  TWithFactoryService<TModels3dFactory> &
  TWithRegistryService<TModel3dRegistry> &
  TWithResourcesRegistryService<TModel3dResourceAsyncRegistry> &
  TWithLoadResourcesAsyncService<TModel3dResourceConfig, Group | Mesh | Object3D> &
  TDestroyable;
