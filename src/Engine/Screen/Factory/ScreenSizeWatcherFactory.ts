import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams } from '@/Engine/Screen/Models';
import { ScreenSizeWatcher } from '@/Engine/Screen/Watcher';

const factory: IReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> = { ...ReactiveFactory(FactoryType.ScreenSizeWatcher, ScreenSizeWatcher) };
export const ScreenSizeWatcherFactory = (): IScreenSizeWatcherFactory => ({ ...factory });
