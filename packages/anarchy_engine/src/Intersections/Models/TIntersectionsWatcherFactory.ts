import type { TParamsFromConfig, TReactiveFactory } from '@Engine/Abstract';
import type { TActorService } from '@Engine/Actor';
import type { TCameraService } from '@Engine/Camera';
import type { TLoopService } from '@Engine/Loop';
import type { TMouseService } from '@Engine/Mouse';

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
