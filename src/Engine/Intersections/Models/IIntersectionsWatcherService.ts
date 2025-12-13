import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';
import type { TWithCreateFromConfigAsyncService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';
import type { IIntersectionsWatcherAsyncRegistry } from './IIntersectionsWatcherAsyncRegistry';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherFactory } from './IIntersectionsWatcherFactory';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherService = TWithCreateService<TIntersectionsWatcher, IIntersectionsWatcherParams> &
  Omit<TWithCreateFromConfigAsyncService<IIntersectionsWatcherConfig>, 'createFromConfigAsync'> &
  Readonly<{
    createFromConfigAsync: (
      configs: ReadonlyArray<IIntersectionsWatcherConfig>,
      mouseService: IMouseService,
      cameraService: ICameraService,
      actorsService: IActorService
    ) => Promise<ReadonlyArray<TIntersectionsWatcher>>;
  }> &
  TWithFactoryService<IIntersectionsWatcherFactory> &
  TWithRegistryService<IIntersectionsWatcherAsyncRegistry> &
  TDestroyable;
