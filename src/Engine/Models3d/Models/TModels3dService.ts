import type { Observable } from 'rxjs';

import type { TModel3dLoadResult } from '@/Engine/Models3d/Models';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  loadAsync: (list: ReadonlyArray<TModel3dParams>) => ReadonlyArray<Promise<TModel3dLoadResult>>;
  // loadFromConfigAsync: (Models3d: ReadonlyArray<string>) => ReadonlyArray<Promise<TModel3dLoadResult>>;
  added$: Observable<TModel3dLoadResult>;
}>;
