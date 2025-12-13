import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';
import { ContainerDecorator } from '@Engine/Domains/Global';
import type { IMouseClickWatcher, IMousePositionWatcher } from '@Engine/Domains/Mouse';
import { MouseClickWatcherFactory, MousePositionWatcherFactory } from '@Engine/Domains/Mouse';
import type { IScreenSizeWatcher } from '@Engine/Domains/Screen';
import { ScreenSizeWatcherFactory } from '@Engine/Domains/Screen';

import type { IAmbientContext } from './Models';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcher: IScreenSizeWatcher = ScreenSizeWatcherFactory().create({ container, tags: [] }).start();
const mouseClickWatcher: IMouseClickWatcher = MouseClickWatcherFactory().create({ container, tags: [] }).start();
const mousePositionWatcher: IMousePositionWatcher = MousePositionWatcherFactory().create({ container, tags: [] }).start();

// TODO (S.Panfilov) maybe get rid of ambient context?
export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher,
  mouseClickWatcher,
  mousePositionWatcher
};
