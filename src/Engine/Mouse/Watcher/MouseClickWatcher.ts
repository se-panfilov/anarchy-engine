import type { IAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherParams, IMouseWatcherEvent } from '@/Engine/Mouse/Models';
import { getMouseWatcherEvent } from '@/Engine/Mouse/Utils';

export function MouseClickWatcher({ container, tags = [] }: IMouseClickWatcherParams): IMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: IAbstractWatcher<IMouseWatcherEvent> = AbstractWatcher<IMouseWatcherEvent>(WatcherType.MouseClickWatcher, tags);
  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    event.preventDefault();
    const e: IMouseWatcherEvent = getMouseWatcherEvent(event);
    abstractWatcher.value$.next(e);
  };

  function start(): IMouseClickWatcher {
    container.startWatch('mouseup', onMouseListener);
    container.startWatch('mousedown', onMouseListener);
    container.startWatch('dblclick', onMouseListener);
    container.startWatch('wheel', onMouseListener);
    return result;
  }

  function stop(): IMouseClickWatcher {
    container.stopWatch('mouseup', onMouseListener);
    container.stopWatch('mousedown', onMouseListener);
    container.stopWatch('dblclick', onMouseListener);
    container.stopWatch('wheel', onMouseListener);
    return result;
  }

  const result: IMouseClickWatcher = {
    ...abstractWatcher,
    value$: abstractWatcher.value$.asObservable(),
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
