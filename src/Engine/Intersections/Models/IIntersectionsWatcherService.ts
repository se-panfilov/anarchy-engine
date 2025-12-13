import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherFactory } from './IIntersectionsWatcherFactory';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';
import type { IIntersectionsWatcherRegistry } from './IIntersectionsWatcherRegistry';

export type IIntersectionsWatcherService = IWithCreateService<IIntersectionsWatcher, IIntersectionsWatcherParams> &
  IWithCreateFromConfigService<IIntersectionsWatcherConfig> &
  IWithFactoryService<IIntersectionsWatcherFactory> &
  IWithRegistryService<IIntersectionsWatcherRegistry> &
  IDestroyable;
