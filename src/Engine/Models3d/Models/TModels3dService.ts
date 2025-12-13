import type { Observable } from 'rxjs';

import type { TModel3dLoadOptions, TModel3dLoadResult } from '@/Engine/Models3d/Models';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  loadAsync: (params: TModel3dParams, options: TModel3dLoadOptions, isForce?: boolean) => Promise<TModel3dLoadResult>;
  // TODO debug
  // loadFromConfigAsync: (Models3d: ReadonlyArray<string>) => ReadonlyArray<Promise<Mesh>>;
  added$: Observable<TModel3dLoadResult>;
}>;
