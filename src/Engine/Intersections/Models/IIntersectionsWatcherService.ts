import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';
import type { IWithCreateFromConfigAsyncService, IWithCreateService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherAsyncRegistry } from './IIntersectionsWatcherAsyncRegistry';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherFactory } from './IIntersectionsWatcherFactory';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherService = IWithCreateService<IIntersectionsWatcher, IIntersectionsWatcherParams> &
  Omit<IWithCreateFromConfigAsyncService<IIntersectionsWatcherConfig>, 'createFromConfigAsync'> &
  Readonly<{
    createFromConfigAsync: (
      configs: ReadonlyArray<IIntersectionsWatcherConfig>,
      mouseService: IMouseService,
      cameraService: ICameraService,
      actorsService: IActorService
    ) => Promise<ReadonlyArray<IIntersectionsWatcher>>;
  }> &
  IWithFactoryService<IIntersectionsWatcherFactory> &
  IWithRegistryService<IIntersectionsWatcherAsyncRegistry> &
  IDestroyable;
