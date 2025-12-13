import { Subject } from 'rxjs';
import type { ScreenParams } from '@Engine/Models';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher';

export function DeviceWatcher(): ReturnType<typeof AbstractWatcher<ScreenParams>> {
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
