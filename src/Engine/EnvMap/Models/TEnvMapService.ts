import type { Observable } from 'rxjs';

import type { TAddedTexturePack } from './TAddedTexturePack';
import type { TDataTexture } from './TDataTexture';

export type TEnvMapService = Readonly<{
  loadAsync: (url: string, isForce?: boolean) => Promise<TDataTexture>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<string>) => ReadonlyArray<Promise<TDataTexture>>;
  added$: Observable<TAddedTexturePack>;
}>;
