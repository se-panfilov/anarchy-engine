import type { BehaviorSubject } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TScreenSizeWatcher } from './TScreenSizeWatcher';
import type { TScreenSizeWatcherFactory } from './TScreenSizeWatcherFactory';
import type { TScreenSizeWatcherParams } from './TScreenSizeWatcherParams';
import type { TScreenSizeWatcherRegistry } from './TScreenSizeWatcherRegistry';

export type TScreenSizeWatcherServiceWithCreate = TWithCreateService<TScreenSizeWatcher, TScreenSizeWatcherParams>;
export type TScreenSizeWatcherServiceWithFactory = TWithFactoryService<TScreenSizeWatcher, TScreenSizeWatcherParams, undefined, TScreenSizeWatcherFactory>;
export type TScreenSizeWatcherServiceWithRegistry = TWithRegistryService<TScreenSizeWatcherRegistry>;

export type TScreenSizeWatcherService = TAbstractService &
  TScreenSizeWatcherServiceWithCreate &
  TScreenSizeWatcherServiceWithFactory &
  TScreenSizeWatcherServiceWithRegistry &
  Readonly<{
    default$: BehaviorSubject<TScreenSizeWatcher | undefined>;
  }>;
