import { WatcherTag } from '@/Engine/Abstract';
import type { IGlobalContainerDecorator } from '@/Engine/Global';
import { ContainerDecorator } from '@/Engine/Global';
import type { IMouseClickWatcher, IMouseClickWatcherFactory, IMouseClickWatcherRegistry, IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherRegistry } from '@/Engine/Mouse';
import { MouseClickWatcherFactory, MouseClickWatcherRegistry, MousePositionWatcherFactory, MousePositionWatcherRegistry } from '@/Engine/Mouse';
import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherRegistry } from '@/Engine/Screen';
import { ScreenSizeWatcherFactory, ScreenSizeWatcherRegistry } from '@/Engine/Screen';

import type { IAmbientContext } from './Models';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcherFactory: IScreenSizeWatcherFactory = ScreenSizeWatcherFactory();
const screenSizeWatcherRegistry: IScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();
screenSizeWatcherFactory.entityCreated$.subscribe((watcher: IScreenSizeWatcher) => screenSizeWatcherRegistry.add(watcher));
const screenSizeWatcher: IScreenSizeWatcher = screenSizeWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

const mouseClickWatcherFactory: IMouseClickWatcherFactory = MouseClickWatcherFactory();
const mouseClickWatcherRegistry: IMouseClickWatcherRegistry = MouseClickWatcherRegistry();
mouseClickWatcherFactory.entityCreated$.subscribe((watcher: IMouseClickWatcher) => mouseClickWatcherRegistry.add(watcher));
const mouseClickWatcher: IMouseClickWatcher = mouseClickWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

const mousePositionWatcherFactory: IMousePositionWatcherFactory = MousePositionWatcherFactory();
const mousePositionWatcherRegistry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();
mousePositionWatcherFactory.entityCreated$.subscribe((watcher: IMousePositionWatcher) => mousePositionWatcherRegistry.add(watcher));
const mousePositionWatcher: IMousePositionWatcher = mousePositionWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

// TODO (S.Panfilov) maybe get rid of ambient context?
export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher,
  mouseClickWatcher,
  mousePositionWatcher
};
