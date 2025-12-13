import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TKeyWatcher } from '@Anarchy/Engine/Keyboard';
import { KeyboardEventType } from '@Anarchy/Engine/Keyboard';
import type { TKeyWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyReleaseWatcher({ container, tags }: TKeyWatcherParams): TKeyWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<KeyboardEvent> = AbstractWatcher(WatcherType.KeyReleaseWatcher, 'key_release_watcher', tags);

  const onMouseListener = (event: KeyboardEvent): void => abstractWatcher.value$.next(event);

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(KeyboardEventType.KeyUp, onMouseListener);
    } else {
      container.stopWatch(KeyboardEventType.KeyUp, onMouseListener);
    }
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    key: containerIdTag
  });
}
