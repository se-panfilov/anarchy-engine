import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IScreenSizeWatcher } from '@Engine/Watchers/ScreenSizeWatcher/Models/IScreenSizeWatcher';
import type { IScreenParams } from '@Engine/Models';
import { BehaviorSubject, Subject } from 'rxjs';

export function ScreenSizeWatcher(container: IGlobalContainerDecorator): IScreenSizeWatcher {
  const value$: Subject<IScreenParams> = new Subject<IScreenParams>();
  const latest$: BehaviorSubject<IScreenParams> = new BehaviorSubject<IScreenParams>({ width: 0, height: 0, ratio: 0 });

  value$.subscribe((val: IScreenParams) => latest$.next(val));

  const onResize = (): void =>
    value$.next({
      width: container.width,
      height: container.height,
      ratio: container.ratio
    });

  function start(): IScreenSizeWatcher {
    onResize();
    container.startWatch('resize', onResize);
    return result;
  }

  function stop(): IScreenSizeWatcher {
    container.stopWatch('resize', onResize);
    return result;
  }

  const result: IScreenSizeWatcher = {
    ...AbstractWatcher('screen-size'),
    start,
    stop,
    value$,
    latest$
  };

  return result;
}
