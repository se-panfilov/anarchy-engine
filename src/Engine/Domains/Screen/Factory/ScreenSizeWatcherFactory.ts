import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams } from '@/Engine/Domains/Screen/Models';
import { ScreenSizeWatcher } from '@/Engine/Domains/Screen/Watcher';

const factory: IReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> = { ...ReactiveFactory(FactoryType.ScreenSizeWatcher, ScreenSizeWatcher) };
export const ScreenSizeWatcherFactory = (): IScreenSizeWatcherFactory => ({ ...factory });
