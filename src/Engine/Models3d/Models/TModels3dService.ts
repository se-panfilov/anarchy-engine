import type { Observable } from 'rxjs';
import type { Mesh } from 'three';

import type { TModel3dParams } from './TModel3dParams';

export type TModels3dService = Readonly<{
  // TODO debug
  // loadAsync: (params: TModel3dParams, isForce?: boolean) => Promise<Mesh>;
  loadAsync: (params: TModel3dParams) => Promise<Mesh>;
  // TODO debug
  // loadFromConfigAsync: (Models3d: ReadonlyArray<string>) => ReadonlyArray<Promise<Mesh>>;
  added$: Observable<Mesh>;
}>;
