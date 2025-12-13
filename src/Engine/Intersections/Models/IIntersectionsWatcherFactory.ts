import type { IParamsFromConfigAsync, TReactiveFactory } from '@/Engine/Abstract';
import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherParamsFromConfig = Omit<IParamsFromConfigAsync<IIntersectionsWatcherConfig, IIntersectionsWatcherParams>, 'configToParamsAsync'> &
  Readonly<{
    configToParamsAsync: (config: IIntersectionsWatcherConfig, mouseService: IMouseService, cameraService: ICameraService, actorsService: IActorService) => Promise<IIntersectionsWatcherParams>;
  }>;

export type IIntersectionsWatcherFactory = TReactiveFactory<TIntersectionsWatcher, IIntersectionsWatcherParams> & IIntersectionsWatcherParamsFromConfig & TDestroyable;
