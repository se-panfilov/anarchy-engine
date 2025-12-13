import { distinctUntilChanged, takeUntil } from 'rxjs';

import type { TAbstractWatcher } from '@/Abstract';
import { AbstractWatcher, WatcherType } from '@/Abstract';
import { MouseEventType } from '@/Mouse/Constants';
import type { TMouseClickWatcher, TMouseClickWatcherParams, TMouseWatcherEvent } from '@/Mouse/Models';
import { getMouseWatcherEvent } from '@/Mouse/Utils';

export function MouseClickWatcher({ container, tags }: TMouseClickWatcherParams): TMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMouseWatcherEvent> = AbstractWatcher<TMouseWatcherEvent>(WatcherType.MouseClickWatcher, 'mouse_click_watcher', tags);
  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    if ((event.type as MouseEventType) !== MouseEventType.Wheel && event.cancelable) event.preventDefault();
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
