import type { Observable } from 'rxjs';

import type { TAbstractResourceConfig } from '@/Engine/Abstract';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapLoader = Readonly<{
  loadAsync: (config: TAbstractResourceConfig) => Promise<TEnvMapTexture>;
  loadFromConfigAsync: (configs: ReadonlyArray<TAbstractResourceConfig>) => Promise<ReadonlyArray<TEnvMapTexture>>;
  loaded$: Observable<TEnvMapTexture>;
}>;
