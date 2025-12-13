import type { Observable } from 'rxjs';
import type { AnyMapping } from 'three';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapLoader = Readonly<{
  loadAsync: (texture: string, isForce?: boolean, mapping?: AnyMapping) => Promise<TEnvMapTexture>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<string>) => Promise<ReadonlyArray<TEnvMapTexture>>;
  loaded$: Observable<TEnvMapTexture>;
}>;
