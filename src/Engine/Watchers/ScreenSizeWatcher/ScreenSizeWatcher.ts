import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IScreenSizeWatcher } from '@Engine/Watchers/ScreenSizeWatcher/Models/IScreenSizeWatcher';
import type { IScreenParams } from '@Engine/Models';
import { Subject } from 'rxjs';

export function ScreenSizeWatcher(container: IGlobalContainerDecorator): IScreenSizeWatcher {
  const value$: Subject<IScreenParams> = new Subject<IScreenParams>();

  const onResize = (): void =>
    value$.next({
      width: container.width,
      height: container.height,
      ratio: container.ratio
    });

  return {
    ...AbstractWatcher('screen-size'),
    start: (): void => {
      onResize();
      container.startWatch('resize', onResize);
    },
    stop: (): void => container.stopWatch('resize', onResize),
    value$
  };
}
