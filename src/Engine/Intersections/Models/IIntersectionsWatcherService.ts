import type { ICameraService } from '@/Engine/Camera';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherConfig } from './IIntersectionsWatcherConfig';
import type { IIntersectionsWatcherFactory } from './IIntersectionsWatcherFactory';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';
import type { IIntersectionsWatcherRegistry } from './IIntersectionsWatcherRegistry';

export type IIntersectionsWatcherService = IWithCreateService<IIntersectionsWatcher, IIntersectionsWatcherParams> &
  Omit<IWithCreateFromConfigService<IIntersectionsWatcherConfig>, 'createFromConfig'> &
  Readonly<{
    createFromConfig: (configs: ReadonlyArray<IIntersectionsWatcherConfig>, mouseService: IMouseService, cameraService: ICameraService) => void;
  }> &
  IWithFactoryService<IIntersectionsWatcherFactory> &
  IWithRegistryService<IIntersectionsWatcherRegistry> &
  IDestroyable;
