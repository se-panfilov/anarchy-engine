import { MousePositionWatcherFactory, ScreenSizeWatcherFactory } from '@Engine/Factories';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';
import type { IMouseClicksWatcher, IScreenSizeWatcher } from '@Engine/Watchers';

import type { IAmbientContext } from './Models';
import type { IMousePositionWatcher } from '@Engine/Domains/Mouse';
import { MouseClicksWatcherFactory } from '@Engine/Domains/Mouse';

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
