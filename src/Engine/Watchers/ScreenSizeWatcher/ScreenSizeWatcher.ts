import type { IAbstractWatcherWithState } from '@Engine/Domains/Abstract';
import { AbstractWatcherWithState } from '@Engine/Domains/Abstract';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IScreenParams } from '@Engine/Models';
import type { IScreenSizeWatcher } from '@Engine/Watchers/ScreenSizeWatcher/Models/IScreenSizeWatcher';

export function ScreenSizeWatcher(container: IGlobalContainerDecorator, tags: ReadonlyArray<string> = []): IScreenSizeWatcher {
  const initialValue: IScreenParams = { width: 0, height: 0, ratio: 0 };
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: IAbstractWatcherWithState<IScreenParams> = AbstractWatcherWithState('screen-size', initialValue, tags);

  const onResize = (): void =>
    abstractWatcher.value$.next({
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
    ...abstractWatcher,
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
