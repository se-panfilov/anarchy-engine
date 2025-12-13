import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import { KeyboardEventType } from '@Anarchy/Engine/Keyboard/Constants';
import type { TKeyWatcher, TKeyWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyReleaseWatcher({ container, tags }: TKeyWatcherParams): TKeyWatcher {
  const abstractWatcher: TAbstractWatcher<KeyboardEvent> = AbstractWatcher(WatcherType.KeyReleaseWatcher, 'key_release_watcher', tags);

  const onChange = (event: KeyboardEvent): void => abstractWatcher.value$.next(event);

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(KeyboardEventType.KeyUp, onChange);
    } else {
      container.stopWatch(KeyboardEventType.KeyUp, onChange);
    }
  });

  return abstractWatcher;
}
