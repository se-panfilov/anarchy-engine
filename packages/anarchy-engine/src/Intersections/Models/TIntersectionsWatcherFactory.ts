import type { TParamsFromConfig, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TActorService } from '@hellpig/anarchy-engine/Actor';
import type { TCameraService } from '@hellpig/anarchy-engine/Camera';
import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import type { TMouseService } from '@hellpig/anarchy-engine/Mouse';

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
