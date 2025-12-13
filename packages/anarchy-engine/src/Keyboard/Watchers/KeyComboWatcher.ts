import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TKeyComboWatcher, TKeyComboWatcherDependencies, TKeyComboWatcherParams } from '@Anarchy/Engine/Keyboard';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyComboWatcher({ tags }: TKeyComboWatcherParams, { keyPressWatcher, keyReleaseWatcher }: TKeyComboWatcherDependencies): TKeyComboWatcher {
  const watcher: TAbstractWatcher<Set<string>> = AbstractWatcher(WatcherType.KeyPressWatcher, 'key_combo_watcher', tags);

  const combo: Set<string> = new Set<string>();

  function onPress(event: KeyboardEvent): void {
    if (combo.has(event.key)) return;

    combo.add(event.key);
    watcher.value$.next(combo);
  }

  function onRelease(event: KeyboardEvent): void {
    if (!combo.has(event.key)) return;

    combo.delete(event.key);
    watcher.value$.next(combo);
  }

  let pressSub$: Subscription | undefined;
  let releaseSub$: Subscription | undefined;

  watcher.enabled$.pipe(distinctUntilChanged(), takeUntil(watcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      pressSub$ = keyPressWatcher.value$.subscribe(onPress);
      releaseSub$ = keyReleaseWatcher.value$.subscribe(onRelease);
    } else {
      pressSub$?.unsubscribe();
      releaseSub$?.unsubscribe();
    }
  });

  return watcher;
}
