import type { Observable } from 'rxjs';

import type { TEnvMapAsyncRegistry } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigAsyncService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TAddedTexturePack } from './TAddedTexturePack';
import type { TDataTexture } from './TDataTexture';

export type TEnvMapService = Readonly<{
  loadAsync: (url: string, isForce?: boolean) => Promise<TDataTexture>;
  added$: Observable<TAddedTexturePack>;
}> &
  TWithCreateFromConfigAsyncService<ReadonlyArray<string>, ReadonlyArray<TDataTexture>> &
  TWithActiveAccessorsService<TAddedTexturePack> &
  TWithRegistryService<TEnvMapAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
