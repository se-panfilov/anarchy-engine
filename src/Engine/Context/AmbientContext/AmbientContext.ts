import type { IScreenParams } from '@Engine/Models';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import { ContainerDecorator } from '@Engine/Global';
import type { IAmbientContext } from './Models';
import type { IWatcher } from '@Engine/Watchers';
import { ScreenSizeWatcher } from '@Engine/Watchers';

const container: IGlobalContainerDecorator = ContainerDecorator(window);
const screenSizeWatcher: IWatcher<IScreenParams> = ScreenSizeWatcher(container);

export const ambientContext: IAmbientContext = {
  get container(): IGlobalContainerDecorator {
    return container;
  },
  get screenSizeWatcher(): IWatcher<IScreenParams> {
    return screenSizeWatcher;
  }
};

export function startAmbientContext(ambientContext: IAmbientContext): void {
  ambientContext.screenSizeWatcher.start();
}
