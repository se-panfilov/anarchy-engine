import type { IGlobalContainerDecorator } from '@/Engine/Domains/Global';
import type { IMouseClickWatcher, IMousePositionWatcher } from '@/Engine/Domains/Mouse';
import type { IScreenSizeWatcher } from '@/Engine/Domains/Screen';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
  mouseClickWatcher: IMouseClickWatcher;
  mousePositionWatcher: IMousePositionWatcher;
}>;
