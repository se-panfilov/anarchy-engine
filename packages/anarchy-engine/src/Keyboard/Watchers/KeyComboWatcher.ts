import type { TAbstractWatcherWithState } from '@Anarchy/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TGameKey, TKeyComboWatcher, TKeyComboWatcherDependencies, TKeyComboWatcherParams, TKeysState } from '@Anarchy/Engine/Keyboard';
import type { TKeysEvent } from '@Anarchy/Engine/Keyboard/Models/TKeysEvent';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyComboWatcher({ tags }: TKeyComboWatcherParams, { keyPressWatcher, keyReleaseWatcher }: TKeyComboWatcherDependencies): TKeyComboWatcher {
  const keys: TKeysState = new Set<TGameKey>();
  const watcher: TAbstractWatcherWithState<TKeysEvent> = AbstractWatcherWithState(WatcherType.KeyPressWatcher, 'key_combo_watcher', { keys, event: undefined }, tags);

  function onPress(event: KeyboardEvent): void {
    if (keys.has(event.code as TGameKey)) return;
    (keys as Set<TGameKey>).add(event.code as TGameKey);
    watcher.value$.next({ keys, pressed: event.code as TGameKey, event });
  }

  function onRelease(event: KeyboardEvent): void {
    if (!keys.has(event.code as TGameKey)) return;

    (keys as Set<TGameKey>).delete(event.code as TGameKey);
    watcher.value$.next({ keys, released: event.code as TGameKey, event });
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
    (keys as Set<TGameKey>).clear();
    destroySub$.unsubscribe();
  });

  return watcher;
}
