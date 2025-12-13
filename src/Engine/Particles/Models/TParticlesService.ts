import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateAsyncService, TWithCreateFromConfigAsyncService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TParticlesAsyncRegistry } from './TParticlesAsyncRegistry';
import type { TParticlesConfig } from './TParticlesConfig';
import type { TParticlesFactory } from './TParticlesFactory';
import type { TParticlesParams } from './TParticlesParams';
import type { TParticlesWrapperAsync } from './TParticlesWrapperAsync';

export type TParticlesService = TWithCreateAsyncService<TParticlesWrapperAsync, TParticlesParams> &
  TWithCreateFromConfigAsyncService<TParticlesConfig, ReadonlyArray<TParticlesWrapperAsync>> &
  TWithFactoryService<TParticlesFactory> &
  TWithRegistryService<TParticlesAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
