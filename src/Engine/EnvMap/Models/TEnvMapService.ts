import type { Observable } from 'rxjs';

import type { TDataTexture } from '@/Engine/EnvMap/Models';

export type TEnvMapService = Readonly<{
  loadAsync: (url: string) => Promise<TDataTexture>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<string>) => ReadonlyArray<Promise<TDataTexture>>;
  added$: Observable<TDataTexture>;
}>;
