import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TLoopService } from '@/Engine/Loop';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';
import type { TIntersectionsWatcherConfig } from './TIntersectionsWatcherConfig';
import type { TIntersectionsWatcherFactory } from './TIntersectionsWatcherFactory';
import type { TIntersectionsWatcherParams } from './TIntersectionsWatcherParams';
import type { TIntersectionsWatcherRegistry } from './TIntersectionsWatcherRegistry';

export type TIntersectionsWatcherServiceWithCreate = TWithCreateService<TIntersectionsWatcher, TIntersectionsWatcherParams>;
export type TIntersectionsWatcherServiceWithCreateFromConfig = Omit<TWithCreateFromConfigService<TIntersectionsWatcherConfig, TIntersectionsWatcher>, 'createFromConfig'>;
export type TIntersectionsWatcherServiceWithFactory = TWithFactoryService<TIntersectionsWatcher, TIntersectionsWatcherParams, undefined, TIntersectionsWatcherFactory>;
export type TIntersectionsWatcherServiceWithRegistry = TWithRegistryService<TIntersectionsWatcherRegistry>;

export type TIntersectionsWatcherService = TSerializableEntitiesService<TIntersectionsWatcherConfig> &
  TIntersectionsWatcherServiceWithCreate &
  TIntersectionsWatcherServiceWithCreateFromConfig &
  Readonly<{
    createFromConfig: (
      configs: ReadonlyArray<TIntersectionsWatcherConfig>,
      mouseService: TMouseService,
      cameraService: TCameraService,
      actorsService: TActorService,
      loopService: TLoopService
    ) => ReadonlyArray<TIntersectionsWatcher>;
  }> &
  TIntersectionsWatcherServiceWithFactory &
  TIntersectionsWatcherServiceWithRegistry;
