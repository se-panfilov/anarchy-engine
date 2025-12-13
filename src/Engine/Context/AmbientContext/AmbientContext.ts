import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';
import { ContainerDecorator } from '@Engine/Domains/Global';
import type {
  IMouseClickWatcher,
  IMouseClickWatcherFactory,
  IMouseClickWatcherRegistry,
  IMousePositionWatcher,
  IMousePositionWatcherFactory,
  IMousePositionWatcherRegistry
} from '@Engine/Domains/Mouse';
import { MouseClickWatcherFactory, MouseClickWatcherRegistry, MousePositionWatcherFactory, MousePositionWatcherRegistry } from '@Engine/Domains/Mouse';
import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherRegistry } from '@Engine/Domains/Screen';
import { ScreenSizeWatcherFactory, ScreenSizeWatcherRegistry } from '@Engine/Domains/Screen';

import type { IAmbientContext } from './Models';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcherFactory: IScreenSizeWatcherFactory = ScreenSizeWatcherFactory();
const screenSizeWatcherRegistry: IScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();
screenSizeWatcherFactory.entityCreated$.subscribe((watcher: IScreenSizeWatcher) => screenSizeWatcherRegistry.add(watcher));
const screenSizeWatcher: IScreenSizeWatcher = screenSizeWatcherFactory.create({ container, tags: [] }).start();

const mouseClickWatcherFactory: IMouseClickWatcherFactory = MouseClickWatcherFactory();
const mouseClickWatcherRegistry: IMouseClickWatcherRegistry = MouseClickWatcherRegistry();
mouseClickWatcherFactory.entityCreated$.subscribe((watcher: IMouseClickWatcher) => mouseClickWatcherRegistry.add(watcher));
const mouseClickWatcher: IMouseClickWatcher = mouseClickWatcherFactory.create({ container, tags: [] }).start();

const mousePositionWatcherFactory: IMousePositionWatcherFactory = MousePositionWatcherFactory();
const mousePositionWatcherRegistry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();
mousePositionWatcherFactory.entityCreated$.subscribe((watcher: IMousePositionWatcher) => mousePositionWatcherRegistry.add(watcher));
const mousePositionWatcher: IMousePositionWatcher = mousePositionWatcherFactory.create({ container, tags: [] }).start();

// TODO (S.Panfilov) maybe get rid of ambient context?
export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher,
  mouseClickWatcher,
  mousePositionWatcher
};
