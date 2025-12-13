import { WatcherTag } from '@/Engine/Abstract';
import type { IGlobalContainerDecorator } from '@/Engine/Global';
import { ContainerDecorator } from '@/Engine/Global';
import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherRegistry } from '@/Engine/Screen';
import { ScreenSizeWatcherFactory, ScreenSizeWatcherRegistry } from '@/Engine/Screen';

import type { IAmbientContext } from './Models';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcherFactory: IScreenSizeWatcherFactory = ScreenSizeWatcherFactory();
const screenSizeWatcherRegistry: IScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();
screenSizeWatcherFactory.entityCreated$.subscribe((watcher: IScreenSizeWatcher) => screenSizeWatcherRegistry.add(watcher));
const screenSizeWatcher: IScreenSizeWatcher = screenSizeWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher
};
