import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';
import type { TIntersectionsWatcherConfig } from './TIntersectionsWatcherConfig';
import type { TIntersectionsWatcherFactory } from './TIntersectionsWatcherFactory';
import type { TIntersectionsWatcherParams } from './TIntersectionsWatcherParams';
import type { TIntersectionsWatcherRegistry } from './TIntersectionsWatcherRegistry';

export type TIntersectionsWatcherService = TWithCreateService<TIntersectionsWatcher, TIntersectionsWatcherParams> &
  Omit<TWithCreateFromConfigService<TIntersectionsWatcherConfig>, 'createFromConfig'> &
  Readonly<{
    createFromConfig: (
      configs: ReadonlyArray<TIntersectionsWatcherConfig>,
      mouseService: TMouseService,
      cameraService: TCameraService,
      actorsService: TActorService
    ) => ReadonlyArray<TIntersectionsWatcher>;
  }> &
  TWithFactoryService<TIntersectionsWatcherFactory> &
  TWithRegistryService<TIntersectionsWatcherRegistry> &
  TDestroyable;
