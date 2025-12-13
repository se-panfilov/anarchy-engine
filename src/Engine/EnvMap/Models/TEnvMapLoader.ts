import type { Observable } from 'rxjs';
import type { AnyMapping } from 'three';

import type { TEnvMap } from './TEnvMap';
import type { TEnvMapConfigPack } from './TEnvMapConfigPack';

export type TEnvMapLoader = Readonly<{
  loadAsync: (pack: TEnvMapConfigPack, isForce?: boolean, mapping?: AnyMapping) => Promise<TEnvMap>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<TEnvMapConfigPack>) => Promise<ReadonlyArray<TEnvMap>>;
  loaded$: Observable<TEnvMap>;
}>;
