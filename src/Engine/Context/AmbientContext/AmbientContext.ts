import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';
import type { IAmbientContext } from './Models';
import { MouseClicksWatcher, MousePositionWatcher, ScreenSizeWatcher } from '@Engine/Watchers';

const container: IGlobalContainerDecorator = ContainerDecorator(window);

export const ambientContext: IAmbientContext = {
  container,
  screenSizeWatcher: ScreenSizeWatcher(container),
  mouseClicksWatcher: MouseClicksWatcher(),
  mousePositionWatcher: MousePositionWatcher()
};

export function startAmbientContext(ambientContext: IAmbientContext): void {
  ambientContext.screenSizeWatcher.start();
  ambientContext.mouseClicksWatcher.start();
  ambientContext.mousePositionWatcher.start();
}
