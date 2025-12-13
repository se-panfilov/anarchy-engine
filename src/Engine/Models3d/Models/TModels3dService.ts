import type { Observable } from 'rxjs';

import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dFacade, TModel3dPack, TModel3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';
import type { TWithCreateFromConfigAsyncService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  loadAsync: (list: ReadonlyArray<TModel3dParams>) => ReadonlyArray<Promise<TModel3dFacade>>;
  loadFromConfigAsync: (config: ReadonlyArray<TModel3dConfig>) => ReadonlyArray<Promise<TModel3dFacade>>;
  createFromPack: (pack: TModel3dPack) => TModel3dFacade;
  findModel3dAndOverride: (name: string, overrides?: TOptional<TModel3dConfig>) => TModel3dFacade | undefined;
  getAnimationService: () => TAnimationsService;
  // TODO 9.0.0. RESOURCES: should use mixin that has entityCreated$ instead of added$ (and probably entityLoaded$ instead of loaded$)
  added$: Observable<TModel3dFacade>;
  loaded$: Observable<TModel3dFacade>;
  clone: (model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dPack>) => TModel3dFacade;
}> &
  TWithCreateFromConfigAsyncService<TModel3dConfig, ReadonlyArray<TModel3dFacade>> &
  TWithRegistryService<TModel3dResourceAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
