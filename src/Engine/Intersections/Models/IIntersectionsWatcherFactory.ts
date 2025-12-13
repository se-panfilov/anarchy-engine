import type { IParamsFromConfigAsync, TReactiveFactory } from '@/Engine/Abstract';
import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';
import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type IIntersectionsWatcherParamsFromConfig = Omit<IParamsFromConfigAsync<IIntersectionsWatcherConfig, IIntersectionsWatcherParams>, 'configToParamsAsync'> &
  Readonly<{
    configToParamsAsync: (config: IIntersectionsWatcherConfig, mouseService: IMouseService, cameraService: TCameraService, actorsService: TActorService) => Promise<IIntersectionsWatcherParams>;
  }>;

export type IIntersectionsWatcherFactory = TReactiveFactory<TIntersectionsWatcher, IIntersectionsWatcherParams> & IIntersectionsWatcherParamsFromConfig & TDestroyable;
