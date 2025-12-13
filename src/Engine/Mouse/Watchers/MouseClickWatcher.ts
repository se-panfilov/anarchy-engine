import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import { MouseEventType } from '@/Engine/Mouse/Constants';
import type { IMouseClickWatcher, IMouseClickWatcherParams, IMouseWatcherEvent } from '@/Engine/Mouse/Models';
import { getMouseWatcherEvent } from '@/Engine/Mouse/Utils';

export function MouseClickWatcher({ container, tags = [] }: IMouseClickWatcherParams): IMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<IMouseWatcherEvent> = AbstractWatcher<IMouseWatcherEvent>(WatcherType.MouseClickWatcher, 'global_mouse_click_watcher', tags);
  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    if ((event.type as MouseEventType) !== MouseEventType.Wheel && event.cancelable) event.preventDefault();
    const e: IMouseWatcherEvent = getMouseWatcherEvent(event);
    abstractWatcher.value$.next(e);
  };

  function start(): IMouseClickWatcher {
    container.startWatch(MouseEventType.MouseUp, onMouseListener);
    container.startWatch(MouseEventType.MouseDown, onMouseListener);
    container.startWatch(MouseEventType.DoubleClick, onMouseListener);
    container.startWatch(MouseEventType.Wheel, onMouseListener);
    return result;
  }

  function stop(): IMouseClickWatcher {
    container.stopWatch(MouseEventType.MouseUp, onMouseListener);
    container.stopWatch(MouseEventType.MouseDown, onMouseListener);
    container.stopWatch(MouseEventType.DoubleClick, onMouseListener);
    container.stopWatch(MouseEventType.Wheel, onMouseListener);
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
