import type { Observable } from 'rxjs';

import type { PrimitiveModel3dType, TActorParams, TMaterialWrapper } from '@/Engine';
import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dFacade, TModel3dPack, TModels3dAsyncRegistry } from '@/Engine/Models3d/Models';
import type { TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  loadAsync: (list: ReadonlyArray<TModel3dParams>) => ReadonlyArray<Promise<TModel3dFacade>>;
  loadFromConfigAsync: (config: ReadonlyArray<TModel3dConfig>) => ReadonlyArray<Promise<TModel3dFacade>>;
  createFromPack: (pack: TModel3dPack) => TModel3dFacade;
  createPrimitive: (type: PrimitiveModel3dType, params: TActorParams, materialW: TMaterialWrapper) => TModel3dFacade;
  getAnimationService: () => TAnimationsService;
  added$: Observable<TModel3dFacade>;
  loaded$: Observable<TModel3dFacade>;
  clone: (model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dPack>) => TModel3dFacade;
}> &
  TWithRegistryService<TModels3dAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
