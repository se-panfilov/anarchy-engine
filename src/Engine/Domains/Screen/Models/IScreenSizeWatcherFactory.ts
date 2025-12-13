import type { IFactory } from '@Engine/Domains/Abstract';

import type { IScreenSizeWatcher } from './IScreenSizeWatcher';
import type { IScreenSizeWatcherParams } from './IScreenSizeWatcherParams';
import type { IScreenSizeWatcherRegistry } from './IScreenSizeWatcherRegistry';

export type IScreenSizeWatcherFactory = IFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> & IScreenSizeWatcherRegistry;
