import type { Observable } from 'rxjs';

import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import type {
  TModel3dComplexConfig,
  TModel3dComplexFacade,
  TModel3dConfig,
  TModel3dFacade,
  TModel3dPack,
  TModel3dPrimitiveConfig,
  TModel3dPrimitiveFacade,
  TModel3dPrimitiveParams,
  TModels3dAsyncRegistry
} from '@/Engine/Models3d/Models';
import type { TWithCreateFromConfigAsyncService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dComplexParams } from './TModel3dComplexParams';

export type TModels3dService = Readonly<{
  loadAsync: (list: ReadonlyArray<TModel3dComplexParams>) => ReadonlyArray<Promise<TModel3dComplexFacade>>;
  loadFromConfigAsync: (config: ReadonlyArray<TModel3dComplexConfig>) => ReadonlyArray<Promise<TModel3dComplexFacade>>;
  createFromPack: (pack: TModel3dPack) => TModel3dFacade;
  createPrimitiveAsync: (params: ReadonlyArray<TModel3dPrimitiveParams>) => ReadonlyArray<Promise<TModel3dPrimitiveFacade>>;
  createPrimitiveFromConfig: (config: ReadonlyArray<TModel3dPrimitiveConfig>) => ReadonlyArray<Promise<TModel3dPrimitiveFacade>>;
  findModel3dAndOverride: (name: string, overrides?: TOptional<TModel3dConfig>) => TModel3dFacade | undefined;
  getAnimationService: () => TAnimationsService;
  added$: Observable<TModel3dFacade>;
  loaded$: Observable<TModel3dComplexFacade>;
  clone: (model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dPack>) => TModel3dFacade;
}> &
  TWithCreateFromConfigAsyncService<TModel3dConfig, ReadonlyArray<TModel3dFacade>> &
  TWithRegistryService<TModels3dAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
