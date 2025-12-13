import type { TSerializableEntitiesService } from '@/Abstract';
import type { TActorService } from '@/Actor';
import type { TCameraService } from '@/Camera';
import type { TLoopService } from '@/Loop';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Mixins';
import type { TMouseService } from '@/Mouse';

import type { TAnyIntersectionsWatcher } from './TAnyIntersectionsWatcher';
import type { TAnyIntersectionsWatcherConfig } from './TAnyIntersectionsWatcherConfig';
import type { TAnyIntersectionsWatcherParams } from './TAnyIntersectionsWatcherParams';
import type { TIntersectionsCameraWatcher } from './TIntersectionsCameraWatcher';
import type { TIntersectionsDirectionWatcher } from './TIntersectionsDirectionWatcher';
import type { TIntersectionsWatcherFactory } from './TIntersectionsWatcherFactory';
import type { TIntersectionsWatcherRegistry } from './TIntersectionsWatcherRegistry';

export type TIntersectionsWatcherServiceWithCreate = TWithCreateService<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams>;
export type TIntersectionsWatcherServiceWithCreateFromConfig = Omit<TWithCreateFromConfigService<TAnyIntersectionsWatcherConfig, TAnyIntersectionsWatcher>, 'createFromConfig'>;
export type TIntersectionsWatcherServiceWithFactory = TWithFactoryService<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams, undefined, TIntersectionsWatcherFactory>;
export type TIntersectionsWatcherServiceWithRegistry = TWithRegistryService<TIntersectionsWatcherRegistry>;

export type TIntersectionsWatcherService = TSerializableEntitiesService<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherConfig> &
  TIntersectionsWatcherServiceWithCreate &
  TIntersectionsWatcherServiceWithCreateFromConfig &
  Readonly<{
    createFromConfig: (
      configs: ReadonlyArray<TAnyIntersectionsWatcherConfig>,
      mouseService: TMouseService,
      cameraService: TCameraService,
      actorsService: TActorService,
      loopService: TLoopService
    ) => ReadonlyArray<TAnyIntersectionsWatcher>;
    findCameraWatcher: (name: string) => TIntersectionsCameraWatcher | undefined | never;
    getCameraWatcher: (name: string) => TIntersectionsCameraWatcher | never;
    findDirectionWatcher: (name: string) => TIntersectionsDirectionWatcher | undefined | never;
    getDirectionWatcher: (name: string) => TIntersectionsDirectionWatcher | never;
  }> &
  TIntersectionsWatcherServiceWithFactory &
  TIntersectionsWatcherServiceWithRegistry;
