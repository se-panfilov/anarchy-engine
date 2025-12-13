import type { IParamsFromConfigAsync, IReactiveFactory } from '@/Engine/Abstract';
import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherParamsFromConfig = Omit<IParamsFromConfigAsync<IIntersectionsWatcherConfig, IIntersectionsWatcherParams>, 'configToParamsAsync'> &
  Readonly<{
    configToParamsAsync: (config: IIntersectionsWatcherConfig, mouseService: IMouseService, cameraService: ICameraService, actorsService: IActorService) => Promise<IIntersectionsWatcherParams>;
  }>;

export type IIntersectionsWatcherFactory = IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> & IIntersectionsWatcherParamsFromConfig & IDestroyable;
