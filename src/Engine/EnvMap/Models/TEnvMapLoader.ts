import type { Observable } from 'rxjs';
import type { AnyMapping } from 'three';

import type { TEnvMapConfigPack } from './TEnvMapConfigPack';
import type { TEnvMapWrapperAsync } from './TEnvMapWrapperAsync';

export type TEnvMapLoader = Readonly<{
  loadAsync: (pack: TEnvMapConfigPack, isForce?: boolean, mapping?: AnyMapping) => Promise<TEnvMapWrapperAsync>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<TEnvMapConfigPack>) => Promise<ReadonlyArray<TEnvMapWrapperAsync>>;
  loaded$: Observable<TEnvMapWrapperAsync>;
}>;
