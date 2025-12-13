import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@Anarchy/Engine/Abstract';
import type { TKeyWatcher } from '@Anarchy/Engine/Keyboard';
import { KeyboardEventType } from '@Anarchy/Engine/Keyboard';
import type { TKeyWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { distinctUntilChanged, takeUntil } from 'rxjs';

export function KeyPressWatcher({ container, tags }: TKeyWatcherParams): TKeyWatcher {
  const abstractWatcher: TAbstractWatcher<KeyboardEvent> = AbstractWatcher(WatcherType.KeyPressWatcher, 'key_press_watcher', tags);

  function onChange(event: KeyboardEvent): void {
    if (event.repeat) return;
    if (isTextInputTarget(event.target)) return;
    abstractWatcher.value$.next(event);
  }

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) {
      container.startWatch(KeyboardEventType.KeyDown, onChange);
    } else {
      container.stopWatch(KeyboardEventType.KeyDown, onChange);
    }
  });

  function isTextInputTarget(target: EventTarget | null | undefined): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag: string = target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (target.isContentEditable) return true;

    return false;
  }

  return abstractWatcher;
}
