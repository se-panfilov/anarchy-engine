import type { ScreenParams, Watcher } from '@Engine/Models';
import { ScreenSizeWatcher } from '@Engine/Watchers';
import type { IAmbientContext } from './Models';

const screenSizeWatcher: Watcher<ScreenParams> = ScreenSizeWatcher();

export const ambientContext: IAmbientContext = {
  get screenSizeWatcher(): Watcher<ScreenParams> {
    return screenSizeWatcher;
  }
};

export function startAmbientContext(ambientContext: IAmbientContext): void {
  ambientContext.screenSizeWatcher.start$.next();
}
