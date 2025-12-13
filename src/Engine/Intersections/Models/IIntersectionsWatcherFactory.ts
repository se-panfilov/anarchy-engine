import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { ICameraService } from '@/Engine/Camera';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IControlsParamsFromConfig = Omit<IParamsFromConfig<IIntersectionsWatcherConfig, IIntersectionsWatcherParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: IIntersectionsWatcherConfig, mouseService: IMouseService, cameraService: ICameraService) => IIntersectionsWatcherParams;
  }>;

export type IIntersectionsWatcherFactory = IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> & IControlsParamsFromConfig & IDestroyable;
