import type { TAbstractWatcherWithState } from '@Anarchy/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TKeyComboWatcher, TKeyComboWatcherDependencies, TKeyComboWatcherParams } from '@Anarchy/Engine/Keyboard';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyComboWatcher({ tags }: TKeyComboWatcherParams, { keyPressWatcher, keyReleaseWatcher }: TKeyComboWatcherDependencies): TKeyComboWatcher {
  const combo: Set<string> = new Set<string>();
  const watcher: TAbstractWatcherWithState<Set<string>> = AbstractWatcherWithState(WatcherType.KeyPressWatcher, 'key_combo_watcher', combo, tags);

  function onPress(event: KeyboardEvent): void {
    if (combo.has(event.code)) return;

    combo.add(event.code);
    watcher.value$.next(combo);
  }

  function onRelease(event: KeyboardEvent): void {
    if (!combo.has(event.code)) return;

    combo.delete(event.code);
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

  const destroySub$: Subscription = watcher.destroy$.subscribe((): void => {
    combo.clear();
    destroySub$.unsubscribe();
  });

  return watcher;
}
