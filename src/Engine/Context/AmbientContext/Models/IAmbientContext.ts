import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IMouseClicksWatcher, IScreenSizeWatcher } from '@Engine/Watchers';
import type { IMousePositionWatcher } from '@Engine/Domains/Mouse';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClicksWatcher: IMouseClicksWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
