import type { IMouseClicksWatcher, IMousePositionWatcher } from '@Engine/Domains/Mouse';
import { MouseClicksWatcherFactory, MousePositionWatcherFactory } from '@Engine/Domains/Mouse';
import type { IScreenSizeWatcher } from '@Engine/Domains/Screen';
import { ScreenSizeWatcherFactory } from '@Engine/Domains/Screen';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';

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
