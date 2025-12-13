import type { Observable } from 'rxjs';

import type { TEnvMapResourceConfig } from './TEnvMapResourceConfig';
import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapLoader = Readonly<{
  loadAsync: (config: TEnvMapResourceConfig) => Promise<TEnvMapTexture>;
  loadFromConfigAsync: (configs: ReadonlyArray<TEnvMapResourceConfig>) => Promise<ReadonlyArray<TEnvMapTexture>>;
  loaded$: Observable<TEnvMapTexture>;
}>;
