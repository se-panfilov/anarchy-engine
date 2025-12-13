import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import { ScreenSizeWatcher } from '@/Engine/Domains/Screen/Watcher';

import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams } from '../Models';

const factory: IReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> = { ...ReactiveFactory('screen_size_watcher', ScreenSizeWatcher) };
export const ScreenSizeWatcherFactory = (): IScreenSizeWatcherFactory => ({ ...factory });
