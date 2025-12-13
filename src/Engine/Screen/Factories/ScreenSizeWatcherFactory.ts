import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TScreenSizeWatcherFactory } from '@/Engine/Screen/Models';
import { ScreenSizeWatcher } from '@/Engine/Screen/Watchers';

export function ScreenSizeWatcherFactory(): TScreenSizeWatcherFactory {
  return ReactiveFactory(FactoryType.ScreenSizeWatcher, ScreenSizeWatcher);
}
