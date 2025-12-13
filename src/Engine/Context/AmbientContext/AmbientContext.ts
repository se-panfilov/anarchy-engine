import type { IScreenParams, IWatcher } from '@Engine/Models';
import { ScreenSizeWatcher } from '@Engine/Watchers';
import type { IAmbientContext } from './Models';

const screenSizeWatcher: IWatcher<IScreenParams> = ScreenSizeWatcher();

export const ambientContext: IAmbientContext = {
  get screenSizeWatcher(): IWatcher<IScreenParams> {
    return screenSizeWatcher;
  }
};

export function startAmbientContext(ambientContext: IAmbientContext): void {
  ambientContext.screenSizeWatcher.start$.next();
}
