import type { Subscription } from 'rxjs';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import { MouseEventType } from '@/Engine/Mouse/Constants';
import type { TMouseClickWatcher, TMouseClickWatcherParams, TMouseWatcherEvent } from '@/Engine/Mouse/Models';
import { getMouseWatcherEvent } from '@/Engine/Mouse/Utils';

export function MouseClickWatcher({ container, tags }: TMouseClickWatcherParams): TMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMouseWatcherEvent> = AbstractWatcher<TMouseWatcherEvent>(WatcherType.MouseClickWatcher, 'mouse_click_watcher', tags);
  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    if ((event.type as MouseEventType) !== MouseEventType.Wheel && event.cancelable) event.preventDefault();
    const e: TMouseWatcherEvent = getMouseWatcherEvent(event);
    abstractWatcher.value$.next(e);
  };

  const startSub$: Subscription = abstractWatcher.start$.subscribe((): void => {
    container.startWatch(MouseEventType.MouseUp, onMouseListener);
    container.startWatch(MouseEventType.MouseDown, onMouseListener);
    container.startWatch(MouseEventType.DoubleClick, onMouseListener);
    container.startWatch(MouseEventType.Wheel, onMouseListener);
  });

  const stopSub$: Subscription = abstractWatcher.stop$.subscribe((): void => {
    container.stopWatch(MouseEventType.MouseUp, onMouseListener);
    container.stopWatch(MouseEventType.MouseDown, onMouseListener);
    container.stopWatch(MouseEventType.DoubleClick, onMouseListener);
    container.stopWatch(MouseEventType.Wheel, onMouseListener);
  });

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    startSub$.unsubscribe();
    stopSub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    key: containerIdTag
  });
}
