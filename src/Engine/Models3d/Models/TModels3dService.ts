import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dPack, TModels3dAsyncRegistry, TPerformLoadResult } from '@/Engine/Models3d/Models';
import type { TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  loadAsync: (list: ReadonlyArray<TModel3dParams>) => ReadonlyArray<Promise<TModel3dPack>>;
  loadFromConfigAsync: (config: ReadonlyArray<TModel3dConfig>) => ReadonlyArray<Promise<TModel3dPack>>;
  added$: Observable<TPerformLoadResult>;
}> &
  TWithRegistryService<TModels3dAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
