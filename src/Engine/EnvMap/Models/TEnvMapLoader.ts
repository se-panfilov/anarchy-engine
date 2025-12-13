import type { Observable } from 'rxjs';
import type { AnyMapping } from 'three';

import type { TEnvMap } from './TEnvMap';

export type TEnvMapLoader = Readonly<{
  loadAsync: (url: string, isForce?: boolean, mapping?: AnyMapping) => Promise<TEnvMap>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<string>) => Promise<ReadonlyArray<TEnvMap>>;
  loaded$: Observable<TEnvMap>;
}>;
