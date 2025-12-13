import type { IMouseClicksWatcher, IMousePositionWatcher } from '@Engine/Domains/Mouse';
import { MouseClicksWatcherFactory, MousePositionWatcherFactory } from '@Engine/Domains/Mouse';
import { ScreenSizeWatcherFactory } from '@Engine/Factories';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

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
