import type { TParamsFromConfigAsync, TReactiveFactory } from '@/Engine/Abstract';
import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';
import type { TIntersectionsWatcherConfig } from './TIntersectionsWatcherConfig';
import type { TIntersectionsWatcherParams } from './TIntersectionsWatcherParams';

export type TIntersectionsWatcherParamsFromConfig = Omit<TParamsFromConfigAsync<TIntersectionsWatcherConfig, TIntersectionsWatcherParams>, 'configToParamsAsync'> &
  Readonly<{
    configToParamsAsync: (config: TIntersectionsWatcherConfig, mouseService: TMouseService, cameraService: TCameraService, actorsService: TActorService) => Promise<TIntersectionsWatcherParams>;
  }>;

export type TIntersectionsWatcherFactory = TReactiveFactory<TIntersectionsWatcher, TIntersectionsWatcherParams> & TIntersectionsWatcherParamsFromConfig & TDestroyable;
