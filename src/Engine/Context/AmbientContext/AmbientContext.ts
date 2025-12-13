import type { ScreenParams, Watcher } from '@Engine/Models';
import { DeviceWatcher } from '@Engine/Watchers';
import type { IAmbientContext } from './Models';

const deviceWatcher: Watcher<ScreenParams> = DeviceWatcher();

export const ambientContext: IAmbientContext = {
  get deviceWatcher(): Watcher<ScreenParams> {
    return deviceWatcher;
  }
};

export function startAmbientContext(ambientContext: IAmbientContext): void {
  ambientContext.deviceWatcher.start$.next();
}
