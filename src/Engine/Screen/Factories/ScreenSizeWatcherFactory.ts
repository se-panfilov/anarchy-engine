import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TScreenSizeWatcher, TScreenSizeWatcherFactory, TScreenSizeWatcherParams } from '@/Engine/Screen/Models';
import { ScreenSizeWatcher } from '@/Engine/Screen/Watchers';

const factory: TReactiveFactory<TScreenSizeWatcher, TScreenSizeWatcherParams> = { ...ReactiveFactory(FactoryType.ScreenSizeWatcher, ScreenSizeWatcher) };
export const ScreenSizeWatcherFactory = (): TScreenSizeWatcherFactory => ({ ...factory });
