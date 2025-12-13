import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';
import type { IMouseClicksWatcher, IMousePositionWatcher } from '@Engine/Domains/Mouse';
import type { IScreenSizeWatcher } from '@Engine/Domains/Screen';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClicksWatcher: IMouseClicksWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
