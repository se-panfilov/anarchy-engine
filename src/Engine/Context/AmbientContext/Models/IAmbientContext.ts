import type { IMouseClicksWatcher, IMousePositionWatcher } from '@Engine/Domains/Mouse';
import type { IScreenSizeWatcher } from '@Engine/Domains/Screen';
import type { IGlobalContainerDecorator } from '@Engine/Global';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClicksWatcher: IMouseClicksWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
