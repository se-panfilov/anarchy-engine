import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IDeviceWatcher } from '@Engine/Watchers/DeviceWatcher/Models/IDeviceWatcher';
import type { ScreenParams } from '@Engine/Models';
import { Subject } from 'rxjs';

export function DeviceWatcher(): IDeviceWatcher {
  const value$: Subject<ScreenParams> = new Subject<ScreenParams>();

  // TODO (S.Panfilov) window should be global?
  const onResize = (): void =>
    value$.next({ width: window.innerWidth, height: window.innerHeight, ratio: window.devicePixelRatio || 1 });

  // TODO (S.Panfilov) window should be global?
  const start = (): void => window.addEventListener('resize', onResize);

  // TODO (S.Panfilov) window should be global?
  const stop = (): void => window.removeEventListener('resize', onResize);

  return {
    ...AbstractWatcher('device', start, stop),
    value$
  };
}
