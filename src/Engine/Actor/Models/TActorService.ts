import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TActor } from './TActor';
import type { TActorConfig } from './TActorConfig';
import type { TActorFactory } from './TActorFactory';
import type { TActorParams } from './TActorParams';
import type { TActorRegistry } from './TActorRegistry';

export type TActorService = TWithCreateService<TActor, TActorParams> &
  TWithCreateFromConfigService<TActorConfig, TActor> &
  TWithFactoryService<TActorFactory> &
  TWithRegistryService<TActorRegistry> &
  TWithSceneGetterService &
  TDestroyable;
