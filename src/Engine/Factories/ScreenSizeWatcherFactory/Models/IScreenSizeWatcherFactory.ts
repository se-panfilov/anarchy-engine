import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IScreenSizeWatcherParams } from '@Engine/Models';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export type IScreenSizeWatcherFactory = IAbstractFactory<IScreenSizeWatcher, IScreenSizeWatcherParams>;
