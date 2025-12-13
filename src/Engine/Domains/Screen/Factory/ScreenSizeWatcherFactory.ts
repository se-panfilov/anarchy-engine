import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { ScreenSizeWatcher } from '@/Engine/Domains/Screen/Watcher';

import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams } from '../Models';

const factory: IReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> = { ...ReactiveFactory(FactoryType.ScreenSizeWatcher, ScreenSizeWatcher) };
export const ScreenSizeWatcherFactory = (): IScreenSizeWatcherFactory => ({ ...factory });
