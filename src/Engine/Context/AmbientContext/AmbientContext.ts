import { WatcherTag } from '@/Engine/Abstract';
import type { TGlobalContainerDecorator } from '@/Engine/Global';
import { ContainerDecorator } from '@/Engine/Global';
import type { TScreenSizeWatcher, TScreenSizeWatcherFactory, TScreenSizeWatcherRegistry } from '@/Engine/Screen';
import { ScreenSizeWatcherFactory, ScreenSizeWatcherRegistry } from '@/Engine/Screen';

import type { TAmbientContext } from './Models';

const container: TGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcherFactory: TScreenSizeWatcherFactory = ScreenSizeWatcherFactory();
const screenSizeWatcherRegistry: TScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();
screenSizeWatcherFactory.entityCreated$.subscribe((watcher: TScreenSizeWatcher) => screenSizeWatcherRegistry.add(watcher));
const screenSizeWatcher: TScreenSizeWatcher = screenSizeWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

export const ambientContext: TAmbientContext = {
  container,
  screenSizeWatcher
};
