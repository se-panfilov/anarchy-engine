import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import { MouseEventType } from '@Anarchy/Engine/Mouse/Constants';
import type { TMouseClickWatcher, TMouseClickWatcherParams, TMouseWatcherEvent } from '@Anarchy/Engine/Mouse/Models';
import { getMouseWatcherEvent } from '@Anarchy/Engine/Mouse/Utils';
import { TextCssClass } from '@Anarchy/Engine/Text/Constants';
import { distinctUntilChanged, takeUntil } from 'rxjs';

const textCssClasses = [TextCssClass.RendererText2d, TextCssClass.RendererText3d, TextCssClass.Text2d, TextCssClass.Text3d];
const textCssClassesRegexp = new RegExp(`(?:^|\\s)(?:${textCssClasses.join('|')})(?:\\s|$)`);

export function MouseClickWatcher({ container, tags }: TMouseClickWatcherParams): TMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMouseWatcherEvent> = AbstractWatcher<TMouseWatcherEvent>(WatcherType.MouseClickWatcher, 'mouse_click_watcher', tags);

  const isGameLayerTarget = (event: MouseEvent | WheelEvent): boolean => {
    const target: Element | null = event.target as Element | null;
    if (!target) return false;
    if (target === container.canvas$.value) return true;

    const classes: DOMTokenList | undefined = target?.classList;
    if (!classes || classes.length === 0) return false;
    else return textCssClassesRegexp.test(classes.value);
  };

  const onMouseListener = (event: MouseEvent | WheelEvent): void => {
    //Must make sure, that targeting a game layer (canvas, text renderer), to not catch events from other elements (UI, etc.)
    if ((event.type as MouseEventType) !== MouseEventType.Wheel && event.cancelable && !isGameLayerTarget(event)) {
      // if (event.cancelable) event.preventDefault();
      return;
    }

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
