import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IMouseClicksWatcher, IMousePositionWatcher, IScreenSizeWatcher } from '@Engine/Watchers';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClicksWatcher: IMouseClicksWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
