import type { Observable } from 'rxjs';

import type { TEnvMapAsyncRegistry } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TAddedTexturePack } from './TAddedTexturePack';
import type { TDataTexture } from './TDataTexture';

export type TEnvMapService = Readonly<{
  loadAsync: (url: string, isForce?: boolean) => Promise<TDataTexture>;
  loadFromConfigAsync: (envMaps: ReadonlyArray<string>) => ReadonlyArray<Promise<TDataTexture>>;
  added$: Observable<TAddedTexturePack>;
}> &
  TWithActiveAccessorsService<TAddedTexturePack> &
  TWithRegistryService<TEnvMapAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
