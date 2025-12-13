import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TKeyWatcher } from '@Anarchy/Engine/Keyboard';
import { KeyboardEventType } from '@Anarchy/Engine/Keyboard';
import type { TKeyWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyPressWatcher({ container, tags }: TKeyWatcherParams): TKeyWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<KeyboardEvent> = AbstractWatcher(WatcherType.KeyPressWatcher, 'key_press_watcher', tags);

  const onChange = (event: KeyboardEvent): void => abstractWatcher.value$.next(event);

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(KeyboardEventType.KeyDown, onChange);
    } else {
      container.stopWatch(KeyboardEventType.KeyDown, onChange);
    }
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    key: containerIdTag
  });
}
