import type { IAbstractFactory, IScreenSizeWatcherParams } from '@Engine/Models';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export type IScreenSizeWatcherFactory = IAbstractFactory<IScreenSizeWatcher, IScreenSizeWatcherParams>;
