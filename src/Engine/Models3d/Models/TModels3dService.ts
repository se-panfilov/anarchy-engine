import type { Observable } from 'rxjs';

import type { TModel3dConfig, TModel3dLoadResult, TModels3dAnimationsAsyncRegistry, TModels3dAsyncRegistry, TPerformLoadResult } from '@/Engine/Models3d/Models';
import type { TWithRegistryService } from '@/Engine/Space';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  loadAsync: (list: ReadonlyArray<TModel3dParams>) => ReadonlyArray<Promise<TModel3dLoadResult>>;
  loadFromConfigAsync: (config: ReadonlyArray<TModel3dConfig>) => ReadonlyArray<Promise<TModel3dLoadResult>>;
  added$: Observable<TPerformLoadResult>;
}> &
  Readonly<{
    getAnimationsRegistry: () => TModels3dAnimationsAsyncRegistry;
  }> &
  TWithRegistryService<TModels3dAsyncRegistry>;
