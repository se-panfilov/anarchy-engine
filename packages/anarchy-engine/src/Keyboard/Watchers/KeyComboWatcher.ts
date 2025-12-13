import type { TAbstractWatcherWithState } from '@Anarchy/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@Anarchy/Engine/Abstract';
import { ContainerEvents } from '@Anarchy/Engine/Global';
import { KeyboardEventType } from '@Anarchy/Engine/Keyboard/Constants';
import type { TGameKey, TKeyComboWatcher, TKeyComboWatcherDependencies, TKeyComboWatcherParams, TKeyEvent, TKeysCombo } from '@Anarchy/Engine/Keyboard/Models';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyComboWatcher({ container, tags }: TKeyComboWatcherParams, { keyPressWatcher, keyReleaseWatcher }: TKeyComboWatcherDependencies): TKeyComboWatcher {
  const keys: TKeysCombo = new Set<TGameKey>();
  const watcher: TAbstractWatcherWithState<TKeyEvent> = AbstractWatcherWithState(WatcherType.KeyPressWatcher, 'key_combo_watcher', { keys }, tags);

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

  //When focus leave the container, release all keys
  const releaseAllKeys = (): void => watcher.value$.value.keys.forEach((key: TGameKey): void => onRelease({ code: key } as KeyboardEvent));
  container.startWatch(ContainerEvents.Blur, releaseAllKeys);

  watcher.enabled$.pipe(distinctUntilChanged(), takeUntil(watcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(KeyboardEventType.KeyDown, releaseAllKeys);
    } else {
      container.stopWatch(KeyboardEventType.KeyDown, releaseAllKeys);
    }
  });

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
