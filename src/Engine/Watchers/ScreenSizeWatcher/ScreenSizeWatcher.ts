import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IScreenSizeWatcher } from '@Engine/Watchers/ScreenSizeWatcher/Models/IScreenSizeWatcher';
import type { ScreenParams } from '@Engine/Models';
import { Subject } from 'rxjs';

export function ScreenSizeWatcher(): IScreenSizeWatcher {
  const value$: Subject<ScreenParams> = new Subject<ScreenParams>();

  // TODO (S.Panfilov) window should be global?
  const onResize = (): void =>
    value$.next({
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.devicePixelRatio || 1
    });

  // TODO (S.Panfilov) window should be global?
  const start = (): void => {
    setTimeout(() => onResize());
    window.addEventListener('resize', onResize);
  };

  // TODO (S.Panfilov) window should be global?
  const stop = (): void => window.removeEventListener('resize', onResize);

  return {
    ...AbstractWatcher('device', start, stop),
    value$
  };
}
