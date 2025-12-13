import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TKeyboardWatcher } from '@Anarchy/Engine/Keyboard';
import { KeyboardEventType } from '@Anarchy/Engine/Keyboard';
import type { TKeyboardWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyboardWatcher({ container, tags }: TKeyboardWatcherParams): TKeyboardWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<KeyboardEvent> = AbstractWatcher(WatcherType.KeyboardWatcher, 'keyboard_watcher', tags);

  const onMouseListener = (event: KeyboardEvent): void => abstractWatcher.value$.next(event);

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(KeyboardEventType.KeyUp, onMouseListener);
      container.startWatch(KeyboardEventType.KeyDown, onMouseListener);
    } else {
      container.stopWatch(KeyboardEventType.KeyUp, onMouseListener);
      container.stopWatch(KeyboardEventType.KeyDown, onMouseListener);
    }
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    key: containerIdTag
  });
}
