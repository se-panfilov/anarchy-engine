import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import { ProtectedWatcher } from '@/Engine/Abstract/Watchers/ProtectedWatcher';
import { MouseEventType } from '@/Engine/Mouse/Constants';
import type { TMouseClickWatcher, TMouseClickWatcherParams, TMouseWatcherEvent } from '@/Engine/Mouse/Models';
import { getMouseWatcherEvent } from '@/Engine/Mouse/Utils';

export function MouseClickWatcher({ container, tags = [] }: TMouseClickWatcherParams): TMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMouseWatcherEvent> = AbstractWatcher<TMouseWatcherEvent>(WatcherType.MouseClickWatcher, 'global_mouse_click_watcher', tags);
  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    if ((event.type as MouseEventType) !== MouseEventType.Wheel && event.cancelable) event.preventDefault();
    const e: TMouseWatcherEvent = getMouseWatcherEvent(event);
    abstractWatcher.value$.next(e);
  };

  function start(): TMouseClickWatcher {
    container.startWatch(MouseEventType.MouseUp, onMouseListener);
    container.startWatch(MouseEventType.MouseDown, onMouseListener);
    container.startWatch(MouseEventType.DoubleClick, onMouseListener);
    container.startWatch(MouseEventType.Wheel, onMouseListener);
    return result;
  }

  function stop(): TMouseClickWatcher {
    container.stopWatch(MouseEventType.MouseUp, onMouseListener);
    container.stopWatch(MouseEventType.MouseDown, onMouseListener);
    container.stopWatch(MouseEventType.DoubleClick, onMouseListener);
    container.stopWatch(MouseEventType.Wheel, onMouseListener);
    return result;
  }

  const result: TMouseClickWatcher = Object.assign(ProtectedWatcher<TAbstractWatcher<TMouseWatcherEvent>, TMouseWatcherEvent>(abstractWatcher), {
    key: containerIdTag,
    start,
    stop
  });

  return result;
}
