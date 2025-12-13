import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import { MouseEventType } from '@Anarchy/Engine/Mouse/Constants';
import type { TMouseClickWatcher, TMouseClickWatcherParams, TMouseWatcherEvent } from '@Anarchy/Engine/Mouse/Models';
import { getMouseWatcherEvent } from '@Anarchy/Engine/Mouse/Utils';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function MouseClickWatcher({ container, tags }: TMouseClickWatcherParams): TMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMouseWatcherEvent> = AbstractWatcher<TMouseWatcherEvent>(WatcherType.MouseClickWatcher, 'mouse_click_watcher', tags);
  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    //Must do "event.target === container.canvas$.value" to make sure we are not catching events from other elements (UI, etc.), outside of canvas
    if ((event.type as MouseEventType) !== MouseEventType.Wheel && event.cancelable && event.target === container.canvas$.value) event.preventDefault();
    const e: TMouseWatcherEvent = getMouseWatcherEvent(event);
    abstractWatcher.value$.next(e);
  };

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(MouseEventType.MouseUp, onMouseListener);
      container.startWatch(MouseEventType.MouseDown, onMouseListener);
      container.startWatch(MouseEventType.DoubleClick, onMouseListener);
      container.startWatch(MouseEventType.Wheel, onMouseListener);
    } else {
      container.stopWatch(MouseEventType.MouseUp, onMouseListener);
      container.stopWatch(MouseEventType.MouseDown, onMouseListener);
      container.stopWatch(MouseEventType.DoubleClick, onMouseListener);
      container.stopWatch(MouseEventType.Wheel, onMouseListener);
    }
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    key: containerIdTag
  });
}
