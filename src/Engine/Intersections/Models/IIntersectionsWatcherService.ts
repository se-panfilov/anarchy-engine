import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';
import type { TWithCreateFromConfigAsyncService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { IIntersectionsWatcherAsyncRegistry } from './IIntersectionsWatcherAsyncRegistry';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherFactory } from './IIntersectionsWatcherFactory';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';
import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type IIntersectionsWatcherService = TWithCreateService<TIntersectionsWatcher, IIntersectionsWatcherParams> &
  Omit<TWithCreateFromConfigAsyncService<IIntersectionsWatcherConfig>, 'createFromConfigAsync'> &
  Readonly<{
    createFromConfigAsync: (
      configs: ReadonlyArray<IIntersectionsWatcherConfig>,
      mouseService: IMouseService,
      cameraService: TCameraService,
      actorsService: TActorService
    ) => Promise<ReadonlyArray<TIntersectionsWatcher>>;
  }> &
  TWithFactoryService<IIntersectionsWatcherFactory> &
  TWithRegistryService<IIntersectionsWatcherAsyncRegistry> &
  TDestroyable;
