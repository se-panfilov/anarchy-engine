import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';
import type { IMouseClicksWatcher, IMousePositionWatcher, IScreenSizeWatcher } from '@Engine/Watchers';

import { MouseClicksWatcherFactory, ScreenSizeWatcherFactory, MousePositionWatcherFactory } from '@/Engine/Factories';

import type { IAmbientContext } from './Models';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcher: IScreenSizeWatcher = ScreenSizeWatcherFactory().create({ container }).start();
const mouseClicksWatcher: IMouseClicksWatcher = MouseClicksWatcherFactory().create({ container }).start();
const mousePositionWatcher: IMousePositionWatcher = MousePositionWatcherFactory().create({ container }).start();

export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher,
  mouseClicksWatcher,
  mousePositionWatcher
};
