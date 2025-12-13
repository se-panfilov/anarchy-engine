import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams } from '@/Engine/Screen/Models';
import { ScreenSizeWatcher } from '@/Engine/Screen/Watchers';

const factory: TReactiveFactory<TScreenSizeWatcher, IScreenSizeWatcherParams> = { ...ReactiveFactory(FactoryType.ScreenSizeWatcher, ScreenSizeWatcher) };
export const ScreenSizeWatcherFactory = (): IScreenSizeWatcherFactory => ({ ...factory });
