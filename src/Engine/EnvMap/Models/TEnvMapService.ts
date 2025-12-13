import type { Observable } from 'rxjs';

import type { TEnvMapAsyncRegistry } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TEnvMapPropsPack } from './TEnvMapPropsPack';

export type TEnvMapService = Readonly<{
  added$: Observable<TEnvMapPropsPack>;
}> &
  // TWithCreateFromConfigAsyncService<ReadonlyArray<string>, ReadonlyArray<TDataTexture>> &
  TWithActiveAccessorsService<TEnvMapPropsPack> &
  TWithRegistryService<TEnvMapAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
