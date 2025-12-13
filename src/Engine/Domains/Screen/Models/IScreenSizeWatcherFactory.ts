import type { IAbstractFactory } from '@Engine/Domains/Abstract';

import type { IScreenSizeWatcher } from './IScreenSizeWatcher';
import type { IScreenSizeWatcherParams } from './IScreenSizeWatcherParams';

export type IScreenSizeWatcherFactory = IAbstractFactory<IScreenSizeWatcher, IScreenSizeWatcherParams>;
