import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';
import type { TWithCreateFromConfigAsyncService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TIntersectionsWatcherAsyncRegistry } from './TIntersectionsWatcherAsyncRegistry';
import type { TIntersectionsWatcherConfig } from './TIntersectionsWatcherConfig';
import type { TIntersectionsWatcherFactory } from './TIntersectionsWatcherFactory';
import type { TIntersectionsWatcherParams } from './TIntersectionsWatcherParams';
import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type TIntersectionsWatcherService = TWithCreateService<TIntersectionsWatcher, TIntersectionsWatcherParams> &
  Omit<TWithCreateFromConfigAsyncService<TIntersectionsWatcherConfig>, 'createFromConfigAsync'> &
  Readonly<{
    createFromConfigAsync: (
      configs: ReadonlyArray<TIntersectionsWatcherConfig>,
      mouseService: TMouseService,
      cameraService: TCameraService,
      actorsService: TActorService
    ) => Promise<ReadonlyArray<TIntersectionsWatcher>>;
  }> &
  TWithFactoryService<TIntersectionsWatcherFactory> &
  TWithRegistryService<TIntersectionsWatcherAsyncRegistry> &
  TDestroyable;
