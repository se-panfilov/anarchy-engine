import type { TParamsFromConfig, TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TActorService } from '@Anarchy/Engine/Actor';
import type { TCameraService } from '@Anarchy/Engine/Camera';
import type { TLoopService } from '@Anarchy/Engine/Loop';
import type { TMouseService } from '@Anarchy/Engine/Mouse';

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
