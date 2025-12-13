import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';
import type { IMouseClicksWatcher, IMousePositionWatcher, IScreenSizeWatcher } from '@Engine/Watchers';
import { MouseClicksWatcher, MousePositionWatcher, ScreenSizeWatcher } from '@Engine/Watchers';

import type { IAmbientContext } from './Models';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcher: IScreenSizeWatcher = ScreenSizeWatcher(container).start();
const mouseClicksWatcher: IMouseClicksWatcher = MouseClicksWatcher(container).start();
const mousePositionWatcher: IMousePositionWatcher = MousePositionWatcher(container).start();

export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher,
  mouseClicksWatcher,
  mousePositionWatcher
};
