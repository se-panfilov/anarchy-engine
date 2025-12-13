import type { IGlobalContainerDecorator } from '@/Engine/Global';
import type { IMouseClickWatcher, IMousePositionWatcher } from '@/Engine/Mouse';
import type { IScreenSizeWatcher } from '@/Engine/Screen';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClickWatcher: IMouseClickWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
