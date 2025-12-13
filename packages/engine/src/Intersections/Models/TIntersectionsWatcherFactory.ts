import type { TParamsFromConfig, TReactiveFactory } from '@/Abstract';
import type { TActorService } from '@/Actor';
import type { TCameraService } from '@/Camera';
import type { TLoopService } from '@/Loop';
import type { TMouseService } from '@/Mouse';

import type { TAnyIntersectionsWatcher } from './TAnyIntersectionsWatcher';
import type { TAnyIntersectionsWatcherConfig } from './TAnyIntersectionsWatcherConfig';
import type { TAnyIntersectionsWatcherParams } from './TAnyIntersectionsWatcherParams';

export type TIntersectionsWatcherParamsFromConfig = Omit<TParamsFromConfig<TAnyIntersectionsWatcherConfig, TAnyIntersectionsWatcherParams>, 'configToParams'> &
  Readonly<{
    configToParams: (
      config: TAnyIntersectionsWatcherConfig,
      mouseService: TMouseService,
      cameraService: TCameraService,
      actorsService: TActorService,
      loopService: TLoopService
    ) => TAnyIntersectionsWatcherParams;
  }>;

export type TIntersectionsWatcherFactory = TReactiveFactory<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams> & TIntersectionsWatcherParamsFromConfig;
