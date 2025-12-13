import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateAsyncService, TWithCreateFromConfigService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TActorAsyncRegistry } from './TActorAsyncRegistry';
import type { TActorConfig } from './TActorConfig';
import type { TActorFactory } from './TActorFactory';
import type { TActorParams } from './TActorParams';
import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type TActorService = TWithCreateAsyncService<TActorWrapperAsync, TActorParams> &
  TWithCreateFromConfigService<TActorConfig> &
  TWithFactoryService<TActorFactory> &
  TWithRegistryService<TActorAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
