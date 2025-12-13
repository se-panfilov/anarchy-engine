import type { IMouseClicksWatcher, IMousePositionWatcher } from '@Engine/Domains/Mouse';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClicksWatcher: IMouseClicksWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
